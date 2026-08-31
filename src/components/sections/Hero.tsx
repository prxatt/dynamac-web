import { AppIcon } from "@/components/ui/AppIcon";
import { Button } from "@/components/ui/Button";
import { brand } from "@/lib/brand";

export function Hero() {
  return (
    <section className="border-b border-[var(--border)]">
      <div className="mx-auto grid max-w-[var(--max-width)] gap-14 px-5 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <span
              className="flex h-2 w-10 shrink-0 overflow-hidden rounded-sm"
              aria-hidden
            >
              <span className="flex-1 bg-[var(--red)]" />
              <span className="flex-1 bg-[var(--yellow)]" />
              <span className="flex-1 bg-[var(--blue)]" />
            </span>
            <p className="text-[11px] font-medium tracking-[0.12em] text-[var(--fg-dim)] uppercase">
              {brand.platformNote}
            </p>
          </div>

          <h1 className="text-[clamp(2.75rem,5vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.03em]">
            {brand.name}
          </h1>
          <p className="mt-2 text-xl text-[var(--teal)]">{brand.tagline}</p>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--fg-muted)]">
            {brand.shortDescription}
          </p>
          <p className="mt-3 text-sm tracking-wide text-[var(--fg-dim)]">
            {brand.credits}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/api/download">Download for macOS</Button>
            <Button href="/buy" variant="secondary">
              Buy ${brand.price.toFixed(2)}
            </Button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-[260px]">
            <div
              className="mx-auto mb-4 h-7 w-[88px] rounded-b-2xl border border-t-0 border-[var(--border-light)] bg-[var(--bg-panel)]"
              aria-hidden
            />
            <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-panel)] p-10">
              <AppIcon size={180} className="mx-auto h-auto w-full max-w-[180px]" priority />
            </div>
            <div className="mt-5 flex items-center justify-center gap-2.5" aria-hidden>
              <span className="h-2.5 w-2.5 bg-[var(--red)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--blue)]" />
              <span className="h-0 w-0 border-x-[5px] border-b-[9px] border-x-transparent border-b-[var(--yellow)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
