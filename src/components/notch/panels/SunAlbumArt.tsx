"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

/**
 * Bauhaus sun album tile — flat print blocks, no glow-orb soup.
 * Tied to the demo track “Here Comes the Sun.”
 */
export function SunAlbumArt() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="relative h-[3.25rem] w-[3.25rem] shrink-0 overflow-hidden rounded-[10px] border border-black/15"
      style={{ backgroundColor: "var(--color-primary-yellow)" }}
      aria-hidden
      animate={reducedMotion ? undefined : { scale: [1, 1.02, 1] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <span
        className="absolute top-[16%] left-[16%] h-[46%] w-[46%] rounded-full"
        style={{ backgroundColor: "#fff6c8" }}
      />
      <span
        className="absolute right-[10%] bottom-[12%] h-[24%] w-[36%] rounded-sm"
        style={{ backgroundColor: "var(--color-accent)" }}
      />
      <span
        className="absolute right-[10%] bottom-[12%] h-[11%] w-[18%] -translate-y-[110%] rounded-sm"
        style={{ backgroundColor: "var(--color-primary-blue)" }}
      />
    </motion.div>
  );
}
