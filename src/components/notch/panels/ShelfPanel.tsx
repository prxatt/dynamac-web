"use client";

import { notch } from "@/components/notch/notch-styles";

export function ShelfPanel() {
  return (
    <div className="grid gap-3 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div
        className="flex min-h-[120px] flex-col items-center justify-center rounded-2xl border border-dashed px-4 py-5 text-center"
        style={{ borderColor: notch.borderStrong, backgroundColor: "rgba(255,255,255,0.03)" }}
      >
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full text-lg"
          style={{ backgroundColor: notch.surfaceRaised, color: notch.textMuted }}
          aria-hidden
        >
          ⇪
        </span>
        <p className="mt-2 text-[11px] font-semibold" style={{ color: notch.text }}>
          AirDrop
        </p>
        <p className="mt-1 text-[9px]" style={{ color: notch.textDim }}>
          Drop files here
        </p>
      </div>

      <div
        className="flex min-h-[120px] flex-col items-center justify-center rounded-2xl border border-dashed px-4 py-5 text-center"
        style={{ borderColor: notch.borderStrong, backgroundColor: "rgba(255,255,255,0.02)" }}
      >
        <span className="text-2xl opacity-60" aria-hidden>
          📥
        </span>
        <p className="mt-2 text-[12px] font-semibold" style={{ color: notch.text }}>
          Drop files here
        </p>
        <p className="mt-1 text-[9px]" style={{ color: notch.textDim }}>
          Hold files in the notch · Share via AirDrop
        </p>
      </div>
    </div>
  );
}
