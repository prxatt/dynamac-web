"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { NotchTabPills } from "@/components/notch/NotchTabPills";
import type { NotchTabId } from "@/components/notch/notch-styles";

type MarketingNotchFrameProps = {
  active: NotchTabId;
  onTabChange: (id: NotchTabId) => void;
  children: ReactNode;
};

export function MarketingNotchFrame({
  active,
  onTabChange,
  children,
}: MarketingNotchFrameProps) {
  return (
    <div className="relative pt-5">
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-10 h-[18px] w-[92px] -translate-x-1/2 rounded-b-[14px] bg-[var(--color-ink-black)]"
        aria-hidden
      />

      <div className="mb-4 flex justify-center">
        <NotchTabPills
          active={active}
          onChange={onTabChange}
          layoutId="hero-marketing-tab"
          glassStyle="liquidLight"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
