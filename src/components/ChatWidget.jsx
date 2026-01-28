import React, { useEffect, useState } from "react";
import ChatPanel from "./ChatPanel";

export default function ChatWidget({
  title = "TrignIA",
  subtitle = "Asistente de Trignia",
}) {
  const [open, setOpen] = useState(false);

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
      </button>

      {/* Panel */}
      <div
        className={[
          "fixed bottom-24 right-5 z-[9999]",
          "w-[92vw] max-w-[390px]",
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
