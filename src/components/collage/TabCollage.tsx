"use client";

import { motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import type { CollageVariant } from "@/lib/collage";
import {
  AirDropDieCut,
  CalendarDieCut,
  HalftoneDot,
  HeadphonesDieCut,
  NotchCapsuleDieCut,
} from "@/components/collage/DieCuts";

type TabCollageProps = {
  variant: CollageVariant;
  className?: string;
};

const sheetMeta = {
  "now-playing": { label: "NOW PLAYING", plate: "var(--color-accent)", sheet: "01" },
  intent: { label: "INTENT", plate: "var(--color-primary-blue)", sheet: "02" },
  shelf: { label: "SHELF", plate: "var(--color-primary-yellow)", sheet: "03" },
} as const;

/** 90s Bauhaus Zine collage — die-cut plate beside the notch. */
export function TabCollage({ variant, className = "" }: TabCollageProps) {
  const reducedMotion = useReducedMotion();
  const key = variant === "footer" || variant === "hero" ? "now-playing" : variant;
  const meta = sheetMeta[key];

  return (
    <div
      data-theme="light"
      className={`relative aspect-[5/6] w-full max-w-[300px] overflow-visible ${className}`}
      aria-hidden
    >
      <div className="absolute inset-0 rounded-[var(--radius-cards)] border border-[var(--color-hairline)] bg-[var(--color-canvas-elevated)] shadow-[5px_5px_0_var(--color-pure-ink)]">
        <span className="absolute top-2 left-2 h-2.5 w-2.5 border-t border-l border-[var(--color-muted)]" />
        <span className="absolute top-2 right-2 h-2.5 w-2.5 border-t border-r border-[var(--color-muted)]" />
        <span className="absolute bottom-2 left-2 h-2.5 w-2.5 border-b border-l border-[var(--color-muted)]" />
        <span className="absolute right-2 bottom-2 h-2.5 w-2.5 border-r border-b border-[var(--color-muted)]" />
        {/* Registration cross */}
        <span className="pointer-events-none absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 opacity-30">
          <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-[var(--color-muted)]" />
          <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-[var(--color-muted)]" />
        </span>
        <p className="absolute top-2.5 left-1/2 -translate-x-1/2 font-mono text-[8px] tracking-[0.22em] text-[var(--color-muted)]">
          {meta.label}
        </p>
        <p className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[7px] tracking-widest text-[var(--color-muted)]">
          ST · {meta.sheet}
        </p>
      </div>

      {/* Misregistration plate */}
      <Float
        reduced={reducedMotion}
        delay={0}
        className="absolute top-10 left-4 h-[62%] w-[56%] rotate-3 rounded-md opacity-40"
        style={{ backgroundColor: "var(--color-primary-blue)" }}
      />
      <Float
        reduced={reducedMotion}
        delay={0.04}
        className="absolute top-8 left-3 h-[62%] w-[56%] -rotate-6 rounded-md border-2 border-[var(--color-ink)] shadow-[6px_6px_0_var(--color-pure-ink)]"
        style={{ backgroundColor: meta.plate }}
      />

      {key === "now-playing" ? (
        <>
          <Float
            reduced={reducedMotion}
            delay={0.1}
            float
            className="absolute top-14 right-3 flex h-[5.5rem] w-[5.5rem] rotate-10 items-center justify-center rounded-full border-[3px] border-[var(--color-ink)] bg-[var(--color-canvas)] text-[var(--color-ink)] shadow-[4px_4px_0_var(--color-pure-ink)]"
          >
            <HeadphonesDieCut className="h-12 w-12" />
          </Float>
          <Float
            reduced={reducedMotion}
            delay={0.16}
            float
            className="absolute bottom-16 left-6 h-6 w-28 -rotate-3 text-[var(--color-ink)]"
          >
            <NotchCapsuleDieCut className="h-full w-full drop-shadow-[3px_3px_0_var(--color-accent)]" />
          </Float>
          <Float
            reduced={reducedMotion}
            delay={0.2}
            float
            className="absolute right-6 bottom-12 h-14 w-14 text-[var(--color-primary-yellow)]"
          >
            <HalftoneDot className="h-full w-full" />
          </Float>
          <Float
            reduced={reducedMotion}
            delay={0.24}
            className="absolute top-[42%] left-[18%] rotate-[-8deg] rounded-sm border-2 border-[var(--color-ink)] bg-[var(--color-ink)] px-2 py-1 font-display text-[11px] font-semibold tracking-wide text-[var(--color-canvas)] shadow-[3px_3px_0_var(--color-pure-ink)]"
          >
            LIVE
          </Float>
        </>
      ) : null}

      {key === "intent" ? (
        <>
          <Float
            reduced={reducedMotion}
            delay={0.1}
            float
            className="absolute top-16 left-5 h-32 w-28 -rotate-4 text-[var(--color-ink)] drop-shadow-[4px_4px_0_var(--color-accent)]"
          >
            <CalendarDieCut className="h-full w-full" />
          </Float>
          <Float
            reduced={reducedMotion}
            delay={0.16}
            float
            className="absolute right-5 bottom-14 h-20 w-14 rotate-12 border-[3px] border-[var(--color-ink)] bg-[var(--color-accent)] shadow-[3px_3px_0_var(--color-pure-ink)] [clip-path:polygon(18%_0,82%_0,100%_50%,82%_100%,18%_100%,0_50%)]"
          />
          <Float
            reduced={reducedMotion}
            delay={0.2}
            className="absolute top-10 right-8 h-10 w-10 rounded-full border-[3px] border-[var(--color-ink)] bg-[var(--color-primary-yellow)] shadow-[3px_3px_0_var(--color-pure-ink)]"
          />
          <Float
            reduced={reducedMotion}
            delay={0.24}
            className="absolute bottom-10 left-8 rotate-2 rounded-sm border-2 border-[var(--color-ink)] bg-[var(--color-canvas)] px-2 py-1 font-mono text-[9px] tracking-widest text-[var(--color-ink)] shadow-[2px_2px_0_var(--color-accent)]"
          >
            FOCUS
          </Float>
        </>
      ) : null}

      {key === "shelf" ? (
        <>
          {/* AirDrop = share out of the HUD */}
          <Float
            reduced={reducedMotion}
            delay={0.08}
            float
            className="absolute top-11 right-4 flex h-[5.25rem] w-[5.25rem] rotate-8 items-center justify-center rounded-full border-[3px] border-[var(--color-ink)] bg-[var(--color-canvas)] text-[var(--color-ink)] shadow-[4px_4px_0_var(--color-pure-ink)]"
          >
            <AirDropDieCut className="h-11 w-11" />
          </Float>

          {/* File tiles dropping into the notch — PNG · PDF · MOV triad */}
          <Float
            reduced={reducedMotion}
            delay={0.12}
            float
            className="absolute top-[34%] left-[14%] flex h-11 w-14 -rotate-10 items-center justify-center rounded-[var(--radius-small)] border-2 border-[var(--color-ink)] bg-[var(--color-accent)] font-mono text-[9px] font-bold tracking-wide text-white shadow-[3px_3px_0_var(--color-pure-ink)]"
          >
            PNG
          </Float>
          <Float
            reduced={reducedMotion}
            delay={0.16}
            float
            className="absolute top-[42%] left-[34%] flex h-11 w-14 rotate-4 items-center justify-center rounded-[var(--radius-small)] border-2 border-[var(--color-ink)] bg-[var(--color-primary-blue)] font-mono text-[9px] font-bold tracking-wide text-white shadow-[3px_3px_0_var(--color-pure-ink)]"
          >
            PDF
          </Float>
          <Float
            reduced={reducedMotion}
            delay={0.2}
            float
            className="absolute top-[38%] right-[18%] flex h-11 w-14 rotate-12 items-center justify-center rounded-[var(--radius-small)] border-2 border-[var(--color-ink)] bg-[var(--color-canvas)] font-mono text-[9px] font-bold tracking-wide text-[var(--color-ink)] shadow-[3px_3px_0_var(--color-pure-ink)]"
          >
            MOV
          </Float>

          {/* Notch capsule = the shelf itself */}
          <Float
            reduced={reducedMotion}
            delay={0.24}
            className="absolute bottom-14 left-1/2 h-9 w-[78%] -translate-x-1/2 text-[var(--color-ink)] drop-shadow-[4px_4px_0_var(--color-accent)]"
          >
            <NotchCapsuleDieCut className="h-full w-full" />
          </Float>

          <Float
            reduced={reducedMotion}
            delay={0.28}
            className="absolute bottom-8 left-6 rotate-[-3deg] rounded-[var(--radius-small)] border-2 border-[var(--color-ink)] bg-[var(--color-ink)] px-2 py-1 font-display text-[10px] font-semibold tracking-wide text-[var(--color-canvas)] shadow-[2px_2px_0_var(--color-primary-blue)]"
          >
            HOLD
          </Float>
        </>
      ) : null}
    </div>
  );
}

function Float({
  children,
  className,
  style,
  delay,
  reduced,
  float,
}: {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay: number;
  reduced: boolean;
  float?: boolean;
}) {
  // Keep DOM structure identical on server/client to avoid hydration mismatches.
  return (
    <motion.div
      className={className}
      style={style}
      initial={false}
      whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.55, delay: reduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="h-full w-full"
        animate={
          float && !reduced
            ? { y: [0, -4, 0] }
            : { y: 0 }
        }
        transition={
          float && !reduced
            ? { duration: 5.2 + delay * 2, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0 }
        }
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
