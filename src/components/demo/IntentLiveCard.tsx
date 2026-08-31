"use client";

import { TabWidgetCard } from "@/components/demo/TabWidgetCard";

const events = [
  { title: "Design review", time: "2:00 PM", color: "var(--color-sky-pop)" },
  { title: "Ship DynaMac 0.44", time: "4:30 PM", color: "var(--color-coral-pop)" },
] as const;

const todos = [
  { title: "Record tab demos", done: false },
  { title: "Wire Stripe checkout", done: true },
] as const;

const scopes = ["Today", "Week", "Month"] as const;

export function IntentLiveCard() {
  return (
    <TabWidgetCard dialKitName="Intent Card" hoverBorderColor="var(--color-sky-pop)">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <div>
          <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--color-stone-gray)]">
            Plan
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            {scopes.map((scope, index) => (
              <span
                key={scope}
                className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                  index === 0
                    ? "bg-[var(--color-pure-white)] text-[var(--color-ink-black)]"
                    : "text-[var(--color-stone-gray)]"
                }`}
              >
                {scope}
              </span>
            ))}
          </div>
          <ul className="mt-3 space-y-2">
            {events.map((event) => (
              <li
                key={event.title}
                className="flex items-center gap-2 rounded-[var(--radius-small)] bg-[var(--color-pure-white)] px-3 py-2"
              >
                <span
                  className="h-4 w-1 shrink-0 rounded-full"
                  style={{ backgroundColor: event.color }}
                  aria-hidden
                />
                <span className="min-w-0 flex-1 truncate text-[length:var(--text-body-sm)] font-medium text-[var(--color-ink-black)]">
                  {event.title}
                </span>
                <span className="shrink-0 text-[11px] text-[var(--color-stone-gray)]">
                  {event.time}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden w-px bg-[var(--color-hairline-mist)] sm:block" aria-hidden />

        <div>
          <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--color-stone-gray)]">
            Focus
          </p>
          <div className="mt-2 flex items-center gap-3">
            <span className="rounded-full border border-[var(--color-hairline-mist)] bg-[var(--color-pure-white)] px-3 py-1 text-[11px] font-medium text-[var(--color-ink-black)]">
              Focus
            </span>
            <span className="font-mono text-[length:var(--text-subheading)] font-medium tabular-nums text-[var(--color-ink-black)]">
              25:00
            </span>
          </div>
          <p className="mt-4 text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--color-stone-gray)]">
            To-do
          </p>
          <ul className="mt-2 space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.title}
                className="flex items-center gap-2 rounded-[var(--radius-small)] bg-[var(--color-pure-white)] px-3 py-2"
              >
                <span
                  className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border ${
                    todo.done
                      ? "border-[var(--color-fresh-grass)] bg-[var(--color-fresh-grass)]"
                      : "border-[var(--color-stone-gray)]"
                  }`}
                  aria-hidden
                >
                  {todo.done ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-pure-white)]" />
                  ) : null}
                </span>
                <span
                  className={`truncate text-[length:var(--text-body-sm)] ${
                    todo.done
                      ? "text-[var(--color-stone-gray)] line-through"
                      : "font-medium text-[var(--color-ink-black)]"
                  }`}
                >
                  {todo.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </TabWidgetCard>
  );
}
