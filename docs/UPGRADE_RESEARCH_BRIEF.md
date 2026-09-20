# DynaMac website — upgrade research brief

**Date:** 2026-09-11  
**Live reference:** https://dynamac.vercel.app/  
**Repo:** `/Users/prattmajmudar/Desktop/dynamac-web` (branch `feat/site-polish`)  
**Product truth:** `PRODUCT.md`  
**Status:** Phase 0 complete — no implementation until MCQ letters + confirmed plan + explicit go.

---

## Objective (locked)

Protect the stunning live notch. Keep clear layout/IA and buy path. Kill sticker/mascot spam. Rebuild color tokens away from AI-default cream/coral. Replace soft illustrative decoration with honest product media. Raise craft to Surface Tension grade. Beauty gate open until user says **beauty approved**.

---

## Environment (verified)

| Path | Role |
| --- | --- |
| `~/Desktop/dynamac-web` | Next.js marketing site (edit here) |
| `~/Desktop/DynaMac` | Native macOS app — **do not casually overwrite** |
| `PRODUCT.md` | Marketable features + Do NOT market list |
| `public/illustrations/` | Character PNGs / sticker sheet / hero-band (~14 MB) |
| `public/textures/cream-paper.jpg` | Tiled paper texture on `body` |
| `public/demos/` | Empty of hero video (README only) |
| `public/brand/` | Honest app icon + menu-bar marks (keep) |

---

## What already works (protect)

1. **Live notch product stage** in hero — interactive Now Playing / Intent / Shelf, glass toggle, agents panel. Strongest asset on the site.
2. **Page IA:** Hero → Three tabs → Buy/footer. Correct narrative length (~45–60s).
3. **Copy spine:** “The notch, working.” + short description + `$2.99 once`.
4. **Buy path:** Get app / License; `PRODUCT.md` constraints honored in brand copy.
5. **App icon geometry** (`Dynamac-Master-1024.png`) — Bauhaus primary marks; better brand DNA than the mascot system.

---

## Failure evidence (live + local)

### 1. Sticker / mascot spam

**Wiring:**
- `TabFeaturePanel` → `TabCharacterScene` → `CharacterFigure` + `FloatingStickers` + `CharacterVfx` + `CutoutBackdrop`
- Footer → `FooterEditorialBand` → `hero-band.png`
- Manifest: `src/lib/illustrations.ts`
- Style lock: `docs/ILLUSTRATION_PROMPTS.md` explicitly asks for “Duolingo × Headspace” sticker cutouts

**Assets (all soft/cartoon, not product):**
- `character-now-playing.png`, `character-intent.jpg`, `character-shelf.png`
- `sticker-props.png` (sphere, sprout, sticky note, triangle, doc, headphones)
- `hero-band.png` (four kid characters + floating props)
- Unused/legacy: `hero-character.png`, `character-intent-poses.png`

**Live evidence (1440):** Tab rows place dancing/thinking kid cutouts beside the notch shelf; floating sticker props + sparkle VFX compete with the real UI. Footer band is a sticker collage. Craft mismatch: notch looks premium; characters look juvenile template.

### 2. AI-default color / material system

`src/styles/tokens.css` + `globals.css`:
- Canvas: `#f5f1e4` cream paper + tiled `cream-paper.jpg` — classic warm-cream AI cluster
- Accent CTA: coral `#ff705d` on Buy / accent buttons
- Pops: grass `#8ed462`, sky `#2ba0ff`, sunshine `#f5e211`
- Comment in tokens: “MindMarket-inspired palette — warm editorial canvas”
- Font: Inter only (generic SaaS default)

Notch chrome (`notch-styles.ts`) reuses the same coral/sky/grass — product accents can stay intentional; **marketing chrome** currently reads pastel/template.

### 3. Bad / dishonest media

- No real desk/Mac photography on site.
- `public/demos/` has no shipped hero MP4.
- Character art is generative/illustration mascot work presented as brand identity.
- Soft multiply/cutout treatment + paper texture further muddies sharpness around the crisp notch.

### 4. Typography & craft mismatch

- Inter + heavy pill radii (`--radius-nav/cards/buttons: 50px`) → soft SaaS chrome around a sharp product demo.
- Hero on live already has good order (platform → headline → notch → tagline → CTAs) after PR #6 direction; protect that.
- Mobile 390: notch is the hero (good); mascots still appear in tab sections below.

### 5. Scope of sticker system in code

| Component | Role |
| --- | --- |
| `FloatingStickers.tsx` | Floating crop of sticker-props |
| `CharacterFigure.tsx` | Cutout character + scroll parallax |
| `TabCharacterScene.tsx` | Scene composer |
| `CharacterVfx.tsx` | Glow / sparkles |
| `CutoutBackdrop.tsx` | Soft organic blobs behind characters |
| `characters/*.tsx` | Extra SVG mascots (Music/Calendar/Files) |
| `FooterEditorialBand.tsx` | hero-band collage |
| `ScrollCharacter.tsx` | Scroll-linked character motion |

---

## Product story (do not rewrite)

- **Who:** Mac notch / menu-bar power users  
- **What:** DynaMac = Now Playing · Intent · Shelf  
- **Why:** those three jobs stay one gesture away  
- **Price:** $2.99 once  
- **Not:** AI chatbot, sticker brand, fake metrics, Soen/Glance/etc. (`PRODUCT.md`)

---

## Recommended fix order (post-decision)

1. **Retire stickers** from homepage + footer (archive assets; stop importing scenes).
2. **Rebuild tokens** — canvas / ink / muted / one decisive accent / glass / hairlines — document in `BEAUTY_DECISION.md`.
3. **Media:** elevate live notch; optional honest photography only if chosen in MCQ; no fake product shots.
4. **Type / spacing / motion restraint** without changing IA.
5. **Visual QA** at 1440 / 768 / 390 with screenshots + overlap checks.

---

## Open decisions → see Phase 1 MCQs in chat

Letters required before writing implementation plan or any UI code.
