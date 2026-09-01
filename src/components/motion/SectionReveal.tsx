"use client";

import { type ReactNode } from "react";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
};

/** Below-fold sections only — never hides content on first paint. */
export function SectionReveal({ children, className = "" }: SectionRevealProps) {
  return <div className={className}>{children}</div>;
}
