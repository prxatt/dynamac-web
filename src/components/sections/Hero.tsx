import { AppIcon } from "@/components/ui/AppIcon";
import { Button } from "@/components/ui/Button";
import { brand } from "@/lib/brand";

export function Hero() {
  return (
    <section className="px-5 pb-[var(--section-gap)] pt-10">
      <div className="mx-auto grid max-w-[var(--max-width)] gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
        <div>
          <p className="text-[length:var(--text-body-sm)] font-medium text-[var(--color-stone-gray)]">
            {brand.platformNote}
          </p>

          <h1
            className="mt-6 font-medium leading-[0.95] tracking-[-0.06em] text-[var(--color-ink-black)]"
            style={{ fontSize: "var(--text-display)" }}
          >
            {brand.name}
          </h1>
          <p className="mt-4 text-[length:var(--text-subheading)] font-medium text-[var(--color-ink-black)]">
            {brand.tagline}
          </p>
          <p className="mt-6 max-w-lg text-[length:var(--text-body-lg)] leading-relaxed text-[var(--color-ink-black)]">
            {brand.shortDescription}
          </p>
          <p className="mt-4 text-[length:var(--text-body-sm)] text-[var(--color-stone-gray)]">
            {brand.credits}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Button href="/api/download" dot="sky">
              Download for macOS
            </Button>
            <Button href="/buy" variant="secondary">
              Buy ${brand.price.toFixed(2)}
            </Button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-[300px]">
            <div
              className="mx-auto mb-4 h-8 w-[96px] rounded-b-[20px] border border-t-0 border-[var(--color-fresh-grass)] bg-[var(--color-pure-white)]"
              aria-hidden
            />
            <div className="rounded-[var(--radius-cards)] bg-[var(--color-pure-white)] p-12">
              <AppIcon size={200} className="mx-auto h-auto w-full max-w-[200px]" priority />
            </div>
            <div className="mt-6 flex items-center justify-center gap-3" aria-hidden>
              <span className="h-3 w-3 bg-[var(--color-coral-pop)]" />
              <span className="h-3 w-3 rounded-full bg-[var(--color-sky-pop)]" />
              <span className="h-0 w-0 border-x-[6px] border-b-[10px] border-x-transparent border-b-[var(--color-sunshine-pop)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
