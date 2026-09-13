import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CollageMark } from "@/components/collage/CollageMark";
import { FooterCollageStrip } from "@/components/collage/FooterCollageStrip";
import { brand, footerLinks, getCheckoutUrl } from "@/lib/brand";

export function Footer() {
  const checkoutUrl = getCheckoutUrl();

  return (
    <footer id="buy">
      <div className="mx-auto max-w-[var(--max-width)] px-5 py-14 sm:py-16">
        <div className="flex flex-col gap-8 border-b border-[var(--color-hairline)] pb-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <CollageMark size={36} animate={false} />
            <div>
              <p className="font-display text-[17px] font-medium text-[var(--color-ink)]">
                {brand.name}
              </p>
              <p className="mt-1 text-[length:var(--text-body-sm)] text-[var(--color-muted)]">
                © {new Date().getFullYear()} {brand.company}
              </p>
            </div>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="border-b border-[var(--color-muted)] text-[length:var(--text-body-sm)] text-[var(--color-muted)] transition-colors hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <p className="font-mono text-[10px] tracking-[0.16em] text-[var(--color-muted)]">
              License
            </p>
            <h2
              className="font-display mt-3 font-medium leading-[1.05] tracking-[-0.03em] text-[var(--color-ink)]"
              style={{ fontSize: "clamp(2.25rem, 6vw, 3.5rem)" }}
            >
              <span className="tabular-nums">${brand.price.toFixed(2)}</span>, once.
            </h2>
            <p className="mt-4 max-w-xl text-[length:var(--text-body-lg)] text-[var(--color-muted)]">
              macOS only. All 1.x updates included. Download the app, then activate with your
              license after purchase.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap lg:col-span-5 lg:justify-end">
            <Button href="/api/download" variant="primary" downloadIcon className="w-full sm:w-auto">
              Download for macOS
            </Button>
            {checkoutUrl ? (
              <Button href={checkoutUrl} external variant="accent" className="w-full sm:w-auto">
                Buy license
              </Button>
            ) : (
              <Button href="/buy" variant="accent" className="w-full sm:w-auto">
                Get license · <span className="tabular-nums">${brand.price.toFixed(2)}</span>
              </Button>
            )}
          </div>
        </div>

        <FooterCollageStrip />
      </div>

      <div className="border-t border-[var(--color-hairline)] bg-[var(--color-accent)] px-5 py-8 sm:py-10">
        <div className="mx-auto flex max-w-[var(--max-width)] flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="font-display text-[length:var(--text-body-lg)] font-medium tracking-[-0.02em] text-white">
            {brand.tagline}
          </p>
          <p className="font-mono text-[11px] tracking-[0.14em] text-white/80 uppercase">
            {brand.platform} · {brand.company}
          </p>
        </div>
      </div>
    </footer>
  );
}
