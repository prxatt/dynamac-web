"use client";

import { TabWidgetCard } from "@/components/demo/TabWidgetCard";
import { AgentLiveInset } from "@/components/demo/AgentLiveInset";
import type { GlassStyleId } from "@/lib/glass-themes";

type NowPlayingLiveCardProps = {
  glassStyle?: GlassStyleId;
  className?: string;
};

export function NowPlayingLiveCard({
  glassStyle = "liquidLight",
  className = "",
}: NowPlayingLiveCardProps) {
  return (
    <TabWidgetCard
      dialKitName="Now Playing Card"
      hoverBorderColor="var(--color-coral-pop)"
      glassStyle={glassStyle}
      className={className}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div
            className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--widget-inset)]"
            aria-hidden
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-coral-pop)] via-[var(--color-sunshine-pop)] to-[var(--color-sky-pop)]" />
            <span className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#1ed760] text-[7px] font-bold text-black">
              ♪
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <p
              className="truncate text-[length:var(--text-body-sm)] font-medium"
              style={{ color: "var(--widget-text)" }}
            >
              Hard Feelings
            </p>
            <p className="truncate text-[11px]" style={{ color: "var(--widget-muted)" }}>
              Al Kerbey
            </p>
            <div
              className="mt-2 h-1 overflow-hidden rounded-full"
              style={{ backgroundColor: "var(--widget-border)" }}
            >
              <div className="h-full w-[32%] rounded-full bg-[var(--color-coral-pop)]" />
            </div>
            <div
              className="mt-2 flex items-center gap-3 text-[11px]"
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

        <AgentLiveInset />
      </div>
    </TabWidgetCard>
  );
}
