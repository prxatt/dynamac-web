"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { sectionRevealTransition } from "@/lib/tab-widget-motion";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
};

export function SectionReveal({ children, className = "" }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 32 }}
      animate={
        inView
          ? reducedMotion
            ? { opacity: 1 }
            : { opacity: 1, y: 0 }
          : reducedMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 32 }
      }
      transition={sectionRevealTransition}
    >
      {children}
    </motion.div>
  );
}
