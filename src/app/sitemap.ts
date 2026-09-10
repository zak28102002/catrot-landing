import type { MetadataRoute } from "next";
import { dataPractices } from "@/config/data-practices";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const legalUpdated = new Date(`${dataPractices.lastUpdated}T00:00:00Z`);

  return [
    {
      url: `${siteConfig.websiteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.websiteUrl}/privacy`,
      lastModified: legalUpdated,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.websiteUrl}/terms`,
      lastModified: legalUpdated,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
