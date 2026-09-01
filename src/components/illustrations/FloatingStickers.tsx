"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { illustrations } from "@/lib/illustrations";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

type FloatingStickersProps = {
  variant?: number;
  className?: string;
};

const stickerPlacements = [
  [
    { className: "right-[4%] top-[6%] h-14 w-14", rotate: 14, objectPosition: "12% 18%" },
    { className: "left-[6%] bottom-[18%] h-11 w-11", rotate: -8, objectPosition: "52% 22%" },
    { className: "right-[28%] top-[42%] h-9 w-9", rotate: 6, objectPosition: "82% 55%" },
  ],
  [
    { className: "left-[8%] top-[10%] h-12 w-12", rotate: -12, objectPosition: "28% 72%" },
    { className: "right-[10%] bottom-[22%] h-14 w-14", rotate: 10, objectPosition: "68% 78%" },
    { className: "left-[38%] top-[4%] h-8 w-8", rotate: 4, objectPosition: "90% 18%" },
  ],
  [
    { className: "right-[6%] top-[14%] h-13 w-13", rotate: 8, objectPosition: "45% 45%" },
    { className: "left-[4%] bottom-[12%] h-12 w-12", rotate: -14, objectPosition: "8% 88%" },
    { className: "right-[32%] bottom-[8%] h-10 w-10", rotate: 12, objectPosition: "72% 12%" },
  ],
] as const;

export function FloatingStickers({ variant = 0, className = "" }: FloatingStickersProps) {
  const reducedMotion = useReducedMotion();
  const stickers = stickerPlacements[variant % stickerPlacements.length]!;

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      {stickers.map((sticker, index) => (
        <motion.div
          key={`${sticker.className}-${sticker.rotate}`}
          className={`absolute overflow-hidden ${sticker.className}`}
          style={{ rotate: `${sticker.rotate}deg` }}
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [0, index % 2 === 0 ? -8 : 8, 0],
                  rotate: [sticker.rotate, sticker.rotate + (index % 2 === 0 ? 4 : -4), sticker.rotate],
                }
          }
          transition={{
            duration: 4.5 + index * 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.3,
          }}
        >
          <Image
            src={illustrations.stickerProps}
            alt=""
            width={800}
            height={600}
            className="h-[400%] w-[400%] max-w-none object-cover"
            style={{ objectPosition: sticker.objectPosition }}
          />
        </motion.div>
      ))}
    </div>
  );
}
