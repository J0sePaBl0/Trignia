import React from 'react'

export default function WhySection() {
  const handleCTAClick = () => {
    const ids = ['contact', 'contacto', 'contact-section', 'contacto-section', 'contacto-form']
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return }
    }
    window.location.href = 'mailto:hola@trignia.com?subject=Agendar%20reunión'
  }

  return (
    <section id='whysection' className="md:py-16 py-8 "
    style={{
        background:
          "linear-gradient(to bottom, rgba(233,245,244,1) 0%, rgba(237,237,237,0.88) 30%, rgba(245,245,245,0.91) 40%, rgba(230,235,232,0.92) 60%, rgba(255,255,255,1) 100%)",
      }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left illustration */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <img src="/images/bot.svg" alt="Ilustración Trignia" className="w-xs md:w-full max-w-sm md:max-w-md h-auto object-contain" />
          </div>

          {/* Right content */}
          <div className="w-full md:w-1/2 flex-col text-left md:justify-baseline justify-center">
            <h2 className="text-2xl md:text-3xl subtitle-styles text-gray-800 mb-4">¿Por qué Trignia?</h2>
            <p className="text-gray-600 mb-4 text-xl text-font">
             Entendemos que cada clínica es diferente, por eso creamos soluciones totalmente personalizadas.
En Trignia analizamos tu operación, diseñamos flujos inteligentes y te acompañamos en la evolución digital de tu clínica.
            </p>
            <p className="text-gray-600 mb-6 text-xl text-font">
              Reúnete con nosotros y descubramos juntos la mejor forma de resolver tus desafíos.
            </p>

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
            background-image: linear-gradient(90deg, #16a34a 0%, #059669 50%, #065f46 100%);
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
          className="mt-6 inline-flex items-center gap-3 text-white font-semibold text-sm md:text-base px-6 py-3 rounded-full shadow-lg transform transition duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 btn-modern"
        >
          <span>Da el paso hacia el mundo moderno AHORA</span>
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M6 4l8 6-8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
          </div>
        </div>
      </div>
    </section>
  )
}
