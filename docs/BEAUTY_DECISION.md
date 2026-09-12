# Beauty decisions — DynaMac marketing upgrade

**Status:** Craft ready for beauty review. Beauty gate **OPEN** until user says `beauty approved`. Local: http://localhost:3000/

## Locked letters

| # | Letter | Decision |
| --- | --- | --- |
| 1 | **A** | Editorial dark (now also light companion theme) |
| 2 | **C** | Bauhaus red `#d01020` |
| 3 | **D** | Notch now; photo/video later |
| 4 | **C** + 90s | Geometric mark + Bauhaus Zine die-cuts |
| 5 | **C** | Full site token cascade |
| 6 | **C** | Expressive, product-led motion |
| Collage | **BZ** | Bauhaus Zine (`BT` → BZ) |

## Expanded pass bar (user 2026-09-11)

Must all be true before beauty approval:

| # | Requirement | Evidence | Status |
| --- | --- | --- | --- |
| 1 | Light **and** dark mode (system + manual toggle) | `ThemeProvider` + `ThemeToggle` + `tokens.css`; FOUC `ThemeInitScript` | **shipped** |
| 2 | Mobile / tablet / desktop | ShowcaseFrame scale; collage `lg` only; mobile plate glyphs; License CTA from `md` | **shipped** |
| 3 | Privacy + terms + support craft | `/privacy` `/terms` `/support` page-cards | **shipped** |
| 4 | Analytics / payments / download documented | `docs/SECURITY_AND_DATA.md`; Plausible; `/api/download` | **shipped** |
| 5 | Security headers + CSP | `next.config.ts` | **shipped** |
| 6 | Visual craft at Surface Tension grade | Live notch + liquid glass; Bauhaus site chrome; collage; no mascots; craft-floor tracking/grain clean; muted contrast ≥5:1; focus rings | **ready for review** |
| 7 | User says **beauty approved** | — | **open — blocking** |

## Plan chunks (UPGRADE_IMPLEMENTATION_PLAN)

| Chunk | Status |
| --- | --- |
| 1 Unwire mascots + archive | **done** |
| 2 Token cascade + fonts | **done** (Space Grotesk + IBM Plex Sans) |
| 3 Collage + CollageMark | **done** (BZ) |
| 4 Chrome craft | **done** |
| 5 Secondary + motion | **done** |
| 6 Beauty gate | **waiting on user** |

## Objective checklist

| Objective | Evidence |
| --- | --- |
| Protect live notch | `NotchProductStage` / `NotchShowcase` — soft `--radius-glass` + liquid material |
| Keep layout/IA | Hero → Three tabs → footer buy band; secondary page-cards |
| Refine color | Dual theme tokens; Bauhaus red `#d01020`; triad accents |
| Kill stickers/mascots | Live assets only under `_archive/`; `CollageMark` + die-cuts |
| Honest product media | Live React notch only (decision D); no AI posters |
| ST craft | Bauhaus radii on chrome; liquid glass on product; springs on tab switch |

## Post letters (when ready)

- `beauty approved` — close gate
- `A` more craft · `E` simplify · `F` more motion
- `G` commit · `H` commit+push
- `4 leave` keep archived stickers out

## Craft notes (latest)

- Mascot PNGs only under `public/illustrations/_archive/` (`4 leave`); no live imports
- Hero: **brand-forward** CollageMark + wordmark + Bauhaus red rule → headline → live notch → copy/CTAs
- Headline scaled so brand remains a first-viewport signal
- Glass follows site theme; toggle is quiet mono chrome
- Notch cutout pulse is physical scale only (no red glow soup)
- CTA: Download for macOS + outlined **License · $2.99 once** (not underline link)
- Intent demo categories remapped to Bauhaus triad (no purple hobby fill)
- Atmosphere: accent + blue + yellow triad glows
- Mobile hero notch full-bleed; ShowcaseFrame height floor
- Motion: transform-only enters
- Branded `not-found` plate; changelog empty state honest about private/missing releases
- Dead `PurchaseSection` removed (footer buy band is the purchase surface)
- Nav uses `CollageMark` (Bauhaus DNA) instead of raster app icon
- Theme FOUC via client `ThemeInitScript` (Next preventing-flash pattern); glass state SSR-stable
- Dev hydration issues cleared (script warning + glass toggle mismatch)
- Nav: active page state; License CTA from `md` up (tablet); quiet CollageMark
- Support fields share `.field-input`; page-card plate bar + padding tightened
- Now Playing detail copy sharpened for music + agents band
- Mobile tabs: compact plate die-cut glyph (full collage stays `lg+`)
- Footer print sheet hides 2 dies under `sm` for cleaner mobile wrap
- Secondary page CollageMarks stay quiet (`animate={false}`)
- Now Playing live panel shows **Cursor · Claude · Codex** (matches copy)
- Dead `FooterEditorialBand` shim removed
- Now Playing transport row uses SVG glyphs (no emoji)
- Album art is a flat Bauhaus sun tile (solid yellow + print blocks, no glow-orb)
- Shelf: concentric AirDrop glyph, solid type badges (PNG/PDF/MOV triad), dead `ShelfPanel` removed
- Agent markers are flat discs (no radial glow); LIVE/Open use square Bauhaus chips
- Transport: shuffle · prev · play · next · repeat (no heart emoji-stand-in)
- Glass toggle + LiveStrip chips use square Bauhaus radii; progress bar squared
- CTA buttons default without sky-dot chrome
- Atmosphere triad glows toned down for print restraint
- Product glass shell uses `--radius-glass` (22px) — soft Mac HUD vs Bauhaus-square site chrome
- Liquid glass material: translucent card + backdrop blur + inset highlight (solid mode stays flat)
- Tab panel switches use product spring (`tabWidgetSpring`); dead mascot motion token removed
- Tablet 768 QA: License CTA visible, collage stays `lg+`, plate glyphs on tablet; build green
- Craft floor: display tracking capped at -0.04em; removed feTurbulence grain overlay; page-card accent bar 2px
- SEO description includes Cursor · Claude · Codex (matches live agents panel)
- Intent event/todo chips squared to match Bauhaus product chrome
- Site chrome radii squared for Bauhaus (buttons/nav 10px, cards 14px — no pill soup)
- Notch tab track + Intent/Focus chips use square Bauhaus radii (product chrome matches site)
- Nav shadow toned down for print restraint
- Nav: SVG menu glyphs; link/theme chips use square Bauhaus radii
- Dead unused panels removed (`MusicPanel`, `NowPlayingPanel`, `AgentLivePanel`)
- Press kit shows app icon + geometric mark; honest demos placeholder
- Collage plate meta: ST · 01 / 02 / 03 per tab (was hard-coded 01)
- Liquid light glass: higher card opacity + tighter blur so HUD stays crisp on studio paper
- LiveStrip / shelf marks / nav link chips: Bauhaus radius tokens
- Intent event/todo/sheet chrome squared to Bauhaus radius tokens
- Display tracking eased to −0.03em (craft-floor preferred range)
- Themed caret + thin scrollbars; 404 CollageMark stays quiet
- Theme toggle hydrates from storage on first client read (label matches DOM)
- Tab shelves: removed decorative tilt + translate offsets; notch sits square
- Shelf stage: no floating mark chip (mark stays in plate copy only)
- Collage float: vertical drift only (no continuous rotate wobble near product)
- Footer die hover: lift only — static print rotations stay
- Secondary `.page-title` gets Bauhaus red rule for cohesion with hero/tabs
- ShowcaseFrame: height tracks measured content (removed 280px empty floor under glass)
- Mobile 390 QA: notch cutout centered on glass; hero/shelf articles have zero rotate (CDP); ShowcaseFrame scale-only
- Craft pass 24: Intent detail copy product-led (no Bauhaus in marketing); tabs header drops redundant ST eyebrow; hero stack tightened for 800px laptop (CTA ~70px room); CollageMark entrance is lift/scale only (no rotate); shelf accent bar 2px
- Craft pass 25: page-card soft depth shadow; prose-policy display headings; support fields tokenized + textarea resize; privacy/terms mono “Last updated”; changelog empty = Plate 00 dashed plate; footer price tabular-nums; dark glass follows theme after hydrate
- Craft pass 26: buy page plate steps + checkout-pending dashed plate; title `Buy · DynaMac`; press assets on studio-paper mats with print shadow (mark forced light tokens); footer band uses `brand.company`
- Craft pass 27: quieter Glass toggle (no uppercase shout); softer shelf shadows; quieter atmosphere glows; hero/nav price tabular-nums; production build green
- Acceptance audit 28: bars 1–6 evidenced (theme, responsive, legal, security/docs, live notch/collage/no mascots); `/pro` → `/buy`; archive map unused live; mobile 390 notch gap 0 + CTAs in view; Next “hydration” overlays are `data-cursor-ref` tooling false positives; mobile menu uses page-card plate; footer/menu prices tabular-nums. **#7 beauty approved still open**
- Craft pass 29: Bauhaus print sheets stay studio paper in dark (`data-theme="light"` on TabCollage, FooterCollageStrip, plate marks/glyphs) so black print shadows still read
- Craft pass 30: hero auto-cycle delays 2.8s so first paint holds Now Playing (music + agents); upgrade plan fonts/north-star synced to Space Grotesk + IBM Plex + dual theme
- Craft pass 31: hero holds Now Playing **4.2s** then advances (then every 5.5s); denser dark liquid glass; outline CTAs use elevated plate fill; tab pills + Glass toggle use Bauhaus `--radius-small`; dark-mode QA — studio-paper collage plates still read on editorial dark
- Craft pass 32: ThemeProvider honors useSyncExternalStore hydration contract (no eager getSnapshot hydrate); secondary pages drop duplicate mono kickers (title carries weight; keep Last updated / Plate 404 / checkout pending); Buy title `Buy · DynaMac`; selection uses pure ink on accent tint; Intent/agents chrome radii → Bauhaus tokens; mobile 390 QA — notch centered, CTAs in stack
- Craft pass 33: system-theme hydrate trusts FOUC `data-theme` attr; LiveStrip / Shelf / Music progress / footer die use Bauhaus radii; footer “License” label quiet (no uppercase shout); light-mode QA — collage plate + hero CTAs read clean on studio paper
- Craft pass 34: Shelf plate = Drop → Hold in notch → AirDrop (PNG/PDF/MOV chips + capsule + arcs); retired folder/barcode metaphor; `FilesDieCut` = stacked tiles in notch; footer print sheet gains AirDrop die

## Theme

- `data-theme="light" | "dark"` on `<html>`
- FOUC-safe init script + `ThemeProvider` (`useSyncExternalStore`) + nav `ThemeToggle` (cycles system → light → dark)
- Storage: `localStorage.dynamac-theme` (hydrated after mount; CSS already correct via init script)
- Light canvas: cool studio `#ecece8` (not warm cream cliché)
- Dark canvas: editorial `#0e0f10`
- Hero glass auto-follows site theme until user picks a glass style

## Security / data

See `docs/SECURITY_AND_DATA.md`.
