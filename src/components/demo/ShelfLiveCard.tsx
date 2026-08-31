"use client";

import { useState } from "react";
import { TabWidgetCard } from "@/components/demo/TabWidgetCard";

const files = [
  { name: "notch-mockup.png", type: "PNG" },
  { name: "release-notes.pdf", type: "PDF" },
] as const;

export function ShelfLiveCard() {
  const [airdropHovered, setAirdropHovered] = useState(false);

  return (
    <TabWidgetCard dialKitName="Shelf Card" hoverBorderColor="var(--color-sunshine-pop)">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <button
          type="button"
          className="flex min-h-[140px] flex-col items-center justify-center gap-2 rounded-[var(--radius-small)] border-[3px] border-dashed bg-[var(--color-pure-white)] px-4 py-5 text-center transition-colors"
          style={{
            borderColor: airdropHovered
              ? "var(--color-sunshine-pop)"
              : "var(--color-hairline-mist)",
          }}
          onMouseEnter={() => setAirdropHovered(true)}
          onMouseLeave={() => setAirdropHovered(false)}
          onFocus={() => setAirdropHovered(true)}
          onBlur={() => setAirdropHovered(false)}
        >
          <span
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-sandstone)] text-[length:var(--text-body-lg)]"
            aria-hidden
          >
            ⇪
          </span>
          <span className="text-[length:var(--text-body-sm)] font-medium text-[var(--color-ink-black)]">
            AirDrop
          </span>
          <span className="text-[11px] text-[var(--color-stone-gray)]">
            {airdropHovered ? "Release to share" : "Drop files here"}
          </span>
        </button>

        <div className="rounded-[var(--radius-small)] border-[3px] border-dashed border-[var(--color-hairline-mist)] bg-[var(--color-pure-white)] p-3">
          <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--color-stone-gray)]">
            Shelf
          </p>
          <ul className="mt-3 space-y-2">
            {files.map((file) => (
              <li
                key={file.name}
                className="flex items-center gap-3 rounded-[var(--radius-small)] bg-[var(--color-sandstone)] px-3 py-2.5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-small)] bg-[var(--color-pure-white)] text-[10px] font-medium text-[var(--color-stone-gray)]">
                  {file.type}
                </span>
                <span className="min-w-0 truncate text-[length:var(--text-body-sm)] font-medium text-[var(--color-ink-black)]">
                  {file.name}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] text-[var(--color-stone-gray)]">
            Hold files in the notch · Share via AirDrop
          </p>
        </div>
      </div>
    </TabWidgetCard>
  );
}
