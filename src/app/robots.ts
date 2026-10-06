import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteUrl;
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/drafts"] }],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
