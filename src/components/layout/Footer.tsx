import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { brand, footerLinks } from "@/lib/brand";

export function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-[var(--max-width)] px-5 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[17px] font-medium text-[var(--color-ink-black)]">{brand.name}</p>
            <p className="mt-1 text-[length:var(--text-body-sm)] text-[var(--color-stone-gray)]">
              © {new Date().getFullYear()} {brand.company}
            </p>
          </div>
          <nav>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="border-b border-[var(--color-stone-gray)] text-[length:var(--text-body-sm)] text-[var(--color-stone-gray)] hover:border-[var(--color-ink-black)] hover:text-[var(--color-ink-black)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/api/download" variant="primary">
            Download
          </Button>
          <Button href="/buy" variant="accent">
            Buy ${brand.price.toFixed(2)}
          </Button>
        </div>
      </div>

      <div className="bg-[var(--color-sunshine-pop)] px-5 py-10">
        <div className="mx-auto max-w-[var(--max-width)]">
          <p className="text-[length:var(--text-body-lg)] font-medium text-[var(--color-ink-black)]">
            {brand.tagline} · {brand.platform}
          </p>
        </div>
      </div>
    </footer>
  );
}
