"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { brand } from "@/lib/brand";

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:py-24">
      <h1 className="font-display text-4xl font-semibold text-[var(--fg)]">
        Support
      </h1>
      <p className="mt-4 text-[var(--fg-muted)]">
        Questions about {brand.name}, Pro, or permissions? Send a message or
        email us directly.
      </p>

      {submitted ? (
        <div className="mt-10 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-6">
          <p className="text-sm text-[var(--fg-muted)]">
            Thanks — your message is ready to send via your email client. If it
            did not open, email{" "}
            <a
              href={`mailto:${brand.supportEmail}`}
              className="text-[var(--accent)] underline-offset-2 hover:underline"
            >
              {brand.supportEmail}
            </a>
            .
          </p>
        </div>
      ) : (
        <form
          className="mt-10 space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            const form = event.currentTarget;
            const data = new FormData(form);
            const name = String(data.get("name") ?? "");
            const email = String(data.get("email") ?? "");
            const message = String(data.get("message") ?? "");
            const subject = encodeURIComponent(`${brand.name} support`);
            const body = encodeURIComponent(
              `Name: ${name}\nEmail: ${email}\n\n${message}`,
            );
            window.location.href = `mailto:${brand.supportEmail}?subject=${subject}&body=${body}`;
            setSubmitted(true);
          }}
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[var(--fg)]">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--fg)]">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[var(--fg)]">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="mt-2 w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
            />
          </div>
          <Button type="submit">Send message</Button>
        </form>
      )}

      <p className="mt-8 text-sm text-[var(--fg-subtle)]">
        Direct email:{" "}
        <a
          href={`mailto:${brand.supportEmail}`}
          className="text-[var(--accent)] underline-offset-2 hover:underline"
        >
          {brand.supportEmail}
        </a>
      </p>
    </div>
  );
}
