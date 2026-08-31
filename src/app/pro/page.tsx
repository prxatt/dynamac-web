import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Buy",
};

export default function ProPage() {
  redirect("/buy");
}
