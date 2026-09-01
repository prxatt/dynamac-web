type CharacterProps = {
  className?: string;
};

const stroke = "var(--color-ink-black)";

export function FilesCharacter({ className = "" }: CharacterProps) {
  return (
    <svg
      viewBox="0 0 200 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <ellipse cx="102" cy="234" rx="54" ry="10" fill="var(--color-sandstone)" />
      <path
        d="M74 124c0-28 14-46 30-46s30 18 30 46v76c0 18-13 30-30 30s-30-12-30-30v-76z"
        fill="var(--color-sunshine-pop)"
        stroke={stroke}
        strokeWidth="3"
      />
      <circle cx="104" cy="80" r="35" fill="var(--color-pure-white)" stroke={stroke} strokeWidth="3" />
      <rect x="112" y="118" width="58" height="72" rx="8" fill="var(--color-pure-white)" stroke={stroke} strokeWidth="3" />
      <path d="M112 134h58" stroke={stroke} strokeWidth="2" />
      <rect x="122" y="146" width="36" height="6" rx="3" fill="var(--color-stone-gray)" />
      <rect x="122" y="160" width="28" height="6" rx="3" fill="var(--color-hairline-mist)" />
      <rect x="46" y="132" width="50" height="64" rx="8" fill="var(--color-coral-pop)" stroke={stroke} strokeWidth="3" />
      <path d="M46 148h50" stroke={stroke} strokeWidth="2" />
      <rect x="56" y="158" width="28" height="6" rx="3" fill="var(--color-pure-white)" opacity="0.7" />
      <path
        d="M150 188l22 16-10 12-22-14 10-14z"
        fill="var(--color-fresh-grass)"
        stroke={stroke}
        strokeWidth="3"
      />
    </svg>
  );
}
