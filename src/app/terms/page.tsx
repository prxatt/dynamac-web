import type { Metadata } from "next";
import { CollageMark } from "@/components/collage/CollageMark";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Terms",
  description: `Terms of use for ${brand.name} and ${brand.website}.`,
  alternates: { canonical: `${brand.website}/terms` },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:py-16">
      <div className="page-card">
        <div className="mb-6">
          <CollageMark size={40} animate={false} />
        </div>
        <h1 className="page-title">Terms</h1>
        <p className="mt-3 font-mono text-[10px] tracking-[0.14em] text-[var(--color-muted)] uppercase">
          Last updated · September 20, 2026
        </p>

        <div className="prose-policy mt-10 space-y-6">
          <p>
            These terms cover the {brand.name} macOS application and this marketing site, operated
            by {brand.company}. By downloading or installing the app, you agree to these terms.
          </p>

          <h2>License</h2>
          <p>
            {brand.name} is free and open source. You may use the distributed macOS builds from{" "}
            {brand.website} for personal or commercial use on machines you own or control (
            {brand.platform}). Source licensing follows the project&apos;s repository license when
            published. No paid license key is required.
          </p>

          <h2>Tips</h2>
          <p>
            Optional tips (for example via PayPal) are voluntary donations to {brand.company}. They
            do not unlock features, create a paid license, or entitle you to refunds beyond what the
            tip provider allows.
          </p>

          <h2>Acceptable use</h2>
          <p>
            Do not use the app to violate others&apos; privacy or applicable law. Do not misrepresent
            redistribution of builds as official {brand.company} releases unless you are distributing
            unmodified signed builds from {brand.website}.
          </p>

          <h2>Disclaimer</h2>
          <p>
            The software and site are provided “as is” without warranty of any kind. To the maximum
            extent permitted by law, {brand.company} is not liable for indirect or consequential
            damages arising from use of the app or site.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these terms. The “Last updated” date above reflects the current version.
            Continued use after changes constitutes acceptance of the revised terms.
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
