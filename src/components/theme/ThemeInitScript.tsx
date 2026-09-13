"use client";

/**
 * FOUC-safe theme bootstrap — Client Component so React’s script warning
 * path uses text/plain after hydrate (Next.js preventing-flash pattern).
 */
export function ThemeInitScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
