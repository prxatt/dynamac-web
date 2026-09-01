"use client";

import { useState } from "react";
import { GlassModeToggle } from "@/components/demo/GlassModeToggle";
import { TabWidgetCard } from "@/components/demo/TabWidgetCard";
import type { GlassStyleId } from "@/lib/glass-themes";

const files = [
  { name: "notch-mockup.png", type: "PNG" },
  { name: "release-notes.pdf", type: "PDF" },
] as const;

export function ShelfLiveCard() {
  const [airdropHovered, setAirdropHovered] = useState(false);
  const [glassStyle, setGlassStyle] = useState<GlassStyleId>("liquidLight");

  return (
    <TabWidgetCard
      dialKitName="Shelf Card"
      hoverBorderColor="var(--color-sunshine-pop)"
      glassStyle={glassStyle}
    >
      <div className="mb-3 flex justify-end">
        <GlassModeToggle value={glassStyle} onChange={setGlassStyle} />
      </div>

      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <button
          type="button"
          className="flex min-h-[140px] flex-col items-center justify-center gap-2 rounded-[var(--radius-small)] border-[3px] border-dashed px-4 py-5 text-center transition-colors"
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
            className="flex h-12 w-12 items-center justify-center rounded-full text-[length:var(--text-body-lg)]"
            style={{ backgroundColor: "var(--widget-border)", color: "var(--widget-text)" }}
            aria-hidden
          >
            ⇪
          </span>
          <span
            className="text-[length:var(--text-body-sm)] font-medium"
            style={{ color: "var(--widget-text)" }}
          >
            AirDrop
          </span>
          <span className="text-[11px]" style={{ color: "var(--widget-muted)" }}>
            {airdropHovered ? "Release to share" : "Drop files here"}
          </span>
        </button>

        <div
          className="rounded-[var(--radius-small)] border-[3px] border-dashed p-3"
          style={{
            borderColor: "var(--widget-dashed)",
            backgroundColor: "var(--widget-inset)",
          }}
        >
          <p
            className="text-[9px] font-medium uppercase tracking-[0.12em]"
            style={{ color: "var(--widget-muted)" }}
          >
            Shelf
          </p>
          <ul className="mt-3 space-y-2">
            {files.map((file) => (
              <li
                key={file.name}
                className="flex items-center gap-3 rounded-[var(--radius-small)] px-3 py-2.5"
                style={{ backgroundColor: "var(--widget-border)" }}
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-small)] text-[10px] font-medium"
                  style={{
                    backgroundColor: "var(--widget-inset)",
                    color: "var(--widget-muted)",
                  }}
                >
                  {file.type}
                </span>
                <span
                  className="min-w-0 truncate text-[length:var(--text-body-sm)] font-medium"
                  style={{ color: "var(--widget-text)" }}
                >
                  {file.name}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px]" style={{ color: "var(--widget-muted)" }}>
            Hold files in the notch · Share via AirDrop
          </p>
        </div>
      </div>
    </TabWidgetCard>
  );
}
