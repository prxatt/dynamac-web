"use client";

import {
  CATEGORY_LABELS,
  colorForCategory,
  eventDurationMinutes,
  isEventLive,
  minutesToLabel,
  type ScheduledEvent,
} from "@/components/notch/intent-plan-data";
import { MiniFocusGrid } from "@/components/notch/panels/MiniFocusGrid";

type EventBandProps = {
  event: ScheduledEvent;
  compact?: boolean;
  active?: boolean;
  focusProgress?: number;
  onPlay: () => void;
  live?: boolean;
};

export function EventBand({
  event,
  compact = false,
  active = false,
  focusProgress = 0,
  onPlay,
  live,
}: EventBandProps) {
  const duration = eventDurationMinutes(event);
  const isLive = live ?? isEventLive(event);
  const accent = colorForCategory(event.category);
  const label = CATEGORY_LABELS[event.category];

  if (compact) {
    return (
      <div
        className="flex w-full items-center gap-1.5 rounded-lg px-2 py-1"
        style={{ backgroundColor: accent }}
      >
        <p className="min-w-0 flex-1 truncate text-[9px] font-bold text-white">{event.title}</p>
        <button
          type="button"
          onClick={onPlay}
          className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-black/25 text-[7px] text-white"
          aria-label={`Start focus on ${event.title}`}
        >
          ▶
        </button>
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5"
      style={{
        backgroundColor: accent,
        boxShadow:
          active || isLive ? "0 0 0 2px rgba(255,255,255,0.85)" : undefined,
      }}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="rounded-full bg-black/25 px-1 py-px text-[6px] font-bold uppercase text-white">
            {label}
          </span>
          {active ? (
            <span className="rounded-full bg-white/25 px-1.5 py-px text-[6px] font-bold uppercase text-white">
              Focus
            </span>
          ) : isLive ? (
            <span className="rounded-full bg-white/25 px-1.5 py-px text-[6px] font-bold uppercase text-white">
              Live
            </span>
          ) : null}
          <p className="min-w-0 flex-1 truncate text-[10px] font-bold text-white">{event.title}</p>
        </div>
        <div className="mt-1 flex items-center justify-between gap-1 text-[7px] font-medium text-white/90">
          <span>{minutesToLabel(event.startMinutes)}</span>
          <span className="rounded-full bg-black/25 px-1.5 py-0.5 text-[6px] font-bold">{duration}m</span>
          <span>{minutesToLabel(event.endMinutes)}</span>
        </div>
        {active ? (
          <div className="mt-1">
            <MiniFocusGrid
              progress={focusProgress}
              active
              fillColor="#ffffff"
              mutedColor="rgba(0,0,0,0.28)"
              size="strip"
            />
          </div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={onPlay}
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black/25 text-[8px] font-bold text-white"
        aria-label={`Start focus on ${event.title}`}
      >
        ▶
      </button>
    </div>
  );
}
