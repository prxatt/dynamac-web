"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { useNotchDemo, type ItemSheetState } from "@/components/notch/NotchDemoContext";
import {
  colorForCategory,
  eventDurationMinutes,
  formatBandDate,
  labelForCategory,
  labelToMinutes,
  minutesToLabel,
  resolveCategory,
  TODAY_PANEL_COLOR,
  type ScheduledEvent,
  type TaskCategory,
  type TodoItem,
} from "@/components/notch/intent-plan-data";
import {
  CategoryPicker,
  DurationPicker,
  MetaField,
  StatusPicker,
  TimeSlider,
  type TaskStatus,
} from "@/components/notch/panels/intent/SheetPickers";

type SheetMode = "add" | "view" | "edit";
type AddKind = "task" | "event";

type ItemSheetProps = {
  sheet: ItemSheetState;
  onClose: () => void;
  panelTint?: string;
};

export function ItemSheet({ sheet, onClose, panelTint }: ItemSheetProps) {
  const sheetKey =
    sheet.kind === "add" ? "add" : sheet.kind === "todo" ? `todo-${sheet.id}` : `event-${sheet.id}`;

  return <ItemSheetBody key={sheetKey} sheet={sheet} onClose={onClose} panelTint={panelTint} />;
}

function ItemSheetBody({ sheet, onClose, panelTint }: ItemSheetProps) {
  const {
    todos,
    calendarDays,
    customCategories,
    addCustomCategory,
    addTodo,
    addEvent,
    updateTodo,
    updateEvent,
    deleteTodo,
    deleteEvent,
    toggleTodo,
    startFocus,
  } = useNotchDemo();

  const isAdd = sheet.kind === "add";
  const addDayKey = sheet.kind === "add" ? sheet.dayKey : undefined;
  const todo =
    sheet.kind === "todo" ? todos.find((t) => t.id === sheet.id) : undefined;
  const eventEntry =
    sheet.kind === "event"
      ? calendarDays
          .flatMap((d) => d.events.map((e) => ({ event: e, dayKey: d.key })))
          .find((x) => x.event.id === sheet.id)
      : undefined;
  const event = eventEntry?.event;
  const eventDayKey =
    eventEntry?.dayKey ?? (sheet.kind === "event" ? sheet.dayKey : undefined);

  const [mode, setMode] = useState<SheetMode>(isAdd ? "add" : "view");
  const [addKind, setAddKind] = useState<AddKind>("task");
  const [title, setTitle] = useState(() => todo?.title ?? event?.title ?? "");
  const [category, setCategory] = useState<TaskCategory>(
    () => todo?.category ?? event?.category ?? "work",
  );
  const [taskTimeMinutes, setTaskTimeMinutes] = useState<number | null>(() =>
    labelToMinutes(todo?.timeLabel ?? ""),
  );
  const [status, setStatus] = useState<TaskStatus>(() => (todo?.done ? "Done" : "Open"));
  const [startMinutes, setStartMinutes] = useState(() => event?.startMinutes ?? 9 * 60);
  const [duration, setDuration] = useState(() =>
    event ? eventDurationMinutes(event) : 60,
  );

  if (!isAdd && !todo && !event) return null;

  const itemKind: "todo" | "event" | AddKind = isAdd ? addKind : sheet.kind;
  const todayBand = calendarDays.find((d) => d.isToday) ?? calendarDays[0];
  const headerBand = addDayKey
    ? calendarDays.find((d) => d.key === addDayKey) ?? todayBand
    : eventDayKey
      ? calendarDays.find((d) => d.key === eventDayKey) ?? todayBand
      : todayBand;
  const header = `${headerBand.dayLabel} · ${formatBandDate(headerBand)} ${headerBand.monthLabel}`;
  const editing = mode === "add" || mode === "edit";
  const isTodoItem = itemKind === "todo" || itemKind === "task";
  const surface = isAdd ? panelTint ?? TODAY_PANEL_COLOR : colorForCategory(category, customCategories);
  const ink = isAdd ? "#1a1a18" : "#ffffff";
  const taskTimeLabel = taskTimeMinutes !== null ? minutesToLabel(taskTimeMinutes) : "";
  const showStatusField = isTodoItem && (mode === "edit" || (mode === "add" && taskTimeMinutes !== null));
  const thirdFieldLabel = isTodoItem
    ? showStatusField
      ? "Status"
      : taskTimeMinutes !== null
        ? "Scheduled"
        : "When"
    : editing
      ? "Duration"
      : "Ends";
  const endMinutes = startMinutes + duration;

  function handleSave() {
    const trimmed =
      title.trim() ||
      (itemKind === "task" || itemKind === "todo" ? "New task" : "New event");

    if (mode === "add") {
      if (addKind === "task") {
        addTodo({
          title: trimmed,
          category,
          timeLabel: taskTimeLabel || undefined,
          dayKey: addDayKey ?? todayBand.key,
        });
      } else {
        addEvent({
          title: trimmed,
          category,
          durationMinutes: duration,
          startMinutes,
          dayKey: addDayKey,
        });
      }
      onClose();
      return;
    }

    if (itemKind === "todo" && todo) {
      const wasDone = todo.done;
      const shouldBeDone = status === "Done";
      updateTodo(todo.id, {
        title: trimmed,
        category,
        timeLabel: taskTimeLabel || undefined,
      });
      if (wasDone !== shouldBeDone) toggleTodo(todo.id);
      setMode("view");
      return;
    }

    if (itemKind === "event" && event && eventDayKey) {
      updateEvent(eventDayKey, event.id, {
        title: trimmed,
        category,
        durationMinutes: duration,
        startMinutes,
      });
      setMode("view");
    }
  }

  function handleDelete() {
    if (itemKind === "todo" && todo) {
      deleteTodo(todo.id);
      onClose();
      return;
    }
    if (itemKind === "event" && event && eventDayKey) {
      deleteEvent(eventDayKey, event.id);
      onClose();
    }
  }

  function handleComplete() {
    if (itemKind === "event" && event) {
      startFocus({ kind: "event", event });
      onClose();
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.18 }}
      className="overflow-visible rounded-xl p-2.5"
      style={{ backgroundColor: surface, color: ink }}
    >
      <div className="mb-2.5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[6px] font-bold uppercase tracking-[0.08em] opacity-60">{header}</p>
          <p className="mt-1 text-[11px] font-bold leading-tight">
            {editing
              ? isTodoItem
                ? mode === "add"
                  ? "New task"
                  : "Edit task"
                : mode === "add"
                  ? "New event"
                  : "Edit event"
              : isTodoItem
                ? todo?.title
                : event?.title}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
          style={{ backgroundColor: "rgba(0,0,0,0.1)", color: ink }}
          aria-label="Close"
        >
          ×
        </button>
      </div>

      {isAdd ? (
        <div className="mb-2.5 flex gap-1">
          {(["task", "event"] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setAddKind(k)}
              className="rounded-full px-3 py-0.5 text-[7px] font-bold capitalize"
              style={{
                backgroundColor: addKind === k ? "rgba(0,0,0,0.88)" : "rgba(0,0,0,0.08)",
                color: addKind === k ? "#fff" : ink,
              }}
            >
              {k}
            </button>
          ))}
        </div>
      ) : null}

      {editing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (mode === "add") setCategory(resolveCategory(e.target.value));
          }}
          placeholder="Title…"
          className="mb-2.5 w-full rounded-lg px-2.5 py-1.5 text-[9px] font-semibold outline-none"
          style={{
            backgroundColor: "rgba(255,255,255,0.42)",
            color: ink,
          }}
        />
      ) : null}

      <div className="mb-2.5 grid grid-cols-3 gap-2">
        <MetaField label="Category" ink={ink} isAdd={isAdd}>
          {editing ? (
            <CategoryPicker
              value={category}
              onChange={setCategory}
              customCategories={customCategories}
              onCreateCategory={addCustomCategory}
              ink={ink}
              isAdd={isAdd}
            />
          ) : (
            <span>{labelForCategory(category, customCategories)}</span>
          )}
        </MetaField>

        <MetaField
          label={itemKind === "event" ? "Start" : "Time"}
          ink={ink}
          isAdd={isAdd}
        >
          {editing ? (
            itemKind === "event" ? (
              <TimeSlider
                valueMinutes={startMinutes}
                onChange={(m) => setStartMinutes(m ?? 9 * 60)}
                ink={ink}
                allowClear={false}
              />
            ) : (
              <TimeSlider
                valueMinutes={taskTimeMinutes}
                onChange={setTaskTimeMinutes}
                ink={ink}
              />
            )
          ) : itemKind === "event" ? (
            <span>{event ? minutesToLabel(event.startMinutes) : "—"}</span>
          ) : (
            <span>{taskTimeLabel || "Anytime"}</span>
          )}
        </MetaField>

        <MetaField label={thirdFieldLabel} ink={ink} isAdd={isAdd}>
          {itemKind === "event" ? (
            editing ? (
              <DurationPicker valueMinutes={duration} onChange={setDuration} ink={ink} />
            ) : (
              <span>{minutesToLabel(endMinutes)}</span>
            )
          ) : showStatusField && editing ? (
            <StatusPicker
              value={status}
              onChange={setStatus}
              ink={ink}
              isAdd={isAdd}
              disabled={mode === "add"}
            />
          ) : (
            <span>
              {taskTimeMinutes !== null
                ? taskTimeLabel
                : mode === "add"
                  ? "Flexible"
                  : "Anytime"}
            </span>
          )}
        </MetaField>
      </div>

      <div className="flex items-center justify-between gap-2">
        {!isAdd ? (
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg px-2.5 py-1 text-[7px] font-bold"
            style={{ backgroundColor: "rgba(0,0,0,0.12)", color: ink }}
          >
            Delete
          </button>
        ) : (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2.5 py-1 text-[7px] font-bold"
            style={{ backgroundColor: "rgba(0,0,0,0.1)", color: ink }}
          >
            Cancel
          </button>
        )}

        {!isAdd && mode === "view" && itemKind === "event" ? (
          <button
            type="button"
            onClick={handleComplete}
            className="rounded-lg px-2.5 py-1 text-[7px] font-bold text-white"
            style={{ backgroundColor: "rgba(0,0,0,0.28)" }}
          >
            Focus
          </button>
        ) : null}

        {editing ? (
          <button
            type="button"
            onClick={handleSave}
            className="ml-auto rounded-lg px-3.5 py-1 text-[7px] font-bold"
            style={{
              backgroundColor: "rgba(0,0,0,0.88)",
              color: "#fff",
            }}
          >
            {mode === "add" ? "Create" : "Save"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setMode("edit")}
            className="ml-auto rounded-lg px-3.5 py-1 text-[7px] font-bold"
            style={{ backgroundColor: "rgba(255,255,255,0.55)", color: ink }}
          >
            Edit
          </button>
        )}
      </div>
    </motion.div>
  );
}

export type { TodoItem, ScheduledEvent };
