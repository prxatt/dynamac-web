"use client";

import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { characterRevealTransition } from "@/lib/tab-widget-motion";
import type { TabIllustrationConfig } from "@/lib/illustrations";

type CharacterFigureProps = {
  config: TabIllustrationConfig;
  side?: "left" | "right";
  className?: string;
  imageClassName?: string;
};

export function CharacterFigure({
  config,
  side = "right",
  className = "",
  imageClassName = "",
}: CharacterFigureProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [48, -36]);
  const rotateY = useTransform(
    scrollYProgress,
    [0, 1],
    side === "right" ? [-14, 14] : [14, -14],
  );
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.97]);

  return (
    <div
      ref={ref}
      className={`absolute inset-0 isolate flex items-end justify-center [perspective:1000px] ${className}`}
      aria-hidden
    >
      <motion.div
        className="relative h-[94%] w-[94%]"
        initial={reducedMotion ? false : { opacity: 0.85 }}
        animate={inView ? { opacity: 1, transition: characterRevealTransition } : undefined}
      >
        <motion.div
          className="h-full w-full [transform-style:preserve-3d]"
          style={
            reducedMotion
              ? undefined
              : {
                  y,
                  rotateY,
                  rotateX,
                  scale,
                }
          }
        >
          <motion.div
            className="h-full w-full"
            animate={
              inView && !reducedMotion
                ? {
                    y: [0, -14, 0],
                  }
                : undefined
            }
            transition={{
              y: { duration: 5.2, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <Image
              src={config.src}
              alt=""
              width={config.width}
              height={config.height}
              className={`h-full w-full object-contain object-bottom ${
                config.blendMultiply ? "mix-blend-multiply" : ""
              } ${config.objectPosition ? "scale-[1.35]" : ""} ${imageClassName}`}
              style={{ objectPosition: config.objectPosition ?? "center bottom" }}
              sizes="(max-width: 768px) 60vw, 320px"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
