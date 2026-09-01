"use client";

import { formatBandDate, type DayBand } from "@/components/notch/intent-plan-data";

type DateRailProps = {
  day: DayBand;
  showTodayBadge?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  canPrev?: boolean;
  canNext?: boolean;
};

export function DateRail({
  day,
  showTodayBadge = false,
  onPrev,
  onNext,
  canPrev = false,
  canNext = false,
}: DateRailProps) {
  const showNav = onPrev && onNext;

  return (
    <div className="flex w-[3.1rem] shrink-0 flex-col justify-between border-r border-black/12 pr-1 text-[#1a1a18]">
      <div>
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
        <p className="mt-0.5 text-[14px] font-bold leading-none tabular-nums tracking-tight">
          {formatBandDate(day)}
        </p>
        <p className="text-[8px] font-bold leading-none text-[#6b3f12]">{day.monthLabel}</p>
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
