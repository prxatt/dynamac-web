"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { NotchProductStage } from "@/components/hero/NotchProductStage";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { brand } from "@/lib/brand";
import { sectionRevealTransition } from "@/lib/tab-widget-motion";

export function HeroProduct() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <section ref={ref} className="relative overflow-visible">
      <div className="flex flex-col items-center gap-10 sm:gap-12">
        <div className="order-1 w-full">
          <NotchProductStage />
        </div>

        <motion.div
          className="order-2 mx-auto w-full max-w-xl text-center"
          style={reducedMotion ? undefined : { y: copyY }}
          initial={reducedMotion ? false : { y: 16 }}
          animate={{ y: 0 }}
          transition={sectionRevealTransition}
        >
          <p className="text-[length:var(--text-body-sm)] font-medium text-[var(--color-stone-gray)]">
            {brand.platformNote}
          </p>

          <h1
            className="mt-5 font-medium leading-[0.95] tracking-[-0.06em] text-[var(--color-ink-black)]"
            style={{ fontSize: "clamp(2.75rem, 10vw, var(--text-display))" }}
          >
            The notch,
            <br />
            working.
          </h1>
          <p className="mt-4 text-[length:var(--text-subheading)] font-medium text-[var(--color-ink-black)]">
            {brand.shortDescription}
          </p>
          <p className="mt-3 text-[length:var(--text-body-sm)] text-[var(--color-stone-gray)]">
            {brand.credits} · ${brand.price.toFixed(2)} once
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/api/download" dot="sky">
              Download for macOS
            </Button>
            <Button href="/buy" variant="secondary">
              Buy license
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
