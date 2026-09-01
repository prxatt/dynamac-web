"use client";

import { AgentLivePanel } from "@/components/notch/AgentLivePanel";
import { notch } from "@/components/notch/notch-styles";

export function NowPlayingPanel() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-black">
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff705d] via-[#f5e211] to-[#2ba0ff] opacity-90" />
          <span
            className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#1ed760] text-[7px] font-bold text-black"
            aria-hidden
          >
            ♪
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[12px] font-semibold" style={{ color: notch.text }}>
            Hard Feelings
          </p>
          <p className="truncate text-[10px]" style={{ color: notch.textMuted }}>
            Al Kerbey
          </p>

          <div className="mt-2">
            <div
              className="h-1 overflow-hidden rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.18)" }}
            >
              <div className="h-full w-[32%] rounded-full bg-white" />
            </div>
            <div
              className="mt-1 flex justify-between text-[8px] tabular-nums"
              style={{ color: notch.textDim }}
            >
              <span>1:32</span>
              <span>4:56</span>
            </div>
          </div>

          <div
            className="mt-2 flex items-center gap-3 text-[11px]"
            style={{ color: notch.textMuted }}
          >
            <span style={{ color: notch.accentCoral }}>⇄</span>
            <span>⏮</span>
            <span className="text-white">▶</span>
            <span>⏭</span>
            <span>♡</span>
          </div>
        </div>
      </div>

      <AgentLivePanel />
    </div>
  );
}
