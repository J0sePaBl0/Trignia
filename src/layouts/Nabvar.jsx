// src/components/Navbar.jsx
import React, { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const ctaClick = () => {
    const ids = ["contact", "contacto", "contact-section", "contacto-section", "contacto-form"];
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
  };

  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;

    const onDown = (e) => {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target)) setOpen(false);
    };

    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-4">
        <div
          ref={panelRef}
          className={[
            "relative flex items-center justify-between rounded-full px-4 sm:px-6 py-3",
            "border border-white/60",
            "backdrop-blur-xl bg-white/10",
            "shadow-[0_12px_40px_-26px_rgba(15,23,42,0.35)]",
            "transition-all duration-300",
            scrolled ? "bg-white/75 border-emerald-100/70" : "",
          ].join(" ")}
        >
          {/* Brand */}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              scrollToId("top");
            }}
            className="flex items-center gap-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 rounded-full"
            aria-label="Ir al inicio"
          >
            <img src="images/trignia_logo3.webp" alt="Trignia Logo" className="w-30 h-15" />
          </button>

          {/* Links (desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink onClick={() => scrollToId("problems")}>¿Que solucionamos?</NavLink>
            <NavLink onClick={() => scrollToId("steps")}>¿Cómo funciona?</NavLink>
            <NavLink onClick={() => scrollToId("testimonials")}>Testimonios</NavLink>
            <NavLink onClick={() => scrollToId("whysection")}>¿Por qué trignia?</NavLink>
            <NavLink onClick={() => scrollToId("contact")}>Contacto</NavLink>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                ctaClick();
              }}
              className="
                hidden sm:inline-flex
                items-center gap-2
                rounded-full px-4 sm:px-5 py-2
                text-sm font-semibold text-white
                shadow-sm transition active:scale-[0.99]
                focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200
              "
              style={{ backgroundColor: "var(--color-primary-color)" }}
            >
              Agendar
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M6 4l8 6-8 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Mobile toggle */}
            <button
              type="button"
              className="
                md:hidden
                rounded-full p-2
                text-slate-700
                hover:bg-white/50
                transition
                focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200
              "
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile dropdown */}
          <div
            className={[
              "md:hidden absolute left-0 right-0 top-[calc(100%+10px)]",
              "rounded-3xl border border-white/60",
              "bg-white/75 backdrop-blur-xl",
              "shadow-[0_18px_60px_-32px_rgba(15,23,42,0.35)]",
              "overflow-hidden transition-all duration-200 origin-top",
              open ? "scale-100 opacity-100 pointer-events-auto" : "scale-95 opacity-0 pointer-events-none",
            ].join(" ")}
          >
            <div className="p-3">
              <MobileLink onClick={() => go("problems")}>Problemas</MobileLink>
              <MobileLink onClick={() => go("steps")}>Cómo funciona</MobileLink>
              <MobileLink onClick={() => go("testimonials")}>Testimonios</MobileLink>
              <MobileLink onClick={() => go("contact")}>Contacto</MobileLink>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  ctaClick();
                }}
                className="
                  mt-2 w-full
                  inline-flex items-center justify-center gap-2
                  rounded-2xl px-4 py-3
                  text-sm font-semibold text-white
                  shadow-sm transition active:scale-[0.99]
                  focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200
                "
                style={{ backgroundColor: "var(--color-primary-color)" }}
              >
                Agendar una reunión
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M6 4l8 6-8 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

function NavLink({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        text-sm font-semibold
        text-slate-700
        hover:text-emerald-700
        transition
        focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200
        rounded-full px-2 py-1
      "
    >
      {children}
    </button>
  );
}

function MobileLink({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        w-full text-left
        rounded-2xl px-4 py-3
        text-sm font-semibold text-slate-700
        hover:bg-emerald-50 hover:text-emerald-800
        transition
        focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200
      "
    >
      {children}
    </button>
  );
}
