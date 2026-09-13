/** Minimal transport glyphs for the Now Playing demo — no emoji. */

type GlyphProps = {
  className?: string;
};

export function TransportShuffle({ className = "h-2.5 w-2.5" }: GlyphProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden>
      <path
        d="M2 4h3.5L9 12h5M11 4h3v3M14 12v-3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M2 12h3.5L7 8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function TransportPrev({ className = "h-2.5 w-2.5" }: GlyphProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden>
      <path d="M3 3.5h1.4v9H3V3.5Zm2.6 4.5L12.5 3.2v9.6L5.6 8Z" />
    </svg>
  );
}

export function TransportPlay({ className = "h-2.5 w-2.5" }: GlyphProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden>
      <path d="M4.5 2.8v10.4L13.2 8 4.5 2.8Z" />
    </svg>
  );
}

export function TransportNext({ className = "h-2.5 w-2.5" }: GlyphProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden>
      <path d="M11.6 3.5H13v9h-1.4V3.5ZM3.5 12.8V3.2L10.4 8 3.5 12.8Z" />
    </svg>
  );
}

export function TransportRepeat({ className = "h-2.5 w-2.5" }: GlyphProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden>
      <path
        d="M3.5 6.5V5a2 2 0 0 1 2-2h7.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M11.2 1.8 13.5 3.5 11.2 5.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M12.5 9.5V11a2 2 0 0 1-2 2H3.3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M4.8 14.2 2.5 12.5 4.8 10.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
