import { MetadataRoute } from "next";

const BASE_URL = "https://iirdu.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["uk", "en"];
  const publicPages = [
    "",
    "/about",
    "/services",
    "/conclusion",
    "/risk-assessment",
    "/eu-compliance",
    "/contacts",
    "/hub",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of publicPages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.8,
      });
    }
  }

  // Auth pages (lower priority)
  for (const locale of locales) {
    entries.push({
      url: `${BASE_URL}/${locale}/login`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    });
    entries.push({
      url: `${BASE_URL}/${locale}/register`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    });
  }

  return entries;
}
