"use client";

import Image from "next/image";
import { AppIcon } from "@/components/ui/AppIcon";
import { illustrations } from "@/lib/illustrations";

export function HeroVisual() {
  return (
    <div className="flex justify-center lg:justify-end">
      <div className="w-full max-w-[320px]">
        <div
          className="mx-auto mb-4 h-8 w-[96px] rounded-b-[20px] border border-t-0 border-[var(--color-fresh-grass)] bg-[var(--color-pure-white)]"
          aria-hidden
        />
        <div className="rounded-[var(--radius-cards)] bg-[var(--color-pure-white)] p-5">
          <AppIcon size={120} className="mx-auto mb-5 h-auto w-full max-w-[120px]" priority />
          <div className="overflow-hidden rounded-[var(--radius-small)]">
            <Image
              src={illustrations.heroCharacter}
              alt=""
              width={900}
              height={1100}
              priority
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-3" aria-hidden>
          <span className="h-3 w-3 bg-[var(--color-coral-pop)]" />
          <span className="h-3 w-3 rounded-full bg-[var(--color-sky-pop)]" />
          <span className="h-0 w-0 border-x-[6px] border-b-[10px] border-x-transparent border-b-[var(--color-sunshine-pop)]" />
        </div>
      </div>
    </div>
  );
}

export function HeroIllustrationBand() {
  return (
    <div className="mt-[var(--spacing-60)] overflow-hidden rounded-[var(--radius-cards)] border border-[var(--color-hairline-mist)] bg-[var(--color-pure-white)]">
      <Image
        src={illustrations.heroBand}
        alt="DynaMac tabs — music, plan, and files"
        width={2400}
        height={900}
        priority
        className="h-auto w-full"
        sizes="(max-width: 1200px) 100vw, 1200px"
      />
    </div>
  );
}
