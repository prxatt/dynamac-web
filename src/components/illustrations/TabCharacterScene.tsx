"use client";

import { CharacterFigure } from "@/components/illustrations/CharacterFigure";
import { CutoutBackdrop } from "@/components/illustrations/CutoutBackdrop";
import { FloatingStickers } from "@/components/illustrations/FloatingStickers";
import type { TabIllustrationConfig } from "@/lib/illustrations";

type TabCharacterSceneProps = {
  config: TabIllustrationConfig;
  accent: string;
  index: number;
  side?: "left" | "right";
  hideBackdrop?: boolean;
  className?: string;
};

export function TabCharacterScene({
  config,
  accent,
  index,
  side = "right",
  hideBackdrop = false,
  className = "",
}: TabCharacterSceneProps) {
  return (
    <div
      className={`relative mx-auto aspect-[4/5] w-full max-w-[min(100%,240px)] ${className}`}
    >
      {!hideBackdrop ? <CutoutBackdrop accent={accent} variant={index} /> : null}
      <FloatingStickers variant={index} />
      <CharacterFigure config={config} side={side} />
    </div>
  );
}
