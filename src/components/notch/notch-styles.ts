export const notch = {
  surface: "#1a1a1c",
  surfaceRaised: "#242426",
  surfaceInset: "#121214",
  border: "rgba(255,255,255,0.08)",
  borderStrong: "rgba(255,255,255,0.14)",
  text: "#ffffff",
  textMuted: "rgba(255,255,255,0.62)",
  textDim: "rgba(255,255,255,0.42)",
  liveRed: "#ff3b3b",
  liveBadge: "rgba(220,40,50,0.45)",
  accentBlue: "#2ba0ff",
  accentCoral: "#ff705d",
  accentGrass: "#8ed462",
} as const;

export const notchTabs = [
  { id: "now-playing", label: "Now Playing", shortLabel: "Now Playing" },
  { id: "intent", label: "Intent", shortLabel: "Intent" },
  { id: "shelf", label: "Shelf", shortLabel: "Shelf" },
] as const;

export type NotchTabId = (typeof notchTabs)[number]["id"];
