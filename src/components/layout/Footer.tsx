import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { brand, footerLinks } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto flex max-w-[var(--max-width)] flex-col gap-8 px-5 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold">{brand.name}</p>
          <p className="mt-1 text-xs text-[var(--fg-dim)]">
            © {new Date().getFullYear()} {brand.company}
          </p>
        </div>
        <nav>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mx-auto flex max-w-[var(--max-width)] flex-wrap gap-3 border-t border-[var(--border)] px-5 py-8">
        <Button href="/api/download" variant="secondary">
          Download
        </Button>
        <Button href="/buy">Buy ${brand.price.toFixed(2)}</Button>
      </div>
    </footer>
  );
}
