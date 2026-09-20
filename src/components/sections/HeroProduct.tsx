"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { CollageMark } from "@/components/collage/CollageMark";
import { NotchProductStage } from "@/components/hero/NotchProductStage";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { brand } from "@/lib/brand";
import { sectionRevealTransition } from "@/lib/tab-widget-motion";

/**
 * First viewport: brand + headline + live notch.
 * Supporting copy and CTAs sit under the product so the demo stays in frame.
 */
export function HeroProduct() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -12]);

  return (
    <section ref={ref} className="relative overflow-visible">
      <div className="flex flex-col items-stretch gap-3 sm:gap-5">
        <motion.div
          className="mx-auto w-full max-w-2xl text-center"
          style={reducedMotion ? undefined : { y: copyY }}
          initial={false}
          animate={reducedMotion ? undefined : { y: [10, 0] }}
          transition={sectionRevealTransition}
        >
          <div className="mb-2.5 flex flex-col items-center gap-2 sm:mb-4 sm:gap-2.5">
            <CollageMark size={44} />
            <p
              className="font-display font-semibold tracking-[-0.03em] text-[var(--color-ink)]"
              style={{ fontSize: "clamp(1.25rem, 3.2vw, 1.75rem)" }}
            >
              {brand.name}
            </p>
            <span className="h-1 w-10 bg-[var(--color-accent)]" aria-hidden />
          </div>

          <h1
            className="font-display font-medium leading-[0.96] tracking-[-0.03em] text-[var(--color-ink)]"
            style={{ fontSize: "clamp(1.75rem, 6.5vw, 3.75rem)" }}
          >
            The notch,
            <br />
            working.
          </h1>
        </motion.div>

        <div className="-mx-5 w-[calc(100%+2.5rem)] min-w-0 self-stretch sm:mx-0 sm:w-full">
          <NotchProductStage />
        </div>

        <motion.div
          className="mx-auto w-full max-w-xl text-center"
          style={reducedMotion ? undefined : { y: copyY }}
          initial={false}
          animate={reducedMotion ? undefined : { y: [8, 0] }}
          transition={{ ...sectionRevealTransition, delay: 0.05 }}
        >
          <p className="text-[length:var(--text-body-lg)] font-medium text-[var(--color-ink)] sm:text-[length:var(--text-subheading)]">
            {brand.shortDescription}
          </p>
          <p className="mt-2 text-[length:var(--text-body-sm)] text-[var(--color-muted)]">
            {brand.credits} · {brand.pricingNote} · {brand.platform}
          </p>
        </motion.div>

        <div className="flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
          <Button href="/api/download" downloadIcon className="w-full sm:w-auto">
            Download for macOS
          </Button>
        </div>
      </div>
    </section>
  );
}
