import Script from "next/script";

/**
 * Privacy-friendly analytics. Plausible is cookieless and GDPR-friendly —
 * only loads when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set (production).
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
