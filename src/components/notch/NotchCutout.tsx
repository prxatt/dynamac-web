"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { NOTCH_SHOWCASE } from "@/components/notch/notch-showcase";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

type NotchCutoutProps = {
  className?: string;
  /** Idle pulse + stronger hover — for marketing showcase */
  showcase?: boolean;
};

export function NotchCutout({ className = "", showcase = false }: NotchCutoutProps) {
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useReducedMotion();
  const active = showcase && (hovered || !reducedMotion);

  return (
    <motion.div
      className={`relative shrink-0 ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-hidden
    >
      <motion.div
        className="rounded-b-[14px] bg-[var(--color-ink-black)]"
        style={{
          width: NOTCH_SHOWCASE.notchWidth,
          height: NOTCH_SHOWCASE.notchHeight,
        }}
        animate={
          reducedMotion
            ? undefined
            : hovered
              ? {
                  scale: 1.08,
                  boxShadow: "0 0 28px rgba(142,212,98,0.45)",
                }
              : showcase
                ? {
                    scale: [1, 1.03, 1],
                    boxShadow: [
                      "0 0 0px rgba(142,212,98,0)",
                      "0 0 16px rgba(142,212,98,0.22)",
                      "0 0 0px rgba(142,212,98,0)",
                    ],
                  }
                : { scale: 1, boxShadow: "0 0 0px rgba(142,212,98,0)" }
        }
        transition={
          hovered
            ? { type: "spring", visualDuration: 0.35, bounce: 0.22 }
            : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
        }
      />
      {active && hovered && !reducedMotion ? (
        <motion.span
          className="absolute -bottom-1 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-[var(--color-fresh-grass)]"
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 0.75, scaleX: 1 }}
        />
      ) : null}
    </motion.div>
  );
}
