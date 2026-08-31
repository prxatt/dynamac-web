import { brand } from "@/lib/brand";
import { AgentLiveCard } from "@/components/demo/AgentLiveCard";
import { IntentLiveCard } from "@/components/demo/IntentLiveCard";
import { ShelfLiveCard } from "@/components/demo/ShelfLiveCard";
import { CalendarCharacter } from "@/components/illustrations/characters/CalendarCharacter";
import { FilesCharacter } from "@/components/illustrations/characters/FilesCharacter";
import { MusicCharacter } from "@/components/illustrations/characters/MusicCharacter";
import { ScrollCharacter } from "@/components/illustrations/ScrollCharacter";
import { SectionReveal } from "@/components/motion/SectionReveal";

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

function TabWidget({ id }: { id: string }) {
  if (id === "now-playing") return <AgentLiveCard />;
  if (id === "intent") return <IntentLiveCard />;
  if (id === "shelf") return <ShelfLiveCard />;
  return null;
}

function TabCharacter({ id }: { id: string }) {
  const className = "h-auto w-full";

  if (id === "now-playing") return <MusicCharacter className={className} />;
  if (id === "intent") return <CalendarCharacter className={className} />;
  if (id === "shelf") return <FilesCharacter className={className} />;
  return null;
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
        </SectionReveal>

        <div className="mt-[var(--spacing-60)] space-y-[var(--section-gap)]">
          {tabs.map((tab, index) => {
            const characterSide = index % 2 === 0 ? "right" : "left";

            return (
              <div
                key={tab.id}
                className={`flex items-center gap-10 lg:gap-16 ${
                  characterSide === "left" ? "lg:flex-row-reverse" : ""
                }`}
              >
                <SectionReveal className="max-w-2xl flex-1">
                  <article>
                    <div className="rounded-[var(--radius-cards)] bg-[var(--color-pure-white)] p-[var(--card-padding)] lg:p-8">
                      <div className="flex items-center gap-3">
                        <TabMark mark={tab.mark} color={tab.accent} />
                        <h3
                          className="font-medium tracking-tight text-[var(--color-ink-black)]"
                          style={{ fontSize: "var(--text-heading-sm)" }}
                        >
                          {tab.label}
                        </h3>
                      </div>
                      <p className="mt-4 text-[length:var(--text-body-lg)] text-[var(--color-ink-black)]">
                        {tab.copy}
                      </p>
                      <p className="mt-3 text-[length:var(--text-body-sm)] leading-relaxed text-[var(--color-stone-gray)]">
                        {tab.detail}
                      </p>
                      <div className="mt-8">
                        <TabWidget id={tab.id} />
                      </div>
                    </div>
                  </article>
                </SectionReveal>

                <ScrollCharacter side={characterSide}>
                  <TabCharacter id={tab.id} />
                </ScrollCharacter>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
