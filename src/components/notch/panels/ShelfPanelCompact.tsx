"use client";

import { useState } from "react";

const files = [
  { name: "notch-mockup.png", type: "PNG", hue: "from-[#ff705d] to-[#f5e211]" },
  { name: "release-notes.pdf", type: "PDF", hue: "from-[#2ba0ff] to-[#8ed462]" },
] as const;

export function ShelfPanelCompact() {
  const [airdropHovered, setAirdropHovered] = useState(false);

  return (
    <div className="grid grid-cols-[0.85fr_1.15fr] items-stretch gap-2.5">
      <button
        type="button"
        className="flex flex-col items-center justify-center gap-1 rounded-[var(--radius-small)] border-2 border-dashed px-2 py-2.5 text-center transition-colors"
        style={{
          borderColor: airdropHovered ? "var(--color-sunshine-pop)" : "var(--widget-dashed)",
          backgroundColor: "var(--widget-inset)",
        }}
        onMouseEnter={() => setAirdropHovered(true)}
        onMouseLeave={() => setAirdropHovered(false)}
        onFocus={() => setAirdropHovered(true)}
        onBlur={() => setAirdropHovered(false)}
      >
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full text-sm"
          style={{ backgroundColor: "var(--widget-border)", color: "var(--widget-text)" }}
          aria-hidden
        >
          ⇪
        </span>
        <span className="text-[10px] font-semibold" style={{ color: "var(--widget-text)" }}>
          AirDrop
        </span>
        <span className="text-[9px] leading-tight" style={{ color: "var(--widget-muted)" }}>
          {airdropHovered ? "Release" : "Drop files"}
        </span>
      </button>

      <div
        className="rounded-[var(--radius-small)] border-2 border-dashed p-2"
        style={{ borderColor: "var(--widget-dashed)", backgroundColor: "var(--widget-inset)" }}
      >
        <p className="text-[8px] font-medium uppercase tracking-[0.12em] text-[var(--widget-muted)]">
          Shelf
        </p>
        <ul className="mt-1.5 space-y-1">
          {files.map((file) => (
            <li
              key={file.name}
              className="flex items-center gap-2 rounded-md px-2 py-1"
              style={{ backgroundColor: "var(--widget-border)" }}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gradient-to-br ${file.hue} text-[8px] font-bold text-white`}
              >
                {file.type}
              </span>
              <span
                className="min-w-0 truncate text-[10px] font-medium"
                style={{ color: "var(--widget-text)" }}
              >
                {file.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
