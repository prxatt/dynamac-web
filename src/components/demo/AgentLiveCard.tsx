"use client";

import { useDialKit } from "dialkit";
import { motion, type Transition } from "motion/react";
import { useState } from "react";

const agents = [
  { name: "Cursor", status: "Editing Hero.tsx" },
  { name: "Claude", status: "Reviewing agents panel" },
] as const;

export function AgentLiveCard() {
  const [hovered, setHovered] = useState(false);

  const p = useDialKit("Agent Live Card", {
    hoverScale: [1.03, 1, 1.12, 0.01],
    spring: {
      type: "spring",
      visualDuration: 0.35,
      bounce: 0.2,
    },
    shadow: {
      blur: [28, 0, 64, 1],
      offsetY: [16, 0, 40, 1],
      opacity: [0.45, 0, 0.8, 0.01],
    },
  });

  const scale = hovered ? p.hoverScale : 1;
  const boxShadow = hovered
    ? `0 ${p.shadow.offsetY}px ${p.shadow.blur}px rgba(0, 0, 0, ${p.shadow.opacity})`
    : "0 4px 16px rgba(0, 0, 0, 0.22)";

  return (
    <motion.article
      className="w-full max-w-sm rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-panel)] p-5"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ scale }}
      transition={p.spring as Transition}
      style={{ boxShadow }}
    >
      <header className="flex items-center justify-between gap-3">
        <p className="text-[10px] font-bold tracking-[0.14em] text-[var(--fg-dim)] uppercase">
          Live agents
        </p>
        <span className="flex items-center gap-1.5 text-[10px] font-medium text-[var(--teal)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--teal)]" aria-hidden />
          Active
        </span>
      </header>

      <ul className="mt-4 space-y-3">
        {agents.map((agent) => (
          <li
            key={agent.name}
            className="flex items-start justify-between gap-3 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-2.5"
          >
            <div>
              <p className="text-sm font-semibold">{agent.name}</p>
              <p className="mt-0.5 text-xs text-[var(--fg-muted)]">{agent.status}</p>
            </div>
            <span className="text-[10px] font-semibold tracking-wide text-[var(--teal)] uppercase">
              Open
            </span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
