"use client";

import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { SunAlbumArt } from "@/components/notch/panels/SunAlbumArt";
import { LiveStrip } from "@/components/notch/panels/LiveStrip";
import { useNotchDemo } from "@/components/notch/NotchDemoContext";

/** Music + optional live strip stacked — sun always visible */
export function MusicColumn() {
  const { focusPhase, liveEvent } = useNotchDemo();
  const reducedMotion = useReducedMotion();
  const showLive = focusPhase === "work" || Boolean(liveEvent);

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <SunAlbumArt />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-semibold" style={{ color: "var(--widget-text)" }}>
            Here Comes the Sun
          </p>
          <p className="truncate text-[9px]" style={{ color: "var(--widget-muted)" }}>
            The Beatles
          </p>
          <div
            className="mt-1.5 h-0.5 overflow-hidden rounded-full"
            style={{ backgroundColor: "var(--widget-border)" }}
          >
            {reducedMotion ? (
              <div className="h-full w-[38%] rounded-full bg-[var(--color-coral-pop)]" />
            ) : (
              <motion.div
                className="h-full rounded-full bg-[var(--color-coral-pop)]"
                initial={{ width: "28%" }}
                animate={{ width: ["28%", "48%", "28%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </div>
          <div
            className="mt-1.5 flex items-center gap-2 text-[9px]"
            style={{ color: "var(--widget-muted)" }}
          >
            <span className="text-[var(--color-coral-pop)]">⇄</span>
            <span>⏮</span>
            <span style={{ color: "var(--widget-text)" }}>▶</span>
            <span>⏭</span>
            <span>♡</span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {showLive ? <LiveStrip key="live-strip" /> : null}
      </AnimatePresence>
    </div>
  );
}
