import type { MetadataRoute } from "next";
import { programmes } from "@/content/programmes";
import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl;
  const pages = ["", "/about", "/training", "/hcd-tip", "/corporate", "/contact", "/privacy"];
  return [
    ...pages.map((path) => ({ url: `${baseUrl}${path}`, changeFrequency: "monthly" as const, priority: path === "" ? 1 : 0.8 })),
    ...programmes.map((programme) => ({
      url: `${baseUrl}/training/${programme.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
