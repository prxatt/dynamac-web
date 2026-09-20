"use client";

import { useState } from "react";

const files = [
  { name: "notch-mockup.png", type: "PNG", fill: "var(--color-accent)" },
  { name: "release-notes.pdf", type: "PDF", fill: "var(--color-primary-blue)" },
  { name: "hero-loop.mov", type: "MOV", fill: "var(--color-primary-yellow)" },
] as const;

/** Concentric AirDrop-style arcs — product glyph, not emoji. */
function AirDropGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
      <circle cx="12" cy="14" r="1.6" fill="currentColor" />
      <path
        d="M8.2 11.2a5.2 5.2 0 0 1 7.6 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M5.6 8.4a8.8 8.8 0 0 1 12.8 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M3.2 5.6a12.2 12.2 0 0 1 17.6 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ShelfPanelCompact() {
  const [airdropHovered, setAirdropHovered] = useState(false);

  return (
    <div className="grid grid-cols-[0.85fr_1.15fr] items-stretch gap-2.5">
      <button
        type="button"
        className="flex flex-col items-center justify-center gap-1 rounded-[var(--radius-small)] border-2 border-dashed px-2 py-2.5 text-center transition-colors"
        style={{
          borderColor: airdropHovered ? "var(--color-primary-yellow)" : "var(--widget-dashed)",
          backgroundColor: "var(--widget-inset)",
        }}
        onMouseEnter={() => setAirdropHovered(true)}
        onMouseLeave={() => setAirdropHovered(false)}
        onFocus={() => setAirdropHovered(true)}
        onBlur={() => setAirdropHovered(false)}
      >
        <span
          className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-small)]"
          style={{
            backgroundColor: airdropHovered
              ? "var(--color-primary-yellow)"
              : "var(--widget-border)",
            color: airdropHovered ? "var(--color-pure-ink)" : "var(--widget-text)",
          }}
          aria-hidden
        >
          <AirDropGlyph />
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
              className="flex items-center gap-2 rounded-[var(--radius-small)] px-2 py-1"
              style={{ backgroundColor: "var(--widget-border)" }}
            >
              <span
                className="flex h-6 w-7 shrink-0 items-center justify-center rounded-[var(--radius-small)] text-[7px] font-bold tracking-wide text-white"
                style={{
                  backgroundColor: file.fill,
                  color:
                    file.type === "MOV" ? "var(--color-pure-ink)" : "#ffffff",
                }}
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
