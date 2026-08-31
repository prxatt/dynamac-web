"use client";

import type { ReactNode } from "react";
import { AppIcon } from "@/components/ui/AppIcon";
import { MusicCharacter } from "@/components/illustrations/characters/MusicCharacter";
import { ScrollCharacter } from "@/components/illustrations/ScrollCharacter";
import { SectionReveal } from "@/components/motion/SectionReveal";

export function HeroCopy({ children }: { children: ReactNode }) {
  return <SectionReveal>{children}</SectionReveal>;
}

export function HeroVisual() {
  return (
    <SectionReveal className="flex justify-center lg:justify-end">
      <div className="w-full max-w-[300px]">
        <div
          className="mx-auto mb-4 h-8 w-[96px] rounded-b-[20px] border border-t-0 border-[var(--color-fresh-grass)] bg-[var(--color-pure-white)]"
          aria-hidden
        />
        <div className="rounded-[var(--radius-cards)] bg-[var(--color-pure-white)] p-12">
          <AppIcon size={200} className="mx-auto h-auto w-full max-w-[200px]" priority />
        </div>
        <div className="mt-6 flex items-center justify-center gap-3" aria-hidden>
          <span className="h-3 w-3 bg-[var(--color-coral-pop)]" />
          <span className="h-3 w-3 rounded-full bg-[var(--color-sky-pop)]" />
          <span className="h-0 w-0 border-x-[6px] border-b-[10px] border-x-transparent border-b-[var(--color-sunshine-pop)]" />
        </div>
      </div>
    </SectionReveal>
  );
}

export function HeroScrollAccent() {
  return (
    <div
      className="pointer-events-none absolute -bottom-20 right-6 z-0 hidden lg:block xl:right-12"
      aria-hidden
    >
      <ScrollCharacter side="right">
        <MusicCharacter className="h-auto w-full opacity-90" />
      </ScrollCharacter>
    </div>
  );
}
