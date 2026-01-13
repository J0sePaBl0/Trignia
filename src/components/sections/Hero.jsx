import React from "react";
import { motion } from "motion/react";

export default function Hero({
  videoSrc = "/videos/hero.mp4",
  onPrimaryClick,
  onSecondaryClick,
}) {
  return (
    <section id="top" className="relative h-screen w-full overflow-hidden">
      {/* Video background */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Soft overlay + tint */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, rgba(233,245,244,100) 0%, rgba(237,237,237,0.88) 30%, rgba(245,245,245,0.91) 40%, rgba(230,235,232,0.92) 60%, rgba(346,245,244,100) 100%)`,
        }}
        aria-hidden
      />
      
    

      {/* Content */}
      <motion.div className="absolute inset-0 flex items-center px-6 py-16"
      initial={
      {y: 100,
      initial:"hidden"
      }}
      viewport={{ once: true }}
      animate={{ y: 0}}
      transition={{ 
        duration:1.5,
        type: "spring",
        stiffness: 30}}
      >
        <div
      className="w-full text-center">
          <h1 className="text-5xl tracking-tight sm:text-5xl md:text-8xl title-font text-(--color-titles-color)">
            LA NUEVA ERA
          </h1>

          <h2 className="mt-2 text-2xl font-medium tracking-tight sm:text-3xl md:text-6xl primary-color">
            de la Gestión CLÍNICA
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-font-strong text-(--color-text-color) sm:text-lg md:text-xl">
            Combinamos automatización, inteligencia artificial <br className="hidden sm:block" />
            y analítica para clínicas y centros de bienestar que{" "}
            <span className="font-extrabold">buscan liderar</span> la transformación digital
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
    type="button"
    aria-label="Agenda tu reunión"
    onClick={() => {
      const ids = ['contact', 'contacto', 'contact-section', 'contacto-section', 'contacto-form']
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
      }
      window.location.href = 'mailto:hola@trignia.com?subject=Agendar%20reunión'
    }}
    className="
      inline-flex items-center gap-3
      text-white font-semibold text-sm md:text-base
      px-10 py-3 rounded-full shadow-lg
      focus:outline-none focus-visible:ring-4
      focus-visible:ring-emerald-200
      focus-visible:ring-offset-2
      btn-hero
    "
  >
  <span>Agendar una reunión</span>
  <svg
    className="w-4 h-4"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden
  >
    <path
      d="M6 4l8 6-8 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</button>

            <button
              onClick={onSecondaryClick}
              className="rounded-full bg-blend-color px-10 py-3 text-sm font-bold text-(--color-titles-color) border-(--color-primary-color) border-2 shadow-sm transition hover:brightness-90 active:scale-[0.99]"
            >
              Conocer más
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}