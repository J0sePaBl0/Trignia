// src/components/ProblemCard.jsx
import React from "react";
import { motion } from "motion/react";

export default function ProblemCard({ icon, title, desc, highlight, index = 0 }) {
  const IconComponent = typeof icon === "string" ? null : icon;

  return (
    <motion.div
      className="rounded-2xl bg-white/90 ring-1 ring-black/5 overflow-hidden backdrop-blur-[2px] pb-10  md:w-full"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      variants={cardVariants}
      custom={index}
      whileHover="hover"
    >
      {/* Subtle shadow layer (keeps it clean) */}
      <motion.div
        className="shadow-[0_10px_25px_rgba(0,0,0,0.10)]"
        variants={shadowVariants}
      >
        <div className="p-6">
          <motion.div
            className="mx-auto flex h-30 w-30 items-center justify-center rounded-full bg-(--color-white-variant)"
            variants={iconWrapVariants}
          >
            {typeof icon === "string" ? (
              <img src={icon} alt="icon" className="h-15 w-15 object-contain" />
            ) : (
              <IconComponent className="h-20 w-20" />
            )}
          </motion.div>

          <h3 className="mt-5 whitespace-pre-line text-center text-xl font-semibold text-emerald-700">
            {title}
          </h3>

          <p className="mt-4 mb-8 text-[16px] leading-relaxed text-font-light">
            {desc}
          </p>
        </div>

        {/* Highlight area */}
        <motion.div
          className="bg-(--color-primary-color) px-5 py-5"
          variants={highlightVariants}
        >
          <p className="text-[17px] font-semibold leading-relaxed text-white">
            {highlight}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/** Variants (soft + modern) */
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.985,
    filter: "blur(10px)",
  },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.10,
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1], // smoother, more "premium"
    },
  }),
  hover: {
    y: -8,
    scale: 1.01,
    transition: { duration: 0.22, ease: [0.2, 0.9, 0.2, 1] },
  },
};

const shadowVariants = {
  hidden: { boxShadow: "0 10px 25px rgba(0,0,0,0.10)" },
  show: { boxShadow: "0 14px 40px rgba(2,6,23,0.10)" },
  hover: { boxShadow: "0 26px 70px rgba(5,150,105,0.20)" },
};

const iconWrapVariants = {
  hidden: {
    opacity: 0,
    scale: 0.82,
    rotate: -8,
    y: 8,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 18,
      mass: 0.6,
      delay: 0.06, // comes right after the card starts
    },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.18, ease: "easeOut" },
  },
};

const highlightVariants = {
  hidden: {
    opacity: 0,
    y: 14,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.18,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  hover: { opacity: 1 },
};
