// src/components/booking/TimeSlots.jsx
import React from "react";
import { formatShortDay, formatTime } from "./format";
import { focusRing } from "./styles";

const pill = `
  flex items-center justify-center rounded-full border-2
  px-1 py-2.5 sm:px-6 sm:py-3
  font-(family-name:--font-subtitle) text-base font-semibold tabular-nums
  transition-[background-color,border-color,color,transform] duration-150 ease-out
  active:scale-[0.97]
  ${focusRing}
`;

const idlePill = `
  border-(--color-white-primary) bg-white text-(--color-titles-color)
  hover:border-(--color-primary-color)
`;

const chosenPill = "border-(--color-titles-color) bg-(--color-titles-color) text-white";

export default function TimeSlots({
  date,
  slots,
  selected,
  onSelect,
  timeZone,
  loading = false,
  isExample = false,
}) {
  return (
    <div className="mt-8">
      <h3 id="slots-title" className="subtitle-styles text-lg">
        {date ? `Horarios del ${formatShortDay(date)}` : "Horarios"}
      </h3>
      <p className="text-font mt-1 text-sm">
        Se muestran en tu hora local{timeZone ? ` (${timeZone})` : ""}.
        {isExample && " Son horarios de ejemplo."}
      </p>

      {loading ? (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:flex sm:flex-wrap" role="status">
          <span className="sr-only">Cargando horarios…</span>
          {Array.from({ length: 6 }, (_, i) => (
            <span
              key={i}
              className="h-12 animate-pulse rounded-full bg-(--color-white-primary)/40 sm:h-[52px] sm:w-32"
              aria-hidden="true"
            />
          ))}
        </div>
      ) : slots.length ? (
        <div
          role="group"
          aria-labelledby="slots-title"
          className="mt-4 grid grid-cols-3 gap-3 sm:flex sm:flex-wrap"
        >
          {slots.map((slot) => {
            const iso = slot.toISOString();
            return (
              <button
                key={iso}
                type="button"
                onClick={() => onSelect(iso)}
                className={`${pill} ${selected === iso ? chosenPill : idlePill}`}
              >
                {formatTime(slot)}
              </button>
            );
          })}
        </div>
      ) : (
        <p className="text-font mt-4 text-base">
          No quedan horarios este día. Elige otra fecha en el calendario.
        </p>
      )}
    </div>
  );
}
