"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

export function SunAlbumArt() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative h-[3.25rem] w-[3.25rem] shrink-0" aria-hidden>
      <motion.div
        className="absolute inset-[-8px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(245,226,17,0.4) 0%, rgba(255,154,80,0.18) 50%, transparent 70%)",
        }}
        animate={reducedMotion ? undefined : { scale: [1, 1.1, 1], opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {!reducedMotion ? (
        <motion.div
          className="absolute inset-[-3px] rounded-full opacity-40"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(255,220,80,0.5) 20deg, transparent 40deg, rgba(255,180,60,0.4) 60deg, transparent 80deg)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        />
      ) : null}

      <div
        className="relative h-full w-full overflow-hidden rounded-full ring-2 ring-white/40"
        style={{
          background:
            "radial-gradient(circle at 38% 34%, #fffce8 0%, #ffe566 32%, #ffb347 68%, #ff8c42 100%)",
          boxShadow: "0 2px 16px rgba(255,180,60,0.45), inset 0 -4px 12px rgba(255,120,40,0.2)",
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, transparent 42%, transparent 100%)",
          }}
          animate={reducedMotion ? undefined : { opacity: [0.55, 0.95, 0.55] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-[18%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,248,200,0.9) 0%, rgba(255,220,80,0.4) 70%, transparent 100%)",
          }}
          animate={reducedMotion ? undefined : { scale: [0.9, 1.06, 0.9] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
