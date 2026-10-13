import React, { useEffect, useRef, useState } from "react";
import ChatPanel from "./ChatPanel";

export default function ChatWidget({
  title = "TrignIA",
  subtitle = "Asistente de Trignia",
}) {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const openRef = useRef(false);

  // Keep a ref in sync so async bot replies see the current state; clear badge on open
  useEffect(() => {
    openRef.current = open;
    if (open) setUnread(0);
  }, [open]);

  const handleBotMessage = () => {
    if (!openRef.current) setUnread((n) => n + 1);
  };

  // ESC to close
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      {/* Floating Button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
        aria-expanded={open}
        className={[
          "fixed bottom-5 right-5 ",
          "h-16 w-40 rounded-full shadow-lg border border-zinc-300",
          "flex items-center justify-end",
          "transition-transform duration-200 active:scale-[0.98] text-font-strong text-(--color-titles-color) gap-2",
        ].join(" ")}
        style={{
          background: "white",
          boxShadow: "-10px 10px 20px rgba(15, 23, 42, 0.25)",
        }}
      >
        Trigny
        {open ? <CloseIcon /> : <ChatIcon />}

        {!open && unread > 0 && (
          <span
            className="absolute -top-2 -right-1 min-w-6 h-6 px-1.5 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md"
            style={{ background: "var(--color-primary-color)" }}
            aria-label={`${unread} mensajes sin leer`}
          >
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {/* Panel */}
      <div
        className={[
          "fixed bottom-24 right-5 z-[9999]",
          "w-[92vw] max-w-[390px]",
          "max-h-[calc(100dvh-7rem)] flex flex-col",
          "transition-all duration-200 ease-out",
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-2 pointer-events-none",
        ].join(" ")}
      >
        <ChatPanel
          title={title}
          subtitle={subtitle}
          onClose={() => setOpen(false)}
          onBotMessage={handleBotMessage}
        />
      </div>
    </>
  );
}

function ChatIcon() {
  return (
    <img src="/images/trigny.webp" alt="TrignIA" className="h-full w-15 justify-end" />
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18 6 6 18M6 6l12 12"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
