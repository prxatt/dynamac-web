"use client";

import { motion } from "motion/react";
import { AgentOrb, accentForAgent, type AgentTool } from "@/components/demo/AgentOrb";
import { notch } from "@/components/notch/notch-styles";

type AgentLivePanelProps = {
  tool?: AgentTool;
  name?: string;
  status?: string;
  compact?: boolean;
};

export function AgentLivePanel({
  tool = "cursor",
  name = "Cursor",
  status = "No window title yet",
  compact = false,
}: AgentLivePanelProps) {
  const accent = accentForAgent(tool);

  return (
    <motion.div
      className={`rounded-2xl border p-2.5 ${compact ? "min-w-[140px]" : "min-w-[168px]"}`}
      style={{
        backgroundColor: "rgba(22,22,26,0.92)",
        borderColor: notch.border,
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", visualDuration: 0.32, bounce: 0.18 }}
    >
      <header className="mb-2 flex items-center justify-between gap-2">
        <span
          className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[7px] font-bold tracking-wider"
          style={{ backgroundColor: notch.liveBadge, color: notch.text }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: notch.liveRed }}
            aria-hidden
          />
          LIVE
        </span>
        <span className="text-[8px]" style={{ color: notch.textDim }}>
          1
        </span>
      </header>

      <div className="flex items-start gap-2">
        <AgentOrb tool={tool} size={24} />
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold" style={{ color: notch.text }}>
            {name}
          </p>
          <p className="truncate text-[9px]" style={{ color: notch.textMuted }}>
            {status}
          </p>
        </div>
        <button
          type="button"
          className="shrink-0 rounded-full px-2.5 py-1 text-[8px] font-bold text-white"
          style={{ backgroundColor: accent }}
        >
          Open
        </button>
      </div>
    </motion.div>
  );
}
