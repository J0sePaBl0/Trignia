// src/sections/TestimonialsSection.jsx
import React from "react";
import TestimonialsCarousel from "../TestimonialCarrousel";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      clinicName: "Nombre de la clínica",
      rating: 5,
      text:
        "Texto de testimonio. Puedes hablar de la reducción de tareas manuales, confirmaciones automáticas o mejora en la experiencia del paciente.",
    },
    {
      id: 2,
      clinicName: "Nombre de la clínica",
      rating: 5,
      text:
        "Texto de testimonio. Describe un resultado concreto: menos no-shows, respuestas más rápidas y procesos más ordenados.",
    },
    {
      id: 3,
      clinicName: "Nombre de la clínica",
      rating: 5,
      text:
        "Texto de testimonio. Resalta la personalización: “se adaptó a nuestros procesos y nos acompañaron en todo el lanzamiento”.",
    },
    {
      id: 4,
      clinicName: "Nombre de la clínica",
      rating: 5,
      text:
        "Texto de testimonio. Menciona tranquilidad operativa: “ahora todo fluye y el equipo se enfoca en pacientes”.",
    },
    {
      id: 5,
      clinicName: "Nombre de la clínica",
      rating: 5,
      text:
        "Texto de testimonio. Menciona tranquilidad operativa: “ahora todo fluye y el equipo se enfoca en pacientes”.",
    },
    {
      id: 6,
      clinicName: "Nombre de la clínica",
      rating: 5,
      text:
        "Texto de testimonio. Menciona tranquilidad operativa: “ahora todo fluye y el equipo se enfoca en pacientes”.",
    },
  ];

  return (
    <section id="testimonials" className="relative bg-white overflow-hidden"
    style={{
          background: `linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.80) 30%, rgba(255,255,255,1) 40%, rgba(230,235,232,0.92) 60%, rgba(346,245,244,100) 100%)`,
        }}>
      {/* Bottom gradient (like the screenshot) */}
      <div className="pointer-events-none absolute inset-x-0 "/>

      <div className="relative mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-emerald-600">
          Lo que nuestros clientes dicen
        </h2>

        <div className="mt-10">
          <TestimonialsCarousel items={testimonials} autoPlay={true} />
        </div>
      </div>
    </section>
  );
}
