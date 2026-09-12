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
          Last updated · September 11, 2026
        </p>

        <div className="prose-policy mt-10 space-y-6">
          <p>
            These terms cover the {brand.name} macOS application and this marketing site, operated
            by {brand.company}. By downloading, installing, or purchasing a license, you agree to
            these terms.
          </p>

          <h2>License</h2>
          <p>
            {brand.name} is sold as a one-time license for personal or commercial use on macOS
            {` `}
            {brand.platform.replace("macOS ", "")} machines you own or control. The listed price is{" "}
            {`$${brand.price.toFixed(2)}`} unless otherwise stated at checkout. All 1.x updates are
            included with a valid license.
          </p>

          <h2>Open source</h2>
          <p>
            Source code may be available at{" "}
            <a
              href={brand.repositoryUrl}
              className="text-link"
              rel="noopener noreferrer"
            >
              {brand.repositoryUrl}
            </a>
            . Open-source licenses in the repository apply to their respective files. A purchased
            license covers use of the distributed binary / release builds as described at purchase.
          </p>

          <h2>Acceptable use</h2>
          <p>
            Do not redistribute paid license keys, reverse-engineer licensing for circumvention, or
            use the app to violate others&apos; privacy or applicable law.
          </p>

          <h2>Refunds</h2>
          <p>
            If the app does not launch on a supported Mac or a license key fails after purchase,
            contact{" "}
            <a href={`mailto:${brand.supportEmail}`} className="text-link">
              {brand.supportEmail}
            </a>{" "}
            within 14 days. Refunds are handled case-by-case through the original payment provider.
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
