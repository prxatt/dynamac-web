"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { AppIcon } from "@/components/ui/AppIcon";
import { brand, navLinks } from "@/lib/brand";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_92%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex h-[var(--nav-height)] max-w-[var(--max-width)] items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <AppIcon size={22} priority />
          <span className="text-sm font-semibold">{brand.name}</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/api/download" variant="secondary" className="hidden px-4 py-2 text-xs sm:inline-flex">
            Download
          </Button>
          <Button href="/buy" className="hidden px-4 py-2 text-xs sm:inline-flex">
            Buy
          </Button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center border border-[var(--border)] text-sm md:hidden"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? "×" : "≡"}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-[var(--border)] px-5 py-3 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm text-[var(--fg-muted)]"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 flex gap-2">
            <Button href="/api/download" variant="secondary" className="flex-1">
              Download
            </Button>
            <Button href="/buy" className="flex-1">
              Buy
            </Button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
