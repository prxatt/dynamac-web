import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, IBM_Plex_Sans } from "next/font/google";
import { DialKitDevRoot } from "@/components/dev/DialKitDevRoot";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { SkipLink } from "@/components/layout/SkipLink";
import { ThemeInitScript } from "@/components/theme/ThemeInitScript";
import { ThemeProvider, themeInitScript } from "@/components/theme/ThemeProvider";
import { Analytics } from "@/components/analytics/Analytics";
import { brand } from "@/lib/brand";
import { appIconSrc } from "@/components/ui/AppIcon";
import { buildAllJsonLd } from "@/lib/schema";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const ibmPlex = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlex.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <ThemeInitScript html={themeInitScript} />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <ThemeProvider>
          <SkipLink />
          <Nav />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <Analytics />
        </ThemeProvider>
        {jsonLdBlocks.map((block, i) => (
          <script
            key={i}
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(block).replace(/</g, "\\u003c"),
            }}
          />
        ))}
        <DialKitDevRoot />
      </body>
    </html>
  );
}
