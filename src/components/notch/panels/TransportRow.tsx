import {
  TransportNext,
  TransportPlay,
  TransportPrev,
  TransportRepeat,
  TransportShuffle,
} from "@/components/notch/panels/TransportIcons";

type TransportRowProps = {
  className?: string;
  mutedColor?: string;
  activeColor?: string;
  accentColor?: string;
};

/** Shared Now Playing transport row — SVG glyphs, not emoji. */
export function TransportRow({
  className = "",
  mutedColor = "var(--widget-muted)",
  activeColor = "var(--widget-text)",
  accentColor = "var(--color-accent)",
}: TransportRowProps) {
  return (
    <div className={`mt-1.5 flex items-center gap-2 ${className}`} style={{ color: mutedColor }}>
      <span style={{ color: accentColor }}>
        <TransportShuffle />
      </span>
      <TransportPrev />
      <span style={{ color: activeColor }}>
        <TransportPlay />
      </span>
      <TransportNext />
      <TransportRepeat />
    </div>
  );
}
