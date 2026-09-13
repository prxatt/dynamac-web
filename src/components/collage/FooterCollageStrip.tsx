"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import {
  AirDropDieCut,
  CalendarDieCut,
  FilesDieCut,
  HeadphonesDieCut,
  NotchCapsuleDieCut,
} from "@/components/collage/DieCuts";

/** Quiet Bauhaus Zine strip — footer print sheet, not a sticker dump. */
export function FooterCollageStrip() {
  const reducedMotion = useReducedMotion();

  const dies = [
    { id: "capsule", node: <NotchCapsuleDieCut className="h-5 w-16 text-[var(--color-ink)]" />, rotate: -3 },
    {
      id: "circle-r",
      node: <div className="h-10 w-10 rounded-full border-[2.5px] border-[var(--color-ink)] bg-[var(--color-accent)]" />,
      rotate: 7,
    },
    { id: "phones", node: <HeadphonesDieCut className="h-10 w-10 text-[var(--color-ink)]" />, rotate: -5 },
    {
      id: "rect-b",
      node: <div className="h-12 w-8 rounded-[var(--radius-small)] border-[2.5px] border-[var(--color-ink)] bg-[var(--color-primary-blue)]" />,
      rotate: 4,
    },
    { id: "cal", node: <CalendarDieCut className="h-12 w-10" />, rotate: -6 },
    {
      id: "half",
      node: <div className="h-7 w-14 overflow-hidden rounded-t-full border-[2.5px] border-[var(--color-ink)] bg-[var(--color-primary-yellow)]" />,
      rotate: 2,
    },
    { id: "files", node: <FilesDieCut className="h-12 w-10" />, rotate: -2 },
    {
      id: "airdrop",
      node: <AirDropDieCut className="h-10 w-10 text-[var(--color-ink)]" />,
      rotate: 5,
    },
  ] as const;

  return (
    <div
      data-theme="light"
      className="mt-14 overflow-hidden rounded-[var(--radius-cards)] border border-[var(--color-hairline)] bg-[var(--color-canvas-elevated)] shadow-[4px_4px_0_var(--color-pure-ink)]"
    >
      <div className="flex items-center justify-between border-b border-[var(--color-hairline)] px-4 py-2.5">
        <p className="font-mono text-[10px] tracking-[0.18em] text-[var(--color-muted)] uppercase">
          Surface Tension · Print sheet 01
        </p>
        <p className="font-mono text-[10px] text-[var(--color-muted)]">CMYK · 1996</p>
      </div>
      <div className="relative flex flex-wrap items-center justify-center gap-3 px-4 py-7 sm:gap-6 sm:px-5 sm:py-9">
        <span className="pointer-events-none absolute top-3 left-3 h-2.5 w-2.5 border-t border-l border-[var(--color-muted)]" />
        <span className="pointer-events-none absolute top-3 right-3 h-2.5 w-2.5 border-t border-r border-[var(--color-muted)]" />
        <span className="pointer-events-none absolute bottom-3 left-3 h-2.5 w-2.5 border-b border-l border-[var(--color-muted)]" />
        <span className="pointer-events-none absolute right-3 bottom-3 h-2.5 w-2.5 border-r border-b border-[var(--color-muted)]" />

        {dies.map((die, index) => (
          <motion.div
            key={die.id}
            className={`relative drop-shadow-[2px_2px_0_var(--color-pure-ink)] ${
              index >= 6 ? "hidden sm:block" : ""
            }`}
            style={{ rotate: die.rotate }}
            initial={false}
            whileInView={reducedMotion ? undefined : { y: [10, 0], scale: [0.96, 1] }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: reducedMotion ? 0 : index * 0.035,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={reducedMotion ? undefined : { y: -3, scale: 1.03 }}
          >
            {die.node}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
