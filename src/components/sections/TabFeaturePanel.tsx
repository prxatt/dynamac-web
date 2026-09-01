"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { TabCharacterScene } from "@/components/illustrations/TabCharacterScene";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { sectionRevealTransition } from "@/lib/tab-widget-motion";
import type { TabIllustrationConfig } from "@/lib/illustrations";

type TabFeaturePanelProps = {
  index: number;
  label: string;
  copy: string;
  detail: string;
  accent: string;
  mark: ReactNode;
  illustration: TabIllustrationConfig;
  widget: ReactNode;
  hideCharacterBackdrop?: boolean;
};

export function TabFeaturePanel({
  index,
  label,
  copy,
  detail,
  accent,
  mark,
  illustration,
  widget,
  hideCharacterBackdrop = false,
}: TabFeaturePanelProps) {
  const reducedMotion = useReducedMotion();
  const characterSide = index % 2 === 0 ? "right" : "left";

  return (
    <motion.article
      className="py-14 md:py-20"
      initial={reducedMotion ? false : { y: 20 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={sectionRevealTransition}
    >
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
        <TabCharacterScene
          config={illustration}
          accent={accent}
          index={index}
          side={characterSide}
          hideBackdrop={hideCharacterBackdrop}
          className="mx-auto w-full max-w-[220px] shrink-0 lg:mx-0"
        />

        <div className="flex min-w-0 flex-1 flex-col gap-8 xl:flex-row xl:items-start xl:gap-10">
          <div className="shrink-0 xl:max-w-[14rem]">
            <div className="flex items-center gap-3">
              {mark}
              <h3
                className="font-medium tracking-tight text-[var(--color-ink-black)]"
                style={{ fontSize: "var(--text-heading-sm)" }}
              >
                {label}
              </h3>
            </div>
            <p className="mt-3 text-[length:var(--text-body-lg)] text-[var(--color-ink-black)]">
              {copy}
            </p>
            <p className="mt-2 text-[length:var(--text-body-sm)] leading-relaxed text-[var(--color-stone-gray)]">
              {detail}
            </p>
          </div>

          <div className="min-w-0 flex-1 overflow-x-auto">{widget}</div>
        </div>
      </div>
    </motion.article>
  );
}
