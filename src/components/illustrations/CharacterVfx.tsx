"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

type CharacterVfxProps = {
  variant: number;
  accent: string;
};

const sparkles = [
  [
    { x: "18%", y: "8%", size: 6, delay: 0 },
    { x: "78%", y: "22%", size: 5, delay: 0.4 },
    { x: "62%", y: "6%", size: 4, delay: 0.8 },
    { x: "32%", y: "28%", size: 5, delay: 1.1 },
  ],
  [
    { x: "12%", y: "18%", size: 5, delay: 0.2 },
    { x: "84%", y: "10%", size: 6, delay: 0.5 },
    { x: "70%", y: "30%", size: 4, delay: 0.9 },
    { x: "40%", y: "4%", size: 5, delay: 1.3 },
  ],
  [
    { x: "22%", y: "12%", size: 5, delay: 0.1 },
    { x: "72%", y: "8%", size: 6, delay: 0.6 },
    { x: "88%", y: "34%", size: 4, delay: 1 },
    { x: "48%", y: "20%", size: 5, delay: 1.4 },
  ],
] as const;

/** Light particles + accent pulse around paper-cut characters */
export function CharacterVfx({ variant, accent }: CharacterVfxProps) {
  const reducedMotion = useReducedMotion();
  const points = sparkles[variant % sparkles.length]!;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden>
      <motion.div
        className="absolute -inset-[12%] rounded-[45%]"
        style={{
          background: `radial-gradient(ellipse at 50% 70%, ${accent}22 0%, transparent 62%)`,
        }}
        animate={
          reducedMotion
            ? undefined
            : {
                opacity: [0.35, 0.65, 0.35],
                scale: [0.98, 1.04, 0.98],
              }
        }
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {points.map((point, i) => (
        <motion.span
          key={`${point.x}-${point.y}`}
          className="absolute rounded-full bg-white"
          style={{
            left: point.x,
            top: point.y,
            width: point.size,
            height: point.size,
            boxShadow: `0 0 ${point.size * 2}px ${accent}88`,
          }}
          animate={
            reducedMotion
              ? undefined
              : {
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.2, 0.5],
                  y: [0, -12 - i * 2, 0],
                }
          }
          transition={{
            duration: 2.8 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: point.delay,
          }}
        />
      ))}

      <motion.div
        className="absolute bottom-[8%] left-1/2 h-px w-[55%] -translate-x-1/2"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}55, transparent)`,
        }}
        animate={reducedMotion ? undefined : { opacity: [0.2, 0.7, 0.2], scaleX: [0.85, 1, 0.85] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
