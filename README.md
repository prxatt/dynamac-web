# DynaMac Web

Marketing site for [dynamac.com](https://dynamac.com) — **DynaMac**, the macOS notch HUD app by Surface Tension.

## Stack

- Next.js 16 (App Router)
- Tailwind CSS v4
- Motion (`motion/react`) — product-led reveals, tab springs, `prefers-reduced-motion` safe
- DialKit (opt-in) — set `NEXT_PUBLIC_DIALKIT=1` to tune springs in dev

## Homepage

- **Hero** — live `NotchProductStage` (product mock, tab cycle). Quiet Bauhaus geometric mark.
- **Three tabs** — Bauhaus Zine die-cut collages + notch shelf demos (Now Playing · Intent · Shelf)
- **Free / tip** — download CTA + optional PayPal tip (`/buy`)
- **Theme** — light / dark / system toggle in nav

## Environment

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_REPO` | No | Private release host for installer assets (default: `prxatt/DynaMac`) |
| `GITHUB_TOKEN` | No | Higher API rate limits for the private release host |
| `NEXT_PUBLIC_PAYPAL_TIP_URL` | No | PayPal.me (or similar) tip link — enables Tip CTA |
| `NEXT_PUBLIC_SOURCE_URL` | No | Optional public source repo URL (secondary; download stays primary) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | Plausible analytics domain |
| `NEXT_PUBLIC_DIALKIT` | No | Set to `1` to enable DialKit in dev |
| `SUPPORT_EMAIL` | No | Support contact on tip/support pages |

Security headers + CSP: see [docs/SECURITY_AND_DATA.md](docs/SECURITY_AND_DATA.md).
Legal: `/privacy`, `/terms`.


## Scripts

```bash
npm run dev        # Development server
npm run dev:clean  # Kill stale :3000/:3001 then start dev
npm run build      # Production build
npm run start      # Start production server
npm run lint       # ESLint
npm run typecheck  # TypeScript check
```

## Deploy

1. Push this marketing repo
2. Import in Vercel
3. Set env vars
4. Point `dynamac.com` at Vercel

Users download the app from **dynamac.com** (`/api/download`). Release hosting is an implementation detail and must not appear in marketing copy.

## Related

- Launch checklist: [docs/MEDIA_AND_LAUNCH.md](docs/MEDIA_AND_LAUNCH.md)
