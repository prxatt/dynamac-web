"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

type CollageMarkProps = {
  className?: string;
  size?: number;
  /** Entrance motion — off in chrome (nav/footer) so the mark stays quiet. */
  animate?: boolean;
};

/** Quiet geometric mark from Dynamac app-icon DNA (capsule · circle · bar · half-disk). */
export function CollageMark({ className = "", size = 48, animate = true }: CollageMarkProps) {
  const reducedMotion = useReducedMotion();
  const shouldAnimate = animate && !reducedMotion;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden
      initial={false}
      animate={shouldAnimate ? { y: [6, 0], scale: [0.96, 1] } : undefined}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <rect x="18" y="6" width="28" height="8" rx="4" fill="var(--color-ink)" />
      <circle cx="26" cy="30" r="10" fill="var(--color-accent)" />
      <rect x="34" y="20" width="10" height="20" fill="var(--color-primary-blue)" />
      <rect x="14" y="42" width="36" height="8" fill="var(--color-ink)" />
      <path d="M22 50a10 10 0 0 0 20 0H22Z" fill="var(--color-primary-yellow)" />
    </motion.svg>
  );
}
