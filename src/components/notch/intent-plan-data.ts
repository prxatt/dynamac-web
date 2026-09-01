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

/** Category fills — semantically tied to each kind of task */
export const CATEGORY_COLORS: Record<BuiltinTaskCategory, string> = {
  work: "#2b5ea8",
  personal: "#d4556a",
  hobby: "#7b4fd4",
  activity: "#3daa3d",
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
  "#00a8a8",
  "#ff8c42",
] as const;

/** One distinct Bauhaus fill per month — never reused */
export const MONTH_COLORS: Record<string, string> = {
  JAN: "#5b7fd4",
  FEB: "#e85d75",
  MAR: "#4a9e32",
  APR: "#f5c842",
  MAY: "#9b59b6",
  JUN: "#00a8a8",
  JUL: "#e04f3d",
  AUG: "#ff8c42",
  SEP: "#f0a030",
  OCT: "#8b5a2b",
  NOV: "#6b4c9a",
  DEC: "#2e5aac",
};

export function colorForMonth(monthLabel: string): string {
  return MONTH_COLORS[monthLabel] ?? "#c8c4bc";
}

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
    bandColor: colorForMonth("AUG"),
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
    bandColor: colorForMonth("AUG"),
    isToday: false,
    events: [],
  },
  {
    key: "sep-1",
    dayLabel: "Tuesday",
    date: 1,
    monthLabel: "SEP",
    bandColor: colorForMonth("SEP"),
    isToday: true,
    events: todayEvents,
  },
  {
    key: "sep-2",
    dayLabel: "Wednesday",
    date: 2,
    monthLabel: "SEP",
    bandColor: colorForMonth("SEP"),
    isToday: false,
    events: [],
  },
  {
    key: "sep-3",
    dayLabel: "Thursday",
    date: 3,
    monthLabel: "SEP",
    bandColor: colorForMonth("SEP"),
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

/** Shared Intent list frame */
export const INTENT_PANEL_FRAME = {
  todayFill: TODAY_PANEL_COLOR,
  calendarFill: TODAY_PANEL_COLOR,
  outline: "2px solid rgba(26, 26, 24, 0.22)",
  ink: "#1a1a18",
  inkMuted: "rgba(26, 26, 24, 0.62)",
} as const;

export const TIME_SLIDER_START = 6 * 60;
export const TIME_SLIDER_END = 22 * 60;
export const TIME_SLIDER_STEP = 15;

export function labelToMinutes(label: string): number | null {
  if (!label || label === "Anytime") return null;
  const match = label.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let h = Number(match[1]);
  const m = Number(match[2]);
  const period = match[3].toUpperCase();
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return h * 60 + m;
}

export function clampMinutes(minutes: number): number {
  return Math.max(
    TIME_SLIDER_START,
    Math.min(TIME_SLIDER_END, Math.round(minutes / TIME_SLIDER_STEP) * TIME_SLIDER_STEP),
  );
}

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

/** Timeline window for calendar strips — 8 AM through 6 PM */
export const CALENDAR_TIMELINE_START = 8 * 60;
export const CALENDAR_TIMELINE_END = 18 * 60;

export const CALENDAR_HOUR_MARKERS = [8, 11, 14, 17, 18] as const;

export function timelinePosition(startMinutes: number): number {
  const span = CALENDAR_TIMELINE_END - CALENDAR_TIMELINE_START;
  if (startMinutes <= CALENDAR_TIMELINE_START) return 0;
  if (startMinutes >= CALENDAR_TIMELINE_END) return 100;
  return ((startMinutes - CALENDAR_TIMELINE_START) / span) * 100;
}

export function timelineWidth(startMinutes: number, endMinutes: number): number {
  const span = CALENDAR_TIMELINE_END - CALENDAR_TIMELINE_START;
  const visibleStart = Math.max(startMinutes, CALENDAR_TIMELINE_START);
  const visibleEnd = Math.min(endMinutes, CALENDAR_TIMELINE_END);
  const minutes = Math.max(visibleEnd - visibleStart, 30);
  return Math.min(92, (minutes / span) * 100);
}

export function isBeforeTimelineWindow(minutes: number): boolean {
  return minutes < CALENDAR_TIMELINE_START;
}

export function isAfterTimelineWindow(minutes: number): boolean {
  return minutes >= CALENDAR_TIMELINE_END;
}

export function isTodoPast(todo: TodoItem, nowMinutes = DEMO_NOW_MINUTES): boolean {
  if (!todo.timeLabel) return false;
  const mins = labelToMinutes(todo.timeLabel);
  return mins !== null && mins < nowMinutes;
}

/** Today / current day: live + upcoming only, sorted by relevance */
export function sortEventsForAgenda(
  events: ScheduledEvent[],
  options: { isToday: boolean; nowMinutes?: number },
): ScheduledEvent[] {
  const now = options.nowMinutes ?? DEMO_NOW_MINUTES;
  const list = options.isToday ? events.filter((e) => !isEventPast(e, now)) : [...events];
  return list.sort((a, b) => {
    const aLive = isEventLive(a, now);
    const bLive = isEventLive(b, now);
    if (aLive !== bLive) return aLive ? -1 : 1;
    return a.startMinutes - b.startMinutes;
  });
}

export function filterTodosForAgenda(
  todos: TodoItem[],
  dayKey: string,
  isToday: boolean,
  nowMinutes = DEMO_NOW_MINUTES,
): { untimed: TodoItem[]; timed: TodoItem[] } {
  const forDay = todos.filter(
    (t) => !t.done && (t.dayKey === dayKey || (isToday && !t.dayKey)),
  );
  const untimed = forDay.filter((t) => !t.timeLabel);
  const timed = forDay.filter((t) => {
    if (!t.timeLabel) return false;
    if (!isToday) return true;
    return !isTodoPast(t, nowMinutes);
  });
  return { untimed, timed };
}

export type TimelineLanePlacement = {
  lane: number;
  left: number;
  width: number;
  early: boolean;
  late: boolean;
};

export function assignTimelineLanes(events: ScheduledEvent[]): {
  placements: Map<string, TimelineLanePlacement>;
  laneCount: number;
} {
  const sorted = [...events].sort((a, b) => a.startMinutes - b.startMinutes);
  const laneEnds: number[] = [];
  const placements = new Map<string, TimelineLanePlacement>();

  for (const event of sorted) {
    let lane = 0;
    while (lane < laneEnds.length && laneEnds[lane] > event.startMinutes) {
      lane += 1;
    }
    if (lane === laneEnds.length) laneEnds.push(0);
    laneEnds[lane] = event.endMinutes;

    placements.set(event.id, {
      lane,
      left: timelinePosition(event.startMinutes),
      width: timelineWidth(event.startMinutes, event.endMinutes),
      early: isBeforeTimelineWindow(event.startMinutes),
      late: isAfterTimelineWindow(event.startMinutes),
    });
  }

  return { placements, laneCount: Math.max(laneEnds.length, 1) };
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
