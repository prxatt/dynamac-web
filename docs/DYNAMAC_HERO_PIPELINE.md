# DynaMac hero — product-first pipeline

## Decision

**Hero sells the product** (notch HUD, tabs, live UI). **Characters are editorial footer** — warmth and brand, not the pitch.

The homepage hero is a live `NotchProductStage` React mock. Surface Tension Studio upgrades it to cinematic video / spatial card when ready.

---

## Surface Tension Studio — what we can use

Local app: `~/Desktop/surface-tension-studio/` (also `Surface Tension Studio.app`).

| STS tool | Use for DynaMac hero | Output |
|----------|---------------------|--------|
| **Compose → media-export** | Keyframed notch reveal, tab cycle, menu-bar context | `video.mp4` 1920×1080 |
| **Holographic Card** | Parallax diorama from a notch screenshot | USDZ, GLB, embeddable `<surface-card>` |
| **Effects** | Stylized stills (dither/halftone) from captures | PNG |
| **Depth Sense** | Living-photo depth on a Screen Studio clip | 2.5D playback loop |
| **Image → 3D** | MacBook / prop meshes for Compose scenes | GLB |

### Recommended STS workflow (Phase 2)

1. **Capture** — Screen Studio: 10s loop of real DynaMac (Now Playing → Intent → Shelf). Save to `~/Movies/dynamac-hero.mov`.
2. **Still** — Export hero frame at 2560×1440 for Holographic Card input.
3. **Compose** — Build `dynamac-hero.scene.json` with menu bar matte, notch chrome, optional orbit camera.
4. **Render**:
   ```bash
   cd ~/Desktop/surface-tension-studio
   uv run surface-studio-server   # terminal 1
   uv run surface-vision media-export dynamac-hero.scene.json \
     -o ~/Desktop/dynamac-hero/ --seconds 10 --viewport desktop
   ```
5. **Ship** — Drop `public/demos/hero-loop.mp4` + poster `hero-poster.webp`; wire in `NotchProductStage` as `<video>` fallback.

### Holographic Card embed (Phase 3)

After card job completes in `~/.surface-studio/assets/<id>/`:

- Copy `surface-card.js` + `card.json` + planes to `public/holo/`
- Embed on hero for inspect-mode parallax (Vision Pro / Quick Look USDZ optional)

---

## Phase 1 (shipped in code)

- `NotchProductStage` — live dark liquid-glass notch mock, auto tab cycle, spring transitions
- Characters moved to `FooterEditorialBand` (`hero-band.png`)
- Tab sections keep per-tab character scenes + live widgets

---

## What not to market via STS

Per `PRODUCT.md`: no Soen, Glance, screen-read, or invented AI. Hero shows **Now Playing · Intent · Shelf** only.
