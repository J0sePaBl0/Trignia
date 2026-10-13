// src/services/booking.js
// Servicio de reservas. Por ahora devuelve horarios de ejemplo; al conectar el
// backend, estas dos funciones pasan a llamar /api/availability y /api/bookings
// con el mismo contrato y IS_MOCK pasa a false.
export const IS_MOCK = true;

const EXAMPLE_TIMES = [
  [9, 0],
  [10, 0],
  [11, 30],
  [14, 0],
  [15, 0],
  [16, 30],
];
const HORIZON_DAYS = 45;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ?demo=load-error | empty | slot-taken | submit-error para revisar cada estado
const demo = () => new URLSearchParams(window.location.search).get("demo");

// hash estable para que los horarios de ejemplo no cambien entre recargas
function hash(text) {
  let h = 0;
  for (const char of text) h = (h * 31 + char.charCodeAt(0)) >>> 0;
  return h;
}

// Horarios pedidos por adelantado desde el home, para que agendar abra sin estado de carga
const WARM_MS = 5 * 60 * 1000;
let warm = null;

export function warmAvailability() {
  if (warm && Date.now() - warm.at < WARM_MS) return;
  const entry = { at: Date.now(), result: fetchAvailability() };
  entry.result.catch(() => {
    if (warm === entry) warm = null;
  });
  warm = entry;
}

// Devuelve { slots: string[] }: el inicio de cada horario libre en ISO (UTC).
export function getAvailability() {
  if (warm && Date.now() - warm.at < WARM_MS) {
    const { result } = warm;
    warm = null; // se usa una sola vez; reintentar o recargar siempre pide datos nuevos
    return result;
  }
  return fetchAvailability();
}

async function fetchAvailability() {
  await wait(600);
  if (demo() === "load-error") throw new Error("Failed to load availability");
  if (demo() === "empty") return { slots: [] };

  const slots = [];
  const day = new Date();
  day.setHours(0, 0, 0, 0);

  for (let i = 0; i < HORIZON_DAYS; i++) {
    day.setDate(day.getDate() + 1);
    if (day.getDay() === 0 || day.getDay() === 6) continue;

    const key = day.toDateString();
    if (hash(key) % 6 === 0) continue; // día completo

    for (const [hours, minutes] of EXAMPLE_TIMES) {
      if (hash(`${key} ${hours}:${minutes}`) % 3 === 0) continue; // ya reservado
      slots.push(
        new Date(day.getFullYear(), day.getMonth(), day.getDate(), hours, minutes).toISOString()
      );
    }
  }

  return { slots };
}

// data: { start, timeZone, name, clinic, email, number, note }
// Lanza un Error con code "slot_taken" cuando el horario ya no está libre.
export async function createBooking(data) {
  await wait(900);

  if (demo() === "slot-taken") {
    const error = new Error("Slot already taken");
    error.code = "slot_taken";
    throw error;
  }
  if (demo() === "submit-error") throw new Error("Failed to create booking");

  return { ok: true, start: data.start };
}
