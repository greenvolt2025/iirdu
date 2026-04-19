import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter, Playfair_Display } from "next/font/google";
import { seoConfig, generateOrganizationSchema } from "@/config/seo";
import { siteConfig } from "@/config/site";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif",
  display: "swap",
});

export function generateStaticParams() {
  return [{ locale: "uk" }, { locale: "en" }];
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const loc = (locale === "en" ? "en" : "uk") as "uk" | "en";
  const seo = seoConfig[loc].home;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: seo.title,
      template: `%s | ${loc === "uk" ? siteConfig.name : siteConfig.nameEn}`,
    },
    description: seo.description,
    keywords: seo.keywords.split(", "),
    authors: [{ name: loc === "uk" ? siteConfig.fullName : siteConfig.fullNameEn }],
    creator: loc === "uk" ? siteConfig.fullName : siteConfig.fullNameEn,
    publisher: loc === "uk" ? siteConfig.fullName : siteConfig.fullNameEn,
    alternates: {
      canonical: `/${loc}`,
      languages: {
        uk: "/uk",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: loc === "uk" ? "uk_UA" : "en_US",
      url: `/${loc}`,
      siteName: loc === "uk" ? siteConfig.name : siteConfig.nameEn,
      title: seo.title,
      description: seo.description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: loc === "uk" ? siteConfig.name : siteConfig.nameEn,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "google-site-verification-code-here",
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ResearchOrganization",
  name: "Міжнародний інститут відновлення та розвитку України",
  alternateName: ["МІВРУ", "IIRDU", "International Institute for Reconstruction and Development of Ukraine"],
  description: "Приватна наукова установа. Науково-правові висновки за методикою RDNA/DaLA для RD4U, ЄСПЛ, ICC.",
  foundingDate: "2022",
  taxID: "45681824",
  areaServed: ["UA", "EU", "International"],
  knowsAbout: [
    "Damage Assessment",
    "RDNA/DaLA Methodology",
    "Scientific-Legal Conclusions",
    "Risk Assessment",
    "Due Diligence",
    "CBAM",
    "CSRD",
    "ESIA",
    "FIDIC Claims",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Scientific-Legal Conclusions",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Damage Assessment (RDNA/DaLA)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Risk Assessment (ISO 31000)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "EU Due Diligence (CBAM, CSRD, CSDDD)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "ESIA / Environmental Impact Assessment" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "FIDIC Claims Support" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Contract Risk Analysis" } },
    ],
  },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  const loc = (locale === "en" ? "en" : "uk") as "uk" | "en";
  const orgSchema = generateOrganizationSchema(loc);

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
