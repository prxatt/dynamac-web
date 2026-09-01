"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

type CutoutBackdropProps = {
  accent: string;
  variant?: number;
  className?: string;
};

const blobLayouts = [
  [
    { className: "-left-[8%] top-[12%] h-[58%] w-[72%] rounded-[42%_58%_52%_48%]", delay: 0 },
    { className: "right-[0%] bottom-[8%] h-[48%] w-[55%] rounded-[58%_42%_45%_55%]", delay: 0.4 },
    { className: "left-[28%] bottom-[2%] h-[28%] w-[38%] rounded-[50%_50%_42%_58%]", delay: 0.8 },
  ],
  [
    { className: "right-[-6%] top-[10%] h-[62%] w-[68%] rounded-[48%_52%_58%_42%]", delay: 0.2 },
    { className: "left-[2%] bottom-[12%] h-[44%] w-[52%] rounded-[55%_45%_50%_50%]", delay: 0.6 },
    { className: "right-[22%] top-[4%] h-[24%] w-[32%] rounded-[45%_55%_60%_40%]", delay: 1 },
  ],
  [
    { className: "left-[-4%] top-[18%] h-[54%] w-[64%] rounded-[50%_50%_46%_54%]", delay: 0.1 },
    { className: "right-[-2%] bottom-[6%] h-[50%] w-[58%] rounded-[42%_58%_55%_45%]", delay: 0.5 },
    { className: "left-[35%] top-[2%] h-[22%] w-[30%] rounded-[60%_40%_50%_50%]", delay: 0.9 },
  ],
] as const;

export function CutoutBackdrop({
  accent,
  variant = 0,
  className = "",
}: CutoutBackdropProps) {
  const reducedMotion = useReducedMotion();
  const blobs = blobLayouts[variant % blobLayouts.length]!;

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      {blobs.map((blob, index) => (
        <motion.div
          key={blob.className}
          className={`absolute ${blob.className}`}
          style={{
            backgroundColor: index === 1 ? accent : "var(--color-sandstone)",
            opacity: index === 1 ? 0.22 : index === 2 ? 0.55 : 0.85,
          }}
          animate={
            reducedMotion
              ? undefined
              : {
                  rotate: [0, index % 2 === 0 ? 2.5 : -2.5, 0],
                  scale: [1, 1.03, 1],
                }
          }
          transition={{
            duration: 7 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: blob.delay,
          }}
        />
      ))}
    </div>
  );
}
