// src/components/booking/format.js
const LOCALE = "es";

const weekdayFmt = new Intl.DateTimeFormat(LOCALE, { weekday: "long" });
const monthFmt = new Intl.DateTimeFormat(LOCALE, { month: "long" });
const timeFmt = new Intl.DateTimeFormat(LOCALE, {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export const cap = (text) => text.charAt(0).toUpperCase() + text.slice(1);

// "2026-10-13" en hora local
export function dayKey(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function fromDayKey(key) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

// "martes 13 de octubre"
export function formatDay(date) {
  return `${weekdayFmt.format(date)} ${date.getDate()} de ${monthFmt.format(date)}`;
}

// "martes 13"
export function formatShortDay(date) {
  return `${weekdayFmt.format(date)} ${date.getDate()}`;
}

// "Octubre 2026"
export function formatMonth(date) {
  return `${cap(monthFmt.format(date))} ${date.getFullYear()}`;
}

// "10:00 a. m."
export function formatTime(date) {
  return timeFmt.format(date);
}

// "hora estándar central"
export function timeZoneLabel() {
  const part = new Intl.DateTimeFormat(LOCALE, { timeZoneName: "long" })
    .formatToParts(new Date())
    .find((p) => p.type === "timeZoneName");
  return part ? part.value : "";
}
