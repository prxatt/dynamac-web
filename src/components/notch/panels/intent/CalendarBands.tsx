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
      <div
        ref={scrollRef}
        className={`max-h-[5.25rem] space-y-1 ${HIDDEN_SCROLL}`}
      >
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
  const { todos } = useNotchDemo();
  const dayTodos = day.isToday ? todos.filter((t) => !t.done) : [];

  const markers = [9, 12, 15, 18];

  return (
    <div
      className="flex h-[2.35rem] items-stretch gap-1 overflow-hidden rounded-lg px-1 py-0.5"
      style={{
        backgroundColor: day.bandColor,
        outline: day.isToday ? "1.5px solid #1a1a18" : undefined,
      }}
    >
      <div className="flex w-[2.35rem] shrink-0 flex-col items-center justify-center text-center text-black">
        <p className="text-[5px] font-bold uppercase leading-none opacity-70">
          {day.dayLabel.slice(0, 3)}
        </p>
        <p className="text-[13px] font-bold leading-none tabular-nums">
          {String(day.date).padStart(2, "0")}
        </p>
        <p className="text-[6px] font-bold leading-none">{day.monthLabel}</p>
      </div>

      <div className="relative min-w-0 flex-1">
        <div className="absolute inset-x-0 top-0 flex justify-between px-0.5">
          {markers.map((h) => (
            <span key={h} className="text-[4px] font-bold text-black/45">
              {h}
            </span>
          ))}
        </div>

        <div className="absolute inset-x-0 top-[0.55rem] h-px bg-black/15" />

        <div className="absolute inset-x-0 bottom-0 top-[0.7rem]">
          {dayTodos.map((todo) => (
            <button
              key={todo.id}
              type="button"
              onClick={() => onSelectTodo(todo)}
              className="absolute max-w-[42%] rounded px-1 py-px text-left text-[6px] font-bold leading-tight text-white"
              style={{
                left: "2%",
                top: "8%",
                backgroundColor: colorForCategory(todo.category),
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
                className="absolute max-w-[38%] rounded px-1 py-px text-left text-[6px] font-bold leading-tight text-white"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  backgroundColor: colorForCategory(event.category),
                  transform: "translateX(-8%)",
                }}
                title={`${formatBandDate(day)} · ${event.title}`}
              >
                <span className="line-clamp-2 break-words">{event.title}</span>
              </button>
            );
          })}

          {day.events.length === 0 && dayTodos.length === 0 ? (
            <p className="flex h-full items-center justify-center text-[6px] font-bold text-black/40">
              Clear
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
