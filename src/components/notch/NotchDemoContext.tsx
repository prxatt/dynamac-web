"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  buildCalendarDayRange,
  CUSTOM_CATEGORY_PALETTE,
  customCategoryId,
  DEMO_NOW_MINUTES,
  getLiveEvent,
  getTodayDayKey,
  resolveCategory,
  type CustomCategory,
  type DayBand,
  type FocusableItem,
  type ScheduledEvent,
  type TaskCategory,
  type TodoItem,
} from "@/components/notch/intent-plan-data";
import type { NotchTabId } from "@/components/notch/notch-styles";

export type FocusPhase = "idle" | "work" | "break";

export type ItemSheetState =
  | { kind: "add"; dayKey?: string }
  | { kind: "todo"; id: string }
  | { kind: "event"; id: string; dayKey?: string };

const BREAK_SECONDS = 5 * 60;
const DEFAULT_FOCUS_MINUTES = 25;
const MIN_FOCUS_MINUTES = 5;
const MAX_FOCUS_MINUTES = 4 * 60;
const TODAY_KEY = getTodayDayKey();

type NotchDemoContextValue = {
  focusPhase: FocusPhase;
  focusActive: boolean;
  secondsLeft: number;
  breakSecondsLeft: number;
  totalSeconds: number;
  progress: number;
  breakProgress: number;
  linkedItem: FocusableItem | null;
  configuredFocusMinutes: number;
  focusDurationStepMinutes: number;
  focusGridCellCount: number;
  adjustFocusMinutes: (delta: number) => void;
  liveEvent: ScheduledEvent | null;
  todos: TodoItem[];
  events: ScheduledEvent[];
  calendarDays: DayBand[];
  customCategories: Record<string, CustomCategory>;
  addCustomCategory: (label: string, color?: string) => string;
  selectedDayKey: string;
  setSelectedDayKey: (key: string) => void;
  startFocus: (item?: FocusableItem | null) => void;
  endFocus: (completeTodo?: boolean) => void;
  skipBreak: () => void;
  toggleTodo: (id: string) => void;
  addTodo: (input: {
    title: string;
    category?: TaskCategory;
    timeLabel?: string;
    dayKey?: string;
    collaborators?: string[];
  }) => void;
  addEvent: (input: {
    title: string;
    category?: TaskCategory;
    durationMinutes?: number;
    startMinutes?: number;
    collaborators?: string[];
    dayKey?: string;
  }) => void;
  updateTodo: (
    id: string,
    patch: {
      title?: string;
      category?: TaskCategory;
      timeLabel?: string;
      collaborators?: string[];
    },
  ) => void;
  deleteTodo: (id: string) => void;
  updateEvent: (
    dayKey: string,
    id: string,
    patch: {
      title?: string;
      category?: TaskCategory;
      durationMinutes?: number;
      startMinutes?: number;
      collaborators?: string[];
    },
  ) => void;
  deleteEvent: (dayKey: string, id: string) => void;
  itemSheet: ItemSheetState | null;
  openItemSheet: (sheet: ItemSheetState) => void;
  closeItemSheet: () => void;
  showAddSheet: boolean;
  setShowAddSheet: (open: boolean, dayKey?: string) => void;
  jumpToIntent: () => void;
};

const NotchDemoContext = createContext<NotchDemoContextValue | null>(null);

type NotchDemoProviderProps = {
  children: ReactNode;
  onTabChange?: (id: NotchTabId) => void;
};

const INITIAL_TODOS: TodoItem[] = [
  { id: "todo-1", title: "Record tab demos", done: false, category: "hobby", dayKey: TODAY_KEY },
  {
    id: "todo-2",
    title: "Wire Stripe checkout",
    done: true,
    category: "activity",
    timeLabel: "04:30 PM",
    dayKey: TODAY_KEY,
  },
];

function snapFocusMinutes(minutes: number): number {
  const clamped = Math.min(MAX_FOCUS_MINUTES, Math.max(MIN_FOCUS_MINUTES, minutes));
  if (clamped >= 60) return Math.min(MAX_FOCUS_MINUTES, Math.max(60, Math.floor(clamped / 15) * 15));
  return Math.min(55, Math.max(MIN_FOCUS_MINUTES, Math.floor(clamped / 5) * 5));
}

export function NotchDemoProvider({ children, onTabChange }: NotchDemoProviderProps) {
  const [focusPhase, setFocusPhase] = useState<FocusPhase>("idle");
  const [configuredFocusMinutes, setConfiguredFocusMinutes] = useState(DEFAULT_FOCUS_MINUTES);
  const [linkedItem, setLinkedItem] = useState<FocusableItem | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_FOCUS_MINUTES * 60);
  const [breakSecondsLeft, setBreakSecondsLeft] = useState(BREAK_SECONDS);
  const [totalSeconds, setTotalSeconds] = useState(DEFAULT_FOCUS_MINUTES * 60);
  const [todos, setTodos] = useState<TodoItem[]>(INITIAL_TODOS);
  const [calendarDays, setCalendarDays] = useState<DayBand[]>(() => buildCalendarDayRange());
  const [customCategories, setCustomCategories] = useState<Record<string, CustomCategory>>({});
  const [selectedDayKey, setSelectedDayKey] = useState(TODAY_KEY);
  const [itemSheet, setItemSheet] = useState<ItemSheetState | null>(null);
  const showAddSheet = itemSheet?.kind === "add";
  const setShowAddSheet = useCallback((open: boolean, dayKey?: string) => {
    setItemSheet(open ? { kind: "add", dayKey } : null);
  }, []);
  const openItemSheet = useCallback((sheet: ItemSheetState) => {
    setItemSheet(sheet);
  }, []);
  const closeItemSheet = useCallback(() => {
    setItemSheet(null);
  }, []);

  const events = useMemo(
    () => calendarDays.find((d) => d.isToday)?.events ?? [],
    [calendarDays],
  );
  const liveEvent = useMemo(() => getLiveEvent(events), [events]);
  const focusActive = focusPhase !== "idle";
  const progress = totalSeconds > 0 ? 1 - secondsLeft / totalSeconds : 0;
  const breakProgress = BREAK_SECONDS > 0 ? 1 - breakSecondsLeft / BREAK_SECONDS : 0;
  const focusDurationStepMinutes = configuredFocusMinutes >= 60 ? 15 : 5;

  const focusGridCellCount = useMemo(() => {
    if (focusPhase === "break") return Math.max(1, BREAK_SECONDS / 60);
    const minutes = Math.max(1, configuredFocusMinutes);
    if (minutes <= 2) return minutes * 60;
    return minutes;
  }, [focusPhase, configuredFocusMinutes]);

  const resetFocusState = useCallback(() => {
    setFocusPhase("idle");
    setLinkedItem(null);
    setBreakSecondsLeft(BREAK_SECONDS);
    setConfiguredFocusMinutes((mins) => {
      const secs = mins * 60;
      setSecondsLeft(secs);
      setTotalSeconds(secs);
      return mins;
    });
  }, []);

  const adjustFocusMinutes = useCallback(
    (delta: number) => {
      if (focusPhase !== "idle") return;
      const direction = delta < 0 ? -1 : 1;
      setConfiguredFocusMinutes((mins) => {
        // Step by destination band so 60→55 uses 5m (not 15m, which would skip to 45).
        const step =
          direction < 0 ? (mins <= 60 ? 5 : 15) : mins >= 60 ? 15 : 5;
        const next = snapFocusMinutes(mins + direction * step);
        const secs = next * 60;
        setTotalSeconds(secs);
        setSecondsLeft(secs);
        return next;
      });
    },
    [focusPhase],
  );

  const startFocus = useCallback(
    (item?: FocusableItem | null) => {
      // Duration is always the configured focus block — never the live event length.
      const target = item === undefined ? null : item;
      const duration = configuredFocusMinutes * 60;
      setLinkedItem(target);
      setTotalSeconds(duration);
      setSecondsLeft(duration);
      setBreakSecondsLeft(BREAK_SECONDS);
      setFocusPhase("work");
    },
    [configuredFocusMinutes],
  );

  const endFocus = useCallback(
    (completeTodo = false) => {
      if (completeTodo && linkedItem?.kind === "todo") {
        setTodos((list) =>
          list.map((t) => (t.id === linkedItem.todo.id ? { ...t, done: true } : t)),
        );
      }
      resetFocusState();
    },
    [linkedItem, resetFocusState],
  );

  const skipBreak = useCallback(() => {
    resetFocusState();
  }, [resetFocusState]);

  const toggleTodo = useCallback((id: string) => {
    setTodos((list) => list.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }, []);

  const addCustomCategory = useCallback((label: string, color?: string) => {
    const trimmed = label.trim();
    const id = customCategoryId(trimmed);
    setCustomCategories((prev) => {
      if (prev[id]) return prev;
      const fallback =
        CUSTOM_CATEGORY_PALETTE[Object.keys(prev).length % CUSTOM_CATEGORY_PALETTE.length];
      return { ...prev, [id]: { id, label: trimmed, color: color ?? fallback } };
    });
    return id;
  }, []);

  const addTodo = useCallback(
    (input: {
      title: string;
      category?: TaskCategory;
      timeLabel?: string;
      dayKey?: string;
      collaborators?: string[];
    }) => {
      setTodos((list) => [
        {
          id: `todo-${Date.now()}`,
          title: input.title,
          done: false,
          category: input.category ?? resolveCategory(input.title),
          timeLabel: input.timeLabel,
          dayKey: input.dayKey ?? TODAY_KEY,
          collaborators: input.collaborators,
        },
        ...list,
      ]);
    },
    [],
  );

  const addEvent = useCallback(
    (input: {
      title: string;
      category?: TaskCategory;
      durationMinutes?: number;
      startMinutes?: number;
      collaborators?: string[];
      dayKey?: string;
    }) => {
      const duration = input.durationMinutes ?? 60;
      const start = input.startMinutes ?? DEMO_NOW_MINUTES + 60;
      const targetKey = input.dayKey ?? selectedDayKey ?? TODAY_KEY;
      const newEvent: ScheduledEvent = {
        id: `evt-${Date.now()}`,
        title: input.title,
        startMinutes: start,
        endMinutes: start + duration,
        category: input.category ?? resolveCategory(input.title),
        collaborators: input.collaborators,
      };
      setCalendarDays((days) =>
        days.map((day) =>
          day.key === targetKey ? { ...day, events: [...day.events, newEvent] } : day,
        ),
      );
    },
    [selectedDayKey],
  );

  const updateTodo = useCallback(
    (
      id: string,
      patch: {
        title?: string;
        category?: TaskCategory;
        timeLabel?: string;
        collaborators?: string[];
      },
    ) => {
      setTodos((list) => list.map((t) => (t.id === id ? { ...t, ...patch } : t)));
    },
    [],
  );

  const deleteTodo = useCallback((id: string) => {
    setTodos((list) => list.filter((t) => t.id !== id));
  }, []);

  const updateEvent = useCallback(
    (
      dayKey: string,
      id: string,
      patch: {
        title?: string;
        category?: TaskCategory;
        durationMinutes?: number;
        startMinutes?: number;
        collaborators?: string[];
      },
    ) => {
      setCalendarDays((days) =>
        days.map((day) => {
          if (day.key !== dayKey) return day;
          return {
            ...day,
            events: day.events.map((event) => {
              if (event.id !== id) return event;
              const duration = patch.durationMinutes ?? event.endMinutes - event.startMinutes;
              const startMinutes = patch.startMinutes ?? event.startMinutes;
              return {
                ...event,
                title: patch.title ?? event.title,
                category: patch.category ?? event.category,
                collaborators: patch.collaborators ?? event.collaborators,
                startMinutes,
                endMinutes: startMinutes + duration,
              };
            }),
          };
        }),
      );
    },
    [],
  );

  const deleteEvent = useCallback((dayKey: string, id: string) => {
    setCalendarDays((days) =>
      days.map((day) =>
        day.key === dayKey
          ? { ...day, events: day.events.filter((e) => e.id !== id) }
          : day,
      ),
    );
  }, []);

  const jumpToIntent = useCallback(() => {
    onTabChange?.("intent");
  }, [onTabChange]);

  useEffect(() => {
    if (focusPhase === "idle") return;

    const interval = window.setInterval(() => {
      if (focusPhase === "work") {
        setSecondsLeft((value) => {
          if (value <= 1) {
            const sessionTotal = totalSeconds;
            window.setTimeout(() => {
              // Classic pomodoro only: auto 5-min break after a 25-minute session.
              if (sessionTotal === DEFAULT_FOCUS_MINUTES * 60) {
                setFocusPhase("break");
                setBreakSecondsLeft(BREAK_SECONDS);
              } else {
                resetFocusState();
              }
            }, 0);
            return 0;
          }
          return value - 1;
        });
        return;
      }

      if (focusPhase === "break") {
        setBreakSecondsLeft((value) => {
          if (value <= 1) {
            window.setTimeout(() => {
              resetFocusState();
            }, 0);
            return 0;
          }
          return value - 1;
        });
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, [focusPhase, totalSeconds, resetFocusState]);

  const value = useMemo<NotchDemoContextValue>(
    () => ({
      focusPhase,
      focusActive,
      secondsLeft,
      breakSecondsLeft,
      totalSeconds,
      progress,
      breakProgress,
      linkedItem,
      configuredFocusMinutes,
      focusDurationStepMinutes,
      focusGridCellCount,
      adjustFocusMinutes,
      liveEvent,
      todos,
      events,
      calendarDays,
      customCategories,
      addCustomCategory,
      selectedDayKey,
      setSelectedDayKey,
      startFocus,
      endFocus,
      skipBreak,
      toggleTodo,
      addTodo,
      addEvent,
      updateTodo,
      deleteTodo,
      updateEvent,
      deleteEvent,
      itemSheet,
      openItemSheet,
      closeItemSheet,
      showAddSheet,
      setShowAddSheet,
      jumpToIntent,
    }),
    [
      focusPhase,
      focusActive,
      secondsLeft,
      breakSecondsLeft,
      totalSeconds,
      progress,
      breakProgress,
      linkedItem,
      configuredFocusMinutes,
      focusDurationStepMinutes,
      focusGridCellCount,
      adjustFocusMinutes,
      liveEvent,
      todos,
      events,
      calendarDays,
      customCategories,
      addCustomCategory,
      selectedDayKey,
      startFocus,
      endFocus,
      skipBreak,
      toggleTodo,
      addTodo,
      addEvent,
      updateTodo,
      deleteTodo,
      updateEvent,
      deleteEvent,
      itemSheet,
      openItemSheet,
      closeItemSheet,
      showAddSheet,
      jumpToIntent,
    ],
  );

  return <NotchDemoContext.Provider value={value}>{children}</NotchDemoContext.Provider>;
}

export function useNotchDemo() {
  const ctx = useContext(NotchDemoContext);
  if (!ctx) throw new Error("useNotchDemo must be used within NotchDemoProvider");
  return ctx;
}

export function useNotchDemoOptional() {
  return useContext(NotchDemoContext);
}
