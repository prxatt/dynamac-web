"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { characterRevealTransition } from "@/lib/tab-widget-motion";

type ScrollCharacterProps = {
  children: ReactNode;
  side: "left" | "right";
  className?: string;
};

export function ScrollCharacter({ children, side, className = "" }: ScrollCharacterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [72, -48]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    side === "right" ? [10, 0, -8] : [-10, 0, 8],
  );

  return (
    <div
      ref={ref}
      className={`pointer-events-none hidden w-44 shrink-0 lg:block lg:w-56 ${className}`}
      aria-hidden
    >
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={characterRevealTransition}
      >
        <motion.div
          className="w-full"
          style={
            reducedMotion
              ? undefined
              : { y, rotate, willChange: inView ? "transform" : "auto" }
          }
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
