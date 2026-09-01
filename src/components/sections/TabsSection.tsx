import { brand } from "@/lib/brand";
import { tabIllustrations } from "@/lib/illustrations";
import { TabShowcaseDemo } from "@/components/demo/TabShowcaseDemo";
import { TabFeaturePanel } from "@/components/sections/TabFeaturePanel";
import { SectionReveal } from "@/components/motion/SectionReveal";
import type { NotchTabId } from "@/components/notch/notch-styles";

const tabs = [
  { ...brand.tabs.nowPlaying, accent: "var(--color-coral-pop)", mark: "square" as const },
  { ...brand.tabs.intent, accent: "var(--color-sky-pop)", mark: "circle" as const },
  { ...brand.tabs.shelf, accent: "var(--color-sunshine-pop)", mark: "triangle" as const },
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
          <h2
            className="font-medium leading-[1.15] tracking-[-0.04em] text-[var(--color-ink-black)]"
            style={{ fontSize: "var(--text-heading)" }}
          >
            Three tabs
          </h2>
          <p className="mt-4 max-w-xl text-[length:var(--text-body-lg)] text-[var(--color-stone-gray)]">
            Now Playing, Intent, and Shelf — each with its own rhythm on the notch.
          </p>
        </SectionReveal>

        <div className="mt-[var(--spacing-60)] space-y-4 md:space-y-8">
          {tabs.map((tab, index) => (
            <TabFeaturePanel
              key={tab.id}
              index={index}
              label={tab.label}
              copy={tab.copy}
              detail={tab.detail}
              accent={tab.accent}
              mark={<TabMark mark={tab.mark} color={tab.accent} />}
              illustration={tabIllustrations[tab.id]!}
              widget={<TabShowcaseDemo tab={tab.id as NotchTabId} />}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
