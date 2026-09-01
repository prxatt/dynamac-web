"use client";

import { useEffect, useMemo, useRef } from "react";
import { useNotchDemo } from "@/components/notch/NotchDemoContext";
import {
  assignTimelineLanes,
  CALENDAR_HOUR_MARKERS,
  colorForMonth,
  filterTodosForAgenda,
  focusableFromEvent,
  focusableId,
  groupCalendarDaysByMonth,
  INTENT_PANEL_FRAME,
  labelToMinutes,
  referenceMinutesForDay,
  sortEventsForAgenda,
  timelineMarkerPosition,
  timelinePosition,
  type DayBand,
  type ScheduledEvent,
  type TodoItem,
} from "@/components/notch/intent-plan-data";
import { CalendarDateLabel } from "@/components/notch/panels/intent/CalendarDateLabel";
import { EventBand } from "@/components/notch/panels/intent/EventBand";
import { HIDDEN_SCROLL } from "@/components/notch/panels/intent/IntentPanelFrame";
import { TodoRow } from "@/components/notch/panels/intent/TodoRow";

type CalendarBandsProps = {
  minimal?: boolean;
};

const TIMELINE_HEADER = 14;
const TODO_GUTTER_WIDTH = "22%";

export function CalendarBands({ minimal = false }: CalendarBandsProps) {
  const { calendarDays, openItemSheet, linkedItem, focusPhase, progress, startFocus, toggleTodo } =
    useNotchDemo();
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeId = focusPhase === "work" ? focusableId(linkedItem) : null;
  const monthGroups = useMemo(() => groupCalendarDaysByMonth(calendarDays), [calendarDays]);

  useEffect(() => {
    const todayEl = scrollRef.current?.querySelector('[data-today-row="true"]');
    todayEl?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);

  if (minimal) {
    return (
      <p className="w-full text-left text-[9px] font-medium" style={{ color: "var(--widget-muted)" }}>
        Calendar · scroll ±30 days
      </p>
    );
  }

  return (
    <div
      className="overflow-hidden rounded-xl p-1"
      style={{
        outline: INTENT_PANEL_FRAME.outline,
        backgroundColor: "rgba(26, 26, 24, 0.05)",
      }}
    >
      <div ref={scrollRef} className={`max-h-[6.25rem] ${HIDDEN_SCROLL}`}>
        {monthGroups.map((group) => (
          <div
            key={`${group.monthLabel}-${group.days[0]?.key}`}
            className="mb-1 rounded-lg border-l-[3px] p-1 last:mb-0"
            style={{ borderColor: colorForMonth(group.monthLabel) }}
          >
            {group.days.map((day, index) => (
              <DayTimelineStrip
                key={day.key}
                day={day}
                isLast={index === group.days.length - 1}
                activeId={activeId}
                focusProgress={progress}
                onSelectEvent={(event) =>
                  openItemSheet({ kind: "event", id: event.id, dayKey: day.key })
                }
                onSelectTodo={(todo) => openItemSheet({ kind: "todo", id: todo.id })}
                onPlayEvent={(event) => startFocus(focusableFromEvent(event))}
                onToggleTodo={toggleTodo}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function DayTimelineStrip({
  day,
  isLast,
  activeId,
  focusProgress,
  onSelectEvent,
  onSelectTodo,
  onPlayEvent,
  onToggleTodo,
}: {
  day: DayBand;
  isLast: boolean;
  activeId: string | null;
  focusProgress: number;
  onSelectEvent: (event: ScheduledEvent) => void;
  onSelectTodo: (todo: TodoItem) => void;
  onPlayEvent: (event: ScheduledEvent) => void;
  onToggleTodo: (id: string) => void;
}) {
  const { todos, calendarDays } = useNotchDemo();
  const nowMinutes = referenceMinutesForDay(day, calendarDays);
  const { untimed: dayTodos, timed: timedTodos } = filterTodosForAgenda(
    todos,
    day.key,
    day.isToday,
    nowMinutes,
  );
  const visibleEvents = sortEventsForAgenda(day.events, {
    isToday: day.isToday,
    nowMinutes,
  });
  const hasItems = visibleEvents.length > 0 || dayTodos.length > 0 || timedTodos.length > 0;

  if (day.isToday) {
    return (
      <TodayCalendarRow
        day={day}
        isLast={isLast}
        nowMinutes={nowMinutes}
        visibleEvents={visibleEvents}
        dayTodos={dayTodos}
        timedTodos={timedTodos}
        activeId={activeId}
        focusProgress={focusProgress}
        onSelectEvent={onSelectEvent}
        onSelectTodo={onSelectTodo}
        onPlayEvent={onPlayEvent}
        onToggleTodo={onToggleTodo}
      />
    );
  }

  const { placements, timelineHeight } = assignTimelineLanes(visibleEvents, nowMinutes);
  const timedLaneHeight = timedTodos.length > 0 ? 22 + timedTodos.length * 22 : 0;
  const rowMinHeight = TIMELINE_HEADER + timelineHeight + timedLaneHeight + 12;

  return (
    <div
      className={`flex items-stretch gap-2 overflow-hidden py-1.5 ${isLast ? "" : "border-b border-black/10"}`}
      style={{ minHeight: hasItems ? rowMinHeight : 44 }}
    >
      <CalendarDateLabel day={day} />
      <TimelineTrack
        visibleEvents={visibleEvents}
        placements={placements}
        timelineHeight={timelineHeight}
        timedLaneHeight={timedLaneHeight}
        nowMinutes={nowMinutes}
        dayTodos={dayTodos}
        timedTodos={timedTodos}
        hasItems={hasItems}
        onSelectEvent={onSelectEvent}
        onSelectTodo={onSelectTodo}
      />
    </div>
  );
}

/** Today row: full readable previews (same as Today tab), plus hour ruler */
function TodayCalendarRow({
  day,
  isLast,
  nowMinutes,
  visibleEvents,
  dayTodos,
  timedTodos,
  activeId,
  focusProgress,
  onSelectEvent,
  onSelectTodo,
  onPlayEvent,
  onToggleTodo,
}: {
  day: DayBand;
  isLast: boolean;
  nowMinutes: number;
  visibleEvents: ScheduledEvent[];
  dayTodos: TodoItem[];
  timedTodos: TodoItem[];
  activeId: string | null;
  focusProgress: number;
  onSelectEvent: (event: ScheduledEvent) => void;
  onSelectTodo: (todo: TodoItem) => void;
  onPlayEvent: (event: ScheduledEvent) => void;
  onToggleTodo: (id: string) => void;
}) {
  const hasItems =
    visibleEvents.length > 0 || dayTodos.length > 0 || timedTodos.length > 0;

  return (
    <div
      data-today-row="true"
      className={`flex items-start gap-2 py-1.5 ${isLast ? "" : "border-b border-black/10"}`}
    >
      <CalendarDateLabel day={day} />
      <div className="min-w-0 flex-1 space-y-1">
        {visibleEvents.map((event) => (
          <EventBand
            key={event.id}
            event={event}
            nowMinutes={nowMinutes}
            active={activeId === event.id}
            focusProgress={focusProgress}
            onSelect={() => onSelectEvent(event)}
            onPlay={() => onPlayEvent(event)}
          />
        ))}
        {timedTodos.map((todo) => (
          <TodoRow
            key={todo.id}
            todo={todo}
            active={activeId === todo.id}
            focusProgress={focusProgress}
            onSelect={() => onSelectTodo(todo)}
            onToggle={() => onToggleTodo(todo.id)}
          />
        ))}
        {dayTodos.map((todo) => (
          <TodoRow
            key={todo.id}
            todo={todo}
            active={activeId === todo.id}
            focusProgress={focusProgress}
            onSelect={() => onSelectTodo(todo)}
            onToggle={() => onToggleTodo(todo.id)}
          />
        ))}
        {hasItems ? <HourRuler /> : null}
        {!hasItems ? (
          <p
            className="py-1 text-[7px] font-semibold italic"
            style={{ color: INTENT_PANEL_FRAME.inkMuted }}
          >
            Open
          </p>
        ) : null}
      </div>
    </div>
  );
}

function TimelineTrack({
  visibleEvents,
  placements,
  timelineHeight,
  timedLaneHeight,
  nowMinutes,
  dayTodos,
  timedTodos,
  hasItems,
  onSelectEvent,
  onSelectTodo,
}: {
  visibleEvents: ScheduledEvent[];
  placements: ReturnType<typeof assignTimelineLanes>["placements"];
  timelineHeight: number;
  timedLaneHeight: number;
  nowMinutes: number;
  dayTodos: TodoItem[];
  timedTodos: TodoItem[];
  hasItems: boolean;
  onSelectEvent: (event: ScheduledEvent) => void;
  onSelectTodo: (todo: TodoItem) => void;
}) {
  const laneTops: number[] = [];
  let offset = 0;
  const laneHeights = new Map<number, number>();
  for (const event of visibleEvents) {
    const place = placements.get(event.id);
    if (!place) continue;
    if (!laneHeights.has(place.lane)) {
      laneHeights.set(place.lane, place.laneHeight);
      laneTops[place.lane] = offset;
      offset += place.laneHeight;
    }
  }

  return (
    <div className="flex min-w-0 flex-1 gap-1 overflow-hidden">
      {dayTodos.length > 0 && (
        <div
          className="flex shrink-0 flex-col gap-0.5"
          style={{ width: TODO_GUTTER_WIDTH }}
        >
          {dayTodos.map((todo) => (
            <TodoRow
              key={todo.id}
              todo={todo}
              timeline
              onSelect={() => onSelectTodo(todo)}
              className="w-full min-w-0 max-w-none"
            />
          ))}
        </div>
      )}

      <div className="relative min-w-0 flex-1 overflow-hidden">
        <HourRuler />
        <div
          className="absolute inset-x-0 top-[0.85rem]"
          style={{ height: timelineHeight + timedLaneHeight }}
        >
          {visibleEvents.map((event) => {
            const place = placements.get(event.id);
            if (!place) return null;
            const top = laneTops[place.lane] ?? place.lane * place.laneHeight;
            return (
              <EventBand
                key={event.id}
                event={event}
                nowMinutes={nowMinutes}
                timeline
                onSelect={() => onSelectEvent(event)}
                onPlay={() => {}}
                className="absolute"
                style={{
                  left: `${place.left}%`,
                  width: `${place.width}%`,
                  top,
                  minHeight: place.laneHeight - 4,
                  transform: place.early ? "none" : "translateX(-3%)",
                }}
              />
            );
          })}
          {timedTodos.map((todo, index) => {
            const mins = labelToMinutes(todo.timeLabel ?? "");
            if (mins === null) return null;
            return (
              <TodoRow
                key={todo.id}
                todo={todo}
                timeline
                onSelect={() => onSelectTodo(todo)}
                className="absolute max-w-[28%]"
                style={{
                  left: `${timelinePosition(mins)}%`,
                  top: timelineHeight + index * 22,
                  transform: "translateX(-50%)",
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
  );
}

function HourRuler() {
  return (
    <>
      <div className="relative h-3 px-0.5">
        {CALENDAR_HOUR_MARKERS.map((h, index) => {
          const isFirst = index === 0;
          const isLast = index === CALENDAR_HOUR_MARKERS.length - 1;
          const left = timelineMarkerPosition(h * 60);
          return (
            <span
              key={h}
              className={`absolute text-[5px] font-bold tabular-nums ${
                isFirst ? "" : isLast ? "-translate-x-full" : "-translate-x-1/2"
              }`}
              style={{
                left: `${left}%`,
                color: INTENT_PANEL_FRAME.inkMuted,
              }}
            >
              {h}
            </span>
          );
        })}
      </div>
      <div
        className="mt-[0.35rem] h-px"
        style={{ backgroundColor: "rgba(26,26,24,0.14)" }}
      />
    </>
  );
}
