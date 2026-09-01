"use client";

import { useEffect, useRef, useState } from "react";
import {
  BUILTIN_CATEGORIES,
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  clampMinutes,
  colorForCategory,
  CUSTOM_CATEGORY_PALETTE,
  labelForCategory,
  minutesToLabel,
  TIME_SLIDER_END,
  TIME_SLIDER_START,
  TIME_SLIDER_STEP,
  type CustomCategory,
  type TaskCategory,
} from "@/components/notch/intent-plan-data";

type Ink = string;

export function MetaField({
  label,
  ink,
  isAdd,
  children,
}: {
  label: string;
  ink: Ink;
  isAdd: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex min-h-[2.35rem] flex-col justify-between rounded-lg px-2 py-1.5"
      style={{ backgroundColor: isAdd ? "rgba(0,0,0,0.09)" : "rgba(0,0,0,0.15)", color: ink }}
    >
      <p className="text-[6px] font-bold uppercase leading-none tracking-[0.06em] opacity-55">
        {label}
      </p>
      <div className="mt-1.5 min-h-[11px] text-[9px] font-bold leading-none">{children}</div>
    </div>
  );
}

type PickerShellProps = {
  ink: Ink;
  value: string;
  open: boolean;
  onToggle: () => void;
  dotColor?: string;
  children?: React.ReactNode;
};

function PickerShell({ ink, value, open, onToggle, dotColor, children }: PickerShellProps) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-1 text-left"
        style={{ color: ink }}
      >
        <span className="flex min-w-0 items-center gap-1 truncate">
          {dotColor ? (
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: dotColor }}
            />
          ) : null}
          <span className="truncate">{value}</span>
        </span>
        <span className="shrink-0 text-[7px] opacity-50">{open ? "▴" : "▾"}</span>
      </button>
      {open ? children : null}
    </div>
  );
}

const PICKER_PANEL_STYLE = {
  backgroundColor: "#fff8eb",
  border: "1.5px solid rgba(26,26,24,0.18)",
  boxShadow: "0 6px 18px rgba(26,26,24,0.18)",
} as const;

type CategoryPickerProps = {
  value: TaskCategory;
  onChange: (category: TaskCategory) => void;
  customCategories: Record<string, CustomCategory>;
  onCreateCategory: (label: string, color: string) => string;
  ink: Ink;
  isAdd: boolean;
};

export function CategoryPicker({
  value,
  onChange,
  customCategories,
  onCreateCategory,
  ink,
}: CategoryPickerProps) {
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState("");
  const [draftColor, setDraftColor] = useState<string>(CUSTOM_CATEGORY_PALETTE[0]);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setCreating(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  const customList = Object.values(customCategories);

  function pick(category: TaskCategory) {
    onChange(category);
    setOpen(false);
    setCreating(false);
    setDraft("");
  }

  function commitCustom() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    pick(onCreateCategory(trimmed, draftColor));
  }

  return (
    <div ref={rootRef} className="relative z-30">
      <PickerShell
        ink={ink}
        value={labelForCategory(value, customCategories)}
        open={open}
        onToggle={() => setOpen((v) => !v)}
        dotColor={colorForCategory(value, customCategories)}
      />
      {open ? (
        <div
          className="absolute bottom-[calc(100%+6px)] left-0 right-0 z-50 flex max-h-[7rem] flex-col gap-0.5 overflow-y-auto rounded-lg p-1.5"
          style={PICKER_PANEL_STYLE}
        >
          {BUILTIN_CATEGORIES.map((id) => (
            <PickerOption
              key={id}
              label={CATEGORY_LABELS[id]}
              dot={CATEGORY_COLORS[id]}
              active={value === id}
              ink={ink}
              onClick={() => pick(id)}
            />
          ))}
          {customList.map((cat) => (
            <PickerOption
              key={cat.id}
              label={cat.label}
              dot={cat.color}
              active={value === cat.id}
              ink={ink}
              onClick={() => pick(cat.id)}
            />
          ))}
          {creating ? (
            <div className="space-y-1 rounded-md bg-black/5 p-1.5">
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") commitCustom();
                  if (e.key === "Escape") setCreating(false);
                }}
                placeholder="Category name…"
                className="w-full rounded-md bg-white px-1.5 py-1 text-[8px] font-semibold text-[#1a1a18] outline-none ring-1 ring-black/10"
                autoFocus
              />
              <div className="flex flex-wrap items-center gap-1">
                {CUSTOM_CATEGORY_PALETTE.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setDraftColor(color)}
                    className="h-3.5 w-3.5 rounded-full"
                    style={{
                      backgroundColor: color,
                      outline: draftColor === color ? "2px solid #1a1a18" : undefined,
                    }}
                    aria-label={`Pick ${color}`}
                  />
                ))}
                <label className="relative h-3.5 w-3.5 cursor-pointer overflow-hidden rounded-full ring-1 ring-black/15">
                  <input
                    type="color"
                    value={draftColor}
                    onChange={(e) => setDraftColor(e.target.value)}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />
                  <span
                    className="block h-full w-full"
                    style={{
                      background: `conic-gradient(${draftColor} 0 75%, #e8e4dc 75% 100%)`,
                    }}
                  />
                </label>
              </div>
              <button
                type="button"
                onClick={commitCustom}
                className="w-full rounded-md bg-[#1a1a18] px-2 py-1 text-[7px] font-bold text-white"
              >
                Add category
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setCreating(true)}
              className="rounded-md px-1.5 py-1 text-left text-[8px] font-bold text-[#1a1a18] hover:bg-black/6"
            >
              + New category
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

function PickerOption({
  label,
  dot,
  active,
  ink,
  onClick,
}: {
  label: string;
  dot: string;
  active: boolean;
  ink: Ink;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-1.5 rounded-md px-1.5 py-1 text-left text-[8px] font-bold"
      style={{
        backgroundColor: active ? "rgba(26,26,24,0.1)" : undefined,
        color: ink,
      }}
    >
      <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: dot }} />
      {label}
    </button>
  );
}

type TimeSliderProps = {
  valueMinutes: number | null;
  onChange: (minutes: number | null) => void;
  ink: Ink;
  allowClear?: boolean;
};

export function TimeSlider({ valueMinutes, onChange, ink, allowClear = true }: TimeSliderProps) {
  const hasTime = valueMinutes !== null;
  const sliderValue = valueMinutes ?? 9 * 60;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-1">
        <span className="text-[8px] font-bold" style={{ color: ink }}>
          {hasTime ? minutesToLabel(valueMinutes!) : "Anytime"}
        </span>
        {allowClear && hasTime ? (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="rounded px-1 py-px text-[6px] font-bold opacity-60 hover:opacity-100"
            style={{ color: ink }}
          >
            Clear
          </button>
        ) : null}
      </div>
      <input
        type="range"
        min={TIME_SLIDER_START}
        max={TIME_SLIDER_END}
        step={TIME_SLIDER_STEP}
        value={sliderValue}
        onChange={(e) => onChange(clampMinutes(Number(e.target.value)))}
        className="h-1 w-full cursor-pointer accent-[#1a1a18]"
        aria-label="Pick time"
      />
    </div>
  );
}

const DURATION_PRESETS = [
  { label: "30m", minutes: 30 },
  { label: "1h", minutes: 60 },
  { label: "90m", minutes: 90 },
] as const;

type DurationPickerProps = {
  valueMinutes: number;
  onChange: (minutes: number) => void;
  ink: Ink;
};

export function DurationPicker({ valueMinutes, onChange, ink }: DurationPickerProps) {
  return (
    <div className="space-y-1">
      <div className="flex gap-0.5">
        {DURATION_PRESETS.map((preset) => (
          <button
            key={preset.minutes}
            type="button"
            onClick={() => onChange(preset.minutes)}
            className="rounded-full px-1.5 py-px text-[6px] font-bold"
            style={{
              backgroundColor:
                valueMinutes === preset.minutes ? "rgba(26,26,24,0.88)" : "rgba(0,0,0,0.1)",
              color: valueMinutes === preset.minutes ? "#fff" : ink,
            }}
          >
            {preset.label}
          </button>
        ))}
      </div>
      <input
        type="range"
        min={15}
        max={180}
        step={15}
        value={valueMinutes}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1 w-full cursor-pointer accent-[#1a1a18]"
        aria-label="Duration"
      />
      <span className="text-[7px] font-semibold opacity-70" style={{ color: ink }}>
        {valueMinutes} min
      </span>
    </div>
  );
}

const STATUS_OPTIONS = ["Open", "Done"] as const;
type TaskStatus = (typeof STATUS_OPTIONS)[number];

type StatusPickerProps = {
  value: TaskStatus;
  onChange: (status: TaskStatus) => void;
  ink: Ink;
  isAdd: boolean;
  disabled?: boolean;
};

export function StatusPicker({ value, onChange, ink, disabled }: StatusPickerProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  if (disabled) {
    return <span>{value}</span>;
  }

  return (
    <div ref={rootRef} className="relative z-30">
      <PickerShell
        ink={ink}
        value={value}
        open={open}
        onToggle={() => setOpen((v) => !v)}
      />
      {open ? (
        <div
          className="absolute bottom-[calc(100%+6px)] left-0 right-0 z-50 flex flex-col gap-0.5 rounded-lg p-1.5"
          style={PICKER_PANEL_STYLE}
        >
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => {
                onChange(status);
                setOpen(false);
              }}
              className="rounded-md px-1.5 py-1 text-left text-[8px] font-bold text-[#1a1a18] hover:bg-black/6"
              style={{
                backgroundColor: value === status ? "rgba(26,26,24,0.1)" : undefined,
              }}
            >
              {status}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export type { TaskStatus };
