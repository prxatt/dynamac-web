"use client";

import { useEffect, useRef, useState } from "react";
import {
  BUILTIN_CATEGORIES,
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  colorForCategory,
  labelForCategory,
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

type CategoryPickerProps = {
  value: TaskCategory;
  onChange: (category: TaskCategory) => void;
  customCategories: Record<string, CustomCategory>;
  onCreateCategory: (label: string) => string;
  ink: Ink;
  isAdd: boolean;
};

export function CategoryPicker({
  value,
  onChange,
  customCategories,
  onCreateCategory,
  ink,
  isAdd,
}: CategoryPickerProps) {
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
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
    pick(onCreateCategory(trimmed));
  }

  return (
    <div ref={rootRef}>
      <PickerShell
        ink={ink}
        value={labelForCategory(value, customCategories)}
        open={open}
        onToggle={() => setOpen((v) => !v)}
        dotColor={colorForCategory(value, customCategories)}
      >
        <div
          className="absolute left-0 right-0 top-[calc(100%+4px)] z-20 flex flex-col gap-0.5 rounded-lg p-1 shadow-lg"
          style={{
            backgroundColor: isAdd ? "#f5e6c8" : "rgba(0,0,0,0.88)",
            color: ink,
          }}
        >
          {BUILTIN_CATEGORIES.map((id) => (
            <PickerOption
              key={id}
              label={CATEGORY_LABELS[id]}
              dot={CATEGORY_COLORS[id]}
              active={value === id}
              ink={ink}
              isAdd={isAdd}
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
              isAdd={isAdd}
              onClick={() => pick(cat.id)}
            />
          ))}
          {creating ? (
            <div className="flex items-center gap-1 px-1 py-0.5">
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") commitCustom();
                  if (e.key === "Escape") setCreating(false);
                }}
                placeholder="Name…"
                className="min-w-0 flex-1 rounded bg-white/50 px-1.5 py-0.5 text-[8px] font-semibold outline-none"
                autoFocus
              />
              <button
                type="button"
                onClick={commitCustom}
                className="rounded bg-black/80 px-1.5 py-0.5 text-[7px] font-bold text-white"
              >
                Add
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setCreating(true)}
              className="rounded-md px-1.5 py-1 text-left text-[8px] font-bold opacity-80 hover:bg-black/8"
            >
              + New category
            </button>
          )}
        </div>
      </PickerShell>
    </div>
  );
}

function PickerOption({
  label,
  dot,
  active,
  ink,
  isAdd,
  onClick,
}: {
  label: string;
  dot: string;
  active: boolean;
  ink: Ink;
  isAdd: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-1.5 rounded-md px-1.5 py-1 text-left text-[8px] font-bold"
      style={{
        backgroundColor: active ? (isAdd ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.15)") : undefined,
        color: ink,
      }}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: dot }} />
      {label}
    </button>
  );
}

const TIME_PRESETS = ["Anytime", "9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM"] as const;

type TimePickerProps = {
  value: string;
  onChange: (time: string) => void;
  ink: Ink;
  isAdd: boolean;
};

export function TimePicker({ value, onChange, ink, isAdd }: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const display = value || "Anytime";

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  function pick(time: string) {
    onChange(time === "Anytime" ? "" : time);
    setOpen(false);
  }

  return (
    <div ref={rootRef}>
      <PickerShell
        ink={ink}
        value={display}
        open={open}
        onToggle={() => setOpen((v) => !v)}
      >
        <div
          className="absolute left-0 right-0 top-[calc(100%+4px)] z-20 flex flex-col gap-0.5 rounded-lg p-1 shadow-lg"
          style={{
            backgroundColor: isAdd ? "#f5e6c8" : "rgba(0,0,0,0.88)",
            color: ink,
          }}
        >
          {TIME_PRESETS.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => pick(time)}
              className="rounded-md px-1.5 py-1 text-left text-[8px] font-bold hover:bg-black/8"
              style={{
                backgroundColor:
                  (time === "Anytime" && !value) || value === time
                    ? "rgba(0,0,0,0.1)"
                    : undefined,
              }}
            >
              {time}
            </button>
          ))}
        </div>
      </PickerShell>
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

export function StatusPicker({ value, onChange, ink, isAdd, disabled }: StatusPickerProps) {
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
    <div ref={rootRef}>
      <PickerShell
        ink={ink}
        value={value}
        open={open}
        onToggle={() => setOpen((v) => !v)}
      >
        <div
          className="absolute left-0 right-0 top-[calc(100%+4px)] z-20 flex flex-col gap-0.5 rounded-lg p-1 shadow-lg"
          style={{
            backgroundColor: isAdd ? "#f5e6c8" : "rgba(0,0,0,0.88)",
            color: ink,
          }}
        >
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => {
                onChange(status);
                setOpen(false);
              }}
              className="rounded-md px-1.5 py-1 text-left text-[8px] font-bold hover:bg-black/8"
              style={{
                backgroundColor: value === status ? "rgba(0,0,0,0.1)" : undefined,
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </PickerShell>
    </div>
  );
}

export type { TaskStatus };
