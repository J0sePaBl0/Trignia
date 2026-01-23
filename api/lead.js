export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const prodWebhook = process.env.N8N_WEBHOOK_URL;
  const testWebhook = process.env.N8N_TEST_WEBHOOK_URL;

  if (!prodWebhook) {
    return res.status(500).json({ ok: false, error: "Missing N8N_WEBHOOK_URL" });
  }

  try {
    const payload = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    if (!payload?.email || !payload?.name) {
      return res.status(400).json({ ok: false, error: "Missing required fields" });
    }

    const data = {
      ...payload,
      meta: {
        source: "trignia-web",
        ts: new Date().toISOString(),
        ip: (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || req.socket?.remoteAddress,
        ua: req.headers["user-agent"],
      },
    };

    // helper that attempts to POST and returns result
    const postTo = async (url, label) => {
      const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const text = await r.text().catch(() => "");
      return { ok: r.ok, status: r.status, body: text, label };
    };

    // 1) Try production
    const prodResult = await postTo(prodWebhook, "production");
    if (prodResult.ok) {
      return res.status(200).json({ ok: true, sentTo: "production" });
    }

    // 2) Fallback to test (only if configured)
    if (testWebhook) {
      const testResult = await postTo(testWebhook, "test");
      if (testResult.ok) {
        return res.status(200).json({
          ok: true,
          sentTo: "test",
          warning: "Production webhook failed; test webhook used (works only if Listen for test event is active).",
        });
      }

      // both failed
      return res.status(502).json({
        ok: false,
        error: "n8n failed",
        production: {
          status: prodResult.status,
          details: prodResult.body.slice(0, 300),
        },
        test: {
          status: testResult.status,
          details: testResult.body.slice(0, 300),
        },
      });
    }

    // prod failed, no test configured
    return res.status(502).json({
      ok: false,
      error: "n8n failed",
      production: {
        status: prodResult.status,
        details: prodResult.body.slice(0, 300),
      },
      hint: "Set N8N_TEST_WEBHOOK_URL if you want fallback, but remember /webhook-test only works when listening.",
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e?.message || "Server error" });
  }
}