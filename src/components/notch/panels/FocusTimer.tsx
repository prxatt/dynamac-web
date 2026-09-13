"use client";

import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { useNotchDemo } from "@/components/notch/NotchDemoContext";
import {
  focusableCategory,
  focusableLabel,
} from "@/components/notch/intent-plan-data";
import { formatFocusTime, MiniFocusGrid } from "@/components/notch/panels/MiniFocusGrid";

/** Mac Intent focus card fills — distinct from site Bauhaus event chips. */
const FOCUS_IDLE_FILL = "#243A5C";
const FOCUS_IDLE_ALT = "#3A2E5C";
const BREAK_CARD_FILL = "#388048";
const FOCUS_END = "#E04F3D";
const BREAK_GREEN = "#4A9E32";
const INK = "#1A1A18";
const FOCUS_BLOCK_LIT = "#48A8FA";
const BREAK_BLOCK_LIT = "#D2F5AF";
const BREAK_BLOCK_MUTED = "rgba(28,72,36,0.45)";
const FOCUS_TRACK = "rgba(255,255,255,0.22)";
const TODAY_ORANGE = "#F0A030";

const WORK_CATEGORY_FILL: Record<string, string> = {
  work: "#2B5EA8",
  personal: "#D4556A",
  hobby: "#7B4FD4",
  activity: "#3DAA3D",
};

function colorDistanceSq(a: string, b: string): number {
  const pa = parseHex(a);
  const pb = parseHex(b);
  if (!pa || !pb) return 1;
  const dr = pa.r - pb.r;
  const dg = pa.g - pb.g;
  const db = pa.b - pb.b;
  return dr * dr + dg * dg + db * db;
}

function parseHex(hex: string): { r: number; g: number; b: number } | null {
  const h = hex.replace("#", "").trim();
  if (h.length !== 6) return null;
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
  };
}

function focusCardFill(
  phase: "idle" | "work" | "break",
  category: string,
  customColor?: string,
): string {
  if (phase === "break") return BREAK_CARD_FILL;
  if (phase === "idle") return FOCUS_IDLE_FILL;
  const preferred = WORK_CATEGORY_FILL[category] ?? customColor ?? FOCUS_IDLE_ALT;
  if (colorDistanceSq(preferred, TODAY_ORANGE) < 0.12) return FOCUS_IDLE_ALT;
  return preferred;
}

function StatusPill({ children }: { children: string }) {
  return (
    <span className="rounded-full bg-black/28 px-[7px] py-0.5 text-[7px] font-bold tracking-wide text-white uppercase">
      {children}
    </span>
  );
}

function DurationButton({
  label,
  onClick,
  a11y,
}: {
  label: string;
  onClick: () => void;
  a11y: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={a11y}
      className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-black/28 text-[14px] font-bold text-white"
    >
      {label}
    </button>
  );
}

function ActionButton({
  label,
  fill,
  color,
  onClick,
}: {
  label: string;
  fill: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-[10px] py-2 text-[11px] font-bold transition-transform hover:brightness-105 active:scale-[0.97]"
      style={{ backgroundColor: fill, color }}
    >
      {label}
    </button>
  );
}

/** Intent focus column — parity with IntentFocusTimer.swift */
export function FocusTimer() {
  const reducedMotion = useReducedMotion();
  const {
    focusPhase,
    secondsLeft,
    breakSecondsLeft,
    progress,
    breakProgress,
    linkedItem,
    configuredFocusMinutes,
    focusGridCellCount,
    adjustFocusMinutes,
    focusDurationStepMinutes,
    customCategories,
    startFocus,
    endFocus,
    skipBreak,
  } = useNotchDemo();

  const category = focusableCategory(linkedItem);
  const customColor =
    typeof category === "string" && !(category in WORK_CATEGORY_FILL)
      ? customCategories[category]?.color
      : undefined;
  const cardFill = focusCardFill(focusPhase, category, customColor);
  const taskLabel = focusableLabel(linkedItem);
  const isWork = focusPhase === "work";
  const isBreak = focusPhase === "break";
  const isIdle = focusPhase === "idle";
  const isRunning = isWork || isBreak;

  const primaryTime = isBreak
    ? formatFocusTime(breakSecondsLeft)
    : isWork
      ? formatFocusTime(secondsLeft)
      : formatFocusTime(configuredFocusMinutes * 60);

  const gridProgress = isBreak ? breakProgress : isWork ? progress : 0;
  const blockFill = isBreak ? BREAK_BLOCK_LIT : isWork ? "#ffffff" : FOCUS_BLOCK_LIT;
  const blockMuted = isBreak ? BREAK_BLOCK_MUTED : FOCUS_TRACK;

  return (
    <div className="flex w-[12.25rem] shrink-0 flex-col items-stretch gap-1.5 self-stretch">
      <div
        className="relative overflow-hidden rounded-xl p-2"
        style={{ backgroundColor: cardFill }}
        aria-label={`Focus timer · ${isBreak ? "Break" : isWork ? "Focus" : "Ready"}`}
      >
        {isBreak && !reducedMotion ? (
          <div
            className="pointer-events-none absolute inset-0 animate-pulse rounded-xl"
            style={{
              background:
                "linear-gradient(to bottom right, rgba(255,255,255,0.12), rgba(210,245,175,0.08))",
            }}
            aria-hidden
          />
        ) : null}

        <div className="relative flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <StatusPill>{isBreak ? "Break" : isWork ? "Focus" : "Ready"}</StatusPill>
            {isWork ? <StatusPill>Live</StatusPill> : null}
            <span className="min-w-0 flex-1" />
            {isIdle && configuredFocusMinutes === 25 ? (
              <span className="shrink-0 text-[7px] font-semibold whitespace-nowrap text-white/65">
                then 5m break
              </span>
            ) : null}
          </div>

          {isIdle ? (
            <div className="flex items-center gap-1">
              <DurationButton
                label="−"
                a11y="Decrease focus duration"
                onClick={() => adjustFocusMinutes(-focusDurationStepMinutes)}
              />
              <p className="min-w-0 flex-1 text-center font-mono text-[22px] font-bold leading-none text-white tabular-nums">
                {primaryTime}
              </p>
              <DurationButton
                label="+"
                a11y="Increase focus duration"
                onClick={() => adjustFocusMinutes(focusDurationStepMinutes)}
              />
            </div>
          ) : (
            <div className="flex w-full flex-col items-stretch gap-1">
              <p className="text-center font-mono text-[22px] font-bold leading-none text-white tabular-nums">
                {primaryTime}
              </p>
              {isWork && linkedItem ? (
                <p className="truncate text-[10px] font-semibold text-white">{taskLabel}</p>
              ) : null}
              {isBreak ? (
                <p className="text-[10px] font-semibold text-white/92">Take a breath</p>
              ) : null}
            </div>
          )}

          <MiniFocusGrid
            progress={gridProgress}
            active={isRunning}
            fillColor={blockFill}
            mutedColor={blockMuted}
            size={isRunning ? "running" : "idle"}
            matrix
            cellCount={focusGridCellCount}
            fitHeight={72}
          />
        </div>
      </div>

      {isBreak ? (
        <ActionButton label="Skip break" fill="rgba(255,255,255,0.92)" color={INK} onClick={skipBreak} />
      ) : isWork ? (
        <div className="flex flex-col gap-1">
          <ActionButton
            label="End session"
            fill={FOCUS_END}
            color="#fff"
            onClick={() => endFocus(false)}
          />
          {linkedItem?.kind === "todo" ? (
            <button
              type="button"
              onClick={() => endFocus(true)}
              className="text-center text-[9px] font-bold"
              style={{ color: BREAK_GREEN }}
            >
              Complete task
            </button>
          ) : null}
        </div>
      ) : (
        <ActionButton
          label="Start focus"
          fill={INK}
          color="#fff"
          onClick={() => startFocus(null)}
        />
      )}
    </div>
  );
}
