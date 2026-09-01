"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { NotchShell } from "@/components/notch/NotchShell";
import { NotchTabPills } from "@/components/notch/NotchTabPills";
import type { NotchTabId } from "@/components/notch/notch-styles";

type NotchStageProps = {
  active: NotchTabId;
  onTabChange: (id: NotchTabId) => void;
  children: ReactNode;
  layoutId?: string;
  showSettings?: boolean;
};

export function NotchStage({
  active,
  onTabChange,
  children,
  layoutId = "notch-tab-pill",
  showSettings = true,
}: NotchStageProps) {
  return (
    <NotchShell
      header={
        <>
          <NotchTabPills
            active={active}
            onChange={onTabChange}
            layoutId={layoutId}
            glassStyle="solidDark"
          />
          {showSettings ? (
            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.06] text-[11px] text-white/60"
              aria-label="Settings"
            >
              ⚙
            </button>
          ) : (
            <span className="w-7" aria-hidden />
          )}
        </>
      }
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </NotchShell>
  );
}
