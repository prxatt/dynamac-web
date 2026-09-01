import type { Metadata } from "next";
import Image from "next/image";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Press",
  alternates: { canonical: `${brand.website}/press` },
};

export default function PressPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <div className="page-card">
      <h1 className="page-title">Press</h1>
      <p className="mt-4 text-[var(--fg-muted)]">{brand.shortDescription}</p>
      <p className="mt-2 text-sm text-[var(--fg-dim)]">{brand.credits}</p>

      <div className="mt-10">
        <figure className="inline-block border border-[var(--border)] p-4">
          <Image
            src="/brand/dynamac-app-icon-1024.png"
            alt=""
            width={200}
            height={200}
            className="rounded-[22%]"
          />
          <figcaption className="mt-3 text-center text-xs text-[var(--fg-dim)]">
            <a href="/brand/dynamac-app-icon-1024.png" download>
              App icon (1024×1024)
            </a>
          </figcaption>
        </figure>
      </div>

      <p className="mt-10 text-sm text-[var(--fg-muted)]">
        Product screenshots: record your own with Screen Studio on a clean desktop,
        then add to <code className="text-[var(--fg-dim)]">public/demos/</code>.
      </p>

      <p className="mt-4 text-sm">
        <a href={`mailto:${brand.supportEmail}`} className="text-link">
          {brand.supportEmail}
        </a>
      </p>
      </div>
    </div>
  );
}
