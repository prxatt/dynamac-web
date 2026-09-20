"use client";

/** Shared SVG die-cut glyphs for Bauhaus Zine collage. */

export function HeadphonesDieCut({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path
        d="M12 34a20 20 0 0 1 40 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <rect x="8" y="32" width="14" height="22" rx="5" fill="var(--color-accent)" />
      <rect x="42" y="32" width="14" height="22" rx="5" fill="currentColor" />
    </svg>
  );
}

export function CalendarDieCut({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 64" className={className} aria-hidden>
      <rect width="56" height="64" rx="6" fill="currentColor" />
      <rect width="56" height="14" fill="var(--color-primary-blue)" />
      <rect x="8" y="26" width="14" height="12" rx="2" fill="var(--color-accent)" />
      <rect x="28" y="26" width="14" height="12" rx="2" fill="var(--color-canvas)" opacity="0.35" />
      <rect x="8" y="44" width="14" height="12" rx="2" fill="var(--color-canvas)" opacity="0.35" />
      <rect x="28" y="44" width="14" height="12" rx="2" fill="var(--color-primary-yellow)" />
    </svg>
  );
}

/**
 * Shelf glyph — stacked file tiles held in the notch capsule.
 * Product truth: drop files, hold them in the HUD (not a Finder folder).
 */
export function FilesDieCut({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 64" className={className} aria-hidden>
      <rect x="14" y="4" width="32" height="18" rx="3" fill="var(--color-accent)" />
      <rect x="10" y="14" width="32" height="18" rx="3" fill="var(--color-primary-blue)" />
      <rect
        x="18"
        y="24"
        width="32"
        height="18"
        rx="3"
        fill="var(--color-primary-yellow)"
        stroke="var(--color-ink)"
        strokeWidth="2"
      />
      <rect x="22" y="30" width="10" height="5" rx="1" fill="var(--color-ink)" opacity="0.35" />
      <rect x="6" y="46" width="44" height="14" rx="7" fill="var(--color-ink)" />
      <rect x="18" y="50" width="20" height="6" rx="3" fill="var(--color-canvas)" opacity="0.2" />
    </svg>
  );
}

/** Concentric AirDrop arcs — Shelf share-out verb. */
export function AirDropDieCut({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <circle cx="32" cy="40" r="4" fill="currentColor" />
      <path
        d="M20 30a17 17 0 0 1 24 0"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M14 22a26 26 0 0 1 36 0"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M8 14a35 35 0 0 1 48 0"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function NotchCapsuleDieCut({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 20" className={className} aria-hidden>
      <rect width="72" height="20" rx="10" fill="currentColor" />
    </svg>
  );
}

export function HalftoneDot({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      {Array.from({ length: 25 }).map((_, i) => {
        const x = (i % 5) * 8 + 4;
        const y = Math.floor(i / 5) * 8 + 4;
        const r = 1.2 + (i % 3) * 0.6;
        return <circle key={i} cx={x} cy={y} r={r} fill="currentColor" opacity={0.35 + (i % 4) * 0.1} />;
      })}
    </svg>
  );
}

export function BarcodeStrip({ className = "" }: { className?: string }) {
  const widths = [2, 1, 3, 1, 2, 2, 1, 4, 1, 2, 1, 3, 2, 1, 2, 3, 1, 2];
  let x = 0;
  return (
    <svg viewBox="0 0 80 24" className={className} aria-hidden>
      {widths.map((w, i) => {
        const el =
          i % 2 === 0 ? (
            <rect key={i} x={x} y="0" width={w} height="24" fill="currentColor" />
          ) : null;
        x += w + 1;
        return el;
      })}
    </svg>
  );
}
