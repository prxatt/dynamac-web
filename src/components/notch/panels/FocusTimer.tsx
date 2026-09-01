"use client";

import { motion, AnimatePresence } from "motion/react";
import { useNotchDemo, type FocusTimerStyle } from "@/components/notch/NotchDemoContext";
import {
  eventDurationMinutes,
  focusableCategory,
  minutesToLabel,
  colorForCategory,
  focusableLabel,
} from "@/components/notch/intent-plan-data";
import { formatFocusTime, MiniFocusGrid } from "@/components/notch/panels/MiniFocusGrid";

const PREVIEW_PROGRESS = 0.28;

function SpanFace({
  progress,
  label,
  startLabel,
  endLabel,
  durationLabel,
  accent,
}: {
  progress: number;
  label: string;
  startLabel: string;
  endLabel: string;
  durationLabel: string;
  accent: string;
}) {
  return (
    <div className="w-full">
      <p
        className="mb-0.5 text-center font-mono text-[9px] font-semibold tabular-nums"
        style={{ color: "var(--widget-text)" }}
      >
        {label}
      </p>
      <div className="relative h-1.5 overflow-hidden rounded-full" style={{ backgroundColor: "var(--widget-border)" }}>
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ backgroundColor: accent }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>
      <div
        className="mt-1 flex items-center justify-between gap-0.5 text-[6px] font-medium"
        style={{ color: "var(--widget-muted)" }}
      >
        <span>{startLabel}</span>
        <span
          className="rounded-full px-1 py-px font-bold"
          style={{ backgroundColor: "var(--widget-inset)", color: "var(--widget-text)" }}
        >
          {durationLabel}
        </span>
        <span>{endLabel}</span>
      </div>
    </div>
  );
}

function StyleToggle({
  style,
  onChange,
}: {
  style: FocusTimerStyle;
  onChange: (s: FocusTimerStyle) => void;
}) {
  return (
    <div className="flex w-full gap-0.5 rounded-full p-0.5" style={{ backgroundColor: "var(--widget-inset)" }}>
      {(["blocks", "span"] as const).map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className="flex-1 rounded-full py-0.5 text-[6px] font-bold uppercase tracking-wide transition-colors"
          style={{
            backgroundColor: style === id ? "var(--color-sky-pop)" : "transparent",
            color: style === id ? "#fff" : "var(--widget-muted)",
          }}
          aria-label={id === "blocks" ? "Blocks timer style" : "Span timer style"}
        >
          {id === "blocks" ? "◧" : "▬"}
        </button>
      ))}
    </div>
  );
}

export function FocusTimer() {
  const {
    focusPhase,
    focusExpanded,
    focusStyle,
    secondsLeft,
    breakSecondsLeft,
    progress,
    breakProgress,
    linkedItem,
    setFocusStyle,
    toggleFocusExpanded,
    startFocus,
    endFocus,
    skipBreak,
  } = useNotchDemo();

  const accent = colorForCategory(focusableCategory(linkedItem));
  const taskLabel = focusableLabel(linkedItem);
  const isWork = focusPhase === "work";
  const isBreak = focusPhase === "break";
  const isIdle = focusPhase === "idle";

  const previewActive = isIdle && focusExpanded;
  const gridActive = isWork || isBreak || previewActive;
  const gridProgress = isBreak
    ? breakProgress
    : isWork
      ? progress
      : previewActive
        ? PREVIEW_PROGRESS
        : 0;

  const gridSize = isIdle
    ? focusExpanded
      ? "expanded"
      : "idle"
    : focusExpanded && isWork
      ? "expanded"
      : isWork
        ? "running"
        : "idle";

  const gridColor = isBreak ? "var(--color-fresh-grass)" : accent;

  const workLabel = formatFocusTime(secondsLeft);
  const breakLabel = formatFocusTime(breakSecondsLeft);

  const spanMeta =
    linkedItem?.kind === "event"
      ? {
          startLabel: minutesToLabel(linkedItem.event.startMinutes),
          endLabel: minutesToLabel(linkedItem.event.endMinutes),
          durationLabel: `${eventDurationMinutes(linkedItem.event)}m`,
        }
      : { startLabel: "Start", endLabel: "End", durationLabel: "25m" };

  const spanProgress = isWork ? progress : isBreak ? breakProgress : previewActive ? PREVIEW_PROGRESS : 0;
  const spanLabel = isBreak ? breakLabel : isWork ? workLabel : "25:00";

  return (
    <motion.div
      layout
      className="flex w-[7.5rem] shrink-0 flex-col items-stretch gap-1 self-stretch"
    >
      <button
        type="button"
        onClick={toggleFocusExpanded}
        className="flex w-full flex-col items-stretch rounded-lg p-0.5"
        aria-label="Toggle focus timer size"
      >
        {focusStyle === "blocks" ? (
          <div className="flex w-full flex-col items-stretch gap-1">
            <MiniFocusGrid
              progress={gridProgress}
              active={gridActive}
              fillColor={gridColor}
              size={gridSize}
            />
            <AnimatePresence mode="wait">
              {isBreak ? (
                <motion.div
                  key="break"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-lg px-2 py-1 text-center"
                  style={{ backgroundColor: "var(--color-fresh-grass)", color: "#1a1a18" }}
                >
                  <p className="text-[6px] font-bold uppercase tracking-wide">Break time</p>
                  <p className="font-mono text-[11px] font-bold tabular-nums">{breakLabel}</p>
                  <p className="mt-0.5 text-[6px] font-medium opacity-80">Task still open</p>
                </motion.div>
              ) : isWork ? (
                <motion.p
                  key="work"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center font-mono text-[10px] font-semibold tabular-nums"
                  style={{ color: "var(--widget-text)" }}
                >
                  {workLabel}
                </motion.p>
              ) : (
                <motion.p
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-[7px] font-medium"
                  style={{ color: "var(--widget-muted)" }}
                >
                  {focusExpanded ? "Preview" : "Tap to expand"}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <SpanFace
            progress={spanProgress}
            label={spanLabel}
            accent={gridColor}
            {...spanMeta}
          />
        )}
      </button>

      <StyleToggle style={focusStyle} onChange={setFocusStyle} />

      {isBreak ? (
        <button
          type="button"
          onClick={skipBreak}
          className="w-full rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider"
          style={{
            backgroundColor: "var(--color-fresh-grass)",
            color: "#1a1a18",
          }}
        >
          Skip break
        </button>
      ) : (
        <button
          type="button"
          onClick={() => (isWork ? endFocus(false) : startFocus())}
          className="w-full rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider"
          style={{
            backgroundColor: isWork ? "var(--color-coral-pop)" : "var(--widget-inset)",
            color: isWork ? "#fff" : "var(--widget-text)",
            border: "1px solid var(--widget-border)",
          }}
        >
          {isWork ? "End" : "Focus"}
        </button>
      )}

      {isWork && linkedItem ? (
        <div className="flex flex-col items-stretch gap-0.5">
          <p
            className="truncate text-center text-[7px] font-medium"
            style={{ color: "var(--widget-muted)" }}
          >
            {taskLabel}
          </p>
          {linkedItem.kind === "todo" ? (
            <button
              type="button"
              onClick={() => endFocus(true)}
              className="text-center text-[6px] font-bold uppercase tracking-wide underline"
              style={{ color: "var(--color-fresh-grass)" }}
            >
              Complete task
            </button>
          ) : null}
        </div>
      ) : null}
    </motion.div>
  );
}
