import React from "react";

const IconClock = (props) => (
  <svg viewBox="0 0 24 24" fill="none" className={props.className}>
    <path
      d="M12 8v5l3 2"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  </svg>
);

const IconCalendar = (props) => (
  <svg viewBox="0 0 24 24" fill="none" className={props.className}>
    <path
      d="M7 3v3M17 3v3M4 9h16"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M6 6h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M10.5 13.5l1 1 2.5-3"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconUserHeart = (props) => (
  <svg viewBox="0 0 24 24" fill="none" className={props.className}>
    <path
      d="M12 12a4 4 0 1 0-8 0"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M4 20a6 6 0 0 1 12 0"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M19.5 13.2c-1.1-1.1-2.7-.9-3.5.2-.8-1.1-2.4-1.3-3.5-.2-1.1 1.1-1 2.9.2 4.1l3.3 3 3.3-3c1.2-1.2 1.3-3 .2-4.1Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const IconChartPeople = (props) => (
  <svg viewBox="0 0 24 24" fill="none" className={props.className}>
    <path
      d="M4 20V10M9 20V6M14 20v-8M19 20v-5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M16.5 7.5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M10.5 13.5c.8-1.4 2.2-2.3 3.5-2.3s2.7.9 3.5 2.3"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

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
    desc:
      "Los pacientes olvidan su cita, no responden o simplemente no llegan.",
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
        {/* Title */}
        <h2 className="text-xl font-semibold text-emerald-900">
          ¿Que resuelve Trignia?
        </h2>

        {/* Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-[0_10px_25px_rgba(0,0,0,0.10)] ring-1 ring-black/5"
              >
                <div className="p-6">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-200 text-emerald-700">
                    <Icon className="h-9 w-9" />
                  </div>

                  <h3 className="mt-5 whitespace-pre-line text-center text-sm font-semibold text-emerald-700">
                    {c.title}
                  </h3>

                  <p className="mt-4 text-xs leading-relaxed text-gray-500">
                    {c.desc}
                  </p>
                </div>

                {/* Bottom highlight strip */}
                <div className="bg-emerald-700 px-5 py-4">
                  <p className="text-[11px] font-semibold leading-relaxed text-white">
                    {c.highlight}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats bar */}
        <div className="mt-10 overflow-hidden rounded-2xl bg-emerald-700">
          <div className="grid gap-0 md:grid-cols-4">
            {stats.map((s, idx) => (
              <div
                key={s.label}
                className={[
                  "px-6 py-8 text-center text-white",
                  idx !== 0 ? "md:border-l md:border-white/15" : "",
                ].join(" ")}
              >
                <div className="text-4xl font-extrabold tracking-tight">
                  {s.value}
                </div>
                <div className="mt-2 text-xs font-semibold text-white/90">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
