import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/buy", "/privacy", "/changelog", "/support", "/press"];

  return routes.map((route) => ({
    url: `${brand.website}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/buy" ? 0.9 : 0.7,
  }));
}
