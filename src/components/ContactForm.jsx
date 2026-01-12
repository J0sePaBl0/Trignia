// src/components/ContactForm.jsx
import React, { useId, useState } from "react";

export default function ContactForm({
  onSubmit,
  scheduleHref = "#",
  accentHex = "#10b981", // emerald vibe
}) {
  const formId = useId();
  const [status, setStatus] = useState({ type: "idle", msg: "" });
  const [values, setValues] = useState({
    nombre: "",
    clinica: "",
    correo: "",
    telefono: "",
    asunto: "",
  });

  const update = (key) => (e) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const validate = () => {
    if (!values.nombre.trim()) return "Por favor ingresa tu nombre.";
    if (!values.clinica.trim()) return "Por favor ingresa el nombre de tu clínica.";
    if (!values.correo.trim()) return "Por favor ingresa tu correo.";
    // simple email check
    if (!/^\S+@\S+\.\S+$/.test(values.correo)) return "Por favor ingresa un correo válido.";
    if (!values.telefono.trim()) return "Por favor ingresa tu número telefónico.";
    if (!values.asunto.trim()) return "Por favor ingresa el asunto.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setStatus({ type: "error", msg: err });
      return;
    }

    setStatus({ type: "loading", msg: "Enviando..." });

    try {
      // If parent provides onSubmit, use it. Otherwise fall back to mailto.
      if (onSubmit) {
        await onSubmit(values);
      } else {
        const subject = encodeURIComponent(`Trignia — ${values.asunto}`);
        const body = encodeURIComponent(
          `Nombre: ${values.nombre}\nClínica: ${values.clinica}\nCorreo: ${values.correo}\nTeléfono: ${values.telefono}\nAsunto: ${values.asunto}\n`
        );
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
      }

      setStatus({ type: "success", msg: "¡Listo! Recibimos tu mensaje." });
      setValues({ nombre: "", clinica: "", correo: "", telefono: "", asunto: "" });
    } catch (error) {
      setStatus({
        type: "error",
        msg: "Hubo un error al enviar. Intenta de nuevo.",
      });
    }
  };

  return (
     <section className="relative overflow-hidden">
  {/* Flipped background image */}
  <div
    className="
      absolute inset-0
      -scale-x-100
      bg-no-repeat
      bg-right
      bg-fixed
    "
    style={{
      backgroundImage: "url('/images/formImage.jpeg')",
    }}
  />
      <div className="w-full h-full relative"
      style={{
          background: `linear-gradient(to left, rgba(233,245,244,100) 0%, rgba(237,237,237,0.90) 30%, rgba(245,245,245,0.98) 40%, rgba(230,235,232,0.95) 60%, rgba(346,245,244,0.80) 100%)`,
        }}>
      {/* Subtle background blobs (match page colors) */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full  blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-16 justify-center flex">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center w-7xl">
          {/* Left copy */}
          <div className="flex-col text-start">
            <h2 className="text-3xl md:text-4xl font-semibold text-emerald-600">
              Contáctanos
            </h2>
            <p className="mt-4 leading-relaxed max-w-lg text-font-strong text-(--color-text-color) sm:text-lg md:text-xl">
              Cuéntanos sobre tu clínica y lo que necesitas. Te responderemos lo
              antes posible para ayudarte a encontrar la mejor solución.
            </p>

            <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6">
              <p className="text-slate-800 font-medium">
                ¿Quieres agendar una cita con nosotros?
              </p>
              <p className="mt-2 text-slate-600 text-sm">
                Agenda una reunión y conversemos sobre tus retos y oportunidades.
              </p>

              <a
                href={scheduleHref}
                className="mt-4 inline-flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-800 transition"
              >
                Agendar
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Form card */}
          <div className="rounded-3xl border border-emerald-100 bg-white shadow-[0_18px_60px_-30px_rgba(15,23,42,0.25)]">
            <div className="p-7 sm:p-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">
                  Envíanos un mensaje
                </h3>
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: accentHex }}
                  aria-hidden="true"
                />
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <Field
                  id={`${formId}-nombre`}
                  label="Nombre"
                  value={values.nombre}
                  onChange={update("nombre")}
                  placeholder="Tu nombre"
                  autoComplete="name"
                />

                <Field
                  id={`${formId}-clinica`}
                  label="Clínica"
                  value={values.clinica}
                  onChange={update("clinica")}
                  placeholder="Nombre de tu clínica"
                />

                <Field
                  id={`${formId}-correo`}
                  label="Correo"
                  type="email"
                  value={values.correo}
                  onChange={update("correo")}
                  placeholder="tu@correo.com"
                  autoComplete="email"
                />

                <Field
                  id={`${formId}-telefono`}
                  label="Número telefónico"
                  type="tel"
                  value={values.telefono}
                  onChange={update("telefono")}
                  placeholder="+506 8888 8888"
                  autoComplete="tel"
                />

                <Field
                  id={`${formId}-asunto`}
                  label="Asunto"
                  value={values.asunto}
                  onChange={update("asunto")}
                  placeholder="¿En qué te podemos ayudar?"
                />

                {status.type !== "idle" && (
                  <div
                    className={[
                      "rounded-xl px-4 py-3 text-sm",
                      status.type === "success"
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : status.type === "error"
                        ? "bg-rose-50 text-rose-700 border border-rose-200"
                        : "bg-slate-50 text-slate-600 border border-slate-200",
                    ].join(" ")}
                    role="status"
                    aria-live="polite"
                  >
                    {status.msg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status.type === "loading"}
                  className="
                    w-full rounded-2xl px-5 py-3 font-semibold text-white
                    shadow-sm transition
                    bg-emerald-600 hover:bg-emerald-700
                    disabled:opacity-60 disabled:cursor-not-allowed
                  "
                >
                  {status.type === "loading" ? "Enviando..." : "Enviar"}
                </button>

                <p className="text-xs text-slate-500 text-center">
                  Al enviar, aceptas que te contactemos para responder tu solicitud.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-medium text-(--color-primary-color) justify-baseline flex"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="
          w-full rounded-2xl border border-slate-200 bg-white
          px-4 py-3 text-slate-900
          outline-none transition
          placeholder:text-slate-400
          focus:border-emerald-400 focus:ring-4 focus:ring-emerald-200/40
        "
      />
    </div>
  );
}
