# DynaMac Web

Marketing site for [dynamac.com](https://dynamac.com) — **DynaMac**, the macOS notch HUD app by Surface Tension.

## Stack

- Next.js 16 (App Router)
- Tailwind CSS v4
- Framer Motion (scroll fade-ins, respects reduced motion)

## Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

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
