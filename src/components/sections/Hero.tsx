"use client";

import { Button } from "@/components/ui/Button";
import { AppIcon } from "@/components/ui/AppIcon";
import { FadeIn } from "@/components/motion/FadeIn";
import { brand } from "@/lib/brand";

export function Hero() {
  return (
    <section className="border-b border-[var(--border)]">
      <div className="mx-auto grid max-w-[var(--max-width)] gap-10 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
        <FadeIn>
          <div>
            <p className="text-[11px] font-medium tracking-[0.14em] text-[var(--fg-dim)] uppercase">
              {brand.platformNote}
            </p>
            <h1 className="mt-4 text-[clamp(2.5rem,5.5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              {brand.name}
            </h1>
            <p className="mt-2 text-xl text-[var(--fg-muted)]">{brand.tagline}</p>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--fg-muted)]">
              {brand.shortDescription}
            </p>
            <p className="mt-2 text-sm text-[var(--fg-dim)]">{brand.credits}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/api/download">Download for macOS</Button>
              <Button href="/buy" variant="secondary">
                Buy ${brand.price.toFixed(2)}
              </Button>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="flex justify-center lg:justify-end">
            <AppIcon size={256} className="h-auto w-full max-w-[256px]" priority />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
