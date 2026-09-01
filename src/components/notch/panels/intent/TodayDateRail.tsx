"use client";

import { useNotchDemo } from "@/components/notch/NotchDemoContext";
import { DateRail } from "@/components/notch/panels/intent/DateRail";

export function TodayDateRail() {
  const { calendarDays, selectedDayKey, setSelectedDayKey } = useNotchDemo();

  const dayIndex = Math.max(
    0,
    calendarDays.findIndex((d) => d.key === selectedDayKey),
  );
  const day = calendarDays[dayIndex] ?? calendarDays[0];

  function goPrev() {
    const prev = calendarDays[dayIndex - 1];
    if (prev) setSelectedDayKey(prev.key);
  }

  function goNext() {
    const next = calendarDays[dayIndex + 1];
    if (next) setSelectedDayKey(next.key);
  }

  return (
    <DateRail
      day={day}
      showTodayBadge={day.isToday}
      onPrev={goPrev}
      onNext={goNext}
      canPrev={dayIndex > 0}
      canNext={dayIndex < calendarDays.length - 1}
    />
  );
}
