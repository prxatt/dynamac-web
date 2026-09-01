"use client";

import type { ReactNode } from "react";
import { INTENT_PANEL_FRAME } from "@/components/notch/intent-plan-data";

const HIDDEN_SCROLL =
  "overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

export function IntentPanelFrame({
  variant = "today",
  children,
  className = "",
}: {
  variant?: "today" | "calendar";
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl p-2 ${className}`}
      style={{
        backgroundColor:
          variant === "today" ? INTENT_PANEL_FRAME.todayFill : INTENT_PANEL_FRAME.calendarFill,
        outline: INTENT_PANEL_FRAME.outline,
      }}
    >
      {children}
    </div>
  );
}

export { HIDDEN_SCROLL };
