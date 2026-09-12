/** Bauhaus Zine die-cut system — SVG product glyphs, not kid mascots. */

export type CollageVariant = "now-playing" | "intent" | "shelf" | "footer" | "hero";

export const collageAccents = {
  "now-playing": "var(--color-accent)",
  intent: "var(--color-primary-blue)",
  shelf: "var(--color-primary-yellow)",
  footer: "var(--color-accent)",
  hero: "var(--color-accent)",
} as const;
