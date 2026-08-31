import { Button } from "@/components/ui/Button";
import { brand } from "@/lib/brand";
import { HeroScrollAccent, HeroVisual } from "@/components/sections/HeroMotion";

export function Hero() {
  return (
    <section className="relative overflow-visible px-5 pb-[var(--section-gap)] pt-10">
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

        <HeroVisual />
      </div>
      <HeroScrollAccent />
    </section>
  );
}
