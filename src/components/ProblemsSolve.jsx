import React from "react";
import {
  IconClock,
  IconCalendar,
  IconUserHeart,
  IconChartPeople,
} from "./Icons";
import ProblemCard from "./ProblemCard";
import StatsBar from "./StatsBar";

const cards = [
  {
    icon: IconClock,
    title: "Gestión manual y\npérdida de tiempo",
    desc:
      "Citas que se agendan por WhatsApp, recordatorios que se olvidan, y procesos que dependen de personas en lugar de sistemas.",
    highlight:
      "Trignia automatiza la agenda, los recordatorios y el seguimiento postconsulta, reduciendo el trabajo operativo hasta un 70%.",
  },
  {
    icon: IconCalendar,
    title: "Citas canceladas o\nno confirmadas",
    desc: "Los pacientes olvidan su cita, no responden o simplemente no llegan.",
    highlight:
      "Nuestros flujos automáticos de WhatsApp y correo confirman y reprograman sin intervención humana, aumentando tus confirmaciones hasta un 40%.",
  },
  {
    icon: IconUserHeart,
    title: "Falta de seguimiento\ny fidelización",
    desc:
      "Después de la consulta, muchos pacientes se pierden por falta de comunicación o seguimiento.",
    highlight:
      "Con Trignia, los flujos postconsulta automatizan mensajes de seguimiento, encuestas y recordatorios de revisión.",
  },
  {
    icon: IconChartPeople,
    title: "Pérdida de clientes\npotenciales",
    desc:
      "Los pacientes escriben fuera del horario laboral o cuando el equipo está ocupado y no reciben respuesta inmediata.",
    highlight:
      "Trignia implementa asistentes inteligentes que responden a los pacientes en tiempo real, ofreciendo atención 24/7 e información precisa al 100%.",
  },
];

const stats = [
  { value: "+40%", label: "En confirmaciones de cita" },
  { value: "3x", label: "Más pacientes recurrentes" },
  { value: "-70%", label: "En tiempo administrativo" },
  { value: "+90%", label: "Satisfacción de pacientes" },
];

export default function ProblemsSection() {
  return (
    <section className="w-full bg-[#f3fbf8]">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-xl font-semibold text-emerald-900">
          ¿Que resuelve Trignia?
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <ProblemCard
              key={c.title}
              icon={c.icon}
              title={c.title}
              desc={c.desc}
              highlight={c.highlight}
            />
          ))}
        </div>

        <StatsBar stats={stats} />
      </div>
    </section>
  );
}
