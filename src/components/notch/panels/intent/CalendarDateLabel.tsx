"use client";

import { formatBandDate, type DayBand } from "@/components/notch/intent-plan-data";

const INK = "#1a1a18";

type CalendarDateLabelProps = {
  day: DayBand;
};

/** Typographic date column — ink always black for readability */
export function CalendarDateLabel({ day }: CalendarDateLabelProps) {
  return (
    <div className="flex w-[2.6rem] shrink-0 flex-col items-start justify-center py-0.5 pl-1">
      <p
        className="text-[5px] font-bold uppercase leading-none tracking-[0.14em]"
        style={{ color: INK, opacity: 0.62 }}
      >
        {day.dayLabel.slice(0, 3)}
      </p>
      <p
        className="mt-0.5 text-[17px] font-bold leading-none tabular-nums tracking-tighter"
        style={{ color: INK }}
      >
        {String(day.date).padStart(2, "0")}
      </p>
      <p className="mt-0.5 text-[7px] font-bold uppercase leading-none" style={{ color: INK }}>
        {day.monthLabel}
      </p>
      {day.isToday ? (
        <span
          className="mt-1 rounded-full px-1 py-px text-[4px] font-bold uppercase tracking-[0.1em]"
          style={{ backgroundColor: "rgba(26,26,24,0.12)", color: INK }}
        >
          Today
        </span>
      ) : null}
    </div>
  );
}

export function formatCalendarDateTooltip(day: DayBand): string {
  return `${day.dayLabel} · ${formatBandDate(day)} ${day.monthLabel}`;
}
