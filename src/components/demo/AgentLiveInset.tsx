"use client";

import { motion } from "motion/react";
import {
  accentForAgent,
  AgentOrb,
  type AgentTool,
} from "@/components/demo/AgentOrb";
import type { GlassStyleId } from "@/lib/glass-themes";
import { glassStyles } from "@/lib/glass-themes";

type AgentRow = {
  tool: AgentTool;
  name: string;
  status: string;
  live?: boolean;
};

const DEMO_AGENTS: AgentRow[] = [
  { tool: "cursor", name: "Cursor", status: "Editing Hero.tsx", live: true },
  { tool: "claude", name: "Claude", status: "Reviewing agents panel" },
];

type AgentLiveInsetProps = {
  agents?: AgentRow[];
  glassStyle?: GlassStyleId;
};

export function AgentLiveInset({
  agents = DEMO_AGENTS,
  glassStyle = "liquidLight",
}: AgentLiveInsetProps) {
  const theme = glassStyles[glassStyle];

  return (
    <motion.div
      className="flex min-w-0 flex-col rounded-2xl border p-2.5"
      style={{
        backgroundColor: theme.inset,
        borderColor: theme.border,
        color: theme.text,
      }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", visualDuration: 0.32, bounce: 0.18 }}
    >
      <header className="mb-1.5 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-coral-pop)] px-2 py-0.5 text-[8px] font-bold tracking-wider text-white">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-white"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            aria-hidden
          />
          LIVE
        </span>
        <span className="text-[9px] font-medium" style={{ color: theme.textMuted }}>
          {agents.length} agent{agents.length === 1 ? "" : "s"}
        </span>
      </header>

      <ul className="space-y-2">
        {agents.map((agent) => {
          const accent = accentForAgent(agent.tool);
          return (
            <li key={agent.tool} className="flex items-center gap-2">
              <AgentOrb tool={agent.tool} size={agent.live ? 30 : 26} pulse={Boolean(agent.live)} />

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold leading-tight">{agent.name}</p>
                <p className="truncate text-[9px] leading-tight" style={{ color: theme.textMuted }}>
                  {agent.status}
                </p>
              </div>

              <span
                className="shrink-0 rounded-full px-2.5 py-1 text-[8px] font-bold text-white"
                style={{ backgroundColor: accent }}
              >
                Open
              </span>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
