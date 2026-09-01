"use client";

import { motion } from "motion/react";
import { NOTCH_SHOWCASE, TAB_ACCENTS } from "@/components/notch/notch-showcase";
import { notchTabs, type NotchTabId } from "@/components/notch/notch-styles";
import type { GlassStyleId } from "@/lib/glass-themes";

type NotchTabPillsProps = {
  active: NotchTabId;
  onChange: (id: NotchTabId) => void;
  layoutId?: string;
  glassStyle?: GlassStyleId;
};

export function NotchTabPills({
  active,
  onChange,
  layoutId = "notch-tab-pill",
  glassStyle = "liquidLight",
}: NotchTabPillsProps) {
  const isLight = glassStyle === "liquidLight";

  return (
    <div
      role="tablist"
      aria-label="DynaMac tabs"
      className={`grid shrink-0 grid-cols-3 gap-0.5 rounded-full p-0.5 ${
        isLight ? "bg-[var(--color-sandstone)]" : "bg-white/[0.08]"
      }`}
      style={{
        width: `calc(${NOTCH_SHOWCASE.tabWidth} * 3 + 4px)`,
      }}
    >
      {notchTabs.map((tab) => {
        const selected = active === tab.id;
        const accent = TAB_ACCENTS[tab.id];

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(tab.id)}
            className={`relative flex items-center justify-center rounded-full py-1.5 text-center text-[9px] font-medium leading-tight transition-colors sm:text-[10px] ${
              isLight && !selected ? "text-[var(--color-stone-gray)]" : ""
            } ${!isLight && !selected ? "text-white/55" : ""}`}
            style={{ width: NOTCH_SHOWCASE.tabWidth }}
          >
            {selected ? (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: accent.color }}
                transition={{ type: "spring", visualDuration: 0.35, bounce: 0.18 }}
              />
            ) : null}
            <span
              className="relative z-10 px-1"
              style={
                selected
                  ? { color: accent.activeText, fontWeight: 600 }
                  : undefined
              }
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
