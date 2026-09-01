import { HeroProduct } from "@/components/sections/HeroProduct";

export function Hero() {
  return (
    <section className="relative overflow-visible px-5 pb-[var(--section-gap)] pt-6 sm:pt-8">
      <div className="mx-auto max-w-[var(--max-width)]">
        <HeroProduct />
      </div>
    </section>
  );
}
