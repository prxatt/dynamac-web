"use client";

import { useMemo } from "react";
import { useNotchDemo } from "@/components/notch/NotchDemoContext";
import {
  focusableFromEvent,
  focusableId,
  INTENT_PANEL_FRAME,
  type DayBand,
} from "@/components/notch/intent-plan-data";
import { DateRail } from "@/components/notch/panels/intent/DateRail";
import { EventBand } from "@/components/notch/panels/intent/EventBand";
import {
  HIDDEN_SCROLL,
  IntentPanelFrame,
} from "@/components/notch/panels/intent/IntentPanelFrame";
import { TodoRow } from "@/components/notch/panels/intent/TodoRow";

type CalendarBandsProps = {
  minimal?: boolean;
};

export function CalendarBands({ minimal = false }: CalendarBandsProps) {
  const {
    calendarDays,
    selectedDayKey,
    setSelectedDayKey,
    todos,
    linkedItem,
    focusPhase,
    progress,
    toggleTodo,
    startFocus,
    openItemSheet,
  } = useNotchDemo();

  const dayIndex = Math.max(
    0,
    calendarDays.findIndex((d) => d.key === selectedDayKey),
  );
  const day = calendarDays[dayIndex] ?? calendarDays[0];
  const activeId = focusPhase === "work" ? focusableId(linkedItem) : null;

  const { dayTodos, dayEvents } = useMemo(
    () => getDayAgenda(day, todos),
    [day, todos],
  );

  if (minimal) {
    return (
      <p className="w-full text-left text-[9px] font-medium" style={{ color: "var(--widget-muted)" }}>
        Calendar · {day.dayLabel.slice(0, 3)}
      </p>
    );
  }

  function goPrev() {
    const prev = calendarDays[dayIndex - 1];
    if (prev) setSelectedDayKey(prev.key);
  }

  function goNext() {
    const next = calendarDays[dayIndex + 1];
    if (next) setSelectedDayKey(next.key);
  }

  return (
    <IntentPanelFrame variant="today" className="flex gap-2">
      <DateRail
        day={day}
        showTodayBadge={day.isToday}
        onPrev={goPrev}
        onNext={goNext}
        canPrev={dayIndex > 0}
        canNext={dayIndex < calendarDays.length - 1}
      />
      <div className={`min-w-0 flex-1 max-h-[5.5rem] ${HIDDEN_SCROLL}`}>
        {dayTodos.length === 0 && dayEvents.length === 0 ? (
          <p
            className="flex h-full min-h-[3rem] items-center text-[8px] font-semibold"
            style={{ color: INTENT_PANEL_FRAME.inkMuted }}
          >
            Clear day — tap + to add
          </p>
        ) : (
          <div className="space-y-1.5">
            {dayTodos.map((todo) => (
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
                onSelect={() =>
                  openItemSheet({ kind: "event", id: event.id, dayKey: day.key })
                }
                onPlay={() => startFocus(focusableFromEvent(event))}
              />
            ))}
          </div>
        )}
      </div>
    </IntentPanelFrame>
  );
}

function getDayAgenda(day: DayBand, todos: ReturnType<typeof useNotchDemo>["todos"]) {
  const openTodos = todos.filter(
    (t) =>
      !t.done &&
      !t.timeLabel &&
      (t.dayKey === day.key || (day.isToday && !t.dayKey)),
  );
  const timedTodos = todos.filter(
    (t) =>
      !t.done &&
      t.timeLabel &&
      (t.dayKey === day.key || (day.isToday && !t.dayKey)),
  );
  const dayEvents = [...day.events].sort((a, b) => a.startMinutes - b.startMinutes);
  return {
    dayTodos: [...openTodos, ...timedTodos],
    dayEvents,
  };
}
