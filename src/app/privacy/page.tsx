import type { Metadata } from "next";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Privacy",
  alternates: { canonical: `${brand.website}/privacy` },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <div className="page-card">
      <h1 className="page-title">Privacy</h1>
      <div className="prose-policy mt-10 space-y-6">
        <p>
          {brand.name} is a macOS app by {brand.company}. Data stays on your Mac
          unless you use a system feature that talks to Apple or a third-party
          service you already use (Calendar, Music, etc.).
        </p>

        <h2>Accessibility</h2>
        <p>
          Optional. Used for the live agents panel on Now Playing. Reads window
          titles of Cursor, Claude, and Codex. Not a keystroke logger. Not
          screen recording.
        </p>

        <h2>Calendar & reminders</h2>
        <p>Shown on Intent. Stays on your Mac.</p>

        <h2>Camera</h2>
        <p>Optional mirror preview only. Nothing recorded or stored.</p>

        <h2>Website</h2>
        <p>
          Plausible Analytics may be used — no cookies, aggregate page views only.
        </p>

        <h2>Contact</h2>
        <p>
          <a href={`mailto:${brand.supportEmail}`} className="text-link">
            {brand.supportEmail}
          </a>
        </p>
      </div>
      </div>
    </div>
  );
}
