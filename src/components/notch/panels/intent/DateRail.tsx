"use client";

import { formatBandDate, type DayBand } from "@/components/notch/intent-plan-data";

type DateRailProps = {
  day: DayBand;
  showTodayBadge?: boolean;
  compact?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  canPrev?: boolean;
  canNext?: boolean;
};

export function DateRail({
  day,
  showTodayBadge = false,
  compact = false,
  onPrev,
  onNext,
  canPrev = false,
  canNext = false,
}: DateRailProps) {
  const showNav = onPrev && onNext;

  return (
    <div
      className={`flex shrink-0 flex-col text-[#1a1a18] ${
        compact
          ? "w-[2.35rem] items-center justify-center text-center"
          : "w-[3.1rem] justify-between border-r border-black/12 pr-1"
      }`}
    >
      <div>
        {!compact ? (
          <div className="flex items-center gap-0.5">
            <p className="text-[5px] font-bold uppercase leading-none opacity-75">
              {day.dayLabel}
            </p>
            {showTodayBadge ? (
              <span className="rounded-full bg-black/12 px-1 py-px text-[4px] font-bold uppercase">
                Today
              </span>
            ) : null}
          </div>
        ) : (
          <p className="text-[5px] font-bold uppercase leading-none opacity-70">
            {day.dayLabel.slice(0, 3)}
          </p>
        )}
        <p
          className={`font-bold leading-none tabular-nums tracking-tight ${
            compact ? "text-[13px]" : "mt-0.5 text-[14px]"
          }`}
        >
          {compact ? String(day.date).padStart(2, "0") : formatBandDate(day)}
        </p>
        <p className={`font-bold leading-none ${compact ? "text-[6px]" : "text-[8px] text-[#6b3f12]"}`}>
          {day.monthLabel}
        </p>
      </div>

      {showNav ? (
        <div className="mt-1 flex gap-0.5">
          <button
            type="button"
            onClick={onPrev}
            disabled={!canPrev}
            className="grid h-4 w-4 place-items-center rounded-full text-[8px] font-bold disabled:opacity-30"
            style={{ backgroundColor: "rgba(0,0,0,0.12)" }}
            aria-label="Previous day"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!canNext}
            className="grid h-4 w-4 place-items-center rounded-full text-[8px] font-bold disabled:opacity-30"
            style={{ backgroundColor: "rgba(0,0,0,0.12)" }}
            aria-label="Next day"
          >
            ›
          </button>
        </div>
      ) : null}
    </div>
  );
}
