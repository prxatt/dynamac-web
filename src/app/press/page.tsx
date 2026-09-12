import type { Metadata } from "next";
import Image from "next/image";
import { CollageMark } from "@/components/collage/CollageMark";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Press",
  description: `Press kit for ${brand.name} by ${brand.company}.`,
  alternates: { canonical: `${brand.website}/press` },
};

export default function PressPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:py-16">
      <div className="page-card">
        <div className="mb-6">
          <CollageMark size={40} animate={false} />
        </div>
        <h1 className="page-title">Press</h1>
        <p className="mt-4 text-[length:var(--text-body-lg)] text-[var(--color-muted)]">
          {brand.shortDescription}
        </p>
        <p className="mt-2 text-sm text-[var(--color-muted)]">{brand.credits}</p>

        <div className="mt-10 flex flex-wrap gap-6">
          <figure className="inline-block rounded-[var(--radius-cards)] border border-[var(--color-hairline)] bg-[var(--color-canvas-elevated)] p-4 shadow-[3px_3px_0_var(--color-pure-ink)]">
            <div className="rounded-[22%] bg-[#ecece8] p-2">
              <Image
                src="/brand/dynamac-app-icon-1024.png"
                alt={`${brand.name} app icon`}
                width={160}
                height={160}
                className="rounded-[22%]"
              />
            </div>
            <figcaption className="mt-3 text-center text-xs text-[var(--color-muted)]">
              <a href="/brand/dynamac-app-icon-1024.png" download className="text-link">
                App icon · 1024×1024
              </a>
            </figcaption>
          </figure>
          <figure className="inline-flex flex-col items-center justify-center rounded-[var(--radius-cards)] border border-[var(--color-hairline)] bg-[var(--color-canvas-elevated)] px-8 py-6 shadow-[3px_3px_0_var(--color-pure-ink)]">
            <div
              data-theme="light"
              className="flex h-[160px] w-[160px] items-center justify-center rounded-[22%] bg-[#ecece8]"
            >
              <CollageMark size={72} animate={false} />
            </div>
            <figcaption className="mt-4 text-center text-xs text-[var(--color-muted)]">
              Geometric mark · live SVG
            </figcaption>
          </figure>
        </div>

        <div className="mt-10 rounded-[var(--radius-cards)] border border-dashed border-[var(--color-hairline)] bg-[var(--color-canvas)] px-5 py-6">
          <p className="font-mono text-[10px] tracking-[0.18em] text-[var(--color-muted)] uppercase">
            Product shots
          </p>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Honest captures only — record on a clean desktop, then drop files in{" "}
            <code className="text-[var(--color-ink)]">public/demos/</code>. No stock UI, no AI
            mockups. Until then, the live notch on the homepage is the reference.
          </p>
        </div>

        <p className="mt-4 text-sm">
          <a href={`mailto:${brand.supportEmail}`} className="text-link">
            {brand.supportEmail}
          </a>
        </p>
      </div>
    </div>
  );
}
