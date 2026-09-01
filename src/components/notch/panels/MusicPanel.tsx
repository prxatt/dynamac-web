"use client";

import { motion } from "motion/react";
import { SunAlbumArt } from "@/components/notch/panels/SunAlbumArt";

/** Music column — always shows sun + track; never replaced by live task */
export function MusicPanel() {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <SunAlbumArt />

      <div className="min-w-0 flex-1">
        <p className="truncate text-[12px] font-semibold" style={{ color: "var(--widget-text)" }}>
          Here Comes the Sun
        </p>
        <p className="truncate text-[10px]" style={{ color: "var(--widget-muted)" }}>
          The Beatles
        </p>
        <div
          className="mt-2 h-1 overflow-hidden rounded-full"
          style={{ backgroundColor: "var(--widget-border)" }}
        >
          <motion.div
            className="h-full rounded-full bg-[var(--color-coral-pop)]"
            initial={{ width: "28%" }}
            animate={{ width: ["28%", "48%", "28%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div
          className="mt-2 flex items-center gap-2.5 text-[10px]"
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
  );
}
