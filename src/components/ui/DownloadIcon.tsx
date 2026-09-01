type DownloadIconProps = {
  className?: string;
};

/** macOS-style download arrow — not a decorative dot */
export function DownloadIcon({ className = "h-4 w-4" }: DownloadIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8 2v7.2M8 9.2 5.4 6.6M8 9.2l2.6-2.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 12.5h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
