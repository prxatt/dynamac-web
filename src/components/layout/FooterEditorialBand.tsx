import Image from "next/image";
import { illustrations } from "@/lib/illustrations";

export function FooterEditorialBand() {
  return (
    <div className="mt-12 overflow-hidden rounded-[var(--radius-cards)] border border-[var(--color-hairline-mist)]">
      <Image
        src={illustrations.heroBand}
        alt="DynaMac — Now Playing, Intent, and Shelf"
        width={2400}
        height={900}
        className="h-auto w-full"
        sizes="(max-width: 1200px) 100vw, 1200px"
      />
    </div>
  );
}
