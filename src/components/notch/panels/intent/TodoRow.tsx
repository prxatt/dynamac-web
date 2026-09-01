"use client";

import {
  CATEGORY_LABELS,
  colorForCategory,
  type TodoItem,
} from "@/components/notch/intent-plan-data";
import { MiniFocusGrid } from "@/components/notch/panels/MiniFocusGrid";

type TodoRowProps = {
  todo: TodoItem;
  active?: boolean;
  focusProgress?: number;
  onToggle: () => void;
  onPlay: () => void;
};

export function TodoRow({ todo, active = false, focusProgress = 0, onToggle, onPlay }: TodoRowProps) {
  const accent = colorForCategory(todo.category);
  const label = CATEGORY_LABELS[todo.category];

  return (
    <div
      className="group flex items-center gap-1.5 rounded-xl px-2 py-1.5"
      style={{
        backgroundColor: accent,
        opacity: todo.done ? 0.55 : 1,
        boxShadow: active ? "0 0 0 2px rgba(255,255,255,0.85)" : undefined,
      }}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="rounded-full bg-black/25 px-1 py-px text-[6px] font-bold uppercase text-white">
            {label}
          </span>
          {todo.timeLabel ? (
            <span className="rounded-full bg-black/25 px-1.5 py-px text-[6px] font-bold text-white">
              {todo.timeLabel}
            </span>
          ) : (
            <span className="rounded-full bg-black/25 px-1.5 py-px text-[6px] font-bold uppercase text-white">
              Todo
            </span>
          )}
          {active ? (
            <span className="rounded-full bg-white/25 px-1.5 py-px text-[6px] font-bold uppercase text-white">
              Focus
            </span>
          ) : null}
        </div>
        <p
          className={`mt-0.5 truncate text-[10px] font-bold text-white ${todo.done ? "line-through" : ""}`}
        >
          {todo.title}
        </p>
        {active ? (
          <div className="mt-1">
            <MiniFocusGrid
              progress={focusProgress}
              active
              fillColor="#ffffff"
              mutedColor="rgba(0,0,0,0.28)"
              size="strip"
            />
          </div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={onPlay}
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black/25 text-[8px] font-bold text-white"
        aria-label={`Start focus on ${todo.title}`}
      >
        ▶
      </button>

      <button
        type="button"
        onClick={onToggle}
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black/25"
        aria-label={todo.done ? "Mark incomplete" : "Mark complete"}
      >
        {todo.done ? <span className="text-[8px] font-bold text-white">✓</span> : null}
      </button>
    </div>
  );
}
