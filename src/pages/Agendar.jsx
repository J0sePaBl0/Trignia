// src/pages/Agendar.jsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import AppointmentCard from "../components/booking/AppointmentCard";
import BookingCalendar from "../components/booking/BookingCalendar";
import BookingForm from "../components/booking/BookingForm";
import TimeSlots from "../components/booking/TimeSlots";
import {
  cap,
  dayKey,
  formatDay,
  formatTime,
  fromDayKey,
  startOfMonth,
  timeZoneLabel,
} from "../components/booking/format";
import { focusRing, primaryButton, secondaryButton, textLink } from "../components/booking/styles";
import { IS_MOCK, createBooking, getAvailability } from "../services/booking";

const PAGE_BACKGROUND =
  "linear-gradient(to bottom, rgb(233,245,244) 0%, rgb(239,241,240) 30%, rgb(245,245,245) 45%, rgb(232,238,235) 75%, rgb(233,245,244) 100%)";

const CONTACT_EMAIL = "hola@trignia.com";
const CONTACT_HREF = `mailto:${CONTACT_EMAIL}?subject=Agendar%20reunión`;

const EMPTY_VALUES = { name: "", clinic: "", email: "", number: "", note: "" };

export default function Agendar() {
  const [load, setLoad] = useState("loading"); // loading | ready | error
  const [days, setDays] = useState({}); // { "2026-10-13": [Date, ...] }
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const [day, setDay] = useState("");
  const [slot, setSlot] = useState("");
  const [step, setStep] = useState("schedule"); // schedule | details | done
  const [values, setValues] = useState(EMPTY_VALUES);
  const [status, setStatus] = useState({ type: "idle", msg: "" });
  const [notice, setNotice] = useState("");
  const [sentAt, setSentAt] = useState(null);
  const returning = useRef(false);
  const timeZone = useMemo(() => timeZoneLabel(), []);
  // Con mouse el foco va directo al primer campo; en pantallas táctiles no, para no abrir el teclado
  const finePointer = useMemo(() => window.matchMedia("(pointer: fine)").matches, []);

  const loadAvailability = useCallback(async () => {
    setLoad("loading");
    try {
      const { slots } = await getAvailability();
      const grouped = {};
      for (const iso of [...slots].sort()) {
        const date = new Date(iso);
        (grouped[dayKey(date)] ||= []).push(date);
      }
      setDays(grouped);
      setLoad("ready");
      return grouped;
    } catch {
      setLoad("error");
      return null;
    }
  }, []);

  // Carga los horarios y abre el calendario en el primer día con espacio
  const init = useCallback(async () => {
    const grouped = await loadAvailability();
    const first = grouped && Object.keys(grouped).sort()[0];
    if (first) {
      setDay(first);
      setMonth(startOfMonth(fromDayKey(first)));
    }
  }, [loadAvailability]);

  useEffect(() => {
    document.title = "Agendar una reunión | Trignia";
    document.documentElement.lang = "es";
    init();
  }, [init]);

  const openDays = useMemo(() => Object.keys(days).sort(), [days]);
  const minMonth = useMemo(() => startOfMonth(new Date()), []);
  const maxMonth = openDays.length ? startOfMonth(fromDayKey(openDays[openDays.length - 1])) : minMonth;

  const dayDate = day ? fromDayKey(day) : null;
  const slotDate = slot ? new Date(slot) : null;
  const dateLabel = dayDate ? cap(formatDay(dayDate)) : "";
  const timeLabel = slotDate ? formatTime(slotDate) : "";

  const selectDay = (key) => {
    setDay(key);
    setSlot("");
    setNotice("");
  };

  // Elegir un horario pasa directo a los datos
  const selectSlot = (iso) => {
    setSlot(iso);
    setNotice("");
    setStep("details");
  };

  const backToSchedule = () => {
    returning.current = true;
    setSlot("");
    setStatus({ type: "idle", msg: "" });
    setStep("schedule");
  };

  const handleSubmit = async () => {
    setStatus({ type: "loading", msg: "" });

    try {
      await createBooking({
        start: slot,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        ...values,
      });
      setStatus({ type: "idle", msg: "" });
      setSentAt(new Date());
      setStep("done");
    } catch (error) {
      if (error?.code === "slot_taken") {
        backToSchedule();
        setNotice("Ese horario acaba de ocuparse. Elige otro; tus datos siguen guardados.");
        loadAvailability();
        return;
      }
      setStatus({
        type: "error",
        msg: `No pudimos enviar tu solicitud. Inténtalo de nuevo o escríbenos a ${CONTACT_EMAIL}.`,
      });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="min-h-screen text-left text-(--color-text-color) selection:bg-(--color-white-primary) selection:text-(--color-titles-color)"
        style={{ background: PAGE_BACKGROUND }}
      >
        <header className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Principal"
            className="flex items-center justify-between rounded-full border border-white/60 bg-white/75 px-4 py-1.5 shadow-[0_12px_40px_-26px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:px-6"
          >
            <a href="/" className={`rounded-full ${focusRing}`}>
              <img
                src="/images/trignia_logo3.webp"
                alt="Trignia, ir al inicio"
                width="104"
                height="52"
                className="h-13 w-26"
              />
            </a>
            <a
              href="/"
              className={`rounded-full px-2 py-1 font-(family-name:--font-subtitle) text-sm font-semibold text-slate-700 transition-[color] duration-150 ease-out hover:text-emerald-700 ${focusRing}`}
            >
              Volver al inicio
            </a>
          </nav>
        </header>

        <main className="mx-auto max-w-6xl px-4 pt-6 pb-16 sm:px-6 lg:px-8 lg:pt-11 lg:pb-24">
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,13fr)_minmax(0,14fr)] lg:items-start lg:gap-20">
            <AppointmentCard
              dateLabel={dateLabel}
              timeLabel={timeLabel}
              name={values.name.trim()}
              clinic={values.clinic.trim()}
              sentLabel={sentAt ? formatDay(sentAt) : ""}
              className="lg:sticky lg:top-8"
            />

            <div className={step === "done" ? "max-lg:order-first" : ""}>
              <p className="sr-only" aria-live="polite">
                {slotDate ? `Seleccionaste ${formatDay(slotDate)}, ${timeLabel}` : ""}
              </p>

              <AnimatePresence mode="wait" initial={false}>
                {step === "schedule" && (
                  <StepSection key="schedule" aria-label="Fecha y hora" arrive={returning.current}>
                    {notice && (
                      <div
                        className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
                        role="alert"
                      >
                        {notice}
                      </div>
                    )}

                    {load === "error" ? (
                      <div role="alert">
                        <h2 className="subtitle-styles text-2xl">No pudimos cargar los horarios</h2>
                        <p className="text-font mt-3 max-w-md text-lg leading-relaxed">
                          Revisa tu conexión e inténtalo de nuevo. Si el problema sigue, escríbenos a{" "}
                          <a href={CONTACT_HREF} className={textLink}>
                            {CONTACT_EMAIL}
                          </a>
                          .
                        </p>
                        <button type="button" onClick={init} className={`${secondaryButton} mt-6`}>
                          Reintentar
                        </button>
                      </div>
                    ) : load === "ready" && !openDays.length ? (
                      <div>
                        <h2 className="subtitle-styles text-2xl">No hay horarios disponibles por ahora</h2>
                        <p className="text-font mt-3 max-w-md text-lg leading-relaxed">
                          Escríbenos y coordinamos tu reunión por correo.
                        </p>
                        <a href={CONTACT_HREF} className={`${primaryButton} mt-6`}>
                          Escribir a {CONTACT_EMAIL}
                        </a>
                      </div>
                    ) : (
                      <>
                        <BookingCalendar
                          month={month}
                          days={days}
                          selected={day}
                          onSelect={selectDay}
                          onMonthChange={setMonth}
                          minMonth={minMonth}
                          maxMonth={maxMonth}
                          loading={load === "loading"}
                        />
                        <TimeSlots
                          date={dayDate}
                          slots={days[day] || []}
                          selected={slot}
                          onSelect={selectSlot}
                          timeZone={timeZone}
                          loading={load === "loading"}
                          isExample={IS_MOCK}
                        />
                      </>
                    )}
                  </StepSection>
                )}

                {step === "details" && (
                  <StepSection key="details" aria-labelledby="details-title" arrive focusSelf={!finePointer}>
                    <BookingForm
                      values={values}
                      onChange={(key, value) => setValues((prev) => ({ ...prev, [key]: value }))}
                      onSubmit={handleSubmit}
                      onBack={backToSchedule}
                      status={status}
                      focusName={finePointer}
                    />
                  </StepSection>
                )}

                {step === "done" && (
                  <StepSection key="done" aria-labelledby="done-title" arrive>
                    <svg className="h-12 w-12 text-(--color-titles-color)" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" />
                      <path
                        d="M15 24.5l6.5 6.5L33 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <h2 id="done-title" className="subtitle-styles mt-5 text-2xl md:text-3xl">
                      Recibimos tu solicitud
                    </h2>
                    <p className="text-font mt-3 max-w-md text-lg leading-relaxed">
                      Solicitaste una reunión para el {slotDate ? formatDay(slotDate) : ""} a las {timeLabel}
                      {/* "p. m." ya cierra la frase con su punto */}
                      {timeLabel.endsWith(".") ? " " : ". "}
                      Te escribiremos a{" "}
                      <strong className="font-bold text-(--color-titles-color) wrap-anywhere">
                        {values.email.trim()}
                      </strong>{" "}
                      con los detalles.
                    </p>
                    <a href="/" className={`${secondaryButton} mt-8`}>
                      Volver al inicio
                    </a>
                  </StepSection>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
    </MotionConfig>
  );
}

// Cada paso entra con una transición corta; al llegar desde otro paso vuelve
// arriba y recibe el foco (salvo que el formulario lo lleve a su primer campo).
function StepSection({ arrive = false, focusSelf = true, children, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!arrive) return;
    if (focusSelf) ref.current?.focus({ preventScroll: true });
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }, [arrive, focusSelf]);

  return (
    <motion.section
      ref={ref}
      tabIndex={-1}
      className="outline-none"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } }}
      exit={{ opacity: 0, transition: { duration: 0.12 } }}
      {...props}
    >
      {children}
    </motion.section>
  );
}
