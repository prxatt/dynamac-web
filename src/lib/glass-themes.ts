export type GlassStyleId = "liquidLight" | "liquidDark" | "solidDark";

export const glassStyleOrder: GlassStyleId[] = ["liquidLight", "liquidDark", "solidDark"];

type GlassStyle = {
  id: GlassStyleId;
  label: string;
  card: string;
  inset: string;
  text: string;
  textMuted: string;
  border: string;
  dashed: string;
  /** Soft Mac glass shell — solid mode stays flat */
  shellShadow: string;
  shellBackdrop: string;
};

export const glassStyles: Record<GlassStyleId, GlassStyle> = {
  liquidLight: {
    id: "liquidLight",
    label: "Liquid Glass",
    // Higher opacity on light canvas so HUD content stays crisp (not muddy frosted soup)
    card: "color-mix(in srgb, var(--glass-light-card) 94%, transparent)",
    inset: "var(--glass-light-inset)",
    text: "var(--glass-light-text)",
    textMuted: "var(--glass-light-muted)",
    border: "var(--glass-light-border)",
    dashed: "var(--glass-light-border)",
    shellShadow:
      "inset 0 1px 0 rgba(255,255,255,0.65), inset 0 -1px 0 rgba(0,0,0,0.07), 0 16px 36px rgba(18,19,20,0.1)",
    shellBackdrop: "blur(14px) saturate(1.12)",
  },
  liquidDark: {
    id: "liquidDark",
    label: "Dark Liquid Glass",
    // Slightly denser so Bauhaus Intent yellow / agents stay crisp on editorial dark
    card: "rgba(36,36,38,0.94)",
    inset: "rgba(255,255,255,0.08)",
    text: "#ffffff",
    textMuted: "rgba(255,255,255,0.72)",
    border: "rgba(255,255,255,0.14)",
    dashed: "rgba(255,255,255,0.22)",
    shellShadow:
      "inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -1px 0 rgba(0,0,0,0.35), 0 22px 48px rgba(0,0,0,0.45)",
    shellBackdrop: "blur(16px) saturate(1.15)",
  },
  solidDark: {
    id: "solidDark",
    label: "Dark Mode",
    card: "#121214",
    inset: "rgba(255,255,255,0.06)",
    text: "#ffffff",
    textMuted: "rgba(255,255,255,0.65)",
    border: "rgba(255,255,255,0.1)",
    dashed: "rgba(255,255,255,0.18)",
    shellShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 12px 28px rgba(0,0,0,0.35)",
    shellBackdrop: "none",
  },
};

export function nextGlassStyle(current: GlassStyleId): GlassStyleId {
  const index = glassStyleOrder.indexOf(current);
  return glassStyleOrder[(index + 1) % glassStyleOrder.length]!;
}
