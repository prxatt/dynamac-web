type CharacterProps = {
  className?: string;
};

const stroke = "var(--color-ink-black)";

export function MusicCharacter({ className = "" }: CharacterProps) {
  return (
    <svg
      viewBox="0 0 200 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <ellipse cx="100" cy="228" rx="52" ry="10" fill="var(--color-sandstone)" />
      <path
        d="M68 118c0-28 14-48 32-48s32 20 32 48v72c0 18-14 32-32 32s-32-14-32-32v-72z"
        fill="var(--color-coral-pop)"
        stroke={stroke}
        strokeWidth="3"
      />
      <circle cx="100" cy="72" r="36" fill="var(--color-pure-white)" stroke={stroke} strokeWidth="3" />
      <path
        d="M72 72c0-16 12-28 28-28s28 12 28 28"
        fill="var(--color-sky-pop)"
        stroke={stroke}
        strokeWidth="3"
      />
      <rect x="58" y="88" width="22" height="34" rx="11" fill="var(--color-fresh-grass)" stroke={stroke} strokeWidth="3" />
      <rect x="120" y="88" width="22" height="34" rx="11" fill="var(--color-fresh-grass)" stroke={stroke} strokeWidth="3" />
      <path
        d="M132 156l28 18v38l-28-16v-40z"
        fill="var(--color-sunshine-pop)"
        stroke={stroke}
        strokeWidth="3"
      />
      <circle cx="152" cy="206" r="14" fill="var(--color-pure-white)" stroke={stroke} strokeWidth="3" />
    </svg>
  );
}
