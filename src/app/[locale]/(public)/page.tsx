import { getTranslations } from "next-intl/server";
import { generateFAQSchema } from "@/config/seo";
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import RD4USection from "@/components/landing/RD4USection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import InternationalSection from "@/components/landing/InternationalSection";
import DonorProgramsSection from "@/components/landing/DonorProgramsSection";
import PartnersSection from "@/components/landing/PartnersSection";
import ProcessSection from "@/components/landing/ProcessSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";
import HubPreviewSection from "@/components/landing/HubPreviewSection";
import CTASection from "@/components/landing/CTASection";
import FloatingCTA from "@/components/landing/FloatingCTA";

export default async function HomePage() {
  const t = await getTranslations("faq");

  // Generate FAQ schema for SEO
  const faqData = [
    { question: t("q1"), answer: t("a1") },
    { question: t("q2"), answer: t("a2") },
    { question: t("q3"), answer: t("a3") },
    { question: t("q4"), answer: t("a4") },
    { question: t("q5"), answer: t("a5") },
    { question: t("q6"), answer: t("a6") },
    { question: t("q7"), answer: t("a7") },
    { question: t("q8"), answer: t("a8") },
  ];

  const faqSchema = generateFAQSchema(faqData);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HeroSection />
      <ServicesSection />
      <RD4USection />
      <FeaturesSection />
      <InternationalSection />
      <DonorProgramsSection />
      <PartnersSection />
      <ProcessSection />
      <TestimonialsSection />
      <FAQSection />
      <HubPreviewSection />
      <CTASection />
      <FloatingCTA />
    </>
  );
}
