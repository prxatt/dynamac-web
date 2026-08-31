import { brand } from "@/lib/brand";
import { TabDemo } from "@/components/demo/TabDemo";
import { FadeIn } from "@/components/motion/FadeIn";

const tabs = [
  { ...brand.tabs.nowPlaying, markClass: "home-tab-mark--red" },
  { ...brand.tabs.intent, markClass: "home-tab-mark--blue" },
  { ...brand.tabs.shelf, markClass: "home-tab-mark--yellow" },
] as const;

export function TabsSection() {
  return (
    <section id="tabs" className="home-section home-section--tabs">
      <div className="mx-auto max-w-[var(--max-width)] px-5 py-20 lg:py-24">
        <FadeIn>
          <p className="home-section__label home-section__label--teal">
            Three tabs
          </p>
        </FadeIn>

        <div className="mt-14 space-y-24">
          {tabs.map((tab, index) => (
            <FadeIn key={tab.id} delay={index * 0.06}>
              <article
                className={`grid gap-10 lg:grid-cols-2 lg:items-center ${
                  index % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className={`home-tab-mark ${tab.markClass}`} />
                    <h3 className="text-2xl font-semibold tracking-tight">{tab.label}</h3>
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
                  accent={tab.markClass.includes("red") ? "var(--red)" : tab.markClass.includes("blue") ? "var(--blue)" : "var(--yellow)"}
                />
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
