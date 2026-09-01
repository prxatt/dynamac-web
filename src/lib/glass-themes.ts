export type GlassStyleId = "liquidLight" | "liquidDark" | "solidDark";

export const glassStyleOrder: GlassStyleId[] = ["liquidLight", "liquidDark", "solidDark"];

export const glassStyles = {
  liquidLight: {
    id: "liquidLight" as const,
    label: "Liquid Glass",
    card: "var(--color-sandstone)",
    inset: "var(--color-pure-white)",
    text: "var(--color-ink-black)",
    textMuted: "var(--color-stone-gray)",
    border: "var(--color-hairline-mist)",
    dashed: "var(--color-hairline-mist)",
  },
  liquidDark: {
    id: "liquidDark" as const,
    label: "Dark Liquid Glass",
    card: "#242426",
    inset: "rgba(255,255,255,0.08)",
    text: "#ffffff",
    textMuted: "rgba(255,255,255,0.72)",
    border: "rgba(255,255,255,0.12)",
    dashed: "rgba(255,255,255,0.22)",
  },
  solidDark: {
    id: "solidDark" as const,
    label: "Dark Mode",
    card: "#121214",
    inset: "rgba(255,255,255,0.06)",
    text: "#ffffff",
    textMuted: "rgba(255,255,255,0.65)",
    border: "rgba(255,255,255,0.1)",
    dashed: "rgba(255,255,255,0.18)",
  },
} as const;

export function nextGlassStyle(current: GlassStyleId): GlassStyleId {
  const index = glassStyleOrder.indexOf(current);
  return glassStyleOrder[(index + 1) % glassStyleOrder.length]!;
}
