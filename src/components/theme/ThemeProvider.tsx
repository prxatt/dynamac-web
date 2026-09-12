"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type ThemeMode = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "dynamac-theme";

type ThemeContextValue = {
  theme: ThemeMode;
  resolved: ResolvedTheme;
  setTheme: (theme: ThemeMode) => void;
  cycleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeSnapshot = { theme: ThemeMode; resolved: ResolvedTheme };

/** Stable SSR + first-client snapshot — must match getServerSnapshot. */
const serverSnapshot: ThemeSnapshot = { theme: "system", resolved: "light" };

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function readStoredMode(): ThemeMode {
  if (typeof window === "undefined") return "system";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
  } catch {
    return "system";
  }
}

function resolveMode(mode: ThemeMode): ResolvedTheme {
  return mode === "system" ? getSystemTheme() : mode;
}

function applyToDom(resolved: ResolvedTheme) {
  document.documentElement.setAttribute("data-theme", resolved);
  document.documentElement.style.colorScheme = resolved;
}

const listeners = new Set<() => void>();
let memorySnapshot: ThemeSnapshot = serverSnapshot;

function emit(next: ThemeSnapshot) {
  if (memorySnapshot.theme === next.theme && memorySnapshot.resolved === next.resolved) {
    applyToDom(next.resolved);
    return;
  }
  memorySnapshot = next;
  applyToDom(next.resolved);
  listeners.forEach((l) => l());
}

function hydrateFromStorage() {
  if (typeof window === "undefined") return;
  const theme = readStoredMode();
  let resolved = resolveMode(theme);
  // Keep FOUC init script and React in lockstep for system mode
  if (theme === "system") {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") resolved = attr;
  }
  emit({ theme, resolved });
}

function subscribe(onStoreChange: () => void) {
  // Hydrate before first client subscribe so toggle label matches DOM/init script
  hydrateFromStorage();
  listeners.add(onStoreChange);
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const onMq = () => {
    const theme = readStoredMode();
    if (theme === "system") emit({ theme, resolved: getSystemTheme() });
  };
  mq.addEventListener("change", onMq);
  return () => {
    listeners.delete(onStoreChange);
    mq.removeEventListener("change", onMq);
  };
}

function getSnapshot(): ThemeSnapshot {
  // Do not hydrate here — must match getServerSnapshot during hydration.
  return memorySnapshot;
}

function getServerSnapshot(): ThemeSnapshot {
  return serverSnapshot;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Ensure storage hydrate runs even if subscribe timing differs
  useEffect(() => {
    hydrateFromStorage();
  }, []);

  const setTheme = useCallback((next: ThemeMode) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore quota / private mode */
    }
    emit({ theme: next, resolved: resolveMode(next) });
  }, []);

  const cycleTheme = useCallback(() => {
    const order: ThemeMode[] = ["system", "light", "dark"];
    const current = readStoredMode();
    const next = order[(order.indexOf(current) + 1) % order.length]!;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    emit({ theme: next, resolved: resolveMode(next) });
  }, []);

  const value = useMemo(
    () => ({
      theme: snapshot.theme,
      resolved: snapshot.resolved,
      setTheme,
      cycleTheme,
    }),
    [snapshot.theme, snapshot.resolved, setTheme, cycleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

/** Inline before paint — keep in sync with ThemeProvider storage key. */
export const themeInitScript = `(function(){try{var k='${STORAGE_KEY}';var t=localStorage.getItem(k);var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var r=(t==='light'||t==='dark')?t:(d?'dark':'light');document.documentElement.setAttribute('data-theme',r);document.documentElement.style.colorScheme=r;}catch(e){}})();`;
