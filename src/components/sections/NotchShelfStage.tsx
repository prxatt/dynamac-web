"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

type NotchShelfStageProps = {
  children: ReactNode;
  accent: string;
};

/**
 * Visible shelf under notch demos. Scaling lives in ShowcaseFrame
 * so we never double-scale mobile layouts. Notch stays square — no tilt.
 */
export function NotchShelfStage({ children, accent }: NotchShelfStageProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative w-full overflow-visible pb-2 pt-6">
      <motion.div
        className="absolute inset-x-0 bottom-0 top-6 rounded-[var(--radius-glass)] border border-[var(--color-hairline-mist)]"
        style={{
          background: "var(--shelf-gradient)",
          boxShadow: "var(--shadow-shelf)",
        }}
        initial={false}
        whileInView={reducedMotion ? undefined : { y: [14, 0] }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 top-6 rounded-[var(--radius-glass)]"
        style={{
          boxShadow: `inset 0 2px 0 ${accent}40`,
        }}
        aria-hidden
      />

      <div className="relative z-10 flex w-full justify-center overflow-visible px-2 pb-5 pt-2 md:px-4">
        <motion.div
          className="w-full max-w-[47.5rem] overflow-visible"
          initial={false}
          whileInView={reducedMotion ? undefined : { y: [10, 0] }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          <div className="mx-auto w-full min-w-0 overflow-visible">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}
