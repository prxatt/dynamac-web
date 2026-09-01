"use client";

import Link from "next/link";
import { useState } from "react";
import { AppIcon } from "@/components/ui/AppIcon";
import { DownloadIcon } from "@/components/ui/DownloadIcon";
import { brand, navLinks } from "@/lib/brand";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-3 pt-4 sm:px-5 sm:pt-5">
      <div className="relative mx-auto max-w-[var(--max-width)]">
        <div className="flex min-h-[3.25rem] items-center gap-2 overflow-hidden rounded-[var(--radius-nav)] border border-[var(--color-hairline-mist)] bg-[var(--color-pure-white)] px-2.5 py-2.5 sm:min-h-[var(--nav-height)] sm:gap-3 sm:px-4">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <span className="shrink-0 overflow-hidden rounded-[var(--radius-small)]">
              <AppIcon size={32} priority />
            </span>
            <span className="text-[16px] font-medium whitespace-nowrap text-[var(--color-ink-black)] sm:text-[17px]">
              {brand.name}
            </span>
          </Link>

          <nav className="hidden min-w-0 flex-1 justify-center md:flex" aria-label="Main">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-[length:var(--text-body-sm)] font-medium text-[var(--color-ink-black)] hover:bg-[var(--color-cream-paper)] lg:px-5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Link
              href="/buy"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-[var(--radius-buttons)] border border-[var(--color-hairline-mist)] bg-[var(--color-pure-white)] px-3 text-[length:var(--text-body-sm)] font-medium text-[var(--color-ink-black)] transition-colors hover:border-[var(--color-ink-black)] sm:px-4"
            >
              <DownloadIcon className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Get app</span>
              <span className="sm:hidden">Get</span>
            </Link>
            <Link
              href="/buy"
              className="hidden h-9 items-center justify-center rounded-[var(--radius-buttons)] bg-[var(--color-coral-pop)] px-4 text-[length:var(--text-body-sm)] font-medium text-white transition-opacity hover:opacity-95 lg:inline-flex"
            >
              Buy · ${brand.price.toFixed(2)}
            </Link>
            <button
              type="button"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-fresh-grass)] text-lg leading-none text-[var(--color-ink-black)] transition-opacity hover:opacity-90 sm:h-10 sm:w-10 md:hidden"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? "×" : "≡"}
            </button>
          </div>
        </div>

        {open ? (
          <nav
            className="mt-3 rounded-[var(--radius-cards)] border border-[var(--color-hairline-mist)] bg-[var(--color-pure-white)] px-5 py-4 shadow-[0_12px_40px_rgba(44,46,42,0.08)] md:hidden"
            aria-label="Menu"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2.5 text-[length:var(--text-body-sm)] font-medium text-[var(--color-ink-black)]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/buy"
              className="mt-3 flex items-center justify-center gap-2 rounded-[var(--radius-buttons)] bg-[var(--color-coral-pop)] py-2.5 text-[length:var(--text-body-sm)] font-medium text-white"
              onClick={() => setOpen(false)}
            >
              Get DynaMac · ${brand.price.toFixed(2)}
            </Link>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
