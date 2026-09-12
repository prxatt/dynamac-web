"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import {
  CalendarDieCut,
  FilesDieCut,
  HeadphonesDieCut,
} from "@/components/collage/DieCuts";
import { TabCollage } from "@/components/collage/TabCollage";
import { NotchShelfStage } from "@/components/sections/NotchShelfStage";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { sectionRevealTransition } from "@/lib/tab-widget-motion";
import type { CollageVariant } from "@/lib/collage";

type TabFeaturePanelProps = {
  index: number;
  plate: string;
  label: string;
  copy: string;
  detail: string;
  accent: string;
  mark: ReactNode;
  collage: CollageVariant;
  widget: ReactNode;
};

const collageSides = ["left", "right", "left"] as const;

function PlateGlyph({ variant }: { variant: CollageVariant }) {
  if (variant === "intent") {
    return <CalendarDieCut className="h-9 w-8" />;
  }
  if (variant === "shelf") {
    return <FilesDieCut className="h-9 w-8" />;
  }
  return <HeadphonesDieCut className="h-9 w-9 text-[var(--color-ink)]" />;
}

export function TabFeaturePanel({
  index,
  plate,
  label,
  copy,
  detail,
  accent,
  mark,
  collage,
  widget,
}: TabFeaturePanelProps) {
  const reducedMotion = useReducedMotion();
  const side = collageSides[index % collageSides.length]!;
  const isCollageRight = side === "right";

  return (
    <motion.article
      className="relative overflow-visible border-t border-[var(--color-hairline)] py-12 md:py-16"
      initial={false}
      whileInView={reducedMotion ? undefined : { y: [18, 0] }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={sectionRevealTransition}
    >
      <div
        className={`relative grid grid-cols-1 items-start gap-8 overflow-visible lg:min-h-[min(400px,80vw)] lg:grid-cols-12 lg:gap-8 ${
          isCollageRight ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div
          className={`relative z-0 mx-auto hidden w-full max-w-[240px] lg:col-span-4 lg:block lg:max-w-none ${
            isCollageRight ? "lg:justify-self-end" : "lg:justify-self-start"
          }`}
        >
          <TabCollage variant={collage} className="mx-auto" />
        </div>

        <div className="relative z-10 flex min-w-0 flex-col gap-6 lg:col-span-8">
          <div className="max-w-lg shrink-0">
            <div className="flex items-start justify-between gap-4">
              <p className="font-mono text-[10px] tracking-[0.18em] text-[var(--color-muted)]">
                PLATE {plate} / 03
              </p>
              <div
                data-theme="light"
                className="shrink-0 drop-shadow-[2px_2px_0_var(--color-pure-ink)] lg:hidden"
                aria-hidden
                style={{ color: accent }}
              >
                <PlateGlyph variant={collage} />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span
                data-theme="light"
                className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-small)] border-2 border-[var(--color-ink)] bg-[var(--color-canvas-elevated)]"
                style={{
                  boxShadow: `2px 2px 0 var(--color-pure-ink), inset 0 0 0 1px ${accent}33`,
                }}
              >
                {mark}
              </span>
              <h3
                className="font-display font-medium tracking-tight text-[var(--color-ink)]"
                style={{ fontSize: "var(--text-heading-sm)" }}
              >
                {label}
              </h3>
            </div>
            <p className="mt-3 text-[length:var(--text-body-lg)] text-[var(--color-ink)]">{copy}</p>
            <p className="mt-2 text-[length:var(--text-body-sm)] leading-relaxed text-[var(--color-muted)]">
              {detail}
            </p>
          </div>

          <NotchShelfStage accent={accent}>
            {widget}
          </NotchShelfStage>
        </div>
      </div>
    </motion.article>
  );
}
