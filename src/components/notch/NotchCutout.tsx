"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { NOTCH_SHOWCASE } from "@/components/notch/notch-showcase";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

type NotchCutoutProps = {
  className?: string;
  /** Subtle idle presence — for marketing showcase */
  showcase?: boolean;
};

/** Physical notch silhouette. Restraint over glow soup. */
export function NotchCutout({ className = "", showcase = false }: NotchCutoutProps) {
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`relative shrink-0 ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-hidden
    >
      <motion.div
        className="rounded-b-[14px] bg-[var(--color-pure-ink)]"
        style={{
          width: NOTCH_SHOWCASE.notchWidth,
          height: NOTCH_SHOWCASE.notchHeight,
        }}
        animate={
          reducedMotion
            ? undefined
            : hovered
              ? { scale: 1.05, y: 1 }
              : showcase
                ? { scale: [1, 1.02, 1], y: [0, 0.5, 0] }
                : { scale: 1, y: 0 }
        }
        transition={
          hovered
            ? { type: "spring", visualDuration: 0.3, bounce: 0.2 }
            : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
        }
      />
    </motion.div>
  );
}
