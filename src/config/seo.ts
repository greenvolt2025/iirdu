import { siteConfig } from "./site";

export const seoConfig = {
  uk: {
    home: {
      title: "МІВРУ — Висновки для RD4U та ICC | Методика RDNA",
      description:
        "Готуємо висновки про збитки за методикою Світового банку RDNA/DaLA. Для квартир від 1000 грн, для будинків від 1500 грн. Офіційні звіти для RD4U, ICC, ЄСПЛ. Рада Європи рекомендує.",
      keywords:
        "науково-правовий висновок, RD4U, RDNA, оцінка збитків, ICC претензії, ЄСПЛ, Світовий банк DaLA, розрахунок збитків, реєстр збитків України, компенсація за війну",
    },
    pricing: {
      title: "Ціни на висновки | Квартира 1000 грн, Будинок 1500 грн | МІВРУ",
      description:
        "Прозорі ціни: квартира — 1000 грн, будинок — 1500 грн. Оплата 50/50. Висновок готовий за 7-14 днів. Гарантія відповідності вимогам RD4U та ICC.",
      keywords:
        "ціна науково-правового висновку, вартість оцінки збитків, скільки коштує висновок RD4U, ціна звіту RDNA, оплата частинами",
    },
    about: {
      title: "Про інститут | МІВРУ — Оцінка збитків, RDNA, ISO 31000 | ЄДРПОУ 45681824",
      description:
        "Міжнародний інститут відновлення та розвитку України. Науково-правові висновки за RDNA/DaLA. Протидія корупції у відновленні. ISO 31000, COSO ERM, методика Світового банку.",
      keywords:
        "МІВРУ, IIRDU, інститут відновлення України, методологія RDNA, DaLA, ISO 31000, протидія корупції, GIZ, наукова установа, ЄДРПОУ 45681824",
    },
    contacts: {
      title: "Контакти | МІВРУ — Київ | +380 75 369 8799 | iirdu@proton.me",
      description:
        "Зв'яжіться з МІВРУ: Київ, Україна. Телефон: +380 75 369 8799. Email: iirdu@proton.me. Telegram: @iirdu_org. Безкоштовна консультація. Відповідь протягом 1 робочого дня.",
      keywords:
        "контакти МІВРУ, консультація з оцінки збитків, телефон інституту, email IIRDU, Київ Україна",
    },
    hub: {
      title: "Хаб відновлення | Ініціативи громади | МІВРУ",
      description:
        "Відкрита платформа для пропозицій з відновлення України. Подайте свою ідею, проєкт або дослідження. Експерти інституту розглядають кожну ініціативу.",
      keywords:
        "ініціативи відновлення України, проєкти реконструкції, громадські пропозиції, відновлення інфраструктури",
    },
  },
  en: {
    home: {
      title: "IIRDU — Conclusions for RD4U & ICC | RDNA Method",
      description:
        "We prepare damage conclusions using World Bank RDNA/DaLA methodology. From 1,000 UAH for apartments, 1,500 UAH for houses. Official reports for RD4U, ICC, ECHR. Council of Europe recommended.",
      keywords:
        "scientific-legal conclusion, RD4U, RDNA, damage assessment, ICC claims, ECHR, World Bank DaLA, damage calculation, Ukraine damage register, war compensation",
    },
    pricing: {
      title: "Pricing | Apartment 1,000 UAH, House 1,500 UAH | IIRDU",
      description:
        "Transparent pricing: apartment — 1,000 UAH, house — 1,500 UAH. 50/50 payment. Conclusion ready in 7-14 days. Guaranteed compliance with RD4U and ICC requirements.",
      keywords:
        "scientific conclusion price, damage assessment cost, RD4U report cost, RDNA report price, installment payment",
    },
    about: {
      title: "About | IIRDU — Damage Assessment, RDNA, ISO 31000 | EDRPOU 45681824",
      description:
        "International Institute for Reconstruction and Development of Ukraine. Scientific-legal conclusions using RDNA/DaLA. Anti-corruption in reconstruction. ISO 31000, COSO ERM, World Bank methodology.",
      keywords:
        "IIRDU, МІВРУ, Ukraine reconstruction institute, RDNA methodology, DaLA, ISO 31000, anti-corruption, GIZ, scientific institution, EDRPOU 45681824",
    },
    contacts: {
      title: "Contacts | IIRDU — Kyiv | +380 75 369 8799 | iirdu@proton.me",
      description:
        "Contact IIRDU: Kyiv, Ukraine. Phone: +380 75 369 8799. Email: iirdu@proton.me. Telegram: @iirdu_org. Free consultation. Response within 1 business day.",
      keywords:
        "IIRDU contacts, damage assessment consultation, institute phone, IIRDU email, Kyiv Ukraine",
    },
    hub: {
      title: "Recovery Hub | Community Initiatives | IIRDU",
      description:
        "Open platform for Ukraine reconstruction proposals. Submit your idea, project, or research. Institute experts review every initiative.",
      keywords:
        "Ukraine reconstruction initiatives, reconstruction projects, community proposals, infrastructure recovery",
    },
  },
} as const;

// Generate JSON-LD structured data for SEO
export function generateOrganizationSchema(locale: "uk" | "en") {
  return {
    "@context": "https://schema.org",
    "@type": "ResearchOrganization",
    name: locale === "uk" ? siteConfig.fullName : siteConfig.fullNameEn,
    alternateName: locale === "uk" ? siteConfig.name : siteConfig.nameEn,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description:
      locale === "uk"
        ? "Науково-правові висновки за методикою RDNA/DaLA Світового банку для RD4U, ICC, ЄСПЛ"
        : "Scientific-legal conclusions using World Bank RDNA/DaLA methodology for RD4U, ICC, ECHR",
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: locale === "uk" ? "Київ" : "Kyiv",
      addressCountry: "UA",
    },
    identifier: {
      "@type": "PropertyValue",
      propertyID: "EDRPOU",
      value: siteConfig.edrpou,
    },
    sameAs: [siteConfig.social.telegram],
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
  locale: "uk" | "en"
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}/${locale}${item.url}`,
    })),
  };
}

export function generateServiceSchema(
  name: string,
  description: string,
  price: { min?: number; max?: number; currency: string },
  locale: "uk" | "en"
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    provider: {
      "@type": "Organization",
      name: locale === "uk" ? siteConfig.fullName : siteConfig.fullNameEn,
    },
    description,
    areaServed: "UA",
    offers: {
      "@type": "Offer",
      priceCurrency: price.currency,
      price: price.min || undefined,
      priceRange:
        price.min && price.max ? `${price.min}-${price.max}` : undefined,
    },
  };
}

export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
