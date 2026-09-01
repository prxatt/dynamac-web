import type { Metadata } from "next";
import Link from "next/link";
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
  }).format(new Date(iso));
}

export default async function ChangelogPage() {
  const releases = await fetchReleases(20);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
      <h1 className="page-title page-title-lg">Changelog</h1>
      <p className="mt-4 text-[var(--fg-muted)]">
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

      <div className="mt-12 space-y-10">
        {releases.length > 0 ? (
          releases.map((release) => (
            <article
              key={release.tagName}
              className="border-b border-[var(--border-subtle)] pb-10 last:border-b-0"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <h2 className="font-display text-2xl font-semibold text-[var(--fg)]">
                  {release.name}
                </h2>
                <time
                  dateTime={release.publishedAt}
                  className="text-sm text-[var(--fg-subtle)]"
                >
                  {formatDate(release.publishedAt)}
                </time>
              </div>
              <pre className="mt-4 whitespace-pre-wrap font-body text-sm leading-relaxed text-[var(--fg-muted)]">
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
          <p className="text-sm text-[var(--fg-muted)]">
            No releases found. Check back after the next GitHub release.
          </p>
        )}
      </div>
    </div>
  );
}
