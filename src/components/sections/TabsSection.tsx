import { brand } from "@/lib/brand";
import { TabDemo } from "@/components/demo/TabDemo";
import { FadeIn } from "@/components/motion/FadeIn";

const tabs = [
  { ...brand.tabs.nowPlaying, mark: "var(--red)" },
  { ...brand.tabs.intent, mark: "var(--blue)" },
  { ...brand.tabs.shelf, mark: "var(--yellow)" },
] as const;

export function TabsSection() {
  return (
    <section id="tabs" className="border-b border-[var(--border)]">
      <div className="mx-auto max-w-[var(--max-width)] px-5 py-20">
        <FadeIn>
          <h2 className="text-sm font-semibold tracking-[0.12em] text-[var(--fg-dim)] uppercase">
            Three tabs
          </h2>
        </FadeIn>

        <div className="mt-12 space-y-20">
          {tabs.map((tab, index) => (
            <FadeIn key={tab.id} delay={index * 0.06}>
              <article
                className={`grid gap-10 lg:grid-cols-2 lg:items-center ${
                  index % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: tab.mark }}
                    />
                    <h3 className="text-2xl font-bold">{tab.label}</h3>
                  </div>
                  <p className="mt-4 text-lg text-[var(--fg-muted)]">{tab.copy}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--fg-dim)]">
                    {tab.detail}
                  </p>
                </div>

                <TabDemo
                  label={tab.label}
                  demoSrc={tab.demo}
                  posterSrc={tab.poster}
                  accent={tab.mark}
                />
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
