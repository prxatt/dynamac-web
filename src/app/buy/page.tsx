import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { CollageMark } from "@/components/collage/CollageMark";
import { brand, getCheckoutUrl } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Buy",
  description: `Purchase ${brand.name} for macOS. $${brand.price.toFixed(2)} one-time. Download included.`,
  alternates: { canonical: `${brand.website}/buy` },
};

export default function BuyPage() {
  const checkoutUrl = getCheckoutUrl();

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:py-16">
      <div className="page-card">
        <div className="mb-6">
          <CollageMark size={40} animate={false} />
        </div>
        <h1 className="page-title page-title-lg">Buy · {brand.name}</h1>
        <p className="mt-4 text-[length:var(--text-body-lg)] text-[var(--color-muted)]">
          <span className="tabular-nums text-[var(--color-ink)]">{`$${brand.price.toFixed(2)}`}</span>{" "}
          one-time. All 1.x updates. {brand.platform}.
        </p>

        <ol className="mt-10 space-y-4">
          {[
            "Download and install the app.",
            checkoutUrl
              ? "Complete checkout to receive your license key by email."
              : "Request a license by email — we’ll send your key.",
            `Enter the key in ${brand.name} settings.`,
          ].map((step, index) => (
            <li key={step} className="flex gap-3 text-[length:var(--text-body-sm)] text-[var(--color-muted)]">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--radius-small)] border border-[var(--color-ink)] bg-[var(--color-canvas)] font-mono text-[10px] font-bold tabular-nums text-[var(--color-ink)]"
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="pt-1">{step}</span>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Button href="/api/download" downloadIcon className="w-full sm:w-auto">
            1. Download for macOS
          </Button>
          {checkoutUrl ? (
            <Button href={checkoutUrl} external variant="accent" className="w-full sm:w-auto">
              {`2. Buy license · $${brand.price.toFixed(2)}`}
            </Button>
          ) : (
            <Button
              href={`mailto:${brand.supportEmail}?subject=${encodeURIComponent(`${brand.name} license`)}`}
              variant="accent"
              className="w-full sm:w-auto"
            >
              {`2. Request license · $${brand.price.toFixed(2)}`}
            </Button>
          )}
        </div>

        {!checkoutUrl ? (
          <div className="mt-6 rounded-[var(--radius-cards)] border border-dashed border-[var(--color-hairline)] bg-[var(--color-canvas)] px-5 py-5">
            <p className="font-mono text-[10px] tracking-[0.18em] text-[var(--color-muted)] uppercase">
              Plate · checkout pending
            </p>
            <p className="mt-3 text-[length:var(--text-body-sm)] text-[var(--color-muted)]">
              Download installs the app now. Self-serve checkout is not connected yet — request a
              license by email and we’ll send your key.
            </p>
          </div>
        ) : (
          <p className="mt-4 text-[length:var(--text-body-sm)] text-[var(--color-muted)]">
            Download installs the app. Checkout sends your license key by email — both on this page.
          </p>
        )}

        <p className="mt-10 text-sm text-[var(--color-muted)]">
          Questions?{" "}
          <a href={`mailto:${brand.supportEmail}`} className="text-link">
            {brand.supportEmail}
          </a>
        </p>
      </div>
    </div>
  );
}
