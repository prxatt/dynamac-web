"use client";

import {
  canFocusEvent,
  colorForCategory,
  eventDurationMinutes,
  isEventLive,
  isEventPast,
  labelForCategory,
  minutesToLabel,
  type ScheduledEvent,
} from "@/components/notch/intent-plan-data";
import { useNotchDemo } from "@/components/notch/NotchDemoContext";
import { MiniFocusGrid } from "@/components/notch/panels/MiniFocusGrid";

type EventBandProps = {
  event: ScheduledEvent;
  compact?: boolean;
  timeline?: boolean;
  active?: boolean;
  completedView?: boolean;
  focusProgress?: number;
  onSelect?: () => void;
  onPlay: () => void;
  live?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

function FocusPlayButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/30 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)] transition-transform hover:scale-105 active:scale-95"
      aria-label={label}
    >
      <span className="ml-px text-[8px] font-bold leading-none text-white">▶</span>
    </button>
  );
}

export function EventBand({
  event,
  compact = false,
  timeline = false,
  active = false,
  completedView = false,
  focusProgress = 0,
  onSelect,
  onPlay,
  live,
  className = "",
  style,
}: EventBandProps) {
  const { customCategories } = useNotchDemo();
  const duration = eventDurationMinutes(event);
  const isLive = live ?? isEventLive(event);
  const isPast = isEventPast(event);
  const showPlay = canFocusEvent(event);
  const accent = colorForCategory(event.category, customCategories);
  const label = labelForCategory(event.category, customCategories);
  const playLabel = `Start focus on ${event.title}`;

  if (compact) {
    return (
      <div
        className={`flex w-full items-center gap-2 rounded-xl px-2 py-1 ${className}`}
        style={{ backgroundColor: accent, opacity: isPast && !completedView ? 0.72 : 1, ...style }}
      >
        <p className="min-w-0 flex-1 truncate text-[9px] font-bold text-white">{event.title}</p>
        {showPlay ? <FocusPlayButton onClick={onPlay} label={playLabel} /> : null}
      </div>
    );
  }

  if (timeline) {
    return (
      <button
        type="button"
        onClick={onSelect}
        className={`rounded-xl px-2 py-1.5 text-left transition-[filter] hover:brightness-[1.05] ${className}`}
        style={{
          backgroundColor: accent,
          opacity: isPast && !completedView ? 0.78 : 1,
          outline: isLive ? "2px solid rgba(26,26,24,0.28)" : undefined,
          boxShadow: isLive ? "0 2px 8px rgba(26,26,24,0.12)" : undefined,
          zIndex: isLive ? 2 : 1,
          ...style,
        }}
        title={`${event.title} · ${minutesToLabel(event.startMinutes)} – ${minutesToLabel(event.endMinutes)}`}
      >
        <div className="flex min-w-0 items-center gap-1">
          <span className="shrink-0 rounded-full bg-black/20 px-1.5 py-px text-[6px] font-bold uppercase text-white">
            {label}
          </span>
          {isLive ? (
            <span className="shrink-0 rounded-full bg-black/25 px-1.5 py-px text-[6px] font-bold uppercase text-white">
              Live
            </span>
          ) : null}
          <span className="min-w-0 flex-1 truncate text-[9px] font-bold leading-snug text-white">
            {event.title}
          </span>
        </div>
        <p className="mt-1 flex items-center gap-1 text-[7px] font-semibold text-white/95">
          <span className="shrink-0">{minutesToLabel(event.startMinutes)}</span>
          <span className="shrink-0 rounded-full bg-black/20 px-1.5 py-px text-[6px] font-bold">
            {duration}m
          </span>
          <span className="shrink-0 truncate">{minutesToLabel(event.endMinutes)}</span>
        </p>
      </button>
    );
  }

  return (
    <div
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={onSelect}
      onKeyDown={
        onSelect
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect();
              }
            }
          : undefined
      }
      className={`flex cursor-pointer items-center gap-2.5 rounded-xl px-2.5 py-2 ${onSelect ? "hover:brightness-[1.04]" : ""}`}
      style={{
        backgroundColor: accent,
        opacity: isPast && !completedView ? 0.72 : 1,
        outline: active ? "2px solid rgba(0,0,0,0.22)" : isLive ? "2px solid rgba(0,0,0,0.12)" : undefined,
      }}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1">
          <span className="rounded-full bg-black/20 px-1.5 py-px text-[6px] font-bold uppercase text-white">
            {label}
          </span>
          {active ? (
            <span className="rounded-full bg-black/25 px-1.5 py-px text-[6px] font-bold uppercase text-white">
              Focus
            </span>
          ) : isLive ? (
            <span className="rounded-full bg-black/25 px-1.5 py-px text-[6px] font-bold uppercase text-white">
              Live
            </span>
          ) : null}
        </div>
        <p className="mt-0.5 truncate text-[10px] font-bold leading-snug text-white">
          {event.title}
        </p>
        <div className="mt-1.5 flex items-center justify-between gap-2 pr-1 text-[7px] font-semibold text-white">
          <span className="shrink-0">{minutesToLabel(event.startMinutes)}</span>
          <span className="rounded-full bg-black/25 px-2 py-0.5 text-[6px] font-bold">
            {duration} Min
          </span>
          <span className="shrink-0">{minutesToLabel(event.endMinutes)}</span>
        </div>
        {active ? (
          <div className="mt-1.5">
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

      {showPlay ? <FocusPlayButton onClick={onPlay} label={playLabel} /> : null}
    </div>
  );
}
