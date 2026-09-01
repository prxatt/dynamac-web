/** Demo plan data — Aug 31, 2026 showcase */

export type PlanMode = "today" | "calendar";

export type TaskCategory = "work" | "personal" | "hobby" | "admin" | "other";

/** Solid block fills — high contrast with white type (not site background colors) */
export const CATEGORY_COLORS: Record<TaskCategory, string> = {
  work: "#1a7fd4",
  personal: "#e04f3d",
  hobby: "#7c4dff",
  admin: "#4a9e32",
  other: "#5c5e5a",
};

export const CATEGORY_LABELS: Record<TaskCategory, string> = {
  work: "Work",
  personal: "Personal",
  hobby: "Hobby",
  admin: "Admin",
  other: "Other",
};

/** Deterministic category from title/keywords — no AI randomness */
export function resolveCategory(hint: string): TaskCategory {
  const s = hint.toLowerCase();
  if (/\b(ship|review|standup|launch|design|arch|press|core)\b/.test(s)) return "work";
  if (/\b(wire|checkout|stripe|admin|organize)\b/.test(s)) return "admin";
  if (/\b(demo|record|tab|creative|ui)\b/.test(s)) return "hobby";
  if (/\b(health|family|personal|yoga)\b/.test(s)) return "personal";
  return "other";
}

export function colorForCategory(category: TaskCategory): string {
  return CATEGORY_COLORS[category];
}

export type TodoItem = {
  id: string;
  title: string;
  done: boolean;
  category: TaskCategory;
  timeLabel?: string;
  collaborators?: string[];
};

export type ScheduledEvent = {
  id: string;
  title: string;
  startMinutes: number;
  endMinutes: number;
  category: TaskCategory;
  collaborators?: string[];
};

export type DayBand = {
  key: string;
  dayLabel: string;
  date: number;
  monthLabel: string;
  bandColor: string;
  isToday: boolean;
  events: ScheduledEvent[];
};

export const DEMO_NOW_MINUTES = 14 * 60 + 15;

export const planModes: { id: PlanMode; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "calendar", label: "Calendar" },
];

export const todayEvents: ScheduledEvent[] = [
  {
    id: "evt-1",
    title: "Design review",
    startMinutes: 14 * 60,
    endMinutes: 15 * 60,
    category: "work",
  },
  {
    id: "evt-2",
    title: "Ship DynaMac",
    startMinutes: 16 * 60 + 30,
    endMinutes: 17 * 60 + 30,
    category: "work",
  },
];

export const calendarDays: DayBand[] = [
  {
    key: "aug-30",
    dayLabel: "Saturday",
    date: 30,
    monthLabel: "AUG",
    bandColor: "#1a7fd4",
    isToday: false,
    events: [
      {
        id: "d30-1",
        title: "Core architecture planning",
        startMinutes: 9 * 60,
        endMinutes: 10 * 60 + 30,
        category: "work",
      },
    ],
  },
  {
    key: "aug-31",
    dayLabel: "Monday",
    date: 31,
    monthLabel: "AUG",
    bandColor: "#7c4dff",
    isToday: true,
    events: todayEvents,
  },
  {
    key: "sep-1",
    dayLabel: "Tuesday",
    date: 1,
    monthLabel: "SEP",
    bandColor: "#4a9e32",
    isToday: false,
    events: [
      {
        id: "d1-1",
        title: "Standup",
        startMinutes: 9 * 60,
        endMinutes: 9 * 60 + 30,
        category: "work",
      },
      {
        id: "d1-2",
        title: "Launch prep",
        startMinutes: 15 * 60,
        endMinutes: 16 * 60,
        category: "work",
      },
    ],
  },
  {
    key: "sep-2",
    dayLabel: "Wednesday",
    date: 2,
    monthLabel: "SEP",
    bandColor: "#e04f3d",
    isToday: false,
    events: [],
  },
  {
    key: "sep-3",
    dayLabel: "Thursday",
    date: 3,
    monthLabel: "SEP",
    bandColor: "#5c5e5a",
    isToday: false,
    events: [
      {
        id: "d3-1",
        title: "Press kit",
        startMinutes: 13 * 60,
        endMinutes: 14 * 60,
        category: "work",
      },
    ],
  },
];

export function minutesToLabel(minutes: number): string {
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;
  const period = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

export function eventDurationMinutes(event: ScheduledEvent): number {
  return event.endMinutes - event.startMinutes;
}

export function isEventLive(event: ScheduledEvent, nowMinutes = DEMO_NOW_MINUTES): boolean {
  return nowMinutes >= event.startMinutes && nowMinutes < event.endMinutes;
}

export function getLiveEvent(
  events: ScheduledEvent[],
  nowMinutes = DEMO_NOW_MINUTES,
): ScheduledEvent | null {
  return events.find((e) => isEventLive(e, nowMinutes)) ?? null;
}

export function getLiveEventToday(nowMinutes = DEMO_NOW_MINUTES): ScheduledEvent | null {
  return getLiveEvent(todayEvents, nowMinutes);
}

export type FocusableItem =
  | { kind: "event"; event: ScheduledEvent }
  | { kind: "todo"; todo: TodoItem };

export function focusableFromEvent(event: ScheduledEvent): FocusableItem {
  return { kind: "event", event };
}

export function focusableId(item: FocusableItem | null): string | null {
  if (!item) return null;
  return item.kind === "event" ? item.event.id : item.todo.id;
}

export function focusableLabel(item: FocusableItem | null): string {
  if (!item) return "Focus";
  return item.kind === "event" ? item.event.title : item.todo.title;
}

export function focusableCategory(item: FocusableItem | null): TaskCategory {
  if (!item) return "other";
  return item.kind === "event" ? item.event.category : item.todo.category;
}

export function focusableDurationSeconds(item: FocusableItem | null): number {
  if (!item) return 25 * 60;
  if (item.kind === "event") return eventDurationMinutes(item.event) * 60;
  return 25 * 60;
}
