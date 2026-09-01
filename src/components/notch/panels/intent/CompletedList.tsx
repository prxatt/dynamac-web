"use client";

import { useMemo } from "react";
import { useNotchDemo } from "@/components/notch/NotchDemoContext";
import {
  getTodayBand,
  INTENT_PANEL_FRAME,
  isEventPast,
} from "@/components/notch/intent-plan-data";
import { EventBand } from "@/components/notch/panels/intent/EventBand";
import {
  HIDDEN_SCROLL,
  IntentPanelFrame,
} from "@/components/notch/panels/intent/IntentPanelFrame";
import { TodayDateRail } from "@/components/notch/panels/intent/TodayDateRail";
import { TodoRow } from "@/components/notch/panels/intent/TodoRow";

export function CompletedTodayList() {
  const { todos, toggleTodo, openItemSheet } = useNotchDemo();
  const today = getTodayBand();

  const completed = useMemo(
    () =>
      todos.filter(
        (t) => t.done && (t.dayKey === today.key || (!t.dayKey && today.isToday)),
      ),
    [todos, today.key, today.isToday],
  );

  const pastEvents = useMemo(
    () => today.events.filter((e) => isEventPast(e)),
    [today.events],
  );

  return (
    <IntentPanelFrame variant="today" className="flex gap-2">
      <TodayDateRail />
      <div className={`min-w-0 flex-1 max-h-[5.5rem] ${HIDDEN_SCROLL}`}>
        <p
          className="mb-1.5 text-[6px] font-bold uppercase tracking-wide"
          style={{ color: INTENT_PANEL_FRAME.inkMuted }}
        >
          Completed · {completed.length + pastEvents.length}
        </p>
        {completed.length === 0 && pastEvents.length === 0 ? (
          <p className="py-2 text-[8px] font-semibold" style={{ color: INTENT_PANEL_FRAME.inkMuted }}>
            Nothing completed yet
          </p>
        ) : (
          <div className="space-y-1.5">
            {completed.map((todo) => (
              <TodoRow
                key={todo.id}
                todo={todo}
                completedView
                onSelect={() => openItemSheet({ kind: "todo", id: todo.id })}
                onToggle={() => toggleTodo(todo.id)}
              />
            ))}
            {pastEvents.map((event) => (
              <EventBand
                key={event.id}
                event={event}
                completedView
                onSelect={() =>
                  openItemSheet({ kind: "event", id: event.id, dayKey: today.key })
                }
                onPlay={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </IntentPanelFrame>
  );
}

export function CompletedCalendarList() {
  const { todos, calendarDays, toggleTodo, openItemSheet } = useNotchDemo();
  const today = getTodayBand();

  const daysWithCompleted = useMemo(() => {
    return calendarDays
      .map((day) => {
        const dayTodos = todos.filter(
          (t) =>
            t.done &&
            (t.dayKey === day.key || (!t.dayKey && day.key === today.key)),
        );
        const dayEvents = day.events.filter((e) => isEventPast(e));
        return { day, todos: dayTodos, events: dayEvents };
      })
      .filter((entry) => entry.todos.length > 0 || entry.events.length > 0);
  }, [calendarDays, todos, today.key]);

  const total = daysWithCompleted.reduce(
    (n, d) => n + d.todos.length + d.events.length,
    0,
  );

  return (
    <IntentPanelFrame variant="calendar">
      <div className={`max-h-[5.5rem] ${HIDDEN_SCROLL}`}>
        <p
          className="mb-1 text-[6px] font-bold uppercase tracking-wide"
          style={{ color: INTENT_PANEL_FRAME.inkMuted }}
        >
          Completed · {total}
        </p>
        {daysWithCompleted.length === 0 ? (
          <p className="py-2 text-[8px] font-semibold" style={{ color: INTENT_PANEL_FRAME.inkMuted }}>
            Nothing completed yet
          </p>
        ) : (
          <div className="space-y-1">
            {daysWithCompleted.map(({ day, todos: dayTodos, events: dayEvents }) => (
              <div
                key={day.key}
                className="overflow-hidden rounded-lg p-1"
                style={{
                  backgroundColor: day.bandColor,
                  outline: day.isToday ? "1.5px solid #1a1a18" : undefined,
                }}
              >
                <div className="flex gap-1.5">
                  <div className="flex w-[2.35rem] shrink-0 flex-col items-center justify-center text-center text-black">
                    <p className="text-[5px] font-bold uppercase leading-none opacity-70">
                      {day.dayLabel.slice(0, 3)}
                    </p>
                    <p className="text-[13px] font-bold leading-none tabular-nums">
                      {String(day.date).padStart(2, "0")}
                    </p>
                    <p className="text-[6px] font-bold leading-none">{day.monthLabel}</p>
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    {dayTodos.map((todo) => (
                      <TodoRow
                        key={todo.id}
                        todo={todo}
                        completedView
                        onSelect={() => openItemSheet({ kind: "todo", id: todo.id })}
                        onToggle={() => toggleTodo(todo.id)}
                      />
                    ))}
                    {dayEvents.map((event) => (
                      <EventBand
                        key={event.id}
                        event={event}
                        completedView
                        onSelect={() =>
                          openItemSheet({ kind: "event", id: event.id, dayKey: day.key })
                        }
                        onPlay={() => {}}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </IntentPanelFrame>
  );
}
