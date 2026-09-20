"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CollageMark } from "@/components/collage/CollageMark";
import { DownloadIcon } from "@/components/ui/DownloadIcon";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { brand, navLinks } from "@/lib/brand";

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="relative mx-auto max-w-[var(--max-width)]">
        <div
          className="flex min-h-[3.25rem] items-center gap-2 overflow-hidden rounded-[var(--radius-nav)] border border-[var(--color-hairline)] bg-[var(--color-canvas-elevated)]/90 px-2.5 py-2.5 backdrop-blur-md sm:min-h-[var(--nav-height)] sm:gap-3 sm:px-4"
          style={{ boxShadow: "var(--shadow-nav)" }}
        >
          <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2">
            <CollageMark size={32} className="shrink-0" animate={false} />
            <span className="font-display truncate text-[16px] font-medium text-[var(--color-ink)] sm:text-[17px]">
              {brand.name}
            </span>
          </Link>

          <nav className="hidden min-w-0 flex-1 justify-center md:flex" aria-label="Main">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-[var(--radius-small)] px-2.5 py-2 text-[length:var(--text-body-sm)] font-medium whitespace-nowrap transition-colors lg:px-3 xl:px-5 ${
                    active
                      ? "bg-[var(--color-canvas)] text-[var(--color-ink)]"
                      : "text-[var(--color-muted)] hover:bg-[var(--color-canvas)] hover:text-[var(--color-ink)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
            <ThemeToggle />
            <a
              href="/api/download"
              aria-label="Download for macOS"
              title="Download for macOS"
              className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-buttons)] border border-[var(--color-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)]"
            >
              <DownloadIcon className="h-4 w-4 shrink-0" />
            </a>
            <button
              type="button"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-buttons)] border border-[var(--color-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] md:hidden"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <MenuCloseIcon /> : <MenuOpenIcon />}
            </button>
          </div>
        </div>

        {open ? (
          <nav className="page-card mt-3 !py-4 md:hidden" aria-label="Menu">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`block py-2.5 text-[length:var(--text-body-sm)] font-medium ${
                    active ? "text-[var(--color-accent)]" : "text-[var(--color-ink)]"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href="/api/download"
              className="mt-3 flex items-center justify-center gap-2 rounded-[var(--radius-buttons)] border border-[var(--color-hairline)] bg-[var(--color-canvas)] py-2.5 text-[length:var(--text-body-sm)] font-medium text-[var(--color-ink)]"
              onClick={() => setOpen(false)}
            >
              <DownloadIcon className="h-4 w-4 shrink-0" />
              Download for macOS
            </a>
          </nav>
        ) : null}
      </div>
    </header>
  );
}

function MenuOpenIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 4.5h10M3 8h10M3 11.5h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  );
}

function MenuCloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  );
}
