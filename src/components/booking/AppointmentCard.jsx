// src/components/booking/AppointmentCard.jsx
import React from "react";
import { AnimatePresence, motion } from "motion/react";

export default function AppointmentCard({
  dateLabel,
  timeLabel,
  name,
  clinic,
  sentLabel = "",
  className = "",
}) {
  const done = Boolean(sentLabel);

  return (
    <aside
      aria-label="Resumen de tu reunión"
      className={`overflow-hidden rounded-2xl bg-white shadow-[0_26px_70px_-20px_rgba(5,150,105,0.28)] ${className}`}
    >
      <div className="bg-(--color-primary-color) px-5 py-4 lg:px-10 lg:py-7">
        <h1 className="title-font text-[clamp(1.625rem,3.1vw,2.75rem)] leading-[1.05] tracking-[-0.02em] text-white">
          Tu reunión con Trignia
        </h1>
      </div>

      <dl className="space-y-3 px-5 py-5 lg:space-y-6 lg:px-10 lg:pt-8 lg:pb-7">
        <CardField label="Fecha" value={dateLabel} placeholder="Elige una fecha" swapKey={dateLabel} />
        <CardField label="Hora" value={timeLabel} placeholder="Elige una hora" swapKey={timeLabel} />
        <CardField
          label="A nombre de"
          value={name}
          detail={clinic}
          placeholder="Tus datos"
          swapKey={name ? "filled" : "empty"}
        />
      </dl>

      {/* Talón: registra la solicitud cuando se envía */}
      <div
        className={`border-t-2 border-dashed border-(--color-white-primary) px-5 py-5 lg:px-10 lg:py-6 ${
          done ? "" : "hidden lg:block"
        }`}
      >
        <p className="text-font text-base leading-relaxed">
          {done
            ? `Solicitud enviada el ${sentLabel}.`
            : "Conversemos sobre tu clínica y la mejor forma de resolver sus desafíos."}
        </p>
      </div>
    </aside>
  );
}

function CardField({ label, value, detail, placeholder, swapKey }) {
  return (
    <div className="flex items-baseline justify-between gap-4 lg:block">
      <dt className="shrink-0 font-(family-name:--font-subtitle) text-sm font-semibold text-(--color-titles-color)">
        {label}
      </dt>
      <dd className="min-w-0 text-right lg:mt-1 lg:text-left">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={swapKey}
            className={`title-font block text-xl leading-[1.15] wrap-break-word lg:text-[clamp(1.75rem,2.6vw,2.375rem)] ${
              value ? "text-(--color-titles-color)" : "text-(--color-primary-color)"
            }`}
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -4, filter: "blur(4px)", transition: { duration: 0.1 } }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            {value || placeholder}
          </motion.span>
        </AnimatePresence>
        {value && detail && (
          <span className="mt-1 block font-(family-name:--font-subtitle) text-base font-semibold text-(--color-text-color) wrap-break-word">
            {detail}
          </span>
        )}
      </dd>
    </div>
  );
}
