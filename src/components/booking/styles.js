// src/components/booking/styles.js
export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-titles-color)";

export const primaryButton = `
  inline-flex items-center justify-center gap-3
  rounded-full px-10 py-3.5
  font-(family-name:--font-subtitle) text-xl font-bold text-white
  bg-linear-to-r from-[#16a34a] via-[#059669] to-[#065f46]
  shadow-[0_18px_40px_-14px_rgba(5,150,105,0.45)]
  transition-[transform,box-shadow,opacity] duration-150 ease-out
  hover:shadow-[0_24px_50px_-14px_rgba(5,150,105,0.55)]
  active:scale-[0.97]
  disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:active:scale-100
  ${focusRing}
`;

export const secondaryButton = `
  inline-flex items-center justify-center gap-2
  rounded-full px-8 py-3
  font-(family-name:--font-subtitle) text-base font-bold text-(--color-titles-color)
  border-2 border-(--color-primary-color)
  transition-[background-color,transform] duration-150 ease-out
  hover:bg-(--color-white-primary)/40
  active:scale-[0.97]
  ${focusRing}
`;

export const textLink = `
  rounded-sm font-semibold text-(--color-titles-color)
  underline decoration-(--color-light-primary) decoration-2 underline-offset-4
  transition-[text-decoration-color] duration-150 ease-out
  hover:decoration-(--color-titles-color)
  ${focusRing}
`;
