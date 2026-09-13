# Security, data, and analytics — DynaMac marketing site

## Security headers (shipped in `next.config.ts`)

| Header | Purpose |
| --- | --- |
| `Strict-Transport-Security` | Force HTTPS |
| `X-Frame-Options: SAMEORIGIN` | Clickjacking resistance |
| `X-Content-Type-Options: nosniff` | MIME sniffing block |
| `Referrer-Policy` | Limit referrer leakage |
| `Permissions-Policy` | Disable camera/mic/geo on site |
| `Content-Security-Policy` | Restrict scripts to self + Plausible; connect to release API + Plausible |
| `poweredByHeader: false` | Hide `X-Powered-By` |

## Analytics

- **Provider:** Plausible (cookieless)
- **Env:** `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (e.g. `dynamac.com`)
- **Behavior:** Script loads only when env is set. No cookies. Documented in `/privacy`.

## Payments

- Stripe Payment Link: `NEXT_PUBLIC_STRIPE_PAYMENT_LINK`
- Lemon Squeezy: `NEXT_PUBLIC_LEMON_SQUEEZY_CHECKOUT_URL`
- Card data never hits our Node runtime — redirect/checkout only.

## Downloads

- Public story: users download from **dynamac.com** via `/api/download`
- Implementation: endpoint resolves the latest signed `.dmg` from the private release host (`GITHUB_REPO` / optional `GITHUB_TOKEN`) and redirects the browser to the asset
- Never link to or name the release host on marketing surfaces (nav, buy, changelog, privacy, press, schema)

## Client storage

- `localStorage.dynamac-theme` — light / dark / system preference only

## Legal surfaces

| Route | Content |
| --- | --- |
| `/privacy` | App permissions, site analytics, payments, downloads |
| `/terms` | License, refunds, disclaimer |
| `/support` | Contact form → mailto |

## DialKit (optional, development)

DialKit is gated behind `NEXT_PUBLIC_DIALKIT=1` so it does not crash the marketing site when its CSS chunk fails under Turbopack. Enable only when tuning springs locally.

## Production checklist

1. Set env vars on Vercel (Plausible domain, checkout URL, optional release-host token)
2. Confirm HTTPS + custom domain
3. Spot-check response headers on `/` and `/api/download`
4. Verify Plausible sees pageviews after deploy
5. Confirm license email flow with payment provider
6. CSP in production omits `unsafe-eval`; development allows it for React tooling
