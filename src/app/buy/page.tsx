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
      <h1 className="text-3xl font-bold">Buy {brand.name}</h1>
      <p className="mt-4 text-lg text-[var(--fg-muted)]">
        ${brand.price.toFixed(2)} one-time. All 1.x updates. macOS 14+.
      </p>

      <ol className="mt-10 list-decimal space-y-3 pl-5 text-sm text-[var(--fg-muted)]">
        <li>Download and install the app.</li>
        <li>Complete checkout to receive your license key by email.</li>
        <li>Enter the key in {brand.name} settings.</li>
      </ol>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="/api/download">1. Download for macOS</Button>
        {checkoutUrl ? (
          <Button href={checkoutUrl} external variant="secondary">
            2. Checkout
          </Button>
        ) : (
          <p className="flex items-center text-sm text-[var(--fg-dim)]">
            Checkout opens when Stripe or Lemon Squeezy is connected.
          </p>
        )}
      </div>

      <p className="mt-10 text-sm text-[var(--fg-dim)]">
        Questions?{" "}
        <a href={`mailto:${brand.supportEmail}`} className="text-[var(--teal)]">
          {brand.supportEmail}
        </a>
      </p>
    </div>
  );
}
