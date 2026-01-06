import React from "react";

export default function StatsBar({ stats }) {
  return (
    <div className="mt-10 overflow-hidden rounded-2xl bg-emerald-700">
      <div className="grid gap-0 md:grid-cols-4">
        {stats.map((s, idx) => (
          <div
            key={s.label}
            className={[
              "px-6 py-8 text-center text-white",
              idx !== 0 ? "md:border-l md:border-white/15" : "",
            ].join(" ")}
          >
            <div className="text-4xl font-extrabold tracking-tight">{s.value}</div>
            <div className="mt-2 text-xs font-semibold text-white/90">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
