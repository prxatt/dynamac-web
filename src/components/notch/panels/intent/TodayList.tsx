"use client";

import { useMemo } from "react";
import { useNotchDemo } from "@/components/notch/NotchDemoContext";
import {
  focusableFromEvent,
  focusableId,
  type TodoItem,
} from "@/components/notch/intent-plan-data";
import { EventBand } from "@/components/notch/panels/intent/EventBand";
import { TodoRow } from "@/components/notch/panels/intent/TodoRow";

type TodayListProps = {
  minimal?: boolean;
};

export function TodayList({ minimal = false }: TodayListProps) {
  const { todos, events, linkedItem, focusPhase, progress, toggleTodo, startFocus } =
    useNotchDemo();

  const activeId = focusPhase === "work" ? focusableId(linkedItem) : null;

  const openTodos = useMemo(
    () => todos.filter((t) => !t.done && !t.timeLabel),
    [todos],
  );
  const timedTodos = useMemo(
    () => todos.filter((t) => !t.done && t.timeLabel),
    [todos],
  );

  if (minimal) {
    const open = todos.filter((t) => !t.done).length;
    return (
      <p className="w-full text-left text-[9px] font-medium" style={{ color: "var(--widget-muted)" }}>
        {open} open · Mon Aug 31
      </p>
    );
  }

  return (
    <div className="max-h-[5.25rem] space-y-1 overflow-y-auto pr-0.5">
      {openTodos.map((todo) => (
        <TodoRow
          key={todo.id}
          todo={todo}
          active={activeId === todo.id}
          focusProgress={progress}
          onToggle={() => toggleTodo(todo.id)}
          onPlay={() => startFocus({ kind: "todo", todo })}
        />
      ))}
      {timedTodos.map((todo) => (
        <TodoRow
          key={todo.id}
          todo={todo}
          active={activeId === todo.id}
          focusProgress={progress}
          onToggle={() => toggleTodo(todo.id)}
          onPlay={() => startFocus({ kind: "todo", todo })}
        />
      ))}
      {events.map((event) => (
        <EventBand
          key={event.id}
          event={event}
          active={activeId === event.id}
          focusProgress={progress}
          onPlay={() => startFocus(focusableFromEvent(event))}
        />
      ))}
    </div>
  );
}

export type { TodoItem };
