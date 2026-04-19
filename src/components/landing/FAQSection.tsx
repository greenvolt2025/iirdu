"use client";

import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  { q: "q1", a: "a1" },
  { q: "q2", a: "a2" },
  { q: "q3", a: "a3" },
  { q: "q4", a: "a4" },
  { q: "q5", a: "a5" },
  { q: "q6", a: "a6" },
  { q: "q7", a: "a7" },
  { q: "q8", a: "a8" },
] as const;

export default function FAQSection() {
  const t = useTranslations("faq");

  return (
    <section className="section-padding bg-white relative overflow-hidden" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 mb-4">
            {t("title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto mb-6 rounded-full" />
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map(({ q, a }, i) => (
            <AccordionItem
              key={q}
              value={q}
              className="border-b border-slate-200 last:border-b-0"
            >
              <AccordionTrigger className="py-6 text-left text-base font-serif font-semibold text-navy-900 hover:text-gold-600 hover:no-underline transition-colors duration-300 [&[data-state=open]]:text-gold-600">
                <span className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gold-500/10 text-gold-600 text-sm font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{t(q)}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed text-[15px] pl-10 pb-6">
                {t(a)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
