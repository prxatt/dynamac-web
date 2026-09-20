# Implementation plan — DynaMac craft rebuild

**Depends on:** letters `1A 2C 3D 4C +90s 5C 6C` (locked in `BEAUTY_DECISION.md`)  
**Gate:** Wait for user `plan ok` then `go`. No commit/deploy unless `G` / `H`.  
**Beauty gate:** Open until user says `beauty approved`.

---

## North star

A Surface Tension product studio site (editorial dark + light companion): the **live notch is the light**, Bauhaus red is the only marketing shout, and a **90s print-shop collage** of geometric die-cuts / product icons replaces kid mascots — expressive, product-true, not AI sticker spam.

---

## Collage system (new — replaces mascots)

### What “90s stickers” means here

Not cartoon children. **Die-cut graphic stickers**: flat primaries, thick registration, slight print misregistration, product glyphs (headphones silhouette, calendar grid, stacked files, notch capsule), as if a Bauhaus zine mailed a sticker sheet for DynaMac.

### Dialect options (pick one with plan ok — recommend **BZ**)

| Code | Dialect | Feel |
| --- | --- | --- |
| **BZ** | **Bauhaus Zine** (recommended) | Icon DNA shapes + crop marks + CMYK-ish plates on dark ground; tab rows get a composed collage panel beside the notch shelf |
| **DT** | Desktop ’96 | Flat folder / window / menu glyphs (no Apple hardware photos); denser icon grid |
| **RG** | Ray Gun print | Torn color slabs, heavy type fragments, aggressive overlap |

All dialects share rules:
1. Built in **SVG/CSS** from tokens (scalable, sharp) — optional PNG exports later
2. Never covers the live notch interaction
3. No faces / kids / soft AI illustration
4. Respects `prefers-reduced-motion` (static collage if reduced)

### Where collage appears

| Surface | Treatment |
| --- | --- |
| Hero | Quiet geometric **mark** only (4C) — capsule + circle + bar from icon; no busy collage above the fold |
| Tab rows | **TabCollage** per tab (Now Playing / Intent / Shelf) instead of `TabCharacterScene` |
| Footer | Horizontal **collage strip** (replaces `hero-band.png`) |
| Buy / press / support | Small die-cut accents / marks only — full token cascade, light collage |

---

## Chunks (execute in order after go)

### Chunk 1 — Unwire mascots + archive assets
- Stop importing character/sticker components from `TabFeaturePanel`, `TabsSection`, `Footer`
- Move PNGs to `public/illustrations/_archive/`
- Update `ASSET_LICENSES.md` + `illustrations.ts`
- Leave layout as notch-forward until collage lands in chunk 3
- **Verify:** build; homepage has zero kid characters

### Chunk 2 — Dark token cascade (full site)
- Rebuild `tokens.css` + `globals.css` per `BEAUTY_DECISION.md`
- Drop cream paper texture
- Remap coral → Bauhaus red; sandstone shelf → dark elevated
- Typography: ship Space Grotesk (display) + IBM Plex Sans (body) via `next/font`
- Pass all routes: home, buy, support, press, privacy, changelog, pro
- **Verify:** screenshots 1440 / 390 — contrast, no cream bleed

### Chunk 3 — Collage + geometric mark system
- Add `CollageMark`, `TabCollage`, die-cut icon set (SVG)
- Wire into tab panels + footer strip
- Expressive motion: staggered layer entrances, subtle parallax; reduced-motion = static
- **Verify:** collage reads 90s/print, not Memphis spam; notch still king

### Chunk 4 — Chrome craft (nav, hero, shelves, CTAs)
- Nav on dark elevated glass; Buy = accent red
- Hero: protect order (platform → headline → notch → tagline → CTAs)
- `NotchShelfStage` dark shelf; kill cream gradients
- Radius restraint where marketing felt “pill SaaS” — keep product-true notch radii
- **Verify:** desktop + mobile overlap / clip checks

### Chunk 5 — Secondary pages + motion polish
- Buy / support / press / privacy / changelog visual pass under new tokens
- Section motion expressive but product-led
- **Verify:** full-site screenshot pass

### Chunk 6 — Beauty gate
- Iterate on user letters `A` / `E` / `F` until **`beauty approved`**
- Media follow-up (3D): desk photo / hero MP4 — **out of this ship** unless asked

---

## Explicit non-goals (this pass)

- No Swift / native app edits
- No inventing Apple hardware photography
- No fake metrics / testimonials / Do-NOT-market features
- No commit/deploy unless asked
- No returning archived kid stickers

---

## Acceptance (must all be true)

1. Five-second test: Mac notch HUD — music, day, agents/files — $2.99 once
2. Zero kid/mascot characters on marketing surfaces
3. Dark intentional tokens; no cream/coral AI template
4. 90s collage = geometric/product die-cuts, sharp
5. Live notch remains centerpiece and interactive
6. Full-site token cascade
7. Desktop + mobile screenshots prove craft
8. `PRODUCT.md` honored
9. User: **beauty approved**

---

## Reply to unlock build

1. Collage dialect: **`BZ`** (recommended) / `DT` / `RG`  
2. **`plan ok`**  
3. **`go`**
