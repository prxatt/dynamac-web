"use client";

import { motion } from "motion/react";
import { useNotchDemo } from "@/components/notch/NotchDemoContext";
import {
  CATEGORY_LABELS,
  colorForCategory,
  focusableCategory,
  focusableLabel,
  minutesToLabel,
  type TaskCategory,
} from "@/components/notch/intent-plan-data";
import { formatFocusTime, MiniFocusGrid } from "@/components/notch/panels/MiniFocusGrid";

/** Full-width Bauhaus block under music — same solid style as Today events */
export function LiveStrip() {
  const { focusPhase, liveEvent, linkedItem, progress, secondsLeft, jumpToIntent } =
    useNotchDemo();

  const isWorking = focusPhase === "work";
  const ongoing = isWorking || Boolean(liveEvent);
  if (!ongoing) return null;

  const title = isWorking ? focusableLabel(linkedItem) : (liveEvent?.title ?? "");
  const category: TaskCategory = isWorking
    ? focusableCategory(linkedItem)
    : (liveEvent?.category ?? "other");
  const accent = colorForCategory(category);
  const label = CATEGORY_LABELS[category];
  const meta = isWorking
    ? formatFocusTime(secondsLeft)
    : liveEvent
      ? minutesToLabel(liveEvent.startMinutes)
      : "";

  return (
    <motion.button
      type="button"
      onClick={jumpToIntent}
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ type: "spring", visualDuration: 0.35, bounce: 0.12 }}
      className="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left"
      style={{ backgroundColor: accent }}
      aria-label={`Open Intent — ${title}`}
    >
      <div className="w-[4.5rem] shrink-0">
        {isWorking ? (
          <MiniFocusGrid progress={progress} active fillColor="#ffffff" mutedColor="rgba(0,0,0,0.25)" size="strip" />
        ) : (
          <span className="rounded-full bg-black/20 px-1.5 py-0.5 text-[7px] font-bold uppercase text-white">
            Now
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1">
          <span className="rounded-full bg-black/20 px-1 py-px text-[6px] font-bold uppercase text-white">
            {label}
          </span>
          <p className="truncate text-[10px] font-bold text-white">{title}</p>
        </div>
        <p className="text-[8px] font-medium text-white/85">
          {isWorking ? "Focus" : "Live"}
        </p>
      </div>

      <span className="shrink-0 rounded-full bg-black/20 px-2 py-0.5 font-mono text-[9px] font-bold tabular-nums text-white">
        {meta}
      </span>
    </motion.button>
  );
}
