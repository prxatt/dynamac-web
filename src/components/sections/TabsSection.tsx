import { brand } from "@/lib/brand";
import { AgentLiveCard } from "@/components/demo/AgentLiveCard";
import { TabDemo } from "@/components/demo/TabDemo";

const tabs = [
  { ...brand.tabs.nowPlaying, accent: "var(--red)", mark: "square" as const },
  { ...brand.tabs.intent, accent: "var(--blue)", mark: "circle" as const },
  { ...brand.tabs.shelf, accent: "var(--yellow)", mark: "triangle" as const },
] as const;

function TabMark({ mark, color }: { mark: "square" | "circle" | "triangle"; color: string }) {
  if (mark === "circle") {
    return <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />;
  }
  if (mark === "triangle") {
    return (
      <span
        className="h-0 w-0 shrink-0 border-x-[5px] border-b-[9px] border-x-transparent"
        style={{ borderBottomColor: color }}
      />
    );
  }
  return <span className="h-2.5 w-2.5 shrink-0" style={{ backgroundColor: color }} />;
}

export function TabsSection() {
  return (
    <section id="tabs" className="border-b border-[var(--border)]">
      <div className="mx-auto max-w-[var(--max-width)] px-5 py-20">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-[var(--fg-dim)] uppercase">
          Three tabs
        </p>

        <div className="mt-12 space-y-20">
          {tabs.map((tab, index) => (
            <article
              key={tab.id}
              className={`grid gap-10 lg:grid-cols-2 lg:items-center ${
                index % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div>
                <div className="flex items-center gap-3">
                  <TabMark mark={tab.mark} color={tab.accent} />
                  <h3 className="text-2xl font-bold tracking-tight">{tab.label}</h3>
                </div>
                <p className="mt-4 text-lg text-[var(--fg-muted)]">{tab.copy}</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--fg-dim)]">
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
