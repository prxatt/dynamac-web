"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { TabCharacterScene } from "@/components/illustrations/TabCharacterScene";
import { CharacterVfx } from "@/components/illustrations/CharacterVfx";
import { NotchShelfStage } from "@/components/sections/NotchShelfStage";
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
};

/** Staggered zig-zag: character offset per row, notch on shelf, no vertical stack alignment */
const characterOffsets = [
  "lg:translate-y-0 lg:-translate-x-4",
  "lg:translate-y-16 lg:translate-x-6",
  "lg:translate-y-32 lg:-translate-x-2",
] as const;

const shelfOffsets = [
  "lg:ml-auto lg:max-w-[92%]",
  "lg:mr-auto lg:max-w-[94%] lg:pl-4",
  "lg:mx-auto lg:max-w-[96%]",
] as const;

const characterSides = ["left", "right", "left"] as const;

export function TabFeaturePanel({
  index,
  label,
  copy,
  detail,
  accent,
  mark,
  illustration,
  widget,
}: TabFeaturePanelProps) {
  const reducedMotion = useReducedMotion();
  const characterSide = characterSides[index % characterSides.length]!;
  const isCharRight = characterSide === "right";

  return (
    <motion.article
      className="relative overflow-visible py-10 md:py-16"
      initial={reducedMotion ? false : { y: 24 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={sectionRevealTransition}
    >
      <div
        className={`relative grid min-h-[min(420px,85vw)] grid-cols-1 items-start gap-8 overflow-visible lg:grid-cols-12 lg:gap-6 ${
          isCharRight ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Character — behind shelf, staggered vertically */}
        <div
          className={`relative z-0 mx-auto w-full max-w-[220px] lg:col-span-4 lg:max-w-none ${
            isCharRight ? "lg:justify-self-end" : "lg:justify-self-start"
          } ${characterOffsets[index % characterOffsets.length]}`}
        >
          <TabCharacterScene
            config={illustration}
            accent={accent}
            index={index}
            side={characterSide}
            className="mx-auto w-full max-w-[240px] lg:max-w-[280px]"
          />
          <CharacterVfx variant={index} accent={accent} />
        </div>

        {/* Copy + shelf */}
        <div
          className={`relative z-10 flex min-w-0 flex-col gap-6 lg:col-span-8 ${
            shelfOffsets[index % shelfOffsets.length]
          } ${isCharRight ? "lg:-mt-6" : "lg:mt-4"}`}
        >
          <div className="max-w-md shrink-0">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-hairline-mist)] bg-[var(--color-pure-white)] shadow-sm">
                {mark}
              </span>
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

          <NotchShelfStage accent={accent} mark={mark} index={index}>
            {widget}
          </NotchShelfStage>
        </div>
      </div>
    </motion.article>
  );
}
