"use client";

import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { characterRevealTransition } from "@/lib/tab-widget-motion";

type ScrollIllustrationProps = {
  src: string;
  alt?: string;
  width: number;
  height: number;
  side: "left" | "right";
  className?: string;
  objectPosition?: string;
  imageClassName?: string;
};

export function ScrollIllustration({
  src,
  alt = "",
  width,
  height,
  side,
  className = "",
  objectPosition = "center",
  imageClassName = "",
}: ScrollIllustrationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [48, -32]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    side === "right" ? [6, 0, -5] : [-6, 0, 5],
  );

  return (
    <div
      ref={ref}
      className={`pointer-events-none hidden w-48 shrink-0 lg:block lg:w-60 ${className}`}
      aria-hidden={alt === ""}
    >
      <motion.div
        className="w-full"
        initial={{ opacity: 1, y: 0 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={characterRevealTransition}
      >
        <motion.div
          className="w-full"
          style={reducedMotion ? undefined : { y, rotate }}
        >
          <div className="overflow-hidden rounded-[var(--radius-cards)] border border-[var(--color-hairline-mist)] bg-[var(--color-pure-white)] p-2">
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className={`h-auto w-full object-cover ${imageClassName}`}
              style={{ objectPosition }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
