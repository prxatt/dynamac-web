import { Button } from "@/components/ui/Button";
import { brand, getCheckoutUrl } from "@/lib/brand";

export function PurchaseSection() {
  const checkoutUrl = getCheckoutUrl();

  return (
    <section id="buy" className="border-t border-[var(--border)]">
      <div className="mx-auto max-w-[var(--max-width)] px-5 py-20">
        <h2 className="text-3xl font-bold tracking-tight">
          ${brand.price.toFixed(2)}, once.
        </h2>
        <p className="mt-3 max-w-lg text-[var(--fg-muted)]">
          macOS only. All 1.x updates included. Download the app, then activate
          with your license after purchase.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/api/download">Download for macOS</Button>
          {checkoutUrl ? (
            <Button href={checkoutUrl} external variant="secondary">
              Buy license
            </Button>
          ) : (
            <Button href="/buy" variant="secondary">
              Buy license
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
