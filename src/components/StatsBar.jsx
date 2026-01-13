import React from "react";

export default function StatsBar({ stats }) {
  return (
    <div className="mt-10 overflow-hidden rounded-2xl flex justify-center items-center"
    style={{
        background:
          "linear-gradient(to bottom, rgba(162,212,202,100) 0%, rgba(65,140,126,0.88) 50%, rgba(65,140,126,0.88) 50%",
      }}>
      <div className="grid gap-0 md:grid-cols-4 grid-cols-2">
        {stats.map((s, idx) => (
          <div
            key={s.label}
            className={[
              "px-6 py-8 text-center text-white",
              idx !== 0 ? "md:border-l md:border-white/15" : "",
            ].join(" ")}
          >
            <div className="md:text-5xl text-4xl font-extrabold tracking-tight">{s.value}</div>
            <div className="mt-2 text-s font-semibold text-white/90">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
