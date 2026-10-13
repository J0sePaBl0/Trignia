// src/components/booking/BookingForm.jsx
import React, { useEffect, useId, useRef, useState } from "react";
import { focusRing, primaryButton } from "./styles";

const FIELD_ORDER = ["name", "clinic", "email", "number"];

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Por favor ingresa tu nombre.";
  if (!values.clinic.trim()) errors.clinic = "Por favor ingresa el nombre de tu clínica.";
  if (!values.email.trim()) errors.email = "Por favor ingresa tu correo.";
  else if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Por favor ingresa un correo válido.";
  if (!values.number.trim()) errors.number = "Por favor ingresa tu número telefónico.";
  return errors;
}

export default function BookingForm({ values, onChange, onSubmit, onBack, status, focusName = false }) {
  const formId = useId();
  const [errors, setErrors] = useState({});
  const inputs = useRef({});
  const loading = status.type === "loading";

  useEffect(() => {
    if (focusName) inputs.current.name?.focus({ preventScroll: true });
  }, [focusName]);

  const update = (key) => (e) => {
    onChange(key, e.target.value);
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    const found = validate(values);
    setErrors(found);

    const firstInvalid = FIELD_ORDER.find((key) => found[key]);
    if (firstInvalid) {
      inputs.current[firstInvalid]?.focus();
      return;
    }
    onSubmit();
  };

  const field = (key) => ({
    id: `${formId}-${key}`,
    value: values[key],
    onChange: update(key),
    error: errors[key],
    inputRef: (el) => {
      inputs.current[key] = el;
    },
  });

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className={`-ml-2 inline-flex items-center gap-2 rounded-full px-2 py-2 font-(family-name:--font-subtitle) text-sm font-semibold text-(--color-titles-color) transition-[background-color] duration-150 ease-out hover:bg-(--color-white-primary)/50 ${focusRing}`}
      >
        <svg className="h-4 w-4 rotate-180" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M6 4l8 6-8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Cambiar fecha u hora
      </button>

      <h2 id="details-title" className="subtitle-styles mt-3 text-2xl">
        Tus datos
      </h2>

      <form onSubmit={handleSubmit} noValidate className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field {...field("name")} label="Nombre" placeholder="Tu nombre" autoComplete="name" required />
        <Field {...field("clinic")} label="Clínica" placeholder="Nombre de tu clínica" autoComplete="organization" required />
        <Field {...field("email")} label="Correo" type="email" placeholder="tu@correo.com" autoComplete="email" required />
        <Field {...field("number")} label="Número telefónico" type="tel" placeholder="70878938" autoComplete="tel" required />
        <Field
          {...field("note")}
          label="Nota (opcional)"
          textarea
          rows={3}
          maxLength={500}
          placeholder="¿Qué te gustaría resolver en tu clínica?"
          className="sm:col-span-2"
        />

        <div className="sm:col-span-2">
          {status.type === "error" && (
            <div
              className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
              role="alert"
            >
              {status.msg}
            </div>
          )}

          <button type="submit" disabled={loading} className={`${primaryButton} w-full sm:w-auto`}>
            {loading ? "Enviando..." : "Agendar reunión"}
          </button>

          <p className="text-font mt-4 text-sm">
            Al enviar, aceptas que te contactemos para responder tu solicitud.
          </p>
        </div>
      </form>
    </div>
  );
}

function Field({ id, label, error, inputRef, textarea = false, className = "", ...props }) {
  const Tag = textarea ? "textarea" : "input";

  return (
    <div className={`space-y-2 ${className}`}>
      <label
        htmlFor={id}
        className="block font-(family-name:--font-subtitle) text-sm font-semibold text-(--color-titles-color)"
      >
        {label}
      </label>

      <Tag
        id={id}
        ref={inputRef}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="
          block w-full rounded-2xl border border-(--color-light-primary) bg-white
          px-4 py-3 text-slate-900 caret-(--color-primary-color)
          outline-none transition-[border-color,box-shadow] duration-150 ease-out
          placeholder:text-slate-500
          focus:border-(--color-titles-color) focus:ring-4 focus:ring-emerald-200/60
          aria-invalid:border-rose-500
        "
        {...props}
      />

      {error && (
        <p id={`${id}-error`} className="text-sm text-rose-700">
          {error}
        </p>
      )}
    </div>
  );
}
