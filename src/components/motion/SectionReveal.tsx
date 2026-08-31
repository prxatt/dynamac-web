"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { sectionRevealTransition } from "@/lib/tab-widget-motion";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
};

function isElementInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
}

export function SectionReveal({ children, className = "" }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const reducedMotion = useReducedMotion();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    const el = ref.current;
    if (!el || isElementInViewport(el)) return;

    setAnimate(true);
  }, [reducedMotion]);

  if (!animate || reducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={sectionRevealTransition}
    >
      {children}
    </motion.div>
  );
}
