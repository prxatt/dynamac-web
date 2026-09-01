export const brand = {
  company: "Surface Tension",
  name: "DynaMac",
  tagline: "Mac notch HUD",
  shortDescription:
    "Music, your day, and your agents without leaving the notch.",
  credits: "Now Playing · Intent · Shelf",
  version: "0.43.0",
  repo: "prxatt/DynaMac",
  repositoryUrl: "https://github.com/prxatt/DynaMac",
  website: "https://dynamac.com",
  price: 2.99,
  supportEmail: "support@dynamac.com",
  platform: "macOS 14+",
  platformNote: "Requires macOS 14 or later · Apple Silicon & Intel",
  seo: {
    title: "DynaMac | Mac notch HUD for music, Intent, and Shelf",
    description:
      "DynaMac is a native macOS notch HUD: Now Playing with live Cursor and Claude agents, Intent for calendar and focus, Shelf for files. $2.99 one-time.",
    keywords: [
      "mac notch app",
      "macbook notch hud",
      "menu bar music control",
      "cursor agent mac",
      "claude mac notch",
      "mac productivity notch",
      "DynaMac",
      "dynamac",
      "surface tension mac app",
      "macos 14 utility",
      "notch shelf files",
    ],
  },
  tabs: {
    nowPlaying: {
      id: "now-playing",
      label: "Now Playing",
      copy: "Album art, transport, and volume in the notch.",
      detail:
        "See what Cursor, Claude, and Codex are on. Tap Open to jump there.",
    },
    intent: {
      id: "intent",
      label: "Intent",
      copy: "Calendar, to-dos, and a focus timer.",
      detail: "Today list and a horizontal day-band calendar — Bauhaus planning in the notch.",
    },
    shelf: {
      id: "shelf",
      label: "Shelf",
      copy: "Drop files. Hold them in the notch. Share via AirDrop.",
      detail: "Files stay in the HUD until you send them.",
    },
  },
} as const;

export const navLinks = [
  { href: "/buy", label: "Buy" },
  { href: "/privacy", label: "Privacy" },
  { href: "/changelog", label: "Changelog" },
  { href: "/support", label: "Support" },
] as const;

export const footerLinks = [
  { href: "/buy", label: "Buy" },
  { href: "/privacy", label: "Privacy" },
  { href: "/support", label: "Support" },
  { href: "/press", label: "Press" },
  { href: "/changelog", label: "Changelog" },
] as const;

export function getCheckoutUrl(): string | null {
  return (
    process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ??
    process.env.NEXT_PUBLIC_LEMON_SQUEEZY_CHECKOUT_URL ??
    null
  );
}
