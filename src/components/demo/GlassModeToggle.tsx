"use client";

import type { GlassStyleId } from "@/lib/glass-themes";
import { glassStyles, nextGlassStyle } from "@/lib/glass-themes";

type GlassModeToggleProps = {
  value: GlassStyleId;
  onChange: (style: GlassStyleId) => void;
  className?: string;
};

export function GlassModeToggle({ value, onChange, className = "" }: GlassModeToggleProps) {
  const theme = glassStyles[value];
  const short =
    value === "liquidLight" ? "Glass" : value === "liquidDark" ? "Dark glass" : "Solid";

  return (
    <button
      type="button"
      onClick={() => onChange(nextGlassStyle(value))}
      className={`max-w-full truncate rounded-[var(--radius-small)] border px-2 py-1 font-mono text-[9px] font-medium tracking-[0.04em] transition-opacity hover:opacity-90 sm:px-2.5 ${className}`}
      style={{
        borderColor: theme.border,
        color: theme.textMuted,
        backgroundColor: "transparent",
      }}
      title={`Preview notch glass · ${theme.label}`}
      aria-label={`Glass style: ${theme.label}`}
    >
      {short}
    </button>
  );
}
