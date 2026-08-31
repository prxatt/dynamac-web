import type { Metadata } from "next";
import type { ReactNode } from "react";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Support",
  description: `Get help with ${brand.name} — contact Surface Tension.`,
  alternates: { canonical: `${brand.website}/support` },
};

export default function SupportLayout({ children }: { children: ReactNode }) {
  return children;
}
