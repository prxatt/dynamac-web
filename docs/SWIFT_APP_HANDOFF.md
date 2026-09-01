# DynaMac Swift App — Agent Handoff Prompt

Copy everything below the line into a new Cursor agent session opened in the **DynaMac** macOS app repo (`/Users/prattmajmudar/Desktop/DynaMac` or your local clone).

---

## Mission

Bring the **native DynaMac Swift app** up to parity with the **dynamac-web marketing notch showcase**, which is now the **source of truth** for UI/UX. The web version is a fast iteration surface; the Mac app should match its behavior, layout, and Bauhaus visual language.

**Do not** ship the old gray/dim Intent UI. **Do not** use modal dimmed overlays for add/edit sheets. **Do not** use native macOS dropdowns for category/time pickers in the notch.

## Reference implementation (web)

- **Repo:** `dynamac-web` (GitHub: `prxatt/dynamac-web`)
- **Preview PR:** check latest `feat/intent-notch-parity` PR for Vercel URL
- **Key paths:**
  - `src/components/notch/NotchShowcase.tsx` — 760px shell, three tabs
  - `src/components/notch/panels/IntentPanelCompact.tsx` — Intent layout
  - `src/components/notch/panels/intent/TodayList.tsx` — Today + orange frame
  - `src/components/notch/panels/intent/CalendarBands.tsx` — week timeline strips
  - `src/components/notch/panels/intent/CompletedList.tsx` — completed toggle views
  - `src/components/notch/panels/intent/ItemSheet.tsx` — inline add/view/edit (no overlay)
  - `src/components/notch/panels/intent/SheetPickers.tsx` — custom category/time pickers
  - `src/components/notch/panels/intent/TodoRow.tsx` — todos use **checkmark**, not play
  - `src/components/notch/panels/intent/EventBand.tsx` — events use **play** for upcoming only
  - `src/components/notch/panels/FocusTimer.tsx` — 60-box quadrant, blocks/span, pomodoro break
  - `src/components/notch/panels/LiveStrip.tsx` — solid Bauhaus strip under music
  - `src/components/notch/intent-plan-data.ts` — demo data, colors, categories
  - `src/components/notch/NotchDemoContext.tsx` — state model

## Swift repo map (start here)

| Concern | Path |
|---------|------|
| Brand / chrome | `boringNotch/Dynamac/DynamacBrand.swift`, `LiquidGlass.swift` |
| Open notch size | `boringNotch/sizing/matters.swift` (`openNotchSize`) |
| Now Playing | `boringNotch/components/Notch/NotchHomeView.swift` |
| Plan / Intent | `boringNotch/Dynamac/PlanFocusView.swift` (or equivalent) |
| Agents LIVE | `boringNotch/Dynamac/HomeAgentsTasksPanel.swift` |
| Engineering constraints | `docs/ENGINEERING.md` |

## Visual language (locked)

### Bauhaus Intent
- **Bold solid color blocks** — no gradients on Intent/Live/Calendar surfaces
- **Category colors** (white type on blocks):
  - Work `#2b5ea8`
  - Personal `#d4556a`
  - Hobby `#7b4fd4`
  - Activity `#3daa3d` (replaces Admin)
  - Custom categories: user-created with color picker
- **Today panel:** warm orange fill `#f0a030`, dark ink `#1a1a18` always for dates, `2px` dark outline frame
- **Calendar panel:** same orange frame as Today
- **Month accent:** unique color per month on left bar only — date numerals always `#1a1a18`

### Today tab layout
- Left **date rail:** weekday, `09.01`, `SEP`, ‹ › day navigation (Today only)
- Right: **time-aware agenda** when viewing today:
  - Live events first, then upcoming events (past events hidden)
  - Timed todos still due/upcoming; untimed todos after events
- **Todos:** category pill + Todo pill + title; **checkmark button** on right
- **Events:** play only for **upcoming**; Live pill when in progress

### Calendar tab layout
- Vertical scroll of day rows; auto-scroll to today on open
- Left: **CalendarDateLabel** — black ink always (day abbr, numeral, month)
- Right: timeline **8 AM – 6 PM** (markers 8, 11, 14, 17, 18)
- Events before 8 / after 6 pin to edges but remain visible
- **Lane packing:** overlapping events stack in separate lanes; `overflow-hidden` per row (never bleed into next day)
- Untimed/timed todos in left gutter; events use same `EventBand`/`TodoRow` timeline variant as Today
- Today row filters to live + upcoming events only

### Completed view (✓ button left of +)
- Toggle button: orange when inactive, black when active
- **Today completed:** same orange frame + date rail; shows checked todos + **past events**
- **Calendar completed:** framed list grouped by day; checked todos + **past events** per day
- Tap row → inline detail sheet; tap check → uncheck

### Item sheet (add / view / edit)
- **Replaces** the list inline — **no dimmed modal overlay**
- Compact: header (date + title), task/event toggle, title field, 3-column meta (Category · Time/Duration · Status/Start)
- **Custom pickers** for category (built-ins + "New category") and time presets — not `NSPopUpButton` / SwiftUI `Picker` menu style
- Actions: Cancel | Create/Save; view mode: Delete | Edit | Focus (events only)

### Focus timer (right column)
- **60 horizontal micro-boxes** always visible
- Blocks / Span toggle
- Fills with active category color during focus
- **Pomodoro:** 5-min break after work phase if task remains
- Play on event row starts focus; todos complete via checkmark only

### Now Playing
- Smaller album art, more gap before live strip
- **Live strip:** full-width solid block under music (same style as EventBand)
- Agent orbs: Cursor blue `#48a8fa`, Claude orange `#f5852e`

### Shelf
- Keep existing compact shelf; polish to match warm/high-contrast chrome

## Demo data (Sep 1, 2026 — Tuesday)

- Today key: `sep-1`
- Sample todos: "Record tab demos" (hobby), "Wire Stripe checkout" (activity, done)
- Sample events: Investor pitch prep (9–11), Core architecture planning (13:15–14:00), Design review (14:00–15:00 live at demo time 14:15)

## Interaction rules

| Item | Primary action | Secondary |
|------|----------------|-----------|
| Todo (open) | Tap row → detail sheet | Checkmark → complete |
| Todo (done) | Tap row → preview | Checkmark → undo |
| Event (upcoming) | Tap row → detail | Play → focus |
| Event (live) | Tap row → detail | No play |
| Event (past) | Shown in completed view | No play |
| + button | Inline add sheet | — |
| ✓ button | Toggle completed list | — |

## Implementation order (suggested)

1. **Intent panel frame** — orange today / tinted calendar + outline (match web `IntentPanelFrame`)
2. **Today list** — date rail, TodoRow, EventBand parity
3. **Item sheet** — inline, custom pickers, Activity category, custom category creation
4. **Completed toggle** — Today + Calendar completed lists including past events
5. **Calendar strips** — timeline layout + frame
6. **Focus timer** — 60-box grid, pomodoro, blocks/span
7. **Live strip** — solid block under Now Playing
8. **Agents** — orb colors, LIVE inset
9. **Shelf** — visual cohesion pass

## Anti-patterns (explicitly rejected)

- Dim gray Intent backgrounds that reduce readability
- White box outlines on live events
- Play button on todos
- Empty dark circle "complete" buttons on open todos
- Scrollbars visible in Today/Calendar lists
- Full-screen modal overlays for add/edit
- Native OS dropdown menus for notch pickers
- Copying old reference mocks literally instead of the current web notch

## Process

1. Read web files listed above before coding Swift
2. Implement in small phases; compare side-by-side with Vercel preview
3. Web changes land first; app follows
4. Respect `openNotchSize` and existing `DynamacChrome` tokens — extend, don't scatter one-off colors
5. Run/build the Mac app after each phase

## Success criteria

- [ ] Intent Today matches web: orange frame, date rail, check vs play semantics
- [ ] Calendar has matching outline frame and thin timeline strips
- [ ] ✓ completed view works on both tabs (todos + past events)
- [ ] Inline item sheet with custom pickers (Category, Time, Status)
- [ ] Activity category + custom category creation
- [ ] Focus 60-box quadrant + pomodoro break
- [ ] Live strip solid Bauhaus block
- [ ] No regressions to notch open/close animation or tab switching

---

*Generated from dynamac-web Intent iteration. Update this doc when web UX changes.*
