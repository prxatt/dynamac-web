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
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -56]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    side === "right" ? [12, 0, -10] : [-12, 0, 10],
  );

  return (
    <div ref={ref} className={`pointer-events-none ${className}`} aria-hidden>
      <motion.div
        className="w-full"
        initial={reducedMotion ? false : { y: 40 }}
        animate={inView ? { y: 0, transition: characterRevealTransition } : undefined}
      >
        <motion.div
          className="w-full"
          style={reducedMotion ? undefined : { y, rotate }}
        >
          <motion.div
            className="w-full"
            animate={
              inView && !reducedMotion
                ? {
                    y: [0, -10, 0],
                    transition: {
                      y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                    },
                  }
                : undefined
            }
          >
            {children}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
