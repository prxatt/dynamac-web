"use client";

import { useMemo } from "react";
import { useNotchDemo } from "@/components/notch/NotchDemoContext";
import {
  getTodayBand,
  INTENT_PANEL_FRAME,
  isEventPast,
} from "@/components/notch/intent-plan-data";
import { DateRail } from "@/components/notch/panels/intent/DateRail";
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
    <IntentPanelFrame variant="today">
      <p
        className="mb-1.5 text-[6px] font-bold uppercase tracking-wide"
        style={{ color: INTENT_PANEL_FRAME.inkMuted }}
      >
        Completed · {total}
      </p>
      {daysWithCompleted.length === 0 ? (
        <p className="py-2 text-[8px] font-semibold" style={{ color: INTENT_PANEL_FRAME.inkMuted }}>
          Nothing completed yet
        </p>
      ) : (
        <div className={`max-h-[5rem] space-y-2 ${HIDDEN_SCROLL}`}>
          {daysWithCompleted.map(({ day, todos: dayTodos, events: dayEvents }) => (
            <div key={day.key} className="flex gap-2 border-t border-black/10 pt-1.5 first:border-t-0 first:pt-0">
              <DateRail day={day} showTodayBadge={day.isToday} />
              <div className="min-w-0 flex-1 space-y-1.5">
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
          ))}
        </div>
      )}
    </IntentPanelFrame>
  );
}
