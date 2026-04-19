import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard", "/orders", "/documents", "/settings"],
      },
    ],
    sitemap: "https://iirdu.org/sitemap.xml",
  };
}
