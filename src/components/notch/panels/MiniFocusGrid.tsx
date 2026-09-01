"use client";

import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { motion } from "motion/react";

const TOTAL_CELLS = 60;

type MiniFocusGridProps = {
  progress: number;
  active: boolean;
  fillColor?: string;
  mutedColor?: string;
  size?: "idle" | "running" | "expanded" | "strip";
};

/** 60-minute quadrant — one box per minute, horizontal fill */
export function MiniFocusGrid({
  progress,
  active,
  fillColor = "var(--color-sky-pop)",
  mutedColor = "var(--widget-border)",
  size = "idle",
}: MiniFocusGridProps) {
  const reducedMotion = useReducedMotion();
  const filled = active ? Math.round(progress * TOTAL_CELLS) : 0;

  if (size === "strip") {
    const stripCells = 12;
    const stripFilled = active ? Math.round(progress * stripCells) : 0;
    return (
      <div className="flex gap-px" aria-hidden>
        {Array.from({ length: stripCells }, (_, i) => (
          <motion.span
            key={i}
            className="h-2.5 flex-1 rounded-[2px]"
            style={{
              backgroundColor: i < stripFilled ? fillColor : mutedColor,
            }}
            animate={
              i < stripFilled && active && !reducedMotion
                ? { opacity: [0.7, 1], scaleY: [0.7, 1] }
                : { opacity: 1, scaleY: 1 }
            }
            transition={{ duration: 0.2, delay: i * 0.02 }}
          />
        ))}
      </div>
    );
  }

  const heightClass =
    size === "expanded" ? "h-3.5" : size === "running" ? "h-2.5" : "h-2";
  const widthClass =
    size === "expanded" ? "w-[8.5rem]" : size === "running" ? "w-[7rem]" : "w-[7rem]";

  return (
    <div
      className={`flex gap-px ${widthClass}`}
      role="img"
      aria-label={active ? `Focus progress ${filled} of ${TOTAL_CELLS} minutes` : "60-minute focus grid"}
    >
      {Array.from({ length: TOTAL_CELLS }, (_, i) => {
        const lit = active && i < filled;
        return (
          <motion.span
            key={i}
            className={`flex-1 rounded-[1px] ${heightClass}`}
            style={{
              backgroundColor: lit ? fillColor : mutedColor,
            }}
            initial={false}
            animate={
              lit && !reducedMotion
                ? { opacity: [0.55, 1], scaleY: [0.75, 1] }
                : { opacity: 1, scaleY: 1 }
            }
            transition={{ duration: 0.22, delay: i * 0.004 }}
          />
        );
      })}
    </div>
  );
}

export function formatFocusTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
