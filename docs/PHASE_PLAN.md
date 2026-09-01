# DynaMac site — phase plan

## ELI5: “STS cinematic hero” (not in DynaMac app)

**Surface Tension Studio** is a separate Mac app on your Desktop (`Surface Tension Studio.app`). It is *not* inside DynaMac.

Think of it as a **video workshop**: you record DynaMac with Screen Studio, optionally polish in Studio’s **Compose** tab, then export an MP4 for the website hero.

**Videos you already have** (not on the site yet):

| File | Size | Date |
|------|------|------|
| `~/Desktop/Screen Recording 2026-08-29 at 10.23.09 PM.mov` | 202 MB | Aug 29 |
| `~/Desktop/Screen Recording 2026-08-31 at 12.20.46 AM.mov` | 324 MB | Aug 31 |

`public/demos/` is empty — no hero video shipped yet.

**Optional later:** open Surface Tension Studio → Compose → export with:
`uv run surface-vision media-export scene.json -o out/ --seconds 10`

---

## Phase status

| Phase | What | Status |
|-------|------|--------|
| **1** | Unified `NotchShowcase` — same size, tabs left of notch, music \| agent flanking notch | **In progress** |
| **2** | Tab rows use same showcase (no duplicate layouts) | **In progress** |
| **3** | Glass mode toggle (Liquid / Dark Liquid / Dark) | Done on hero + Shelf |
| **4** | Focus ring animation, light-mode agent (no dark slab) | Done |
| **5** | Footer: $2.99 + character band | Done |
| **6** | STS hero MP4 — pick best Desktop recording, compress, add to `public/demos/hero-loop.mp4` | **Not started** |
| **7** | Stripe + launch (domain, OG image) | Not started |

---

## Design rules (locked)

1. One shell: `NotchShowcase` — hero and all three tab sections.
2. Tabs (Playing · Intent · Shelf) sit **left** of the notch cutout.
3. **Now Playing:** music (wider) \| notch \| agent (narrower).
4. **Intent:** plan · focus ring · todos in **one row**.
5. **Shelf:** AirDrop + thumbnail file list; glass toggle on Shelf.
6. Marketing sandstone polish — **not** a clone of unfinished app UI.
