import React from "react";

export default function Hero({
  videoSrc = "/videos/hero.mp4",
  onPrimaryClick,
  onSecondaryClick,
}) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
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
      <div className="absolute inset-0 flex items-center px-6 py-16">
        <div className="w-full text-center">
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
              onClick={onPrimaryClick}
              className="rounded-full bg-(--color-primary-color) px-10 py-3 text-sm font-bold text-white shadow-sm transition hover:brightness-90 active:scale-[0.99]"
            >
              Agendar una reunión
            </button>

            <button
              onClick={onSecondaryClick}
              className="rounded-full bg-blend-color px-10 py-3 text-sm font-bold text-(--color-titles-color) border-(--color-primary-color) border-2 shadow-sm transition hover:brightness-90 active:scale-[0.99]"
            >
              Conocer más
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}