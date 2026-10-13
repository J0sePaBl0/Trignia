// src/components/booking/BookingCalendar.jsx
import React from "react";
import { cap, dayKey, formatDay, formatMonth } from "./format";
import { focusRing } from "./styles";

const WEEKDAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const cell = `
  relative flex h-11 sm:h-[50px] items-center justify-center rounded-full
  font-(family-name:--font-subtitle) text-base sm:text-lg tabular-nums
`;

const openCell = `
  ${cell}
  cursor-pointer font-semibold text-(--color-titles-color) bg-(--color-white-primary)/40
  transition-[background-color,color,transform] duration-150 ease-out
  hover:bg-(--color-white-primary)/80
  active:scale-[0.97]
  has-[:checked]:bg-(--color-titles-color) has-[:checked]:text-white
  has-[:checked]:hover:bg-(--color-titles-color)
  has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2
  has-[:focus-visible]:outline-(--color-titles-color)
`;

export default function BookingCalendar({
  month,
  days,
  selected,
  onSelect,
  onMonthChange,
  minMonth,
  maxMonth,
  loading = false,
}) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const offset = (new Date(year, monthIndex, 1).getDay() + 6) % 7; // la semana inicia en lunes
  const total = new Date(year, monthIndex + 1, 0).getDate();
  const todayKey = dayKey(new Date());

  const shift = (by) => onMonthChange(new Date(year, monthIndex + by, 1));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 id="calendar-title" className="subtitle-styles text-2xl" aria-live="polite">
          {formatMonth(month)}
        </h2>
        <div className="flex gap-1">
          <MonthButton label="Mes anterior" disabled={month <= minMonth} onClick={() => shift(-1)} flip />
          <MonthButton label="Mes siguiente" disabled={month >= maxMonth} onClick={() => shift(1)} />
        </div>
      </div>

      <div
        className="mt-4 grid grid-cols-7 gap-1.5 text-center font-(family-name:--font-subtitle) text-sm font-semibold"
        aria-hidden="true"
      >
        {WEEKDAYS.map((name) => (
          <span key={name}>{name}</span>
        ))}
      </div>

      <div
        role="radiogroup"
        aria-labelledby="calendar-title"
        aria-busy={loading}
        className="mt-2 grid grid-cols-7 gap-1.5"
      >
        {Array.from({ length: offset }, (_, i) => (
          <span key={`blank-${i}`} />
        ))}

        {Array.from({ length: total }, (_, i) => {
          const date = new Date(year, monthIndex, i + 1);
          const key = dayKey(date);
          const count = days[key]?.length || 0;
          const today = key === todayKey ? "ring-1 ring-inset ring-(--color-light-primary)" : "";

          if (loading || !count) {
            return (
              <span
                key={key}
                className={`${cell} font-medium text-(--color-primary-color)/65 ${today}`}
                aria-hidden="true"
              >
                {i + 1}
              </span>
            );
          }

          return (
            <label key={key} className={`${openCell} ${today}`}>
              <input
                type="radio"
                name="booking-day"
                className="sr-only"
                checked={selected === key}
                onChange={() => onSelect(key)}
                aria-label={`${cap(formatDay(date))}, ${count} ${count === 1 ? "horario" : "horarios"}`}
              />
              {i + 1}
            </label>
          );
        })}
      </div>
    </div>
  );
}

function MonthButton({ label, disabled, onClick, flip = false }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`
        flex h-11 w-11 items-center justify-center rounded-full text-(--color-titles-color)
        transition-[background-color,transform,opacity] duration-150 ease-out
        hover:bg-(--color-white-primary)/50
        active:scale-[0.97]
        disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:active:scale-100
        ${focusRing}
      `}
    >
      <svg className={`h-5 w-5 ${flip ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M6 4l8 6-8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
