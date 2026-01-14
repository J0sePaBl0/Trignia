import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function StatsBar({ stats }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0.5 0"], 
  });

  // Smooth motion values
  const yRaw = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scaleRaw = useTransform(scrollYProgress, [0, 2], [1, 1.50]);

  const y = useSpring(yRaw, { stiffness: 120, damping: 22 });
  const scale = useSpring(scaleRaw, { stiffness: 120, damping: 22 });


  return (
    <motion.div ref={ref} className="flex justify-center h-100">
      <motion.div
        className="mt-10 overflow-hidden rounded-2xl flex justify-center items-center  md:w-3/4 md:h-1/3"
        style={{
          y,
          scale,
          background:
            "linear-gradient(to bottom, rgba(162,212,202,1) 0%, rgba(65,140,126,0.92) 55%, rgba(65,140,126,0.92) 100%)",
        }}
      >
        <div className="grid gap-0 md:grid-cols-4 grid-cols-2 w-full">
          {stats.map((s, idx) => (
            <div
              key={s.label}
              className={[
                "px-6 py-8 text-center text-white",
                idx !== 0 ? "md:border-l md:border-white/15" : "",
              ].join(" ")}
            >
              <div className="md:text-5xl text-4xl font-extrabold tracking-tight">
                {s.value}
              </div>
              <div className="mt-2 text-sm font-semibold text-white/90">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
