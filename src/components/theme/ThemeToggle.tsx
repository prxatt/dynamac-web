"use client";

import { useTheme } from "@/components/theme/ThemeProvider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, resolved, cycleTheme } = useTheme();

  const label =
    theme === "system"
      ? `Theme: system (${resolved})`
      : theme === "dark"
        ? "Theme: dark"
        : "Theme: light";

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-buttons)] border border-[var(--color-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] ${className}`}
      aria-label={label}
      title={label}
      suppressHydrationWarning
    >
      {theme === "system" ? (
        <SystemIcon />
      ) : resolved === "dark" ? (
        <MoonIcon />
      ) : (
        <SunIcon />
      )}
    </button>
  );
}

function SystemIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 2.75v10.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 2.75a5.25 5.25 0 0 1 0 10.5" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M13.5 9.2A5.5 5.5 0 0 1 6.8 2.5 5.5 5.5 0 1 0 13.5 9.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
