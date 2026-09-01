# DynaMac Web

Marketing site for [dynamac.com](https://dynamac.com) — **DynaMac**, the macOS notch HUD app by Surface Tension.

## Stack

- Next.js 16 (App Router)
- Tailwind CSS v4
- Motion (`motion/react`) — scroll reveals, parallax characters, `prefers-reduced-motion` safe
- DialKit (dev only) — tune tab widget hover springs in `npm run dev`

## Homepage

- **Hero** — live `NotchProductStage` (product mock, tab cycle, 3D tilt). Character band in footer.
- **Three tabs** — unified cream sections with dark notch demos + character art (Intent has no cutout backdrop)
- **Purchase** — $2.99 one-time CTA

## Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Dev server won't start?

Another Next.js process may be holding port 3000:

```bash
npm run dev:clean
```

Or manually:

```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

If the page is blank, confirm you're in `dynamac-web` (not the macOS app repo) and on branch `feat/dialkit-agent-card` or `main`.

## Environment

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_REPO` | No | GitHub repo for release DMG (default: `prxatt/DynaMac`) |
| `GITHUB_TOKEN` | No | Higher GitHub API rate limits |
| `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` | No | Stripe Payment Link — enables live checkout |
| `NEXT_PUBLIC_LEMON_SQUEEZY_CHECKOUT_URL` | No | Alternative to Stripe |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | Plausible analytics domain |
| `SUPPORT_EMAIL` | No | Support contact on buy/support pages |

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

1. Push to GitHub
2. Import in Vercel
3. Set env vars
4. Point `dynamac.com` at Vercel

`/api/download` redirects to the latest GitHub Release DMG.

## Related

- macOS app repo: [prxatt/DynaMac](https://github.com/prxatt/DynaMac)
- Launch checklist: [docs/MEDIA_AND_LAUNCH.md](docs/MEDIA_AND_LAUNCH.md)
