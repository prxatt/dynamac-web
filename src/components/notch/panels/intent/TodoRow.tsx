"use client";

import {
  colorForCategory,
  labelForCategory,
  type TodoItem,
} from "@/components/notch/intent-plan-data";
import { useNotchDemo } from "@/components/notch/NotchDemoContext";
import { MiniFocusGrid } from "@/components/notch/panels/MiniFocusGrid";

type TodoRowProps = {
  todo: TodoItem;
  active?: boolean;
  focusProgress?: number;
  completedView?: boolean;
  onSelect?: () => void;
  onToggle: () => void;
};

export function TodoRow({
  todo,
  active = false,
  focusProgress = 0,
  completedView = false,
  onSelect,
  onToggle,
}: TodoRowProps) {
  const { customCategories } = useNotchDemo();
  const accent = colorForCategory(todo.category, customCategories);
  const label = labelForCategory(todo.category, customCategories);

  return (
    <div
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={onSelect}
      onKeyDown={
        onSelect
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect();
              }
            }
          : undefined
      }
      className={`flex cursor-pointer items-center gap-2 rounded-xl px-2.5 py-2 ${onSelect ? "hover:brightness-[1.04]" : ""}`}
      style={{
        backgroundColor: accent,
        opacity: todo.done && !completedView ? 0.72 : 1,
        outline: active ? "2px solid rgba(0,0,0,0.22)" : undefined,
      }}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1">
          <span className="rounded-full bg-black/20 px-1.5 py-px text-[6px] font-bold uppercase text-white">
            {label}
          </span>
          <span className="rounded-full bg-black/20 px-1.5 py-px text-[6px] font-bold uppercase text-white">
            {todo.timeLabel ? todo.timeLabel : "Todo"}
          </span>
          {todo.done ? (
            <span className="rounded-full bg-black/25 px-1.5 py-px text-[6px] font-bold text-white">
              Done
            </span>
          ) : null}
        </div>
        <p
          className={`mt-0.5 truncate text-[10px] font-bold leading-snug text-white ${todo.done ? "line-through" : ""}`}
        >
          {todo.title}
        </p>
        {active ? (
          <div className="mt-1.5">
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
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="grid h-5 w-5 shrink-0 place-items-center rounded-full transition-colors"
        style={{
          backgroundColor: todo.done ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.2)",
          color: todo.done ? accent : "#fff",
          boxShadow: todo.done ? undefined : "inset 0 0 0 1.5px rgba(255,255,255,0.6)",
        }}
        aria-label={todo.done ? "Mark incomplete" : "Mark complete"}
      >
        <span className="text-[10px] font-bold leading-none">
          {todo.done ? "✓" : ""}
        </span>
      </button>
    </div>
  );
}
