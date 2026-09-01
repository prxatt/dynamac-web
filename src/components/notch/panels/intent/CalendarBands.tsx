"use client";

import { useEffect, useRef, useState } from "react";
import { useNotchDemo } from "@/components/notch/NotchDemoContext";
import {
  calendarDays,
  focusableFromEvent,
  focusableId,
  type DayBand,
  type ScheduledEvent,
  type TodoItem,
} from "@/components/notch/intent-plan-data";
import { EventBand } from "@/components/notch/panels/intent/EventBand";
import { TodoRow } from "@/components/notch/panels/intent/TodoRow";

type CalendarBandsProps = {
  minimal?: boolean;
};

export function CalendarBands({ minimal = false }: CalendarBandsProps) {
  const dayScrollRef = useRef<HTMLDivElement>(null);
  const { todos, linkedItem, focusPhase, progress, startFocus, toggleTodo } = useNotchDemo();
  const [dayIndex, setDayIndex] = useState(
    () => calendarDays.findIndex((d) => d.isToday) || 0,
  );

  const activeId = focusPhase === "work" ? focusableId(linkedItem) : null;
  const todayTodos = todos.filter((t) => !t.done);

  useEffect(() => {
    const el = dayScrollRef.current;
    if (!el || minimal) return;
    const child = el.children[dayIndex] as HTMLElement | undefined;
    child?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [dayIndex, minimal]);

  if (minimal) {
    return (
      <p className="w-full text-left text-[9px] font-medium" style={{ color: "var(--widget-muted)" }}>
        Calendar · swipe days
      </p>
    );
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between px-0.5">
        <p className="text-[7px] font-bold uppercase tracking-wide" style={{ color: "var(--widget-muted)" }}>
          ↓ day · → tasks
        </p>
        <div className="flex gap-0.5">
          {calendarDays.map((day, i) => (
            <button
              key={day.key}
              type="button"
              onClick={() => setDayIndex(i)}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === dayIndex ? "0.85rem" : "0.3rem",
                backgroundColor:
                  i === dayIndex ? "var(--color-sky-pop)" : "var(--widget-border)",
              }}
              aria-label={`${day.dayLabel} ${day.date}`}
            />
          ))}
        </div>
      </div>

      <div
        ref={dayScrollRef}
        className="h-[5.25rem] snap-y snap-mandatory overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={(e) => {
          const el = e.currentTarget;
          const index = Math.round(el.scrollTop / el.clientHeight);
          if (index !== dayIndex && index >= 0 && index < calendarDays.length) {
            setDayIndex(index);
          }
        }}
      >
        {calendarDays.map((day) => (
          <div key={day.key} className="h-full min-h-full shrink-0 snap-start">
            <DayBandRow
              day={day}
              todos={day.isToday ? todayTodos : []}
              activeId={activeId}
              focusProgress={progress}
              onPlayEvent={(event) => startFocus(focusableFromEvent(event))}
              onPlayTodo={(todo) => startFocus({ kind: "todo", todo })}
              onToggleTodo={toggleTodo}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function DayBandRow({
  day,
  todos,
  activeId,
  focusProgress,
  onPlayEvent,
  onPlayTodo,
  onToggleTodo,
}: {
  day: DayBand;
  todos: TodoItem[];
  activeId: string | null;
  focusProgress: number;
  onPlayEvent: (event: ScheduledEvent) => void;
  onPlayTodo: (todo: TodoItem) => void;
  onToggleTodo: (id: string) => void;
}) {
  const taskScrollRef = useRef<HTMLDivElement>(null);

  const items = [
    ...todos.map((todo) => ({ type: "todo" as const, todo })),
    ...day.events.map((event) => ({ type: "event" as const, event })),
  ];

  return (
    <div
      className="flex h-full gap-1.5 overflow-hidden rounded-xl p-1.5"
      style={{
        backgroundColor: day.bandColor,
        outline: day.isToday ? "2px solid #2c2e2a" : undefined,
      }}
    >
      <div className="w-[2.5rem] shrink-0 text-black">
        <p className="text-[6px] font-bold uppercase leading-none opacity-70">{day.dayLabel.slice(0, 3)}</p>
        <p className="text-[18px] font-bold leading-none tabular-nums">
          {String(day.date).padStart(2, "0")}
        </p>
        <p className="text-[8px] font-bold">{day.monthLabel}</p>
      </div>

      <div
        ref={taskScrollRef}
        className="flex min-w-0 flex-1 snap-x snap-mandatory gap-1.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.length === 0 ? (
          <p className="flex flex-1 items-center justify-center text-[8px] font-bold text-black/50">
            Clear day
          </p>
        ) : (
          items.map((item) => (
            <div key={item.type === "todo" ? item.todo.id : item.event.id} className="w-[10.5rem] shrink-0 snap-center">
              {item.type === "todo" ? (
                <TodoRow
                  todo={item.todo}
                  active={activeId === item.todo.id}
                  focusProgress={focusProgress}
                  onToggle={() => onToggleTodo(item.todo.id)}
                  onPlay={() => onPlayTodo(item.todo)}
                />
              ) : (
                <EventBand
                  event={item.event}
                  active={activeId === item.event.id}
                  focusProgress={focusProgress}
                  onPlay={() => onPlayEvent(item.event)}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
