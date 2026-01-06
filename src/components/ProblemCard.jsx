import React from "react";

export default function ProblemCard({ icon: Icon, title, desc, highlight }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-[0_10px_25px_rgba(0,0,0,0.10)] ring-1 ring-black/5">
      <div className="p-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-200 text-emerald-700">
          <Icon className="h-9 w-9" />
        </div>

        <h3 className="mt-5 whitespace-pre-line text-center text-sm font-semibold text-emerald-700">
          {title}
        </h3>

        <p className="mt-4 text-xs leading-relaxed text-gray-500">{desc}</p>
      </div>

      <div className="bg-emerald-700 px-5 py-4">
        <p className="text-[11px] font-semibold leading-relaxed text-white">{highlight}</p>
      </div>
    </div>
  );
}
