"use client";

import { getTodayBand } from "@/components/notch/intent-plan-data";
import { DateRail } from "@/components/notch/panels/intent/DateRail";

export function TodayDateRail() {
  const today = getTodayBand();
  return <DateRail day={today} showTodayBadge />;
}
