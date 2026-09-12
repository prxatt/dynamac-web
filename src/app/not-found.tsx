import type { Metadata } from "next";
import Link from "next/link";
import { CollageMark } from "@/components/collage/CollageMark";
import { Button } from "@/components/ui/Button";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col px-5 py-16 sm:py-24">
      <div className="page-card text-center">
        <div className="mb-6 flex flex-col items-center gap-3">
          <CollageMark size={48} animate={false} />
          <p className="font-mono text-[10px] tracking-[0.18em] text-[var(--color-muted)] uppercase">
            Plate 404
          </p>
        </div>
        <h1 className="page-title page-title-lg">Off the shelf.</h1>
        <p className="mx-auto mt-4 max-w-md text-[length:var(--text-body-lg)] text-[var(--color-muted)]">
          That page is not in {brand.name}. Head home for the live notch, or grab the app.
        </p>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Button href="/" className="w-full sm:w-auto" dot="none">
            Back home
          </Button>
          <Button href="/api/download" downloadIcon variant="outline" className="w-full justify-center sm:w-auto">
            Download for macOS
          </Button>
        </div>
        <p className="mt-8 text-sm text-[var(--color-muted)]">
          Or{" "}
          <Link href="/buy" className="text-link">
            buy a license
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
