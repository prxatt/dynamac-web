# Media and launch checklist

## What ships today

- Marketing site with home, tip (`/buy`), privacy, changelog, support, press
- Download from the website via `/api/download` (release hosting is private)
- Free / open source positioning; optional PayPal tip via env
- Live notch demos on the homepage
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

## PayPal tip (optional)

1. Create a [PayPal.me](https://www.paypal.com/paypalme/) link (or PayPal donate button URL)
2. Add to Vercel: `NEXT_PUBLIC_PAYPAL_TIP_URL=https://paypal.me/yourname`
3. Optional source repo (secondary only): `NEXT_PUBLIC_SOURCE_URL=https://github.com/...`
4. `/buy` shows **Tip on PayPal**; primary CTA stays **Download for macOS**

Stripe / Lemon license checkout is retired — the app is free.

## Deploy to dynamac.com

1. Push `dynamac-web`
2. Import project in [Vercel](https://vercel.com)
3. Set env vars from `.env.example`
4. Point `dynamac.com` DNS to Vercel

## Before Product Hunt

- [ ] Optional tab WebP clips for press / Product Hunt
- [ ] PayPal tip URL live (`NEXT_PUBLIC_PAYPAL_TIP_URL`)
- [ ] OG image with real UI screenshot (optional upgrade from app icon)
- [ ] Submit sitemap in Google Search Console
- [ ] Product Hunt gallery: 3 GIFs + 1 hero still

## Privacy rule

Never capture the user's desktop without explicit permission. Only add media you record on a clean machine.
