export const brand = {
  company: "Surface Tension",
  name: "DynaMac",
  tagline: "Mac notch HUD",
  shortDescription:
    "Music, your day, and your agents without leaving the notch.",
  credits: "Now Playing · Intent · Shelf",
  version: "0.43.0",
  website: "https://dynamac.com",
  /** Always free — tips are optional. */
  price: 0,
  pricingLabel: "Free",
  pricingNote: "Free and open source",
  supportEmail: "support@dynamac.com",
  platform: "macOS 14+",
  platformNote: "Requires macOS 14 or later · Apple Silicon & Intel",
  seo: {
    title: "DynaMac | Free open-source Mac notch HUD",
    description:
      "DynaMac is a free, open-source macOS notch HUD: Now Playing with live Cursor, Claude, and Codex agents, Intent for calendar and focus, Shelf for files. Download from dynamac.com — tips optional.",
    keywords: [
      "mac notch app",
      "macbook notch hud",
      "menu bar music control",
      "cursor agent mac",
      "claude mac notch",
      "codex mac notch",
      "mac productivity notch",
      "DynaMac",
      "dynamac",
      "surface tension mac app",
      "macos 14 utility",
      "notch shelf files",
      "open source mac notch",
      "free mac notch app",
    ],
  },
  tabs: {
    nowPlaying: {
      id: "now-playing",
      label: "Now Playing",
      copy: "Music, live agents, and your focus or calendar event.",
      detail:
        "Cursor, Claude, and Codex under the track — tap Open to jump. Focus or a live event shows underneath.",
    },
    intent: {
      id: "intent",
      label: "Intent",
      copy: "Calendar, to-dos, and a focus timer.",
      detail: "Today list and a horizontal day-band calendar — plan without leaving the notch.",
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
  { href: "/privacy", label: "Privacy" },
  { href: "/changelog", label: "Changelog" },
  { href: "/support", label: "Support" },
] as const;

export const footerLinks = [
  { href: "/buy", label: "Support" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/support", label: "Contact" },
  { href: "/press", label: "Press" },
  { href: "/changelog", label: "Changelog" },
] as const;

/** Optional PayPal.me (or similar) tip link — Stripe not used for tips. */
export function getTipUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_PAYPAL_TIP_URL?.trim();
  return url || null;
}

/** Optional public source repo — never the primary download CTA. */
export function getSourceUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_SOURCE_URL?.trim();
  return url || null;
}
