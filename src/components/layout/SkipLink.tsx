export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[100] focus:rounded-[var(--radius-buttons)] focus:bg-[var(--color-fresh-grass)] focus:px-5 focus:py-2.5 focus:text-[length:var(--text-body-sm)] focus:font-medium focus:text-[var(--color-ink-black)] focus:outline-none"
    >
      Skip to content
    </a>
  );
}
