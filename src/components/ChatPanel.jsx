import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * UI-only chatbot panel.
 * Replace sendMessageToBot() with your n8n webhook call later.
 */
export default function ChatPanel({
  title = "Trigny",
  subtitle = "Asistente de Trignia",
  onClose,
}) {
  const [messages, setMessages] = useState(() => [
    {
      id: cryptoId(),
      role: "bot",
      text: "¡Hola! Soy Trigny. ¿En qué puedo ayudarte con tu clínica hoy?",
      ts: Date.now(),
    },
  ]);

  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const listRef = useRef(null);
  const inputRef = useRef(null);

  const canSend = useMemo(() => input.trim().length > 0 && !sending, [input, sending]);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length, sending]);

  // Focus input when opened
  useEffect(() => {
    inputRef.current?.focus?.();
  }, []);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;

    setInput("");
    setSending(true);

    const userMsg = { id: cryptoId(), role: "user", text, ts: Date.now() };
    setMessages((m) => [...m, userMsg]);

    try {
      // Show a typing bubble
      const typingId = cryptoId();
      setMessages((m) => [
        ...m,
        { id: typingId, role: "bot", text: "", ts: Date.now(), typing: true },
      ]);

      const reply = await sendMessageToBot(text, { source: "trignia-web" });

      // Replace typing bubble with real reply
      setMessages((m) => {
        const next = m.map((x) =>
        x.id === typingId
            ? { ...x, typing: false, text: String(reply ?? "") }
            : x
        );
        // Remove empty bot messages
        return next.filter((x) => !(x.id === typingId && !x.text.trim()));
    });
   } catch (e) {
  // remove typing bubble, don't add any "bot" message
  setMessages((m) => m.filter((x) => !x.typing));
} finally {
  setSending(false);
}
  };

  const onKeyDown = (e) => {
    // Enter sends, Shift+Enter new line
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };


  return (
    <div
      className="rounded-3xl overflow-hidden border border-emerald-100 bg-white shadow-[0_22px_70px_-40px_rgba(15,23,42,0.45)]"
      role="dialog"
      aria-label="Chat con Trigny"
    >
      {/* Header */}
      <div
        className="px-5 py-4 flex items-center justify-between"
        style={{
          background: "linear-gradient(90deg, rgba(65,140,126,1), rgba(69,173,127,1))",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-white/15 flex items-center justify-center">
            <img src="/images/trigny-white.webp" alt="TrignIA" className="h-full w-full" />
          </div>
          <div className="text-left">
            <div className="text-white font-semibold leading-tight">{title}</div>
            <div className="text-white/80 text-xs">{subtitle}</div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="h-9 w-9 rounded-full bg-white/15 hover:bg-white/25 transition flex items-center justify-center"
          aria-label="Cerrar"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div
        ref={listRef}
        className="max-h-105 overflow-y-auto px-4 py-4 bg-[rgba(233,245,244,0.35)] "
      >
        <div className="space-y-3 ">
          {messages.map((m) => (
            <MessageBubble key={m.id} msg={m} />
          ))}
        </div>
      </div>

      {/* Composer */}
      <div className="p-4 border-t border-slate-100 bg-white">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <textarea disabled={sending}
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={1}
              placeholder="Escribe tu mensaje..."
              className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-200/40 text-slate-900 placeholder:text-slate-400"
            />
            <div className="mt-2 text-[11px] text-slate-400 text-left">
              Enter para enviar • Shift + Enter para salto de línea
            </div>
          </div>

          <button
            type="button"
            onClick={send}
            disabled={!canSend}
            className="h-12 px-5 rounded-2xl font-semibold text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "var(--color-primary-color)" }}
          >
            {sending ? "..." : "Enviar"}
          </button>
        </div>
      </div>
    </div>
  );
}
function linkify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, i) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 font-medium underline hover:text-emerald-700"
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

function MessageBubble({ msg }) {
  const isUser = msg.role === "user";

  if (msg.typing) {
    return (
      <div id="bubble-start" className="flex justify-start text-start ">
        <div className="rounded-2xl bg-white border border-slate-100 px-4 py-3 shadow-sm ">
          <TypingDots />
        </div>
      </div>
    );
  }

  return (
    <div className={["flex", isUser ? "justify-end text-start" : "justify-start text-start"].join(" ")}>
      <div
        className={[
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
          isUser
            ? "text-white"
            : msg.error
            ? "bg-rose-50 text-rose-700 border border-rose-200"
            : "bg-white text-slate-800 border border-slate-100",
        ].join(" ")}
        style={isUser ? { background: "var(--color-primary-color)" } : undefined}
      >
        <div className="whitespace-pre-wrap">
          {msg.role === "bot" ? linkify(msg.text) : msg.text}
        </div>
        <div className="mt-1 text-[10px] opacity-60 text-right">
          {formatTime(msg.ts)}
        </div>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1">
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
      <style>{`
        .dot{width:6px;height:6px;border-radius:999px;background:rgba(15,23,42,0.35);display:inline-block;animation:bounce 1s infinite;}
        .dot:nth-child(2){animation-delay:.15s}
        .dot:nth-child(3){animation-delay:.3s}
        @keyframes bounce{0%,80%,100%{transform:translateY(0);opacity:.55}40%{transform:translateY(-4px);opacity:1}}
      `}</style>
    </div>
  );
}


async function sendMessageToBot(message, meta) {
  const sessionId = getSessionId();

  const r = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, sessionId, meta }),
  });

  const data = await r.json().catch(() => ({}));

  if (!r.ok || !data?.reply) {
    throw new Error(data?.error || "No reply from webhook");
  }

  return data.reply; // ✅ ONLY webhook response
}


function getSessionId() {
  const key = "trignia_chat_session";
  let id = localStorage.getItem(key);
  if (!id) {
    id = (typeof crypto !== "undefined" && crypto.randomUUID)
      ? crypto.randomUUID()
      : String(Math.random()).slice(2);
    localStorage.setItem(key, id);
  }
  return id;
}
function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function formatTime(ts) {
  try {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

function cryptoId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return String(Math.random()).slice(2);
}
