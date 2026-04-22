import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "МІВРУ — Науково-правові висновки для відшкодування збитків",
    template: "%s | МІВРУ",
  },
  description: "Науково-правові висновки за методикою RDNA/DaLA Світового банку для RD4U, ЄСПЛ, ICC та суду. Оцінка збитків, ризиків, Due Diligence. ЄДРПОУ 45681824.",
  keywords: [
    "науково-правовий висновок",
    "RDNA",
    "DaLA",
    "RD4U",
    "оцінка збитків",
    "відшкодування збитків",
    "реєстр збитків",
    "ЄСПЛ",
    "ICC",
    "due diligence",
    "CBAM",
    "CSRD",
    "оцінка ризиків",
    "відновлення України",
    "МІВРУ",
    "scientific-legal conclusion",
    "damage assessment",
    "war damage report",
  ],
  authors: [{ name: "МІВРУ — Міжнародний інститут відновлення та розвитку України" }],
  creator: "МІВРУ",
  publisher: "МІВРУ",
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
  openGraph: {
    type: "website",
    locale: "uk_UA",
    alternateLocale: "en_US",
    siteName: "МІВРУ",
    title: "МІВРУ — Висновки для RD4U та ICC | Методика RDNA",
    description: "Готуємо науково-правові висновки за методикою RDNA/DaLA Світового банку для RD4U та ICC.",
  },
  twitter: {
    card: "summary_large_image",
    title: "МІВРУ — Висновки для RD4U та ICC | Методика RDNA",
    description: "Науково-правові висновки за методикою RDNA/DaLA для RD4U, ЄСПЛ, ICC.",
  },
  alternates: {
    languages: {
      uk: "/uk",
      en: "/en",
    },
  },
  category: "Legal Services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
