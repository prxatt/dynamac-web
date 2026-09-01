"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { notch } from "@/components/notch/notch-styles";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

const scopes = ["Today", "Week", "Month"] as const;
type Scope = (typeof scopes)[number];

function TodayView() {
  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr]">
      <div>
        <p className="text-[7px] font-bold uppercase tracking-wider" style={{ color: notch.textDim }}>
          Plan
        </p>
        <p className="mt-2 text-[10px] font-medium" style={{ color: notch.textMuted }}>
          Monday, Aug 31
        </p>
        <p className="mt-3 text-[11px] font-medium" style={{ color: notch.text }}>
          Nothing scheduled
        </p>
        <p className="mt-1 text-[9px]" style={{ color: notch.textDim }}>
          Add below, or switch to week / month.
        </p>
      </div>
      <div className="hidden w-px bg-white/10 sm:block" aria-hidden />
      <div>
        <p className="text-[7px] font-bold uppercase tracking-wider" style={{ color: notch.textDim }}>
          Focus
        </p>
        <span
          className="mt-2 inline-block rounded-full border px-2.5 py-0.5 text-[9px]"
          style={{ borderColor: notch.borderStrong, color: notch.text }}
        >
          Focus
        </span>
        <p className="text-[7px] font-bold uppercase tracking-wider mt-4" style={{ color: notch.textDim }}>
          To-do
        </p>
        <p className="mt-2 text-[9px]" style={{ color: notch.textMuted }}>
          No tasks
        </p>
      </div>
    </div>
  );
}

function WeekView() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const dates = [30, 31, 1, 2, 3, 4, 5];
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-medium" style={{ color: notch.text }}>
          Aug 30 – Sep 5
        </p>
        <span className="text-[8px] rounded-full px-2 py-0.5 bg-white/10" style={{ color: notch.textMuted }}>
          Today
        </span>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-1 text-center">
        {days.map((day, i) => (
          <div key={`${day}-${i}`}>
            <p className="text-[8px]" style={{ color: notch.textDim }}>
              {day}
            </p>
            <p
              className={`mt-1 rounded-lg py-1 text-[9px] font-medium ${
                dates[i] === 31 ? "bg-white/14 text-white" : "text-white/70"
              }`}
            >
              {dates[i]}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[11px] font-medium" style={{ color: notch.text }}>
        No events
      </p>
    </div>
  );
}

function MonthView() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-medium" style={{ color: notch.text }}>
          August 2026
        </p>
        <span className="text-[8px] rounded-full px-2 py-0.5 bg-white/10" style={{ color: notch.textMuted }}>
          Today
        </span>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-1 text-center">
        {days.map((day) => (
          <p key={day} className="text-[8px]" style={{ color: notch.textDim }}>
            {day}
          </p>
        ))}
        <div />
        <div />
        {monthDays.map((date) => (
          <p
            key={date}
            className={`rounded-lg py-0.5 text-[8px] ${
              date === 31 ? "bg-[var(--color-sky-pop)] font-semibold text-white" : "text-white/65"
            }`}
          >
            {date}
          </p>
        ))}
      </div>
    </div>
  );
}

type IntentPanelProps = {
  autoCycleScopes?: boolean;
};

export function IntentPanel({ autoCycleScopes = false }: IntentPanelProps) {
  const reducedMotion = useReducedMotion();
  const [scope, setScope] = useState<Scope>("Today");

  useEffect(() => {
    if (!autoCycleScopes || reducedMotion) return;
    const interval = window.setInterval(() => {
      setScope((current) => {
        const index = scopes.indexOf(current);
        return scopes[(index + 1) % scopes.length]!;
      });
    }, 3500);
    return () => window.clearInterval(interval);
  }, [autoCycleScopes, reducedMotion]);

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[7px] font-bold uppercase tracking-wider" style={{ color: notch.textDim }}>
          Plan
        </p>
        <div className="flex rounded-full bg-white/[0.06] p-0.5">
          {scopes.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setScope(item)}
              className={`relative rounded-full px-2.5 py-0.5 text-[9px] font-medium ${
                scope === item ? "text-white" : "text-white/55"
              }`}
            >
              {scope === item ? (
                <motion.span
                  layoutId="intent-scope-pill"
                  className="absolute inset-0 rounded-full bg-[var(--color-sky-pop)]"
                  transition={{ type: "spring", visualDuration: 0.32, bounce: 0.16 }}
                />
              ) : null}
              <span className="relative z-10">{item}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={scope}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.28 }}
        >
          {scope === "Today" ? <TodayView /> : scope === "Week" ? <WeekView /> : <MonthView />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
