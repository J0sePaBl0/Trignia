import React from "react";

export default function ProblemCard({ icon, title, desc, highlight }) {
  const IconComponent = typeof icon === "string" ? null : icon;

  return (
    <div className="rounded-2xl bg-white shadow-[0_10px_25px_rgba(0,0,0,0.10)] ring-1 ring-black/5 pb-10">
      <div className="p-6 h-2/3">
        <div className="mx-auto flex h-30 w-30 items-center justify-center rounded-full bg-(--color-white-variant) ">
          {typeof icon === "string" ? (
            <img src={icon} alt="icon" className="h-15 w-15 object-contain" />
          ) : (
            <IconComponent className="h-20 w-20" />
          )}
        </div>

        <h3 className="mt-5 whitespace-pre-line text-center text-m font-semibold text-emerald-700">
          {title}
        </h3>

        <p className="mt-4 mb-4 text-[14px] leading-relaxed text-font-light ">{desc}</p>
      </div>

      <div className="bg-(--color-primary-color) px-5 py-5 h-1/3 ">
        <p className="text-[13px] font-semibold leading-relaxed text-white">{highlight}</p>
      </div>
    </div>
  );
}
