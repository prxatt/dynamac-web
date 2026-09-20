# DynaMac Web

Marketing site for dynamac.com. Product name: **DynaMac** (display); domain stays dynamac.com.

## Privacy — screenshots

**Never capture the user's desktop, screen, or running apps without explicit permission.**

- Do not run `screencapture`, extract frames from the user's videos, or use browser automation to photograph their screen.
- Safe assets only: files in `public/brand/` copied from the app repo, or screenshots the user adds themselves to `public/demos/`.
- If product UI shots are needed, ask the user to record on a clean desktop or provide files.

## Product facts (do not invent)

- **Free and open source** — no paid license; optional PayPal tip on the site
- **Tabs:** Now Playing · Intent · Shelf
- **Real features only:** music HUD, live agents panel, Intent tab, Shelf
- **Download:** from dynamac.com (`/api/download`) — prefer the signed app over cloning the repo
- **Do not market:** Soen, Glance, Look, Listen, local-first AI, screen read, voice

## Homepage UI

- **Hero:** `NotchProductStage` — live liquid-glass notch mock (product-first). STS video path in `docs/DYNAMAC_HERO_PIPELINE.md`.
- **Tab demos:** `TabShowcaseDemo` → `NotchShowcase` on shelves; Bauhaus Zine collage (`TabCollage`) on desktop only.
- **Mark:** `CollageMark` geometric DNA — not character mascots. Archived PNGs stay in `public/illustrations/_archive/` (`4 leave`).
- **Theme:** `ThemeProvider` + nav toggle (system → light → dark). Tokens in `src/styles/tokens.css`.
- **Springs:** `src/lib/tab-widget-motion.ts`. DialKit only with `NEXT_PUBLIC_DIALKIT=1`.
- **No screenshot posters** on the homepage — live React notch only.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
