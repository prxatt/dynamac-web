"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useNotchDemo } from "@/components/notch/NotchDemoContext";
import {
  focusableLabel,
  planModes,
  TODAY_PANEL_COLOR,
  type PlanMode,
} from "@/components/notch/intent-plan-data";
import { CalendarBands } from "@/components/notch/panels/intent/CalendarBands";
import {
  CompletedCalendarList,
  CompletedTodayList,
} from "@/components/notch/panels/intent/CompletedList";
import { ItemSheet } from "@/components/notch/panels/intent/ItemSheet";
import { TodayList } from "@/components/notch/panels/intent/TodayList";
import { FocusTimer } from "@/components/notch/panels/FocusTimer";

type IntentPanelCompactProps = {
  layoutIdPrefix?: string;
};

export function IntentPanelCompact({ layoutIdPrefix = "intent" }: IntentPanelCompactProps) {
  const [mode, setMode] = useState<PlanMode>("today");
  const [showCompleted, setShowCompleted] = useState(false);
  const {
    focusActive,
    linkedItem,
    itemSheet,
    openItemSheet,
    closeItemSheet,
    selectedDayKey,
  } = useNotchDemo();

  const planModeLayoutId = `${layoutIdPrefix}-plan-mode`;
  const showLinkedChip = focusActive && linkedItem != null;

  function handleModeChange(next: PlanMode) {
    setMode(next);
    setShowCompleted(false);
  }

  return (
    <div className="relative overflow-hidden">
      <div className="grid grid-cols-[minmax(0,1fr)_12.25rem] items-start gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <div className="flex min-w-0 flex-wrap gap-1">
              {planModes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleModeChange(item.id)}
                  className="relative rounded-[var(--radius-small)] px-2.5 py-1 text-[9px] font-medium"
                >
                  {mode === item.id && !showCompleted ? (
                    <motion.span
                      layoutId={planModeLayoutId}
                      className="absolute inset-0 rounded-[var(--radius-small)] bg-[var(--widget-inset)] ring-1 ring-[var(--widget-border)]"
                      transition={{ type: "spring", visualDuration: 0.32, bounce: 0.16 }}
                    />
                  ) : null}
                  <span
                    className="relative z-10"
                    style={{
                      color:
                        mode === item.id && !showCompleted
                          ? "var(--widget-text)"
                          : "var(--widget-muted)",
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
            <div className="ml-auto flex shrink-0 items-center gap-1.5">
              {showLinkedChip ? (
                <span
                  className="max-w-[7.5rem] truncate rounded-full bg-[var(--widget-inset)] px-2.5 py-1 text-[9px] font-semibold"
                  style={{ color: "var(--widget-text)" }}
                  title={focusableLabel(linkedItem)}
                >
                  {focusableLabel(linkedItem)}
                </span>
              ) : null}
              <button
                type="button"
                onClick={() => {
                  setShowCompleted((v) => !v);
                  if (itemSheet) closeItemSheet();
                }}
                className="grid h-5 w-5 place-items-center rounded-[var(--radius-small)] text-[10px] font-bold leading-none transition-colors"
                style={{
                  backgroundColor: showCompleted ? "#1a1a18" : TODAY_PANEL_COLOR,
                  color: showCompleted ? "#fff" : "#1a1a18",
                  boxShadow: showCompleted ? undefined : "inset 0 0 0 1.5px rgba(26,26,24,0.28)",
                }}
                aria-label={showCompleted ? "Hide completed tasks" : "Show completed tasks"}
                aria-pressed={showCompleted}
              >
                ✓
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCompleted(false);
                  openItemSheet({
                    kind: "add",
                    dayKey: selectedDayKey,
                  });
                }}
                className="flex h-5 w-5 items-center justify-center rounded-[var(--radius-small)] text-[12px] font-bold leading-none"
                style={{
                  backgroundColor: "var(--color-accent)",
                  color: "#fff",
                }}
                aria-label="Add task or event"
              >
                +
              </button>
            </div>
          </div>

          <div className={`mt-2 min-h-[5.5rem] ${itemSheet ? "overflow-visible" : ""}`}>
            <AnimatePresence mode="wait">
              {itemSheet ? (
                <ItemSheet
                  key="item-sheet"
                  sheet={itemSheet}
                  onClose={closeItemSheet}
                  panelTint={TODAY_PANEL_COLOR}
                />
              ) : (
                <motion.div
                  key={`${mode}-${showCompleted ? "done" : "active"}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                >
                  {showCompleted ? (
                    mode === "today" ? (
                      <CompletedTodayList />
                    ) : (
                      <CompletedCalendarList />
                    )
                  ) : mode === "today" ? (
                    <TodayList />
                  ) : (
                    <CalendarBands />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <FocusTimer />
      </div>
    </div>
  );
}
