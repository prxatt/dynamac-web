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

/** Flat agent disc — Bauhaus restraint over glow-orb soup. */
export function AgentOrb({ tool, size = 32, pulse = true }: AgentOrbProps) {
  const { accent, depth } = ORB_THEMES[tool];

  return (
    <motion.span
      className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border"
      style={{
        width: size,
        height: size,
        borderColor: accent,
        backgroundColor: depth,
      }}
      animate={pulse ? { scale: [1, 1.04, 1] } : undefined}
      transition={pulse ? { duration: 2.8, repeat: Infinity, ease: "easeInOut" } : undefined}
      aria-hidden
    >
      <span
        className="absolute inset-[22%] rounded-full"
        style={{ backgroundColor: accent }}
      />
    </motion.span>
  );
}

export function accentForAgent(tool: AgentTool): string {
  return ORB_THEMES[tool].accent;
}
