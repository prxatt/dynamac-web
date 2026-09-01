"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useNotchDemo } from "@/components/notch/NotchDemoContext";
import { planModes, type PlanMode } from "@/components/notch/intent-plan-data";
import { AddItemSheet } from "@/components/notch/panels/intent/AddItemSheet";
import { CalendarBands } from "@/components/notch/panels/intent/CalendarBands";
import { TodayList } from "@/components/notch/panels/intent/TodayList";
import { FocusTimer } from "@/components/notch/panels/FocusTimer";

type IntentPanelCompactProps = {
  layoutIdPrefix?: string;
};

export function IntentPanelCompact({ layoutIdPrefix = "intent" }: IntentPanelCompactProps) {
  const [mode, setMode] = useState<PlanMode>("today");
  const { focusPhase, focusExpanded, showAddSheet, setShowAddSheet, selectedDayKey } =
    useNotchDemo();

  const listMinimal = focusPhase === "work" && focusExpanded;
  const planModeLayoutId = `${layoutIdPrefix}-plan-mode`;

  return (
    <div className="relative overflow-hidden">
      <div className="grid grid-cols-[minmax(0,1fr)_7.5rem] items-start gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1">
            <div className="flex flex-wrap gap-1">
              {planModes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMode(item.id)}
                  className="relative rounded-full px-2.5 py-1 text-[9px] font-medium"
                >
                  {mode === item.id ? (
                    <motion.span
                      layoutId={planModeLayoutId}
                      className="absolute inset-0 rounded-full bg-[var(--widget-inset)] ring-1 ring-[var(--widget-border)]"
                      transition={{ type: "spring", visualDuration: 0.32, bounce: 0.16 }}
                    />
                  ) : null}
                  <span
                    className="relative z-10"
                    style={{ color: mode === item.id ? "var(--widget-text)" : "var(--widget-muted)" }}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowAddSheet(true)}
              className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[12px] font-bold leading-none"
              style={{
                backgroundColor: "var(--color-coral-pop)",
                color: "#fff",
              }}
              aria-label="Add task or event"
            >
              +
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${mode}-${listMinimal ? "min" : "full"}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.22 }}
              className="mt-2"
            >
              {listMinimal ? (
                <TodayList minimal />
              ) : mode === "today" ? (
                <TodayList />
              ) : (
                <CalendarBands />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <FocusTimer />
      </div>

      <AnimatePresence>
        {showAddSheet ? (
          <AddItemSheet
            onClose={() => setShowAddSheet(false)}
            dayKey={mode === "calendar" ? selectedDayKey : undefined}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
