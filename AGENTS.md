# DynaMac Web

Marketing site for dynamac.com. Product name: **DynaMac** (display); domain stays dynamac.com.

## Privacy — screenshots

**Never capture the user's desktop, screen, or running apps without explicit permission.**

- Do not run `screencapture`, extract frames from the user's videos, or use browser automation to photograph their screen.
- Safe assets only: files in `public/brand/` copied from the app repo, or screenshots the user adds themselves to `public/demos/`.
- If product UI shots are needed, ask the user to record on a clean desktop or provide files.

## Product facts (do not invent)

- **Paid app** — $2.99 one-time. No free tier.
- **Tabs:** Now Playing · Intent · Shelf
- **Real features only:** music HUD, live agents panel, Intent tab, Shelf
- **Do not market:** Soen, Glance, Look, Listen, local-first AI, screen read, voice

## Homepage UI

- **Tab demos:** `NowPlayingLiveCard`, `IntentLiveCard`, `ShelfLiveCard` — dark `NotchShell` mocks matching the app UI
- **Illustrations:** `public/illustrations/*.png` — GPT-generated characters; prompts in `docs/ILLUSTRATION_PROMPTS.md`
- **Hero:** `NotchProductStage` — animated liquid-glass notch mock (product-first). STS video upgrade path in `docs/DYNAMAC_HERO_PIPELINE.md`. Character `hero-band` in footer.
- **Springs:** shared defaults in `src/lib/tab-widget-motion.ts`; DialKit panel only in `npm run dev`
- **No screenshot posters** on the homepage — live React cards only

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
