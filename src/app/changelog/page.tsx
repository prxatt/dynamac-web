import type { Metadata } from "next";
import Link from "next/link";
import { CollageMark } from "@/components/collage/CollageMark";
import { brand } from "@/lib/brand";
import { fetchReleases } from "@/lib/github";

export const metadata: Metadata = {
  title: "Changelog",
  description: `Release history for ${brand.name} — macOS notch HUD.`,
  alternates: { canonical: `${brand.website}/changelog` },
};

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export default async function ChangelogPage() {
  const releases = await fetchReleases(20);

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
      <div className="page-card">
        <div className="mb-6">
          <CollageMark size={40} animate={false} />
        </div>
        <h1 className="page-title page-title-lg">Changelog</h1>
        <p className="mt-4 text-[length:var(--text-body-lg)] text-[var(--color-muted)]">
          Every {brand.name} release, pulled from{" "}
          <Link
            href={brand.repositoryUrl}
            className="text-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Releases
          </Link>
          .
        </p>

        <div className="mt-12 space-y-0">
          {releases.length > 0 ? (
            releases.map((release, index) => (
              <article
                key={release.tagName}
                className="border-t border-[var(--color-hairline)] py-8 first:border-t-0 first:pt-0 last:pb-0"
              >
                <p className="font-mono text-[10px] tracking-[0.18em] text-[var(--color-muted)]">
                  PLATE {String(index + 1).padStart(2, "0")} · {release.tagName}
                </p>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <h2 className="font-display text-2xl font-medium tracking-tight text-[var(--color-ink)]">
                    {release.name}
                  </h2>
                  <time
                    dateTime={release.publishedAt}
                    className="shrink-0 text-sm text-[var(--color-muted)]"
                  >
                    {formatDate(release.publishedAt)}
                  </time>
                </div>
                <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-relaxed text-[var(--color-muted)]">
                  {release.body || "No release notes provided."}
                </pre>
                <Link
                  href={release.htmlUrl}
                  className="mt-4 inline-block text-sm text-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </Link>
              </article>
            ))
          ) : (
            <div className="mt-8 rounded-[var(--radius-cards)] border border-dashed border-[var(--color-hairline)] bg-[var(--color-canvas)] px-5 py-8">
              <p className="font-mono text-[10px] tracking-[0.18em] text-[var(--color-muted)] uppercase">
                Plate 00 · empty
              </p>
              <p className="mt-3 text-[length:var(--text-body-sm)] text-[var(--color-muted)]">
                No public GitHub releases yet. The app builds from the repo; notes will land here when
                the first tagged release ships.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={brand.repositoryUrl}
                  className="text-link text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open GitHub
                </Link>
                <Link href="/api/download" className="text-link text-sm">
                  Download current build
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
