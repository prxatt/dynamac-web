"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

export type FocusCellMode = "off" | "on" | "blink";

type MiniFocusGridProps = {
  progress: number;
  active: boolean;
  fillColor?: string;
  mutedColor?: string;
  size?: "idle" | "running" | "expanded" | "strip";
  /** Adaptive matrix (Intent card) — one cell per minute (or second for ≤2m). */
  matrix?: boolean;
  cellCount?: number;
  fitHeight?: number;
};

function cellProgress(active: boolean, progress: number, count: number) {
  if (!active || count <= 0) return { completed: 0, blinking: null as number | null };
  const exact = Math.min(1, Math.max(0, progress)) * count;
  const completed = Math.min(count, Math.floor(exact));
  const fraction = exact - completed;
  if (completed >= count) return { completed: count, blinking: null };
  if (fraction > 0.0001 || (completed === 0 && progress > 0)) {
    return { completed, blinking: completed };
  }
  if (progress > 0 && completed < count && fraction <= 0.0001) {
    return { completed, blinking: null };
  }
  return { completed, blinking: null };
}

function modeFor(index: number, completed: number, blinking: number | null): FocusCellMode {
  if (index < completed) return "on";
  if (blinking === index) return "blink";
  return "off";
}

export function fitFocusGridLayout(
  cellCount: number,
  width: number,
  height: number,
): { cols: number; rows: number; cell: number; gap: number } {
  const n = Math.max(1, cellCount);
  const w = Math.max(width, 1);
  const h = Math.max(height, 1);
  let bestCols = Math.min(12, n);
  let bestRows = Math.ceil(n / bestCols);
  let bestCell = 0;
  let bestGap = 1.5;

  const maxCols = Math.min(n, 30);
  for (let cols = 1; cols <= maxCols; cols++) {
    const rows = Math.ceil(n / cols);
    const gap = n > 120 ? 0.6 : n > 60 ? 1.0 : 1.5;
    const cellW = (w - gap * (cols - 1)) / cols;
    const cellH = (h - gap * (rows - 1)) / rows;
    const cell = Math.min(cellW, cellH);
    if (cell > bestCell) {
      bestCell = cell;
      bestCols = cols;
      bestRows = rows;
      bestGap = gap;
    }
  }

  return { cols: bestCols, rows: bestRows, cell: Math.max(2, bestCell), gap: bestGap };
}

function FocusGridCell({
  mode,
  fillColor,
  mutedColor,
  cornerRadius,
  height,
  width,
  reduceMotion,
}: {
  mode: FocusCellMode;
  fillColor: string;
  mutedColor: string;
  cornerRadius: number;
  height: number;
  width?: number;
  reduceMotion: boolean;
}) {
  const lit = mode === "on" || mode === "blink";
  return (
    <span
      className={mode === "blink" && !reduceMotion ? "animate-pulse" : undefined}
      style={{
        display: "block",
        width: width ?? undefined,
        height,
        flex: width == null ? 1 : undefined,
        borderRadius: cornerRadius,
        backgroundColor: lit ? fillColor : mutedColor,
        opacity: mode === "blink" && reduceMotion ? 0.7 : 1,
      }}
    />
  );
}

/** Adaptive Bauhaus cell matrix — matches IntentMiniFocusGrid on macOS. */
export function MiniFocusGrid({
  progress,
  active,
  fillColor = "#48a8fa",
  mutedColor = "rgba(255,255,255,0.22)",
  size = "idle",
  matrix = false,
  cellCount = 60,
  fitHeight = 72,
}: MiniFocusGridProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 180, h: fitHeight });

  useLayoutEffect(() => {
    if (!matrix) return;
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      setBox({ w: Math.max(r.width, 1), h: Math.max(r.height, 1) });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [matrix, fitHeight, cellCount]);

  if (size === "strip") {
    const stripCells = 12;
    const { completed, blinking } = cellProgress(active, progress, stripCells);
    return (
      <div className="flex w-full gap-px" aria-hidden>
        {Array.from({ length: stripCells }, (_, i) => (
          <FocusGridCell
            key={i}
            mode={modeFor(i, completed, blinking)}
            fillColor={fillColor}
            mutedColor={mutedColor}
            cornerRadius={2}
            height={10}
            reduceMotion={reducedMotion}
          />
        ))}
      </div>
    );
  }

  if (matrix) {
    const resolved = Math.max(1, Math.min(cellCount, 4 * 60));
    const layout = fitFocusGridLayout(resolved, box.w, box.h);
    const { completed, blinking } = cellProgress(active, progress, resolved);
    const cells: ReactNode[] = [];
    for (let row = 0; row < layout.rows; row++) {
      const rowCells: ReactNode[] = [];
      for (let col = 0; col < layout.cols; col++) {
        const i = row * layout.cols + col;
        if (i < resolved) {
          rowCells.push(
            <FocusGridCell
              key={i}
              mode={modeFor(i, completed, blinking)}
              fillColor={fillColor}
              mutedColor={mutedColor}
              cornerRadius={Math.max(0.8, layout.cell * 0.22)}
              height={layout.cell}
              width={layout.cell}
              reduceMotion={reducedMotion}
            />,
          );
        } else {
          rowCells.push(
            <span
              key={`pad-${i}`}
              style={{ width: layout.cell, height: layout.cell, display: "block" }}
            />,
          );
        }
      }
      cells.push(
        <div key={row} className="flex justify-center" style={{ gap: layout.gap }}>
          {rowCells}
        </div>,
      );
    }

    return (
      <div
        ref={containerRef}
        className="flex w-full flex-col items-center justify-center"
        style={{ height: fitHeight, gap: layout.gap }}
        role="img"
        aria-label={
          active
            ? `Focus progress ${completed} of ${resolved}`
            : `Focus grid ${resolved} cells`
        }
      >
        {cells}
      </div>
    );
  }

  // Legacy single-row 60-cell grid (unused by current Intent card)
  const total = 60;
  const { completed, blinking } = cellProgress(active, progress, total);
  const height = size === "expanded" ? 14 : size === "running" ? 10 : 8;

  return (
    <div
      className="flex w-full gap-px"
      role="img"
      aria-label={active ? `Focus progress ${completed} of ${total} minutes` : "60-minute focus grid"}
    >
      {Array.from({ length: total }, (_, i) => (
        <FocusGridCell
          key={i}
          mode={modeFor(i, completed, blinking)}
          fillColor={fillColor}
          mutedColor={mutedColor}
          cornerRadius={1.5}
          height={height}
          reduceMotion={reducedMotion}
        />
      ))}
    </div>
  );
}

export function formatFocusTime(totalSeconds: number) {
  const total = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
