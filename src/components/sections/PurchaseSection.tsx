import { Button } from "@/components/ui/Button";
import { brand, getCheckoutUrl } from "@/lib/brand";

export function PurchaseSection() {
  const checkoutUrl = getCheckoutUrl();

  return (
    <section id="buy" className="home-section home-section--purchase">
      <div className="mx-auto max-w-[var(--max-width)] px-5 py-20 lg:py-24">
        <p className="home-section__label home-section__label--red">
          Purchase
        </p>
        <h2 className="mt-6 text-[clamp(2.5rem,5vw,3.5rem)] font-semibold tracking-tight">
          ${brand.price.toFixed(2)}, once.
        </h2>
        <p className="mt-4 max-w-lg text-[var(--fg-muted)]">
          macOS only. All 1.x updates included. Download the app, then activate
          with your license after purchase.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
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
