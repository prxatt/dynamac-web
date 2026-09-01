"use client";

import { formatBandDate, getTodayBand } from "@/components/notch/intent-plan-data";

export function TodayDateRail() {
  const today = getTodayBand();

  return (
    <div
      className="flex w-[3.1rem] shrink-0 flex-col justify-center border-r border-black/12 pr-1 text-[#1a1a18]"
    >
      <p className="text-[5px] font-bold uppercase leading-none opacity-75">
        {today.dayLabel}
      </p>
      <p className="mt-0.5 text-[14px] font-bold leading-none tabular-nums tracking-tight">
        {formatBandDate(today)}
      </p>
      <p className="text-[8px] font-bold leading-none text-[#6b3f12]">{today.monthLabel}</p>
    </div>
  );
}
