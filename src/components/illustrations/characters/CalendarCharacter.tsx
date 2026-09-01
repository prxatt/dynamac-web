type CharacterProps = {
  className?: string;
};

const stroke = "var(--color-ink-black)";

export function CalendarCharacter({ className = "" }: CharacterProps) {
  return (
    <svg
      viewBox="0 0 200 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <ellipse cx="98" cy="232" rx="50" ry="10" fill="var(--color-sandstone)" />
      <path
        d="M70 122c0-26 13-44 28-44s28 18 28 44v78c0 16-12 28-28 28s-28-12-28-28v-78z"
        fill="var(--color-sky-pop)"
        stroke={stroke}
        strokeWidth="3"
      />
      <circle cx="98" cy="78" r="34" fill="var(--color-pure-white)" stroke={stroke} strokeWidth="3" />
      <rect x="118" y="108" width="64" height="78" rx="10" fill="var(--color-pure-white)" stroke={stroke} strokeWidth="3" />
      <rect x="118" y="108" width="64" height="18" rx="10" fill="var(--color-coral-pop)" />
      <rect x="128" y="136" width="12" height="12" rx="2" fill="var(--color-sandstone)" stroke={stroke} strokeWidth="2" />
      <rect x="146" y="136" width="12" height="12" rx="2" fill="var(--color-fresh-grass)" stroke={stroke} strokeWidth="2" />
      <rect x="164" y="136" width="12" height="12" rx="2" fill="var(--color-sandstone)" stroke={stroke} strokeWidth="2" />
      <rect x="128" y="154" width="12" height="12" rx="2" fill="var(--color-sunshine-pop)" stroke={stroke} strokeWidth="2" />
      <rect x="146" y="154" width="12" height="12" rx="2" fill="var(--color-sandstone)" stroke={stroke} strokeWidth="2" />
      <path
        d="M52 150l-24 14v36l24-12V150z"
        fill="var(--color-coral-pop)"
        stroke={stroke}
        strokeWidth="3"
      />
    </svg>
  );
}
