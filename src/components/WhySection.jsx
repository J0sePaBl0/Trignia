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
    <section className="py-16"
    style={{
        background:
          "linear-gradient(to bottom, rgba(233,245,244,1) 0%, rgba(237,237,237,0.88) 30%, rgba(245,245,245,0.91) 40%, rgba(230,235,232,0.92) 60%, rgba(233,245,244,1) 100%)",
      }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left illustration */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <img src="/bot.svg" alt="Ilustración Trignia" className="w-full max-w-sm md:max-w-md h-auto object-contain" />
          </div>

          {/* Right content */}
          <div className="w-full md:w-1/2 flex-col justify-start text-left">
            <h2 className="text-2xl md:text-3xl subtitle-styles text-gray-800 mb-4">¿Por qué Trignia?</h2>
            <p className="text-gray-600 mb-4 text-xl text-font">
             Entendemos que cada clínica es diferente, por eso creamos soluciones totalmente personalizadas.
En Trignia analizamos tu operación, diseñamos flujos inteligentes y te acompañamos en la evolución digital de tu clínica.
            </p>
            <p className="text-gray-600 mb-6 text-xl text-font">
              Reúnete con nosotros y descubramos juntos la mejor forma de resolver tus desafíos.
            </p>

            <button
              type="button"
              onClick={handleCTAClick}
              aria-label="Agendar"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-300 hover:from-emerald-600 hover:to-emerald-400 text-white font-medium px-6 py-3 rounded-full shadow-md transition-transform duration-200 hover:-translate-y-1"
            >
              Agendar
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
