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
    <figure
      className="overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-panel)]"
      aria-label={`${label} preview`}
    >
      <Image
        src={posterSrc}
        alt=""
        width={960}
        height={540}
        className="h-auto w-full"
      />
      <span
        className="sr-only"
        style={{ backgroundColor: accent }}
        aria-hidden
      />
    </figure>
  );
}
