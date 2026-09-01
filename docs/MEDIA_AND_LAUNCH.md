# Media and launch checklist

## What ships today

- Marketing site with home, buy, privacy, changelog, support, press
- Download redirect via `/api/download` → GitHub Releases
- Buy page ready for Stripe or Lemon Squeezy (env var when you connect)
- Live tab card widgets on the homepage (`AgentLiveCard`, `IntentLiveCard`, `ShelfLiveCard`)
- SEO: JSON-LD, sitemap, robots, `llms.txt`
- App icon in nav, hero, favicon, OG

## Your workflow: tab recordings (optional)

Screen Studio clips in `public/demos/` are optional — for press, Product Hunt, or social. The homepage uses live React widgets, not video posters.

1. Record each tab (~3–4s loop)
2. Export 1200×675 WebP, under 2MB
3. Copy to `public/demos/`:

```bash
cp ~/Movies/now-playing.webp public/demos/now-playing.webp
cp ~/Movies/intent.webp public/demos/intent.webp
cp ~/Movies/shelf.webp public/demos/shelf.webp
```

## Stripe checkout (when ready)

1. Create product in [Stripe Dashboard](https://dashboard.stripe.com) → Payment Link → $2.99 one-time
2. Add to Vercel: `NEXT_PUBLIC_STRIPE_PAYMENT_LINK=https://buy.stripe.com/...`
3. `/buy` shows live Checkout button

Or **Lemon Squeezy**: `NEXT_PUBLIC_LEMON_SQUEEZY_CHECKOUT_URL`

## Deploy to dynamac.com

1. Push `dynamac-web` to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set env vars from `.env.example`
4. Point `dynamac.com` DNS to Vercel

## Before Product Hunt

- [ ] Optional tab WebP clips for press / Product Hunt
- [ ] Stripe or Lemon Squeezy live
- [ ] OG image with real UI screenshot (optional upgrade from app icon)
- [ ] Submit sitemap in Google Search Console
- [ ] Product Hunt gallery: 3 GIFs + 1 hero still

## Privacy rule

Never capture the user's desktop without explicit permission. Only add media you record on a clean machine.
