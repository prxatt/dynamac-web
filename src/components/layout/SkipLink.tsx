export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[var(--yellow)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[var(--bg)] focus:outline-none"
    >
      Skip to content
    </a>
  );
}
