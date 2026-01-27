export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const PROD_URL = process.env.N8N_CHAT_WEBHOOK_URL;
  const TEST_URL = process.env.N8N_CHAT_TEST_WEBHOOK_URL;
  const SECRET = process.env.CHAT_SECRET;

  if (!PROD_URL && !TEST_URL) {
    return res.status(500).json({
      ok: false,
      error: "Missing N8N webhook URLs",
    });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    if (!body?.message) {
      return res.status(400).json({ ok: false, error: "Missing message" });
    }

    // helper para intentar un webhook
    const tryWebhook = async (url, label) => {
      if (!url) return null;

      try {
        const r = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-chat-secret": SECRET || "",
          },
          body: JSON.stringify(body),
        });

        const data = await r.json().catch(() => null);

        if (!r.ok) {
          throw new Error(
            `[${label}] HTTP ${r.status} – ${JSON.stringify(data)?.slice(0, 200)}`
          );
        }

        return data;
      } catch (err) {
        console.error(`❌ Webhook ${label} failed:`, err.message);
        return null;
      }
    };

    // 1️⃣ Try production first
    let result = await tryWebhook(PROD_URL, "PROD");

    // 2️⃣ Fallback to test
    if (!result) {
      result = await tryWebhook(TEST_URL, "TEST");
    }

    if (!result) {
      return res.status(502).json({
        ok: false,
        error: "Both n8n webhooks failed",
      });
    }

    return res.status(200).json({
      ok: true,
      ...result,
    });
  } catch (e) {
    return res.status(500).json({
      ok: false,
      error: e.message || "Server error",
    });
  }
}
