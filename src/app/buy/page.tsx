import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { brand, getCheckoutUrl } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Buy ${brand.name}`,
  description: `Purchase ${brand.name} for macOS. $${brand.price.toFixed(2)} one-time. Download included.`,
  alternates: { canonical: `${brand.website}/buy` },
};

export default function BuyPage() {
  const checkoutUrl = getCheckoutUrl();

  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <div className="page-card">
      <h1 className="page-title">Buy {brand.name}</h1>
      <p className="mt-4 text-[length:var(--text-body-lg)] text-[var(--fg-muted)]">
        {`$${brand.price.toFixed(2)}`} one-time. All 1.x updates. macOS 14+.
      </p>

      <ol className="mt-10 list-decimal space-y-3 pl-5 text-sm text-[var(--fg-muted)]">
        <li>Download and install the app.</li>
        <li>Complete checkout to receive your license key by email.</li>
        <li>Enter the key in {brand.name} settings.</li>
      </ol>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Button href="/api/download" downloadIcon>
          1. Download for macOS
        </Button>
        {checkoutUrl ? (
          <Button href={checkoutUrl} external variant="accent">
            {`2. Buy license · $${brand.price.toFixed(2)}`}
          </Button>
        ) : (
          <p className="flex items-center text-[length:var(--text-body-sm)] text-[var(--fg-dim)]">
            Checkout opens when Stripe or Lemon Squeezy is connected.
          </p>
        )}
      </div>
      <p className="mt-4 text-[length:var(--text-body-sm)] text-[var(--color-stone-gray)]">
        {checkoutUrl
          ? "Download installs the app. Checkout sends your license key by email — both on this page."
          : "Download the app now. License checkout will appear here once payments are connected."}
      </p>

      <p className="mt-10 text-sm text-[var(--fg-dim)]">
        Questions?{" "}
        <a href={`mailto:${brand.supportEmail}`} className="text-link">
          {brand.supportEmail}
        </a>
      </p>
      </div>
    </div>
  );
}
