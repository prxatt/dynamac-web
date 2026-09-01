import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import Script from "next/script";
import { DialKitDevRoot } from "@/components/dev/DialKitDevRoot";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { SkipLink } from "@/components/layout/SkipLink";
import { brand } from "@/lib/brand";
import { appIconSrc } from "@/components/ui/AppIcon";
import { buildAllJsonLd } from "@/lib/schema";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.website),
  title: {
    default: brand.seo.title,
    template: `%s · ${brand.name}`,
  },
  description: brand.seo.description,
  keywords: [...brand.seo.keywords],
  applicationName: brand.name,
  category: "Utilities",
  openGraph: {
    title: brand.seo.title,
    description: brand.seo.description,
    url: brand.website,
    siteName: brand.name,
    locale: "en_US",
    type: "website",
    images: [{ url: appIconSrc, width: 1024, height: 1024, alt: brand.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: brand.seo.title,
    description: brand.seo.description,
    images: [appIconSrc],
  },
  alternates: { canonical: brand.website },
  icons: {
    icon: [{ url: appIconSrc, sizes: "1024x1024", type: "image/png" }],
    apple: [{ url: appIconSrc, sizes: "1024x1024", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLdBlocks = buildAllJsonLd();
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <SkipLink />
        <Nav />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        {jsonLdBlocks.map((block, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
          />
        ))}
        {plausibleDomain ? (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}
        {process.env.NODE_ENV === "development" ? <DialKitDevRoot /> : null}
      </body>
    </html>
  );
}
