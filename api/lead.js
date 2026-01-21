export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const webhook = process.env.N8N_WEBHOOK_URL;
  if (!webhook) return res.status(500).json({ ok: false, error: "Missing N8N_WEBHOOK_URL" });

  try {
    const payload = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    // Validación mínima (ejemplo)
    if (!payload?.correo || !payload?.nombre) {
      return res.status(400).json({ ok: false, error: "Missing required fields" });
    }

    const r = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        meta: {
          source: "trignia-web",
          ts: new Date().toISOString(),
          ip: req.headers["x-forwarded-for"] || req.socket?.remoteAddress,
          ua: req.headers["user-agent"],
        },
      }),
    });

    if (!r.ok) {
      const text = await r.text().catch(() => "");
      return res.status(502).json({ ok: false, error: "n8n failed", details: text.slice(0, 200) });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message || "Server error" });
  }
}
