"use client";

import type { ReactNode } from "react";
import { notch } from "@/components/notch/notch-styles";

type NotchShellProps = {
  children: ReactNode;
  header?: ReactNode;
  className?: string;
};

export function NotchShell({ children, header, className = "" }: NotchShellProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] shadow-[0_24px_80px_rgba(0,0,0,0.22)] ${className}`}
      style={{
        backgroundColor: notch.surface,
        border: `1px solid ${notch.border}`,
      }}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-20 h-[18px] w-[96px] -translate-x-1/2 rounded-b-[14px]"
        style={{ backgroundColor: notch.surfaceInset }}
        aria-hidden
      />

      <div className="relative px-4 pb-4 pt-5">
        {header ? (
          <div className="mb-3 flex items-center justify-between gap-3">{header}</div>
        ) : null}
        {children}
      </div>
    </div>
  );
}
