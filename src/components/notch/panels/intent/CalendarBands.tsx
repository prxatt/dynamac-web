"use client";

import { useEffect, useRef } from "react";
import { useNotchDemo } from "@/components/notch/NotchDemoContext";
import {
  assignTimelineLanes,
  CALENDAR_HOUR_MARKERS,
  filterTodosForAgenda,
  INTENT_PANEL_FRAME,
  sortEventsForAgenda,
  type DayBand,
  type ScheduledEvent,
  type TodoItem,
} from "@/components/notch/intent-plan-data";
import { CalendarDateLabel } from "@/components/notch/panels/intent/CalendarDateLabel";
import { EventBand } from "@/components/notch/panels/intent/EventBand";
import { HIDDEN_SCROLL, IntentPanelFrame } from "@/components/notch/panels/intent/IntentPanelFrame";
import { TodoRow } from "@/components/notch/panels/intent/TodoRow";

type CalendarBandsProps = {
  minimal?: boolean;
};

const LANE_HEIGHT = 34;
const TIMELINE_HEADER = 14;
const TODO_GUTTER_WIDTH = "19%";

export function CalendarBands({ minimal = false }: CalendarBandsProps) {
  const { calendarDays, openItemSheet } = useNotchDemo();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const todayEl = scrollRef.current?.querySelector('[data-today-row="true"]');
    todayEl?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);

  if (minimal) {
    return (
      <p className="w-full text-left text-[9px] font-medium" style={{ color: "var(--widget-muted)" }}>
        Calendar · week view
      </p>
    );
  }

  return (
    <IntentPanelFrame variant="today" className="p-1.5">
      <div ref={scrollRef} className={`max-h-[5.75rem] ${HIDDEN_SCROLL}`}>
        {calendarDays.map((day, index) => (
          <DayTimelineStrip
            key={day.key}
            day={day}
            isLast={index === calendarDays.length - 1}
            onSelectEvent={(event) =>
              openItemSheet({ kind: "event", id: event.id, dayKey: day.key })
            }
            onSelectTodo={(todo) => openItemSheet({ kind: "todo", id: todo.id })}
          />
        ))}
      </div>
    </IntentPanelFrame>
  );
}

function DayTimelineStrip({
  day,
  isLast,
  onSelectEvent,
  onSelectTodo,
}: {
  day: DayBand;
  isLast: boolean;
  onSelectEvent: (event: ScheduledEvent) => void;
  onSelectTodo: (todo: TodoItem) => void;
}) {
  const { todos } = useNotchDemo();
  const { untimed: dayTodos, timed: timedTodos } = filterTodosForAgenda(
    todos,
    day.key,
    day.isToday,
  );
  const visibleEvents = sortEventsForAgenda(day.events, { isToday: day.isToday });
  const { placements, laneCount } = assignTimelineLanes(visibleEvents);
  const hasItems = visibleEvents.length > 0 || dayTodos.length > 0 || timedTodos.length > 0;
  const timelineHeight = Math.max(laneCount * LANE_HEIGHT, 28);
  const rowMinHeight = TIMELINE_HEADER + timelineHeight + 10;

  return (
    <div
      data-today-row={day.isToday ? "true" : undefined}
      className={`flex items-stretch gap-2 overflow-hidden py-1.5 ${isLast ? "" : "border-b border-black/10"}`}
      style={{ minHeight: hasItems ? rowMinHeight : 44 }}
    >
      <CalendarDateLabel day={day} />

      <div className="flex min-w-0 flex-1 gap-1 overflow-hidden">
        {(dayTodos.length > 0 || timedTodos.length > 0) && (
          <div
            className="flex shrink-0 flex-col gap-0.5 overflow-hidden"
            style={{ width: TODO_GUTTER_WIDTH }}
          >
            {dayTodos.map((todo) => (
              <TodoRow
                key={todo.id}
                todo={todo}
                timeline
                onSelect={() => onSelectTodo(todo)}
                className="w-full max-w-none"
              />
            ))}
            {timedTodos.map((todo) => (
              <TodoRow
                key={todo.id}
                todo={todo}
                timeline
                onSelect={() => onSelectTodo(todo)}
                className="w-full max-w-none"
              />
            ))}
          </div>
        )}

        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div className="absolute inset-x-0 top-0 flex justify-between px-0.5">
            {CALENDAR_HOUR_MARKERS.map((h) => (
              <span
                key={h}
                className="text-[5px] font-bold tabular-nums"
                style={{ color: INTENT_PANEL_FRAME.inkMuted }}
              >
                {h}
              </span>
            ))}
          </div>

          <div
            className="absolute inset-x-0 top-[0.65rem] h-px"
            style={{ backgroundColor: "rgba(26,26,24,0.14)" }}
          />

          <div
            className="absolute inset-x-0 top-[0.85rem] overflow-hidden"
            style={{ height: timelineHeight }}
          >
            {visibleEvents.map((event) => {
              const place = placements.get(event.id);
              if (!place) return null;
              return (
                <EventBand
                  key={event.id}
                  event={event}
                  timeline
                  onSelect={() => onSelectEvent(event)}
                  onPlay={() => {}}
                  className="absolute overflow-hidden"
                  style={{
                    left: `${place.left}%`,
                    width: `${place.width}%`,
                    top: place.lane * LANE_HEIGHT,
                    maxHeight: LANE_HEIGHT - 2,
                    transform: place.early ? "none" : "translateX(-4%)",
                    opacity: place.late || place.early ? 0.92 : 1,
                  }}
                />
              );
            })}

            {!hasItems ? (
              <p
                className="flex h-full items-center pl-1 text-[7px] font-semibold italic"
                style={{ color: INTENT_PANEL_FRAME.inkMuted }}
              >
                Open
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
