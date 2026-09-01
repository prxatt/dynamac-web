# DynaMac Swift App — Agent Handoff Prompt

Copy everything below the line into a new Cursor agent session opened in the **DynaMac** macOS app repo (`/Users/prattmajmudar/Desktop/DynaMac`).

---

## Mission

Bring the **native DynaMac Swift app** to **100% parity** with the **dynamac-web** notch showcase — visuals, motion, colors, icons, interactions. Web is source of truth; Swift follows.

**Do not** ship dim gray Intent UI, modal overlays, native dropdowns, or crushed calendar cards.

## Reference (web)

- **Repo:** `dynamac-web` · branch `feat/intent-notch-parity` · PR #4
- **Handoff:** `docs/SWIFT_APP_HANDOFF.md` (this file)
- **Key web files:**
  - `src/components/notch/panels/intent/CalendarBands.tsx` — scroll days + today preview row
  - `src/components/notch/panels/intent/CalendarDateLabel.tsx` — black ink dates
  - `src/components/notch/panels/intent/TodayList.tsx` — time-aware agenda
  - `src/components/notch/panels/intent/EventBand.tsx` — full + timeline variants
  - `src/components/notch/panels/intent/TodoRow.tsx`
  - `src/components/notch/panels/intent/ItemSheet.tsx` + `SheetPickers.tsx`
  - `src/components/notch/panels/FocusTimer.tsx`
  - `src/components/notch/intent-plan-data.ts` — colors, timeline, lane packing
  - `src/components/notch/NotchDemoContext.tsx`

## Swift repo map

| Concern | Path |
|---------|------|
| Intent / Plan | `boringNotch/Dynamac/PlanFocusView.swift`, `boringNotch/Dynamac/Intent/*` |
| Brand / glass | `boringNotch/Dynamac/DynamacBrand.swift`, `LiquidGlass.swift` |
| Notch size | `boringNotch/sizing/matters.swift` |
| Now Playing | `boringNotch/components/Notch/NotchHomeView.swift` |
| Agents | `boringNotch/Dynamac/HomeAgentsTasksPanel.swift` |

---

## Visual language (100% locked)

### Colors
| Token | Value | Use |
|-------|-------|-----|
| Today/Calendar frame | `#f0a030` | Intent panel fill |
| Ink | `#1a1a18` | **All date text — always black** |
| Outline | `2px rgba(26,26,24,0.22)` | Panel frame |
| Work | `#2b5ea8` | Category block |
| Personal | `#d4556a` | Category block |
| Hobby | `#7b4fd4` | Category block |
| Activity | `#3daa3d` | Category block |
| Month accents | `MONTH_COLORS` in intent-plan-data | Left bar only — never on date numerals |
| Coral CTA | site `--color-coral-pop` | + button |
| Agent Cursor | `#48a8fa` | Agent orb |
| Agent Claude | `#f5852e` | Agent orb |

### Typography (notch Intent)
- Date numeral: **17px bold** tabular
- Day abbr: 5px uppercase tracking
- Month: 7px bold uppercase
- Event title: **10px bold** (Today/full), **9px** (timeline)
- Pills: 6px bold uppercase on `bg black/20`
- Time meta: 7px semibold

### Icons & controls
- **Todo complete:** circle checkmark (white ring when open, filled white + colored ✓ when done)
- **Event focus:** ▶ in `bg black/30` circle — upcoming only
- **✓ completed toggle:** orange `#f0a030` inactive → black active
- **+ add:** coral filled circle
- **Date nav (Today only):** ‹ › in `bg black/12` circles
- **No** empty dark circles on open todos
- **No** white box outline on live events

### Motion (match web springs)
- Tab switch: spring `visualDuration 0.32, bounce 0.16` + `layoutId` pill
- List ↔ sheet: opacity + `y: 4` over `0.18s`
- Focus play: `scale 1.05` hover, `0.95` press
- Event/todo row: `brightness 1.04` hover
- Calendar scroll-to-today: smooth `scrollIntoView`
- Notch open/close: preserve existing app animation — do not regress

---

## Today tab

- Orange frame + date rail with **‹ › navigation (Today only)**
- **Time-aware list** when viewing today:
  1. Live events
  2. Upcoming events (hide past)
  3. Upcoming timed todos
  4. Untimed todos
- Full `EventBand` + `TodoRow` — never crushed pills
- Todos: checkmark only · Events: play only when upcoming

## Calendar tab

- **Same UX:** vertical scroll through day rows (no ‹ › on Calendar)
- Auto-scroll to today on open
- **Today row:** full `EventBand`/`TodoRow` previews (identical to Today tab) — user must read live/upcoming tasks without opening
- **Other days:** timeline 8 AM–6 PM (markers 8, 11, 14, 17, 18)
  - Lane packing for overlaps; `overflow-hidden` per row
  - Timeline cards: min-width 34% (40% upcoming, 52% live)
  - Title on one line with **truncate + ellipsis** (never mid-word line-clamp clip)
  - Full title in accessibility hint / tooltip
  - Live: `2px` dark outline + subtle shadow, taller lane (54px)
- Dates: `CalendarDateLabel` — **all black ink**, month color on 2px left bar only
- Off-hours events pin to timeline edges but remain visible

## Completed (✓)

- Toggle: orange → black when active
- Today + Calendar completed lists: done todos + past events
- Inline sheet — no modal overlay

## Item sheet

- Inline replaces list; custom pickers (not native menus)
- Category + color picker for new categories
- Time slider 6 AM–10 PM; duration chips 30m/1h/90m
- No time on add → third field shows **Flexible** (not Status)

## Focus timer

- 60-box quadrant, blocks/span toggle
- Category color fill during focus
- 5-min pomodoro break after work phase

## Now Playing

- Solid Bauhaus live strip under music (match EventBand)
- Smaller album art, agent orb colors as above

---

## Implementation phases

### Phase 1 — Foundation
- [ ] `IntentPanelFrame` orange + outline
- [ ] Category colors + `colorForCategory` helper
- [ ] `CalendarDateLabel` black ink

### Phase 2 — Today
- [ ] Date rail + ‹ › nav
- [ ] `TodoRow` + `EventBand` full cards
- [ ] Time-aware filtering (`sortEventsForAgenda`, `filterTodosForAgenda`)

### Phase 3 — Calendar
- [ ] Vertical day scroll + auto-scroll today
- [ ] Today row = full preview cards (not timeline crush)
- [ ] Other days = timeline + lane packing (`assignTimelineLanes`)
- [ ] Hour ruler 8–18

### Phase 4 — Sheet & pickers
- [ ] Inline `ItemSheet` add/view/edit
- [ ] Custom category/time/duration pickers + color picker

### Phase 5 — Completed + Focus
- [ ] ✓ toggle views
- [ ] 60-box focus timer + pomodoro
- [ ] Play/check semantics

### Phase 6 — Motion & polish
- [ ] Spring tab transitions
- [ ] Sheet crossfade
- [ ] Hover/press micro-interactions
- [ ] Side-by-side compare with Vercel preview

### Phase 7 — Now Playing + Agents + Shelf
- [ ] Live strip solid block
- [ ] Agent orb colors
- [ ] Shelf cohesion pass

---

## Anti-patterns

- Dim gray Intent backgrounds
- Month-colored date numerals on orange (invisible text)
- `maxHeight` clipping on calendar cards
- `line-clamp` mid-word truncation on titles
- Timeline pills instead of readable previews on today row
- Modal overlays · native dropdowns
- Play on todos · empty complete circles
- ‹ › navigation on Calendar tab

## Success criteria

- [ ] Pixel-close to web at `openNotchSize`
- [ ] Live event readable on Calendar today row without tap
- [ ] All animations and colors match web spec
- [ ] No notch regression on open/close or tab switch

---

*Last updated from dynamac-web Intent iteration. Re-read web files before each phase.*
