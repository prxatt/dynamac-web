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
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import {
  DEMO_NOW_MINUTES,
  focusableDurationSeconds,
  focusableFromEvent,
  getLiveEvent,
  resolveCategory,
  todayEvents as initialTodayEvents,
  type FocusableItem,
  type ScheduledEvent,
  type TaskCategory,
  type TodoItem,
} from "@/components/notch/intent-plan-data";
import type { NotchTabId } from "@/components/notch/notch-styles";

export type FocusTimerStyle = "blocks" | "span";
export type FocusPhase = "idle" | "work" | "break";

const BREAK_SECONDS = 5 * 60;
const DEFAULT_FOCUS_SECONDS = 25 * 60;

type NotchDemoContextValue = {
  focusPhase: FocusPhase;
  focusActive: boolean;
  focusExpanded: boolean;
  focusStyle: FocusTimerStyle;
  secondsLeft: number;
  breakSecondsLeft: number;
  totalSeconds: number;
  progress: number;
  breakProgress: number;
  linkedItem: FocusableItem | null;
  liveEvent: ScheduledEvent | null;
  todos: TodoItem[];
  events: ScheduledEvent[];
  setFocusStyle: (style: FocusTimerStyle) => void;
  toggleFocusExpanded: () => void;
  startFocus: (item?: FocusableItem | null) => void;
  endFocus: (completeTodo?: boolean) => void;
  skipBreak: () => void;
  toggleTodo: (id: string) => void;
  addTodo: (input: {
    title: string;
    category?: TaskCategory;
    collaborators?: string[];
  }) => void;
  addEvent: (input: {
    title: string;
    category?: TaskCategory;
    durationMinutes?: number;
    collaborators?: string[];
    dayKey?: string;
  }) => void;
  showAddSheet: boolean;
  setShowAddSheet: (open: boolean) => void;
  jumpToIntent: () => void;
};

const NotchDemoContext = createContext<NotchDemoContextValue | null>(null);

type NotchDemoProviderProps = {
  children: ReactNode;
  onTabChange?: (id: NotchTabId) => void;
};

const INITIAL_TODOS: TodoItem[] = [
  { id: "todo-1", title: "Record tab demos", done: false, category: "hobby" },
  {
    id: "todo-2",
    title: "Wire Stripe checkout",
    done: true,
    category: "admin",
    timeLabel: "04:30 PM",
  },
];

export function NotchDemoProvider({ children, onTabChange }: NotchDemoProviderProps) {
  const reducedMotion = useReducedMotion();
  const [focusPhase, setFocusPhase] = useState<FocusPhase>("idle");
  const [focusExpanded, setFocusExpanded] = useState(false);
  const [focusStyle, setFocusStyle] = useState<FocusTimerStyle>("blocks");
  const [linkedItem, setLinkedItem] = useState<FocusableItem | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_FOCUS_SECONDS);
  const [breakSecondsLeft, setBreakSecondsLeft] = useState(BREAK_SECONDS);
  const [totalSeconds, setTotalSeconds] = useState(DEFAULT_FOCUS_SECONDS);
  const [todos, setTodos] = useState<TodoItem[]>(INITIAL_TODOS);
  const [events, setEvents] = useState<ScheduledEvent[]>(initialTodayEvents);
  const [showAddSheet, setShowAddSheet] = useState(false);

  const liveEvent = useMemo(() => getLiveEvent(events), [events]);
  const focusActive = focusPhase !== "idle";
  const progress = totalSeconds > 0 ? 1 - secondsLeft / totalSeconds : 0;
  const breakProgress = BREAK_SECONDS > 0 ? 1 - breakSecondsLeft / BREAK_SECONDS : 0;

  const startFocus = useCallback(
    (item?: FocusableItem | null) => {
      const target = item ?? (liveEvent ? focusableFromEvent(liveEvent) : null);
      const duration = focusableDurationSeconds(target);
      setLinkedItem(target);
      setTotalSeconds(duration);
      setSecondsLeft(duration);
      setFocusPhase("work");
      setFocusExpanded(false);
    },
    [liveEvent],
  );

  const endFocus = useCallback(
    (completeTodo = false) => {
      if (completeTodo && linkedItem?.kind === "todo") {
        setTodos((list) =>
          list.map((t) => (t.id === linkedItem.todo.id ? { ...t, done: true } : t)),
        );
      }
      setFocusPhase("idle");
      setFocusExpanded(false);
      setLinkedItem(null);
      setSecondsLeft(DEFAULT_FOCUS_SECONDS);
      setTotalSeconds(DEFAULT_FOCUS_SECONDS);
      setBreakSecondsLeft(BREAK_SECONDS);
    },
    [linkedItem],
  );

  const skipBreak = useCallback(() => {
    setFocusPhase("idle");
    setLinkedItem(null);
    setBreakSecondsLeft(BREAK_SECONDS);
  }, []);

  const toggleFocusExpanded = useCallback(() => {
    setFocusExpanded((v) => !v);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((list) => list.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }, []);

  const addTodo = useCallback(
    (input: { title: string; category?: TaskCategory; collaborators?: string[] }) => {
      setTodos((list) => [
        {
          id: `todo-${Date.now()}`,
          title: input.title,
          done: false,
          category: input.category ?? resolveCategory(input.title),
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
      collaborators?: string[];
      dayKey?: string;
    }) => {
      const duration = input.durationMinutes ?? 60;
      const start = DEMO_NOW_MINUTES + 60;
      const newEvent: ScheduledEvent = {
        id: `evt-${Date.now()}`,
        title: input.title,
        startMinutes: start,
        endMinutes: start + duration,
        category: input.category ?? resolveCategory(input.title),
        collaborators: input.collaborators,
      };
      setEvents((list) => [...list, newEvent]);
    },
    [],
  );

  const jumpToIntent = useCallback(() => {
    onTabChange?.("intent");
  }, [onTabChange]);

  useEffect(() => {
    if (focusPhase === "idle" || reducedMotion) return;

    const interval = window.setInterval(() => {
      if (focusPhase === "work") {
        setSecondsLeft((value) => {
          if (value <= 1) {
            window.setTimeout(() => {
              setFocusPhase("break");
              setBreakSecondsLeft(BREAK_SECONDS);
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
              setFocusPhase("idle");
              setLinkedItem(null);
              setBreakSecondsLeft(BREAK_SECONDS);
            }, 0);
            return 0;
          }
          return value - 1;
        });
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, [focusPhase, reducedMotion]);

  const value = useMemo<NotchDemoContextValue>(
    () => ({
      focusPhase,
      focusActive,
      focusExpanded,
      focusStyle,
      secondsLeft,
      breakSecondsLeft,
      totalSeconds,
      progress,
      breakProgress,
      linkedItem,
      liveEvent,
      todos,
      events,
      setFocusStyle,
      toggleFocusExpanded,
      startFocus,
      endFocus,
      skipBreak,
      toggleTodo,
      addTodo,
      addEvent,
      showAddSheet,
      setShowAddSheet,
      jumpToIntent,
    }),
    [
      focusPhase,
      focusActive,
      focusExpanded,
      focusStyle,
      secondsLeft,
      breakSecondsLeft,
      totalSeconds,
      progress,
      breakProgress,
      linkedItem,
      liveEvent,
      todos,
      events,
      toggleFocusExpanded,
      startFocus,
      endFocus,
      skipBreak,
      toggleTodo,
      addTodo,
      addEvent,
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
