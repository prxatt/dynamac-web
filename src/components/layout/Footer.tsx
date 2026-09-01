import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FooterEditorialBand } from "@/components/layout/FooterEditorialBand";
import { brand, footerLinks, getCheckoutUrl } from "@/lib/brand";

export function Footer() {
  const checkoutUrl = getCheckoutUrl();

  return (
    <footer id="buy">
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

        <div className="mt-12 max-w-2xl">
          <h2
            className="font-medium leading-[1.15] tracking-[-0.04em] text-[var(--color-ink-black)]"
            style={{ fontSize: "var(--text-heading-sm)" }}
          >
            ${brand.price.toFixed(2)}, once.
          </h2>
          <p className="mt-3 text-[length:var(--text-body-lg)] text-[var(--color-ink-black)]">
            macOS only. All 1.x updates included. Download the app, then activate with your
            license after purchase.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/api/download" variant="primary" downloadIcon>
              Download for macOS
            </Button>
            {checkoutUrl ? (
              <Button href={checkoutUrl} external variant="accent">
                Buy license
              </Button>
            ) : (
              <Button href="/buy" variant="accent">
                Buy license
              </Button>
            )}
          </div>
        </div>

        <FooterEditorialBand />
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
