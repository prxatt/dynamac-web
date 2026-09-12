import type { Metadata } from "next";
import { CollageMark } from "@/components/collage/CollageMark";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${brand.name} and ${brand.website} handle data. Mac app keeps your day on-device; cookieless site analytics.`,
  alternates: { canonical: `${brand.website}/privacy` },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:py-16">
      <div className="page-card">
        <div className="mb-6">
          <CollageMark size={40} animate={false} />
        </div>
        <h1 className="page-title">Privacy</h1>
        <p className="mt-3 font-mono text-[10px] tracking-[0.14em] text-[var(--color-muted)] uppercase">
          Last updated · September 11, 2026
        </p>

        <div className="prose-policy mt-10 space-y-6">
          <p>
            {brand.name} is a macOS app by {brand.company}. The product is built to keep your
            day local on your Mac. This page covers the app and this website (
            {brand.website}).
          </p>

          <h2>App data (on your Mac)</h2>
          <p>
            Calendar, to-dos, Shelf files, focus timer state, and preferences stay on your device
            unless you use a system feature that talks to Apple or a third-party service you already
            use (Calendar, Music, AirDrop, etc.).
          </p>

          <h2>Accessibility</h2>
          <p>
            Optional. Used for the live agents panel on Now Playing. Reads window titles of Cursor,
            Claude, and Codex so you can jump to those apps. Not a keystroke logger. Not screen
            recording. You can revoke access in System Settings.
          </p>

          <h2>Calendar & reminders</h2>
          <p>Shown on Intent when you grant access. Content stays on your Mac.</p>

          <h2>Camera</h2>
          <p>Optional mirror preview only. Nothing recorded or stored by {brand.name}.</p>

          <h2>Website analytics</h2>
          <p>
            If enabled in production, we use{" "}
            <a href="https://plausible.io/" className="text-link" rel="noopener noreferrer">
              Plausible Analytics
            </a>{" "}
            — cookieless, GDPR-friendly, aggregate page views only. No advertising profiles. No
            cross-site tracking. Analytics load only when{" "}
            <code className="text-[var(--color-ink)]">NEXT_PUBLIC_PLAUSIBLE_DOMAIN</code> is configured.
          </p>

          <h2>Payments</h2>
          <p>
            License checkout is handled by Stripe or Lemon Squeezy when those payment links are
            connected. Card data never touches our servers — it is processed by the payment
            provider under their privacy policy. We receive purchase confirmation (email / license
            fulfillment) only as needed to deliver your license.
          </p>

          <h2>Downloads</h2>
          <p>
            The macOS installer is served from GitHub Releases. Visiting{" "}
            <code className="text-[var(--color-ink)]">/api/download</code> redirects to the latest signed
            release asset. GitHub may log standard request metadata under their policies.
          </p>

          <h2>Theme preference</h2>
          <p>
            Light / dark / system theme choice is stored in your browser&apos;s{" "}
            <code className="text-[var(--color-ink)]">localStorage</code> (`dynamac-theme`) so the site
            remembers your preference. It never leaves your device.
          </p>

          <h2>What we do not do</h2>
          <ul>
            <li>Sell personal data</li>
            <li>Run advertising cookies or fingerprinting scripts</li>
            <li>Train AI models on your Mac content</li>
            <li>Collect keystrokes or screen recordings via Accessibility</li>
          </ul>

          <h2>Contact</h2>
          <p>
            Privacy questions:{" "}
            <a href={`mailto:${brand.supportEmail}`} className="text-link">
              {brand.supportEmail}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
