import { brand } from "@/lib/brand";
import { AgentLiveCard } from "@/components/demo/AgentLiveCard";
import { TabDemo } from "@/components/demo/TabDemo";

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
    <section id="tabs" className="px-5 pb-[var(--section-gap)]">
      <div className="mx-auto max-w-[var(--max-width)]">
        <h2
          className="font-medium leading-[1.15] tracking-[-0.04em] text-[var(--color-ink-black)]"
          style={{ fontSize: "var(--text-heading)" }}
        >
          Three tabs
        </h2>

        <div className="mt-[var(--spacing-60)] space-y-[var(--section-gap)]">
          {tabs.map((tab, index) => (
            <article
              key={tab.id}
              className={`grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16 ${
                index % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
              }`}
            >
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
                {tab.id === "now-playing" ? (
                  <div className="mt-8">
                    <AgentLiveCard />
                  </div>
                ) : null}
              </div>

              <TabDemo
                label={tab.label}
                demoSrc={tab.demo}
                posterSrc={tab.poster}
                accent={tab.accent}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
