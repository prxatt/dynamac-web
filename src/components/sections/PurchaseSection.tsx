import { Button } from "@/components/ui/Button";
import { brand, getCheckoutUrl } from "@/lib/brand";

export function PurchaseSection() {
  const checkoutUrl = getCheckoutUrl();

  return (
    <section id="buy" className="px-5 pb-[var(--section-gap)]">
      <div className="mx-auto max-w-[var(--max-width)]">
        <div className="max-w-2xl rounded-[var(--radius-cards)] bg-[var(--color-pure-white)] p-8 lg:p-10">
          <h2
            className="font-medium leading-[1.15] tracking-[-0.04em] text-[var(--color-ink-black)]"
            style={{ fontSize: "var(--text-heading)" }}
          >
            ${brand.price.toFixed(2)}, once.
          </h2>
          <p className="mt-4 text-[length:var(--text-body-lg)] text-[var(--color-ink-black)]">
            macOS only. All 1.x updates included. Download the app, then activate
            with your license after purchase.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="/api/download" dot="grass">
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
      </div>
    </section>
  );
}
