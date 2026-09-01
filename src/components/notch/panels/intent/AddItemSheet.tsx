"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { useNotchDemo } from "@/components/notch/NotchDemoContext";
import {
  CATEGORY_LABELS,
  colorForCategory,
  resolveCategory,
  type TaskCategory,
} from "@/components/notch/intent-plan-data";

type AddKind = "task" | "event";

const AGENT_OPTIONS = [
  { id: "cursor", label: "Cursor", color: "#48a8fa" },
  { id: "claude", label: "Claude", color: "#f5852e" },
  { id: "codex", label: "Codex", color: "#52d17a" },
] as const;

type AddItemSheetProps = {
  onClose: () => void;
  dayKey?: string;
};

export function AddItemSheet({ onClose, dayKey }: AddItemSheetProps) {
  const { addTodo, addEvent } = useNotchDemo();
  const [kind, setKind] = useState<AddKind>("task");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<TaskCategory>("work");
  const [duration, setDuration] = useState("60");
  const [agents, setAgents] = useState<string[]>([]);
  const [invite, setInvite] = useState("");

  const accent = "var(--color-coral-pop)";

  function toggleAgent(id: string) {
    setAgents((list) => (list.includes(id) ? list.filter((a) => a !== id) : [...list, id]));
  }

  function handleCreate() {
    const trimmed = title.trim() || (kind === "task" ? "New task" : "New event");
    const collaborators = [
      ...agents.map((id) => AGENT_OPTIONS.find((a) => a.id === id)?.label ?? id),
      ...(invite.trim() ? [invite.trim()] : []),
    ];

    if (kind === "task") {
      addTodo({ title: trimmed, category, collaborators });
    } else {
      addEvent({
        title: trimmed,
        category,
        durationMinutes: Number(duration) || 60,
        collaborators,
        dayKey,
      });
    }
    onClose();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-30 flex items-end rounded-[inherit] bg-[#1a1a18]/70 p-1.5"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 6, opacity: 0 }}
        transition={{ type: "spring", visualDuration: 0.32, bounce: 0.12 }}
        className="max-h-[calc(100%-0.25rem)] w-full overflow-y-auto rounded-xl p-2.5"
        style={{ backgroundColor: accent, color: "#1a1a18" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-1.5 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[7px] font-bold uppercase opacity-60">Monday · 08.31</p>
            <p className="truncate text-[11px] font-bold">
              {kind === "task" ? "New task" : "New event"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black/10 text-xs font-bold"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="mb-1.5 flex gap-0.5 rounded-full bg-black/10 p-0.5">
          {(["task", "event"] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKind(k)}
              className="flex-1 rounded-full py-0.5 text-[8px] font-bold capitalize"
              style={{
                backgroundColor: kind === k ? "rgba(255,255,255,0.9)" : "transparent",
              }}
            >
              {k}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!title) setCategory(resolveCategory(e.target.value));
          }}
          placeholder="Enter title…"
          className="mb-1.5 w-full rounded-lg border border-black/20 bg-white/35 px-2 py-1.5 text-[10px] font-medium outline-none placeholder:text-black/40"
        />

        <div className="mb-1.5 grid grid-cols-2 gap-1">
          <label className="rounded-lg bg-black/10 px-1.5 py-1">
            <span className="text-[6px] font-bold uppercase opacity-60">Category</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as TaskCategory)}
              className="mt-0.5 w-full bg-transparent text-[9px] font-bold outline-none"
            >
              {(Object.keys(CATEGORY_LABELS) as TaskCategory[]).map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_LABELS[c]}
                </option>
              ))}
            </select>
          </label>
          {kind === "event" ? (
            <label className="rounded-lg bg-black/10 px-1.5 py-1">
              <span className="text-[6px] font-bold uppercase opacity-60">Duration</span>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="mt-0.5 w-full bg-transparent text-[9px] font-bold outline-none"
                min={15}
                step={15}
              />
            </label>
          ) : (
            <div className="flex items-center rounded-lg bg-black/10 px-1.5 py-1">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: colorForCategory(category) }}
              />
              <span className="ml-1.5 text-[9px] font-bold">{CATEGORY_LABELS[category]}</span>
            </div>
          )}
        </div>

        <div className="mb-1.5">
          <p className="mb-1 text-[6px] font-bold uppercase opacity-60">Add collaborators</p>
          <div className="flex flex-wrap gap-1">
            {AGENT_OPTIONS.map((agent) => {
              const on = agents.includes(agent.id);
              return (
                <button
                  key={agent.id}
                  type="button"
                  onClick={() => toggleAgent(agent.id)}
                  className="rounded-full px-2 py-0.5 text-[7px] font-bold"
                  style={{
                    backgroundColor: on ? agent.color : "rgba(0,0,0,0.12)",
                    color: on ? "#fff" : "inherit",
                  }}
                >
                  {agent.label}
                </button>
              );
            })}
          </div>
          <input
            type="text"
            value={invite}
            onChange={(e) => setInvite(e.target.value)}
            placeholder="@ friend or email"
            className="mt-1 w-full rounded-lg border border-black/20 bg-white/30 px-2 py-1 text-[9px] outline-none placeholder:text-black/40"
          />
        </div>

        <div className="flex gap-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg bg-black/15 py-1.5 text-[9px] font-bold"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCreate}
            className="flex-1 rounded-lg bg-[#f5f1e4] py-1.5 text-[9px] font-bold"
          >
            Create
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
