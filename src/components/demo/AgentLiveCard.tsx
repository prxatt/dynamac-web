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
    hoverScale: [1.02, 1, 1.08, 0.01],
    spring: {
      type: "spring",
      visualDuration: 0.35,
      bounce: 0.2,
    },
    borderWidth: [2, 0, 4, 1],
  });

  const scale = hovered ? p.hoverScale : 1;
  const borderWidth = hovered ? p.borderWidth : 1;
  const borderColor = hovered
    ? "var(--color-fresh-grass)"
    : "var(--color-hairline-mist)";

  return (
    <motion.article
      className="w-full max-w-sm rounded-[var(--radius-cards)] bg-[var(--color-sandstone)] p-[var(--card-padding)]"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ scale, borderWidth, borderColor }}
      transition={p.spring as Transition}
      style={{ borderStyle: "solid" }}
    >
      <header className="flex items-center justify-between gap-3">
        <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--color-stone-gray)]">
          Live agents
        </p>
        <span className="flex items-center gap-1.5 text-[length:var(--text-body-sm)] font-medium text-[var(--color-ink-black)]">
          <span className="h-2 w-2 rounded-full bg-[var(--color-fresh-grass)]" aria-hidden />
          Active
        </span>
      </header>

      <ul className="mt-4 space-y-3">
        {agents.map((agent) => (
          <li
            key={agent.name}
            className="flex items-start justify-between gap-3 rounded-[var(--radius-small)] bg-[var(--color-pure-white)] px-4 py-3"
          >
            <div>
              <p className="text-[length:var(--text-body-sm)] font-medium text-[var(--color-ink-black)]">
                {agent.name}
              </p>
              <p className="mt-0.5 text-[length:var(--text-body-sm)] text-[var(--color-stone-gray)]">
                {agent.status}
              </p>
            </div>
            <span className="flex items-center gap-1.5 text-[length:var(--text-body-sm)] font-medium text-[var(--color-ink-black)]">
              Open
              <span className="h-2 w-2 rounded-full bg-[var(--color-sky-pop)]" aria-hidden />
            </span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
