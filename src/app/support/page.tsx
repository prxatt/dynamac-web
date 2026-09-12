"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CollageMark } from "@/components/collage/CollageMark";
import { brand } from "@/lib/brand";

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:py-16">
      <div className="page-card">
      <div className="mb-6">
        <CollageMark size={40} animate={false} />
      </div>
      <h1 className="page-title">Support</h1>
      <p className="mt-4 text-[length:var(--text-body-lg)] text-[var(--color-muted)]">
        Questions about {brand.name}, licensing, or permissions? Send a message or
        email us directly. Messages open your mail client — nothing is stored on our servers.
      </p>

      {submitted ? (
        <div className="mt-10 rounded-[var(--radius-cards)] border border-[var(--color-hairline)] bg-[var(--color-canvas)] p-6">
          <p className="text-sm text-[var(--color-muted)]">
            Thanks — your message is ready to send via your email client. If it
            did not open, email{" "}
            <a
              href={`mailto:${brand.supportEmail}`}
              className="text-link"
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
            <label htmlFor="name" className="block text-[length:var(--text-body-sm)] font-medium text-[var(--color-ink)]">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              autoComplete="name"
              className="field-input"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-[length:var(--text-body-sm)] font-medium text-[var(--color-ink)]">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="field-input"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-[length:var(--text-body-sm)] font-medium text-[var(--color-ink)]">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="field-input"
            />
          </div>
          <Button type="submit" className="w-full sm:w-auto" dot="none">
            Send message
          </Button>
        </form>
      )}

      <p className="mt-8 text-sm text-[var(--color-muted)]">
        Direct email:{" "}
        <a href={`mailto:${brand.supportEmail}`} className="text-link">
          {brand.supportEmail}
        </a>
      </p>
      </div>
    </div>
  );
}
