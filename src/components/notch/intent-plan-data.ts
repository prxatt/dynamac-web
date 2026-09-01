/** Demo plan data — Sep 1, 2026 showcase */

export type PlanMode = "today" | "calendar";

export type BuiltinTaskCategory = "work" | "personal" | "hobby" | "activity";

/** Built-in or custom category id (`custom-<slug>`) */
export type TaskCategory = BuiltinTaskCategory | string;

export const BUILTIN_CATEGORIES: BuiltinTaskCategory[] = [
  "work",
  "personal",
  "hobby",
  "activity",
];

/** Solid block fills — high contrast with white type (not site background colors) */
export const CATEGORY_COLORS: Record<BuiltinTaskCategory, string> = {
  work: "#1a7fd4",
  personal: "#e04f3d",
  hobby: "#7c4dff",
  activity: "#4a9e32",
};

export const CATEGORY_LABELS: Record<BuiltinTaskCategory, string> = {
  work: "Work",
  personal: "Personal",
  hobby: "Hobby",
  activity: "Activity",
};

export const CUSTOM_CATEGORY_PALETTE = [
  "#5c5e5a",
  "#d4a017",
  "#2e8b57",
  "#c45bff",
  "#e85d75",
] as const;

export type CustomCategory = {
  id: string;
  label: string;
  color: string;
};

export function isBuiltinCategory(category: TaskCategory): category is BuiltinTaskCategory {
  return (BUILTIN_CATEGORIES as string[]).includes(category);
}

export function slugifyCategory(label: string): string {
  return label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function customCategoryId(label: string): string {
  const slug = slugifyCategory(label) || "category";
  return `custom-${slug}`;
}

/** Deterministic category from title/keywords — no AI randomness */
export function resolveCategory(hint: string): TaskCategory {
  const s = hint.toLowerCase();
  if (/\b(ship|review|standup|launch|design|arch|press|core)\b/.test(s)) return "work";
  if (/\b(wire|checkout|stripe|organize|run|gym|walk|workout)\b/.test(s)) return "activity";
  if (/\b(demo|record|tab|creative|ui)\b/.test(s)) return "hobby";
  if (/\b(health|family|personal|yoga)\b/.test(s)) return "personal";
  return "work";
}

export function labelForCategory(
  category: TaskCategory,
  customCategories: Record<string, CustomCategory> = {},
): string {
  if (isBuiltinCategory(category)) return CATEGORY_LABELS[category];
  return customCategories[category]?.label ?? "Custom";
}

export function colorForCategory(
  category: TaskCategory,
  customCategories: Record<string, CustomCategory> = {},
): string {
  if (isBuiltinCategory(category)) return CATEGORY_COLORS[category];
  return customCategories[category]?.color ?? CUSTOM_CATEGORY_PALETTE[0];
}

export type TodoItem = {
  id: string;
  title: string;
  done: boolean;
  category: TaskCategory;
  timeLabel?: string;
  dayKey?: string;
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
    title: "Investor pitch prep",
    startMinutes: 9 * 60,
    endMinutes: 11 * 60,
    category: "work",
  },
  {
    id: "evt-2",
    title: "Core architecture planning",
    startMinutes: 13 * 60 + 15,
    endMinutes: 14 * 60,
    category: "work",
  },
  {
    id: "evt-3",
    title: "Design review",
    startMinutes: 14 * 60,
    endMinutes: 15 * 60,
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
    isToday: false,
    events: [],
  },
  {
    key: "sep-1",
    dayLabel: "Tuesday",
    date: 1,
    monthLabel: "SEP",
    bandColor: "#f0a030",
    isToday: true,
    events: todayEvents,
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

export function isEventPast(event: ScheduledEvent, nowMinutes = DEMO_NOW_MINUTES): boolean {
  return nowMinutes >= event.endMinutes;
}

export function isEventUpcoming(event: ScheduledEvent, nowMinutes = DEMO_NOW_MINUTES): boolean {
  return nowMinutes < event.startMinutes;
}

/** Play focus only before an event starts — not while live or after it ends */
export function canFocusEvent(event: ScheduledEvent, nowMinutes = DEMO_NOW_MINUTES): boolean {
  return isEventUpcoming(event, nowMinutes);
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

/** Warm orange panel fill — Today tab reference */
export const TODAY_PANEL_COLOR = "#f0a030";

/** Shared Intent list frame — warm orange, high contrast */
export const INTENT_PANEL_FRAME = {
  todayFill: TODAY_PANEL_COLOR,
  calendarFill: TODAY_PANEL_COLOR,
  outline: "2px solid rgba(26, 26, 24, 0.22)",
  ink: "#1a1a18",
  inkMuted: "rgba(26, 26, 24, 0.62)",
} as const;

export function getTodayBand(): DayBand {
  return calendarDays.find((d) => d.isToday) ?? calendarDays[0];
}

export function formatBandDate(band: DayBand): string {
  const monthNum = monthLabelToNumber(band.monthLabel);
  const dd = String(band.date).padStart(2, "0");
  const mm = String(monthNum).padStart(2, "0");
  return `${mm}.${dd}`;
}

function monthLabelToNumber(label: string): number {
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const index = months.indexOf(label);
  return index >= 0 ? index + 1 : 1;
}

/** Timeline window for calendar strips (minutes from midnight) */
export const CALENDAR_TIMELINE_START = 8 * 60;
export const CALENDAR_TIMELINE_END = 20 * 60;

export function timelinePosition(startMinutes: number): number {
  const span = CALENDAR_TIMELINE_END - CALENDAR_TIMELINE_START;
  const clamped = Math.max(
    CALENDAR_TIMELINE_START,
    Math.min(CALENDAR_TIMELINE_END - 1, startMinutes),
  );
  return ((clamped - CALENDAR_TIMELINE_START) / span) * 100;
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
  if (!item) return "work";
  return item.kind === "event" ? item.event.category : item.todo.category;
}

export function focusableDurationSeconds(item: FocusableItem | null): number {
  if (!item) return 25 * 60;
  if (item.kind === "event") return eventDurationMinutes(item.event) * 60;
  return 25 * 60;
}
