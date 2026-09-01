"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

/** Native open notch width (760px) — layout box must shrink when scaled */
const SHOWCASE_WIDTH_PX = 760;
/** Card + tabs + padding — reserve layout height after scale */
const SHOWCASE_HEIGHT_PX = 340;

type NotchShelfStageProps = {
  children: ReactNode;
  accent: string;
  mark?: ReactNode;
  index: number;
};

const shelfTilt = [-1.2, 1.4, -0.8] as const;

function ScaledShowcase({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const available = el.clientWidth;
      const next = Math.min(1, available / SHOWCASE_WIDTH_PX);
      setScale(next);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const layoutWidth = SHOWCASE_WIDTH_PX * scale;
  const layoutHeight = SHOWCASE_HEIGHT_PX * scale;

  return (
    <div ref={containerRef} className="w-full max-w-[47.5rem]">
      <div
        className="mx-auto overflow-visible"
        style={{ width: layoutWidth, height: layoutHeight }}
      >
        <div
          style={{
            width: SHOWCASE_WIDTH_PX,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Notch demos on a visible shelf — layout-sized scale (not CSS-only scale)
 * so mobile never clips inside overflow-x: clip.
 */
export function NotchShelfStage({ children, accent, mark, index }: NotchShelfStageProps) {
  const reducedMotion = useReducedMotion();
  const tilt = shelfTilt[index % shelfTilt.length]!;

  return (
    <div className="relative w-full overflow-visible pb-2 pt-10">
      <motion.div
        className="absolute inset-x-[-2%] bottom-0 top-10 rounded-[1.75rem] border border-[var(--color-hairline-mist)] md:inset-x-0"
        style={{
          background:
            "linear-gradient(165deg, var(--color-pure-white) 0%, var(--color-sandstone) 48%, var(--color-cream-paper) 100%)",
          boxShadow:
            "0 28px 60px rgba(44,46,42,0.1), 0 4px 0 rgba(255,255,255,0.85) inset, 0 -1px 0 rgba(26,26,24,0.06)",
        }}
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <div
        className="absolute inset-x-[-2%] bottom-0 top-10 rounded-[1.75rem] md:inset-x-0"
        style={{
          boxShadow: `inset 0 3px 0 ${accent}33`,
          pointerEvents: "none",
        }}
        aria-hidden
      />

      {mark ? (
        <div
          className="absolute left-5 top-2 z-20 flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--color-hairline-mist)] bg-[var(--color-pure-white)] shadow-sm"
          aria-hidden
        >
          {mark}
        </div>
      ) : null}

      <div className="relative z-10 flex justify-center overflow-visible px-2 pb-5 pt-2 md:px-4">
        <motion.div
          className="w-full max-w-[47.5rem] overflow-visible"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          <div
            className="mx-auto overflow-visible"
            style={{ transform: `rotate(${tilt}deg)` }}
          >
            <ScaledShowcase>{children}</ScaledShowcase>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
