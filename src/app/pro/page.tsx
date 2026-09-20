import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Tip",
};

export default function ProPage() {
  redirect("/buy");
}
