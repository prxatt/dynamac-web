import { brand } from "@/lib/brand";
import { AgentLiveCard } from "@/components/demo/AgentLiveCard";
import { IntentLiveCard } from "@/components/demo/IntentLiveCard";
import { ShelfLiveCard } from "@/components/demo/ShelfLiveCard";

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

export function TabsSection() {
  return (
    <section id="tabs" className="px-5 pb-[var(--section-gap)]">
      <div className="mx-auto max-w-[var(--max-width)]">
        <h2
          className="font-medium leading-[1.15] tracking-[-0.04em] text-[var(--color-ink-black)]"
          style={{ fontSize: "var(--text-heading)" }}
        >
          Three tabs
        </h2>

        <div className="mt-[var(--spacing-60)] space-y-[var(--section-gap)]">
          {tabs.map((tab) => (
            <article key={tab.id} className="max-w-2xl">
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
          ))}
        </div>
      </div>
    </section>
  );
}
