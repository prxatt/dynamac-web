"use client";

import { useMemo } from "react";
import { useNotchDemo } from "@/components/notch/NotchDemoContext";
import {
  focusableFromEvent,
  focusableId,
  formatBandDate,
} from "@/components/notch/intent-plan-data";
import { EventBand } from "@/components/notch/panels/intent/EventBand";
import {
  HIDDEN_SCROLL,
  IntentPanelFrame,
} from "@/components/notch/panels/intent/IntentPanelFrame";
import { TodayDateRail } from "@/components/notch/panels/intent/TodayDateRail";
import { TodoRow } from "@/components/notch/panels/intent/TodoRow";

type TodayListProps = {
  minimal?: boolean;
};

export function TodayList({ minimal = false }: TodayListProps) {
  const {
    todos,
    calendarDays,
    selectedDayKey,
    linkedItem,
    focusPhase,
    progress,
    toggleTodo,
    startFocus,
    openItemSheet,
  } = useNotchDemo();

  const activeId = focusPhase === "work" ? focusableId(linkedItem) : null;
  const day = calendarDays.find((d) => d.key === selectedDayKey) ?? calendarDays[0];

  const openTodos = useMemo(
    () =>
      todos.filter(
        (t) =>
          !t.done &&
          !t.timeLabel &&
          (t.dayKey === day.key || (day.isToday && !t.dayKey)),
      ),
    [todos, day.key, day.isToday],
  );
  const timedTodos = useMemo(
    () =>
      todos.filter(
        (t) =>
          !t.done &&
          t.timeLabel &&
          (t.dayKey === day.key || (day.isToday && !t.dayKey)),
      ),
    [todos, day.key, day.isToday],
  );
  const dayEvents = day.events;

  if (minimal) {
    const open = todos.filter((t) => !t.done).length;
    return (
      <p className="w-full text-left text-[9px] font-medium" style={{ color: "var(--widget-muted)" }}>
        {open} open · {formatBandDate(day)}
      </p>
    );
  }

  return (
    <IntentPanelFrame variant="today" className="flex gap-2">
      <TodayDateRail />
      <div className={`min-w-0 flex-1 space-y-1.5 max-h-[5.5rem] ${HIDDEN_SCROLL}`}>
        {openTodos.map((todo) => (
          <TodoRow
            key={todo.id}
            todo={todo}
            active={activeId === todo.id}
            focusProgress={progress}
            onSelect={() => openItemSheet({ kind: "todo", id: todo.id })}
            onToggle={() => toggleTodo(todo.id)}
          />
        ))}
        {timedTodos.map((todo) => (
          <TodoRow
            key={todo.id}
            todo={todo}
            active={activeId === todo.id}
            focusProgress={progress}
            onSelect={() => openItemSheet({ kind: "todo", id: todo.id })}
            onToggle={() => toggleTodo(todo.id)}
          />
        ))}
        {dayEvents.map((event) => (
          <EventBand
            key={event.id}
            event={event}
            active={activeId === event.id}
            focusProgress={progress}
            onSelect={() => openItemSheet({ kind: "event", id: event.id, dayKey: day.key })}
            onPlay={() => startFocus(focusableFromEvent(event))}
          />
        ))}
      </div>
    </IntentPanelFrame>
  );
}
