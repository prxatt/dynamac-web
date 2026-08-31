"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type TabDemoProps = {
  label: string;
  demoSrc: string;
  posterSrc: string;
  accent: string;
};

export function TabDemo({ label, demoSrc, posterSrc, accent }: TabDemoProps) {
  const [hasDemo, setHasDemo] = useState(false);

  useEffect(() => {
    fetch(demoSrc, { method: "HEAD" })
      .then((res) => setHasDemo(res.ok))
      .catch(() => setHasDemo(false));
  }, [demoSrc]);

  if (hasDemo) {
    return (
      <figure className="overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-panel)]">
        <Image
          src={demoSrc}
          alt={`${label} workflow`}
          width={960}
          height={540}
          className="h-auto w-full"
          unoptimized
        />
      </figure>
    );
  }

  return (
    <figure className="overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-panel)]">
      <Image
        src={posterSrc}
        alt={`${label} preview`}
        width={960}
        height={540}
        className="h-auto w-full"
      />
      <figcaption className="border-t border-[var(--border)] px-4 py-2 text-center text-[10px] tracking-wide text-[var(--fg-dim)] uppercase">
        Replace with <code className="text-[var(--fg-muted)]">{demoSrc.replace("/", "")}</code> when ready
      </figcaption>
      <span
        className="sr-only"
        style={{ backgroundColor: accent }}
        aria-hidden
      />
    </figure>
  );
}
