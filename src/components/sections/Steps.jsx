import React from 'react'

export default function Steps() {
  return (
    <section className="h-full py-20 bg-linear-to-b  from-emerald-50 to-white"style={{
        background:
          "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(237,237,237,0.88) 30%, rgba(245,245,245,0.91) 40%, rgba(230,235,232,0.92) 60%, rgba(233,245,244,1) 100%)",
      }}>
        <div className="mt-10 mb-50 text-center title-font text-3xl md:text-4xl font-bold subtitle-styles">
        <h1 className="text-3xl md:text-4xl title-font px-4">NO TE QUEDES ATRÁS. EL FUTURO CLÍNICO YA COMENZÓ.</h1>
        <style>{`
          @keyframes bgMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes floatY {
            0% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0); }
          }
          .btn-modern {
           
            background-size: 200% 100%;
            animation: bgMove 2s linear infinite, floatY 2s ease-in-out infinite, ease-in-out infinite;
            will-change: transform, box-shadow, background-position;
          }
          .btn-modern:hover {
            animation-play-state: paused, paused, paused;
            smooth: transform 0.2s ease-in-out;
            transform: translateY(-8px) scale(1.03) !important;
            box-shadow: 0 30px 60px rgba(5,150,105,0.18) !important;
          }
          .btn-modern:active { transform: translateY(-4px) scale(1.02) !important; }
        `}</style>

        <button
          type="button"
          aria-label="Agenda tu consultoría gratuita"
          onClick={() => {
            const ids = ['contact', 'contacto', 'contact-section', 'contacto-section', 'contacto-form']
            for (const id of ids) {
              const el = document.getElementById(id)
              if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return }
            }
            window.location.href = 'mailto:hola@trignia.com?subject=Consultoría%20gratuita'
          }}
          className="mt-6 inline-flex items-center gap-3 text-white font-semibold text-sm md:text-base px-6 py-3 rounded-full shadow-lg transform transition duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 bg-linear-to-r from-emerald-600 to-emerald-700 btn-modern"
        >
          <span>Agenda tu consultoría GRATUITA</span>
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M6 4l8 6-8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="max-w-6xl mx-auto px-6 pb-5">
        <h2 className="text-2xl font-bold subtitle-styles mb-12">Como funciona</h2>

        <div className="relative">
          {/* cross lines */}
          <div className="absolute inset-0 flex items-center" aria-hidden>
            <div className="w-full h-0.5 bg-(--color-secondary-color)" />
          </div>
          <div className="absolute inset-0 flex justify-center" aria-hidden>
            <div className="h-full w-0.5 bg-(--color-secondary-color)" />
          </div>

          {/* grid */}
          <div className="grid grid-cols-2 gap-12 text-left">
            <div className="pr-8">
              <div className="text-4xl font-extrabold flex row subtitles2-styles">1
                <h3 className="ml-5 mt-2 text-3xl font-semibold">Diagnóstico</h3>
              </div>
              <p className="mt-3 text-gray-600 text-wrap flex max-w-sm text-lg ">
                Analizamos cómo funciona tu clínica hoy: agenda, comunicación, procesos y puntos de fricción.
              </p>
            </div>

            <div className="pl-8 text-right flex-col justify-end">
              <div className="text-4xl font-extrabold subtitles2-styles flex row justify-end ">2
                <h3 className="mt-2 text-3xl font-semibold ml-5">Diseño</h3>
              </div>
              <p className="mt-3 text-gray-600 text-wrap flex max-w-sm ml-auto text-lg">
                Definimos flujos, automatizaciones y comportamientos de IA adaptados a tus necesidades específicas.
              </p>
            </div>

            <div className="pr-8 text-left pt-15 md:pt-12">
              <div className="text-4xl font-extrabold subtitles2-styles flex">3
                <h3 className="mt-2 text-3xl font-semibold  ml-5">Implementación</h3>
              </div>
              <p className="mt-3 text-gray-600 text-wrap flex max-w-sm text-lg">
                Construimos e integramos la solución con tus herramientas actuales (Siku, agenda, WhatsApp, correo, etc.).
              </p>
            </div>

            <div className="pl-8 text-right pt-15 md:pt-12">
              <div className="text-4xl font-extrabold subtitles2-styles flex justify-end ">4
                <h3 className="mt-2 text-3xl font-semibold text-emerald-700 ml-5">Optimización</h3>
              </div>
              <p className="mt-3 text-gray-600 text-wrap flex max-w-sm ml-auto text-lg">
                Ponemos todo en marcha, medimos resultados y optimizamos continuamente según datos reales.
              </p>
            </div>
          </div>

          {/* center circle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-25 h-25 md:w-36 md:h-36 rounded-full bg-white border-4 border-emerald-200 shadow-md flex items-center justify-center">
              <img src="/icons/conexion.gif" alt="icon" className="h-15 w-15 md:h-25 md:w-25 object-contain" />
            </div>
          </div>
        </div>
      </div>
      
    </section>
  )
}
