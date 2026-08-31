import { brand } from "./brand";
import { appIconSrc } from "@/components/ui/AppIcon";

export function buildSoftwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: brand.name,
    operatingSystem: brand.platform,
    applicationCategory: "UtilitiesApplication",
    applicationSubCategory: "Menu Bar Application",
    softwareVersion: brand.version,
    downloadUrl: `${brand.website}/api/download`,
    installUrl: `${brand.website}/api/download`,
    offers: {
      "@type": "Offer",
      price: brand.price.toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${brand.website}/buy`,
    },
    description: brand.seo.description,
    featureList: [
      "Now Playing music HUD in the Mac notch",
      "Live Cursor, Claude, and Codex agent panel",
      "Intent tab with calendar, to-dos, and focus timer",
      "Shelf for files and AirDrop sharing",
    ],
    author: {
      "@type": "Organization",
      name: brand.company,
      url: brand.website,
    },
    screenshot: `${brand.website}${appIconSrc}`,
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.company,
    url: brand.website,
    logo: `${brand.website}${appIconSrc}`,
    sameAs: [brand.repositoryUrl],
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: brand.website,
    description: brand.seo.description,
    publisher: {
      "@type": "Organization",
      name: brand.company,
    },
  };
}

export function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is ${brand.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${brand.name} is a native macOS notch HUD with Now Playing, Intent, and Shelf tabs.`,
        },
      },
      {
        "@type": "Question",
        name: `How much does ${brand.name} cost?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${brand.name} is a one-time $${brand.price.toFixed(2)} purchase for macOS. All 1.x updates included.`,
        },
      },
      {
        "@type": "Question",
        name: `Does ${brand.name} work with Cursor and Claude?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. On Now Playing, ${brand.name} shows live agent status for Cursor, Claude, and Codex when Accessibility is enabled.`,
        },
      },
    ],
  };
}

export function buildAllJsonLd() {
  return [
    buildSoftwareApplicationJsonLd(),
    buildOrganizationJsonLd(),
    buildWebSiteJsonLd(),
    buildFaqJsonLd(),
  ];
}
