/**
 * Marketing notch showcase — scaled from the real app open chrome.
 * @see DynaMac/boringNotch/sizing/matters.swift (`openNotchSize` 760×236)
 */
export const NOTCH_SHOWCASE = {
  /** Matches `openNotchSize.width` */
  width: "47.5rem",
  /** Menubar band — tabs left, notch center, toggle right */
  bandHeight: "1.75rem",
  notchWidth: "5.5rem",
  notchHeight: "1.375rem",
  /** Equal-width tab pills — fits left column without touching notch */
  tabWidth: "6.25rem",
  /** Gap between tab bar edge and notch column */
  notchClearance: "0.75rem",
} as const;

export const TAB_ACCENTS = {
  "now-playing": {
    color: "var(--color-coral-pop)",
    activeText: "#ffffff",
    mark: "square" as const,
  },
  intent: {
    color: "var(--color-sky-pop)",
    activeText: "#ffffff",
    mark: "circle" as const,
  },
  shelf: {
    color: "var(--color-sunshine-pop)",
    activeText: "var(--color-ink-black)",
    mark: "triangle" as const,
  },
} as const;
