// src/components/TestimonialsCarousel.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Sliding-window carousel:
 * - Shows 3 cards per "view" (desktop)
 * - Next/Prev moves by 1 card
 * - Dots represent the START index of the visible group (0..maxStart)
 */
export default function TestimonialsCarousel({
  items = [],
  autoPlay = true,
  autoPlayMs = 5000,
}) {
  const trackRef = useRef(null);

  // startIndex = the leftmost visible card index (this drives dots + next/prev)
  const [startIndex, setStartIndex] = useState(0);

  const slides = useMemo(() => items ?? [], [items]);

  const CARDS_PER_VIEW = 3;

  const maxStart = Math.max(0, slides.length - CARDS_PER_VIEW); // last valid starting index
  const dotsCount = Math.max(1, maxStart + 1); // 0..maxStart inclusive

  const clampStart = (idx) => Math.max(0, Math.min(idx, maxStart));

  const scrollToIndexLeft = (idx) => {
    const track = trackRef.current;
    if (!track) return;

    const clamped = clampStart(idx);
    const child = track.children?.[clamped];
    if (!child) return;

    // Align the chosen card to the LEFT edge (so it becomes the first visible)
    track.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
  };

  const next = () => scrollToIndexLeft(startIndex + 1);
  const prev = () => scrollToIndexLeft(startIndex - 1);

  // Track current start index based on scrollLeft (leftmost card)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const children = Array.from(track.children);
      if (!children.length) return;

      // Find the card whose offsetLeft is closest to current scrollLeft
      const x = track.scrollLeft;

      let bestIdx = 0;
      let bestDist = Infinity;

      for (let i = 0; i < children.length; i++) {
        const dist = Math.abs(children[i].offsetLeft - x);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      }

      setStartIndex(clampStart(bestIdx));
    };

    onScroll();
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  // Autoplay: move by 1 start position, loop back to 0 at end
  useEffect(() => {
    if (!autoPlay || slides.length <= CARDS_PER_VIEW) return;

    const id = window.setInterval(() => {
      const nextIdx = startIndex >= maxStart ? 0 : startIndex + 1;
      scrollToIndexLeft(nextIdx);
    }, autoPlayMs);

    return () => window.clearInterval(id);
  }, [autoPlay, autoPlayMs, startIndex, maxStart, slides.length]);

  return (
    <div className="relative">
      {/* Track */}
      <div
        ref={trackRef}
        className="
          no-scrollbar
          flex gap-8 overflow-x-auto scroll-smooth
          snap-x snap-mandatory
          px-6 md:px-10
          py-10
        "
        aria-label="Carrusel de testimonios"
      >
        {slides.map((t, idx) => (
          <div
            key={t.id ?? idx}
            className="
              snap-start
              shrink-0
              w-[78%] sm:w-[60%] md:w-[44%] lg:w-[32%]
              max-w-[420px]
            "
          >
            <TestimonialCard {...t} />
          </div>
        ))}
      </div>

      {/* Nav buttons */}
      {slides.length > CARDS_PER_VIEW && (
        <>
          <button
            type="button"
            onClick={prev}
            className="
              hidden md:flex
              absolute left-2 top-1/2 -translate-y-1/2
              h-10 w-10 items-center justify-center
              rounded-full bg-white/80 shadow
              hover:bg-white transition
            "
            aria-label="Anterior"
          >
            <span className="text-xl leading-none text-slate-700">‹</span>
          </button>
          <button
            type="button"
            onClick={next}
            className="
              hidden md:flex
              absolute right-2 top-1/2 -translate-y-1/2
              h-10 w-10 items-center justify-center
              rounded-full bg-white/80 shadow
              hover:bg-white transition
            "
            aria-label="Siguiente"
          >
            <span className="text-xl leading-none text-slate-700">›</span>
          </button>
        </>
      )}

      {/* Dots: 1 dot per start position (sliding window) */}
      {dotsCount > 1 && (
        <div className="mt-2 flex items-center justify-center gap-2 pb-2">
          {Array.from({ length: dotsCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndexLeft(i)}
              className={[
                "h-2.5 w-2.5 rounded-full transition",
                i === startIndex ? "bg-emerald-500" : "bg-emerald-200",
              ].join(" ")}
              aria-label={`Ir al grupo ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* --- Your existing TestimonialCard, Star, HospitalIcon below can remain as-is --- */
function TestimonialCard({ clinicName, rating = 5, text }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < rating);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -top-10 left-0 right-0 flex justify-between px-8">
        <span className="text-[90px] font-black leading-none text-slate-300/60">“</span>
        <span className="text-[90px] font-black leading-none text-slate-300/60">”</span>
      </div>

      <div
        className="
          relative
          rounded-[22px]
          bg-white
          shadow-[0_18px_60px_-28px_rgba(15,23,42,0.35)]
          px-7 pb-7 pt-10
        "
      >
        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
          <div className="h-16 w-16 rounded-full bg-slate-100 shadow-sm flex items-center justify-center">
            <HospitalIcon className="h-8 w-8 text-emerald-500" />
          </div>
        </div>

        <div className="mt-2 flex items-center justify-center gap-1">
          {stars.map((on, i) => (
            <Star key={i} className={on ? "text-yellow-500" : "text-yellow-200"} />
          ))}
        </div>

        <h3 className="mt-3 text-center font-semibold text-emerald-600">
          {clinicName}
        </h3>

        <p className="mt-3 text-center text-sm leading-relaxed text-slate-500">
          {text}
        </p>
      </div>
    </div>
  );
}

function Star({ className = "" }) {
  return (
    <svg className={`h-4 w-4 ${className}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 17.27l-5.18 3.05 1.39-5.9-4.6-3.99 6.06-.52L12 4.5l2.33 5.41 6.06.52-4.6 3.99 1.39 5.9z" />
    </svg>
  );
}

function HospitalIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M20 54V18c0-2.2 1.8-4 4-4h16c2.2 0 4 1.8 4 4v36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M14 54h36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M28 26h8M32 22v8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M26 34h4M34 34h4M26 40h4M34 40h4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M12 54V30c0-1.7 1.3-3 3-3h5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M52 54V30c0-1.7-1.3-3-3-3h-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* Hide scrollbar helper */
const style = document?.createElement?.("style");
if (style && !document.getElementById("no-scrollbar-style")) {
  style.id = "no-scrollbar-style";
  style.innerHTML = `
    .no-scrollbar::-webkit-scrollbar{display:none;}
    .no-scrollbar{-ms-overflow-style:none; scrollbar-width:none;}
  `;
  document.head.appendChild(style);
}
