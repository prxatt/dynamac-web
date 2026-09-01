"use client";

import { useRef } from "react";
import { useNotchDemo } from "@/components/notch/NotchDemoContext";
import {
  colorForCategory,
  formatBandDate,
  INTENT_PANEL_FRAME,
  timelinePosition,
  type DayBand,
  type ScheduledEvent,
  type TodoItem,
} from "@/components/notch/intent-plan-data";
import { DateRail } from "@/components/notch/panels/intent/DateRail";
import { HIDDEN_SCROLL, IntentPanelFrame } from "@/components/notch/panels/intent/IntentPanelFrame";

type CalendarBandsProps = {
  minimal?: boolean;
};

export function CalendarBands({ minimal = false }: CalendarBandsProps) {
  const { calendarDays, openItemSheet } = useNotchDemo();
  const scrollRef = useRef<HTMLDivElement>(null);

  if (minimal) {
    return (
      <p className="w-full text-left text-[9px] font-medium" style={{ color: "var(--widget-muted)" }}>
        Calendar · week view
      </p>
    );
  }

  return (
    <IntentPanelFrame variant="calendar">
      <div ref={scrollRef} className={`max-h-[5.5rem] space-y-1.5 ${HIDDEN_SCROLL}`}>
        {calendarDays.map((day) => (
          <DayTimelineStrip
            key={day.key}
            day={day}
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
  onSelectEvent,
  onSelectTodo,
}: {
  day: DayBand;
  onSelectEvent: (event: ScheduledEvent) => void;
  onSelectTodo: (todo: TodoItem) => void;
}) {
  const { todos, customCategories } = useNotchDemo();
  const dayTodos = todos.filter(
    (t) =>
      !t.done &&
      (t.dayKey === day.key || (day.isToday && !t.dayKey)),
  );
  const markers = [9, 12, 15, 18];

  return (
    <div
      className="flex min-h-[2.5rem] items-stretch gap-1.5 overflow-hidden rounded-xl p-1"
      style={{
        backgroundColor: day.bandColor,
        outline: day.isToday ? "2px solid #1a1a18" : "1px solid rgba(26,26,24,0.12)",
      }}
    >
      <DateRail day={day} showTodayBadge={day.isToday} compact />

      <div className="relative min-w-0 flex-1 py-0.5">
        <div className="absolute inset-x-0 top-0 flex justify-between px-0.5">
          {markers.map((h) => (
            <span key={h} className="text-[4px] font-bold text-black/50">
              {h}
            </span>
          ))}
        </div>

        <div className="absolute inset-x-0 top-[0.55rem] h-px bg-black/18" />

        <div className="absolute inset-x-0 bottom-0 top-[0.7rem]">
          {dayTodos.map((todo, index) => (
            <button
              key={todo.id}
              type="button"
              onClick={() => onSelectTodo(todo)}
              className="absolute max-w-[42%] rounded-md px-1.5 py-0.5 text-left text-[6px] font-bold leading-tight text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]"
              style={{
                left: "2%",
                top: `${8 + (index % 2) * 40}%`,
                backgroundColor: colorForCategory(todo.category, customCategories),
              }}
            >
              <span className="line-clamp-2 break-words">{todo.title}</span>
            </button>
          ))}

          {day.events.map((event, index) => {
            const left = timelinePosition(event.startMinutes);
            const top = 8 + (index % 2) * 42;
            return (
              <button
                key={event.id}
                type="button"
                onClick={() => onSelectEvent(event)}
                className="absolute max-w-[38%] rounded-md px-1.5 py-0.5 text-left text-[6px] font-bold leading-tight text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  backgroundColor: colorForCategory(event.category, customCategories),
                  transform: "translateX(-8%)",
                }}
                title={`${formatBandDate(day)} · ${event.title}`}
              >
                <span className="line-clamp-2 break-words">{event.title}</span>
              </button>
            );
          })}

          {day.events.length === 0 && dayTodos.length === 0 ? (
            <p
              className="flex h-full items-center justify-center text-[6px] font-bold"
              style={{ color: INTENT_PANEL_FRAME.inkMuted }}
            >
              Clear
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
