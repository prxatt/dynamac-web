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

  return (
    <button
      type="button"
      onClick={() => onChange(nextGlassStyle(value))}
      className={`rounded-full border px-3 py-1 text-[10px] font-medium transition-colors ${className}`}
      style={{
        borderColor: theme.border,
        color: theme.text,
        backgroundColor: theme.inset,
      }}
      title="Preview notch glass styles"
    >
      {theme.label}
    </button>
  );
}
