"use client";

import { motion } from "motion/react";

export type AgentTool = "cursor" | "claude" | "codex";

const ORB_THEMES: Record<AgentTool, { accent: string; depth: string }> = {
  cursor: { accent: "#48a8fa", depth: "#0a1628" },
  claude: { accent: "#f5852e", depth: "#1a1008" },
  codex: { accent: "#52d17a", depth: "#0a1a10" },
};

type AgentOrbProps = {
  tool: AgentTool;
  size?: number;
  pulse?: boolean;
};

/** Liquid-style orb marker — matches DynaMac app agent glyphs */
export function AgentOrb({ tool, size = 32, pulse = true }: AgentOrbProps) {
  const { accent, depth } = ORB_THEMES[tool];

  return (
    <motion.span
      className="flex shrink-0 items-center justify-center rounded-full border"
      style={{
        width: size,
        height: size,
        borderColor: accent,
        background: `radial-gradient(circle at 30% 30%, ${accent}, ${depth})`,
        boxShadow: `0 0 ${Math.max(6, size * 0.2)}px ${accent}55`,
      }}
      animate={pulse ? { scale: [1, 1.05, 1] } : undefined}
      transition={pulse ? { duration: 2.8, repeat: Infinity, ease: "easeInOut" } : undefined}
      aria-hidden
    />
  );
}

export function accentForAgent(tool: AgentTool): string {
  return ORB_THEMES[tool].accent;
}
