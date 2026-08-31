"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { AppIcon } from "@/components/ui/AppIcon";
import { brand, navLinks } from "@/lib/brand";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-5 pt-5">
      <div className="mx-auto max-w-[var(--max-width)]">
        <div className="flex min-h-[var(--nav-height)] items-center justify-between gap-4 rounded-[var(--radius-nav)] border border-[var(--color-hairline-mist)] bg-[var(--color-pure-white)] px-5 py-3">
          <Link href="/" className="flex items-center gap-3">
            <span className="overflow-hidden rounded-[var(--radius-small)]">
              <AppIcon size={40} priority />
            </span>
            <span className="text-[17px] font-medium text-[var(--color-ink-black)]">
              {brand.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-5 py-2 text-[length:var(--text-body-sm)] font-medium text-[var(--color-ink-black)] hover:bg-[var(--color-cream-paper)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              href="/api/download"
              variant="primary"
              dot="sky"
              className="hidden px-4 py-2 text-[length:var(--text-body-sm)] sm:inline-flex"
            >
              Download
            </Button>
            <Button
              href="/buy"
              variant="accent"
              className="hidden px-4 py-2 text-[length:var(--text-body-sm)] sm:inline-flex"
            >
              Buy
            </Button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-fresh-grass)] text-lg text-[var(--color-ink-black)] md:hidden"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? "×" : "≡"}
            </button>
          </div>
        </div>

        {open ? (
          <nav className="mt-3 rounded-[var(--radius-cards)] border border-[var(--color-hairline-mist)] bg-[var(--color-pure-white)] px-5 py-4 md:hidden">
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
            <div className="mt-4 flex flex-col gap-2">
              <Button href="/api/download" variant="primary" className="w-full justify-center">
                Download
              </Button>
              <Button href="/buy" variant="accent" className="w-full justify-center">
                Buy
              </Button>
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
