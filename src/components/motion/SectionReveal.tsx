"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { sectionRevealTransition } from "@/lib/tab-widget-motion";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
};

/** Scroll reveal — transform only so content stays visible on first paint. */
export function SectionReveal({ children, className = "" }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ y: 28 }}
      animate={inView ? { y: 0 } : { y: 28 }}
      transition={sectionRevealTransition}
    >
      {children}
    </motion.div>
  );
}
