import { brand } from "@/lib/brand";
import { TabShowcaseDemo } from "@/components/demo/TabShowcaseDemo";
import { TabFeaturePanel } from "@/components/sections/TabFeaturePanel";
import { SectionReveal } from "@/components/motion/SectionReveal";
import type { NotchTabId } from "@/components/notch/notch-styles";
import type { CollageVariant } from "@/lib/collage";

const tabs = [
  {
    ...brand.tabs.nowPlaying,
    accent: "var(--color-accent)",
    mark: "square" as const,
    collage: "now-playing" as CollageVariant,
  },
  {
    ...brand.tabs.intent,
    accent: "var(--color-primary-blue)",
    mark: "circle" as const,
    collage: "intent" as CollageVariant,
  },
  {
    ...brand.tabs.shelf,
    accent: "var(--color-primary-yellow)",
    mark: "triangle" as const,
    collage: "shelf" as CollageVariant,
  },
] as const;

function TabMark({ mark, color }: { mark: "square" | "circle" | "triangle"; color: string }) {
  if (mark === "circle") {
    return <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: color }} />;
  }
  if (mark === "triangle") {
    return (
      <span
        className="h-0 w-0 shrink-0 border-x-[6px] border-b-[10px] border-x-transparent"
        style={{ borderBottomColor: color }}
      />
    );
  }
  return <span className="h-3 w-3 shrink-0" style={{ backgroundColor: color }} />;
}

export function TabsSection() {
  return (
    <section id="tabs" className="overflow-visible px-5 pb-[var(--section-gap)]">
      <div className="mx-auto max-w-[var(--max-width)]">
        <SectionReveal>
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--color-hairline)] pb-6">
            <div>
              <h2
                className="font-display font-medium leading-[1.1] tracking-[-0.03em] text-[var(--color-ink)]"
                style={{ fontSize: "var(--text-heading)" }}
              >
                Three tabs
              </h2>
              <span className="mt-4 block h-1 w-10 bg-[var(--color-accent)]" aria-hidden />
            </div>
            <p className="max-w-sm text-[length:var(--text-body-sm)] leading-relaxed text-[var(--color-muted)]">
              Now Playing, Intent, and Shelf — each with its own rhythm on the notch.
            </p>
          </div>
        </SectionReveal>

        <div className="mt-10 space-y-2 md:mt-14 md:space-y-4">
          {tabs.map((tab, index) => (
            <TabFeaturePanel
              key={tab.id}
              index={index}
              plate={`0${index + 1}`}
              label={tab.label}
              copy={tab.copy}
              detail={tab.detail}
              accent={tab.accent}
              mark={<TabMark mark={tab.mark} color={tab.accent} />}
              collage={tab.collage}
              widget={<TabShowcaseDemo tab={tab.id as NotchTabId} />}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
