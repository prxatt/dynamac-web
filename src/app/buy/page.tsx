import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { CollageMark } from "@/components/collage/CollageMark";
import { brand, getSourceUrl, getTipUrl } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Tip",
  description: `${brand.name} is free and open source. Download for macOS from dynamac.com — optional tip via PayPal.`,
  alternates: { canonical: `${brand.website}/buy` },
};

export default function TipPage() {
  const tipUrl = getTipUrl();
  const sourceUrl = getSourceUrl();

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:py-16">
      <div className="page-card">
        <div className="mb-6">
          <CollageMark size={40} animate={false} />
        </div>
        <h1 className="page-title page-title-lg">Free · {brand.name}</h1>
        <p className="mt-4 text-[length:var(--text-body-lg)] text-[var(--color-muted)]">
          <span className="text-[var(--color-ink)]">{brand.pricingNote}.</span> Download the
          signed app here — no license key, no checkout. Tips keep Surface Tension fed if you want
          to help.
        </p>

        <ol className="mt-10 space-y-4">
          {[
            "Download and install the macOS app from this site.",
            "Use it — no license, no paywall.",
            tipUrl
              ? "Optional: tip via PayPal if DynaMac earned it."
              : "Optional: tip if you want to support the project.",
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
            Download for macOS
          </Button>
          {tipUrl ? (
            <Button href={tipUrl} external variant="accent" className="w-full sm:w-auto">
              Tip on PayPal
            </Button>
          ) : (
            <Button
              href={`mailto:${brand.supportEmail}?subject=${encodeURIComponent(`${brand.name} tip`)}`}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Ask about tipping
            </Button>
          )}
        </div>

        {tipUrl ? (
          <p className="mt-4 text-[length:var(--text-body-sm)] text-[var(--color-muted)]">
            Tips go to PayPal. The app stays free either way — download first.
          </p>
        ) : (
          <p className="mt-4 text-[length:var(--text-body-sm)] text-[var(--color-muted)]">
            One-click tipping isn&apos;t set up yet. Email if you&apos;d like to support the project —
            the download above works either way.
          </p>
        )}

        {sourceUrl ? (
          <p className="mt-6 text-[length:var(--text-body-sm)] text-[var(--color-muted)]">
            Source is open at{" "}
            <a href={sourceUrl} className="text-link" rel="noopener noreferrer" target="_blank">
              {sourceUrl.replace(/^https?:\/\//, "")}
            </a>
            . Prefer the signed download above for day-to-day use.
          </p>
        ) : (
          <p className="mt-6 text-[length:var(--text-body-sm)] text-[var(--color-muted)]">
            Open source — grab the signed build from this site instead of building from source
            unless you&apos;re hacking on it.
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
