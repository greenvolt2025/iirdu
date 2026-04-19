"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  Shield,
  FileText,
  Scale,
  Landmark,
  Globe,
  CheckCircle,
  TrendingUp,
  Lock,
  Leaf,
  Eye,
  AlertTriangle,
  Server,
  Wifi,
  DollarSign,
  Users,
  Factory,
  Banknote,
  HardHat,
  MapPin,
  Database,
  Languages,
  GraduationCap,
  Swords,
  BadgePercent,
  Package,
  Star,
  Thermometer,
  TreePine,
} from "lucide-react";
import { SERVICE_CATEGORIES, type ServiceItem } from "@/config/services-catalog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ── Content maps keyed by locale ────────────────────────────────────────────

const heroContent = {
  uk: {
    badge: "CSRD \u00b7 CSDDD \u00b7 DORA \u00b7 NIS2",
    title: "Due Diligence \u0442\u0430 \u0432\u0456\u0434\u043f\u043e\u0432\u0456\u0434\u043d\u0456\u0441\u0442\u044c \u0404\u0421",
    subtitle:
      "\u0414\u043e\u043f\u043e\u043c\u0430\u0433\u0430\u0454\u043c\u043e \u0454\u0432\u0440\u043e\u043f\u0435\u0439\u0441\u044c\u043a\u0438\u043c \u043a\u043e\u043c\u043f\u0430\u043d\u0456\u044f\u043c \u0432\u0438\u043a\u043e\u043d\u0443\u0432\u0430\u0442\u0438 \u0440\u0435\u0433\u0443\u043b\u044f\u0442\u043e\u0440\u043d\u0456 \u0432\u0438\u043c\u043e\u0433\u0438 \u0404\u0421 \u043f\u0440\u0438 \u0432\u0445\u043e\u0434\u0436\u0435\u043d\u043d\u0456 \u043d\u0430 \u0440\u0438\u043d\u043e\u043a \u0432\u0456\u0434\u043d\u043e\u0432\u043b\u0435\u043d\u043d\u044f \u0423\u043a\u0440\u0430\u0457\u043d\u0438. \u041a\u043e\u043c\u043f\u043b\u0435\u043a\u0441\u043d\u0430 \u043f\u0435\u0440\u0435\u0432\u0456\u0440\u043a\u0430 \u0432\u0456\u0434\u043f\u043e\u0432\u0456\u0434\u043d\u043e\u0441\u0442\u0456 CSRD, CSDDD, DORA, NIS2, EU Taxonomy \u0442\u0430 AML/\u0441\u0430\u043d\u043a\u0446\u0456\u0439.",
  },
  en: {
    badge: "CSRD \u00b7 CSDDD \u00b7 DORA \u00b7 NIS2",
    title: "EU Due Diligence & Compliance",
    subtitle:
      "Helping European companies meet EU regulatory requirements when entering the Ukraine reconstruction market. Comprehensive compliance verification for CSRD, CSDDD, DORA, NIS2, EU Taxonomy, and AML/Sanctions.",
  },
};

const directivesContent = {
  uk: {
    badge: "\u0414\u0438\u0440\u0435\u043a\u0442\u0438\u0432\u0438 \u0404\u0421",
    title: "\u041a\u043b\u044e\u0447\u043e\u0432\u0456 \u0434\u0438\u0440\u0435\u043a\u0442\u0438\u0432\u0438 \u0404\u0421",
    subtitle:
      "\u0420\u0435\u0433\u0443\u043b\u044f\u0442\u043e\u0440\u043d\u0456 \u0432\u0438\u043c\u043e\u0433\u0438, \u044f\u043a\u0456 \u043c\u0430\u044e\u0442\u044c \u0437\u043d\u0430\u0447\u0435\u043d\u043d\u044f \u0434\u043b\u044f \u043e\u043f\u0435\u0440\u0430\u0446\u0456\u0439 \u0432 \u0423\u043a\u0440\u0430\u0457\u043d\u0456",
    directives: [
      {
        code: "CSRD",
        name: "Corporate Sustainability Reporting Directive",
        requires: "\u0417\u0432\u0456\u0442\u043d\u0456\u0441\u0442\u044c \u043f\u0440\u043e \u0441\u0442\u0430\u043b\u0438\u0439 \u0440\u043e\u0437\u0432\u0438\u0442\u043e\u043a, ESG-\u043f\u043e\u043a\u0430\u0437\u043d\u0438\u043a\u0438 \u0434\u043b\u044f \u043e\u043f\u0435\u0440\u0430\u0446\u0456\u0439 \u0432 \u0423\u043a\u0440\u0430\u0457\u043d\u0456",
        appliesTo: "\u041a\u043e\u043c\u043f\u0430\u043d\u0456\u0457 \u0404\u0421 250+ \u043f\u0440\u0430\u0446\u0456\u0432\u043d\u0438\u043a\u0456\u0432 \u0430\u0431\u043e \u0454\u0432\u0440\u043e 40\u041c+ \u043e\u0431\u043e\u0440\u043e\u0442",
        provides: "\u041f\u0456\u0434\u0433\u043e\u0442\u043e\u0432\u043a\u0430 ESG-\u0440\u043e\u0437\u0434\u0456\u043b\u0443 \u043f\u043e \u0423\u043a\u0440\u0430\u0457\u043d\u0456, \u0437\u0431\u0456\u0440 \u043b\u043e\u043a\u0430\u043b\u044c\u043d\u0438\u0445 \u0434\u0430\u043d\u0438\u0445",
        icon: FileText,
        color: "from-blue-500 to-blue-600",
      },
      {
        code: "CSDDD",
        name: "Corporate Sustainability Due Diligence Directive",
        requires: "Due diligence \u043b\u0430\u043d\u0446\u044e\u0433\u0430 \u043f\u043e\u0441\u0442\u0430\u0447\u0430\u043d\u043d\u044f, \u043f\u0440\u0430\u0432\u0430 \u043b\u044e\u0434\u0438\u043d\u0438, \u0434\u043e\u0432\u043a\u0456\u043b\u043b\u044f",
        appliesTo: "\u041a\u043e\u043c\u043f\u0430\u043d\u0456\u0457 \u0404\u0421 1000+ \u043f\u0440\u0430\u0446\u0456\u0432\u043d\u0438\u043a\u0456\u0432 \u0442\u0430 \u0454\u0432\u0440\u043e 450\u041c+ \u043e\u0431\u043e\u0440\u043e\u0442",
        provides: "\u041f\u0435\u0440\u0435\u0432\u0456\u0440\u043a\u0430 \u0443\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0438\u0445 \u043f\u0430\u0440\u0442\u043d\u0435\u0440\u0456\u0432, \u043c\u043e\u043d\u0456\u0442\u043e\u0440\u0438\u043d\u0433 \u0440\u0438\u0437\u0438\u043a\u0456\u0432",
        icon: Eye,
        color: "from-emerald-500 to-green-600",
      },
      {
        code: "DORA",
        name: "Digital Operational Resilience Act",
        requires: "\u0426\u0438\u0444\u0440\u043e\u0432\u0430 \u0441\u0442\u0456\u0439\u043a\u0456\u0441\u0442\u044c \u0434\u043b\u044f \u0444\u0456\u043d\u0430\u043d\u0441\u043e\u0432\u0438\u0445 \u0443\u0441\u0442\u0430\u043d\u043e\u0432",
        appliesTo: "\u0411\u0430\u043d\u043a\u0438, \u0441\u0442\u0440\u0430\u0445\u043e\u0432\u0456, \u0456\u043d\u0432\u0435\u0441\u0442\u0438\u0446\u0456\u0439\u043d\u0456 \u043a\u043e\u043c\u043f\u0430\u043d\u0456\u0457, ICT-\u043f\u043e\u0441\u0442\u0430\u0447\u0430\u043b\u044c\u043d\u0438\u043a\u0438",
        provides: "\u041e\u0446\u0456\u043d\u043a\u0430 ICT-\u0440\u0438\u0437\u0438\u043a\u0456\u0432 \u0443\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0438\u0445 \u043e\u043f\u0435\u0440\u0430\u0446\u0456\u0439",
        icon: Server,
        color: "from-amber-500 to-orange-500",
      },
      {
        code: "NIS2",
        name: "Network and Information Security Directive",
        requires: "\u041a\u0456\u0431\u0435\u0440\u0431\u0435\u0437\u043f\u0435\u043a\u0430 \u043a\u0440\u0438\u0442\u0438\u0447\u043d\u043e\u0457 \u0456\u043d\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0438",
        appliesTo: "\u041e\u043f\u0435\u0440\u0430\u0442\u043e\u0440\u0438 \u043a\u0440\u0438\u0442\u0438\u0447\u043d\u043e\u0457 \u0456\u043d\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0438 \u0442\u0430 \u0432\u0430\u0436\u043b\u0438\u0432\u0456 \u0441\u0443\u0431\u2019\u0454\u043a\u0442\u0438",
        provides: "\u0410\u0443\u0434\u0438\u0442 \u043a\u0456\u0431\u0435\u0440\u0431\u0435\u0437\u043f\u0435\u043a\u0438 \u0443\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0438\u0445 \u043f\u0430\u0440\u0442\u043d\u0435\u0440\u0456\u0432 \u0442\u0430 \u0456\u043d\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0438",
        icon: Wifi,
        color: "from-red-500 to-rose-600",
      },
      {
        code: "EU Taxonomy",
        name: "EU Taxonomy Regulation",
        requires: "\u0417\u0435\u043b\u0435\u043d\u0430 \u0432\u0456\u0434\u043f\u043e\u0432\u0456\u0434\u043d\u0456\u0441\u0442\u044c \u0434\u043b\u044f \u043f\u0440\u043e\u0454\u043a\u0442\u0456\u0432 \u0432\u0456\u0434\u043d\u043e\u0432\u043b\u0435\u043d\u043d\u044f",
        appliesTo: "\u041a\u043e\u043c\u043f\u0430\u043d\u0456\u0457, \u0449\u043e \u0437\u0432\u0456\u0442\u0443\u044e\u0442\u044c \u0437\u0430 CSRD, \u0444\u043e\u043d\u0434\u0438 \u0442\u0430 \u0431\u0430\u043d\u043a\u0438",
        provides: "\u041e\u0446\u0456\u043d\u043a\u0430 taxonomy-\u0432\u0456\u0434\u043f\u043e\u0432\u0456\u0434\u043d\u043e\u0441\u0442\u0456 \u043f\u0440\u043e\u0454\u043a\u0442\u0456\u0432 \u0432\u0456\u0434\u043d\u043e\u0432\u043b\u0435\u043d\u043d\u044f",
        icon: Leaf,
        color: "from-teal-500 to-emerald-600",
      },
      {
        code: "AML / \u0421\u0430\u043d\u043a\u0446\u0456\u0457",
        name: "Anti-Money Laundering & Sanctions",
        requires: "\u041f\u0435\u0440\u0435\u0432\u0456\u0440\u043a\u0430 \u043a\u043e\u043d\u0442\u0440\u0430\u0433\u0435\u043d\u0442\u0456\u0432, \u0441\u043a\u0440\u0438\u043d\u0456\u043d\u0433 \u0441\u0430\u043d\u043a\u0446\u0456\u0439",
        appliesTo: "\u0412\u0441\u0456 \u043a\u043e\u043c\u043f\u0430\u043d\u0456\u0457, \u0449\u043e \u043f\u0440\u0430\u0446\u044e\u044e\u0442\u044c \u0437 \u0443\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0438\u043c\u0438 \u043f\u0430\u0440\u0442\u043d\u0435\u0440\u0430\u043c\u0438",
        provides: "KYC/KYB \u0443\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0438\u0445 \u043a\u043e\u043d\u0442\u0440\u0430\u0433\u0435\u043d\u0442\u0456\u0432, \u043f\u0435\u0440\u0435\u0432\u0456\u0440\u043a\u0430 \u0431\u0435\u043d\u0435\u0444\u0456\u0446\u0456\u0430\u0440\u0456\u0432",
        icon: Shield,
        color: "from-purple-500 to-violet-600",
      },
    ],
  },
  en: {
    badge: "EU Directives",
    title: "Key EU Directives",
    subtitle:
      "Regulatory requirements relevant for operations in Ukraine",
    directives: [
      {
        code: "CSRD",
        name: "Corporate Sustainability Reporting Directive",
        requires: "Sustainability reporting, ESG metrics for Ukraine operations",
        appliesTo: "EU companies with 250+ employees or EUR 40M+ turnover",
        provides: "Ukraine ESG chapter preparation, local data collection",
        icon: FileText,
        color: "from-blue-500 to-blue-600",
      },
      {
        code: "CSDDD",
        name: "Corporate Sustainability Due Diligence Directive",
        requires: "Supply chain due diligence, human rights, environment",
        appliesTo: "EU companies with 1000+ employees and EUR 450M+ turnover",
        provides: "Ukrainian partner verification, risk monitoring",
        icon: Eye,
        color: "from-emerald-500 to-green-600",
      },
      {
        code: "DORA",
        name: "Digital Operational Resilience Act",
        requires: "Digital resilience for financial institutions",
        appliesTo: "Banks, insurers, investment firms, ICT providers",
        provides: "ICT risk assessment of Ukrainian operations",
        icon: Server,
        color: "from-amber-500 to-orange-500",
      },
      {
        code: "NIS2",
        name: "Network and Information Security Directive",
        requires: "Cybersecurity for critical infrastructure",
        appliesTo: "Critical infrastructure operators and important entities",
        provides: "Cybersecurity audit of Ukrainian partners and infrastructure",
        icon: Wifi,
        color: "from-red-500 to-rose-600",
      },
      {
        code: "EU Taxonomy",
        name: "EU Taxonomy Regulation",
        requires: "Green alignment for reconstruction projects",
        appliesTo: "CSRD-reporting companies, funds, and banks",
        provides: "Taxonomy alignment assessment for reconstruction projects",
        icon: Leaf,
        color: "from-teal-500 to-emerald-600",
      },
      {
        code: "AML / Sanctions",
        name: "Anti-Money Laundering & Sanctions",
        requires: "Counter-party verification, sanctions screening",
        appliesTo: "All companies working with Ukrainian partners",
        provides: "KYC/KYB of Ukrainian counterparties, beneficial owner checks",
        icon: Shield,
        color: "from-purple-500 to-violet-600",
      },
    ],
  },
};

// ── Catalog data ─────────────────────────────────────────────────────────
const euCategory = SERVICE_CATEGORIES.find((c) => c.id === "eu-compliance")!;

const EU_SERVICE_ICON_MAP: Record<string, typeof Shield> = {
  "cbam-verification": Thermometer,
  "csrd-esg": TrendingUp,
  "double-materiality": Scale,
  "csddd-human-rights": Users,
  "csddd-environmental": Leaf,
  "dora-ict": Server,
  "nis2-cybersecurity": Lock,
  "eu-taxonomy": Leaf,
  "aml-kyc": Eye,
  "sanctions-compliance": AlertTriangle,
  "esia-full": TreePine,
  "eu-regulatory": Globe,
};

const EU_SERVICE_DIRECTIVE_MAP: Record<string, string> = {
  "cbam-verification": "CBAM",
  "csrd-esg": "CSRD",
  "double-materiality": "CSRD",
  "csddd-human-rights": "CSDDD",
  "csddd-environmental": "CSDDD",
  "dora-ict": "DORA",
  "nis2-cybersecurity": "NIS2",
  "eu-taxonomy": "EU Taxonomy",
  "aml-kyc": "AML",
  "sanctions-compliance": "Sanctions",
  "esia-full": "ESIA",
  "eu-regulatory": "Comprehensive",
};

function formatEuPrice(svc: ServiceItem): string {
  const fmt = (n: number) => n.toLocaleString("en-US");
  const sym = svc.priceRange.currency === "EUR" ? "\u20ac" : "$";
  return `${sym}${fmt(svc.priceRange.min)} \u2013 ${sym}${fmt(svc.priceRange.max)}`;
}

const servicesContent = {
  uk: {
    badge: "\u041f\u043e\u0441\u043b\u0443\u0433\u0438",
    title: "\u041f\u043e\u0441\u043b\u0443\u0433\u0438 Due Diligence \u0442\u0430 Compliance",
    subtitle: "\u041a\u043e\u043c\u043f\u043b\u0435\u043a\u0441\u043d\u0456 \u043f\u043e\u0441\u043b\u0443\u0433\u0438 \u0434\u043b\u044f \u0454\u0432\u0440\u043e\u043f\u0435\u0439\u0441\u044c\u043a\u0438\u0445 \u043f\u0430\u0440\u0442\u043d\u0435\u0440\u0456\u0432",
  },
  en: {
    badge: "Services",
    title: "Due Diligence & Compliance Services",
    subtitle: "Comprehensive services for European partners",
  },
};

const whyContent = {
  uk: {
    badge: "\u041f\u0435\u0440\u0435\u0432\u0430\u0433\u0438",
    title: "\u0427\u043e\u043c\u0443 \u041c\u0406\u0412\u0420\u0423",
    subtitle: "\u041a\u043e\u043d\u043a\u0443\u0440\u0435\u043d\u0442\u043d\u0456 \u043f\u0435\u0440\u0435\u0432\u0430\u0433\u0438 \u043f\u043e\u0440\u0456\u0432\u043d\u044f\u043d\u043e \u0437 Big Four \u0442\u0430 \u043c\u0456\u0436\u043d\u0430\u0440\u043e\u0434\u043d\u0438\u043c\u0438 \u043a\u043e\u043d\u0441\u0430\u043b\u0442\u0438\u043d\u0433\u043e\u0432\u0438\u043c\u0438 \u043a\u043e\u043c\u043f\u0430\u043d\u0456\u044f\u043c\u0438",
    advantages: [
      {
        icon: MapPin,
        title: "\u041f\u0440\u0438\u0441\u0443\u0442\u043d\u0456\u0441\u0442\u044c \u0432 \u0423\u043a\u0440\u0430\u0457\u043d\u0456",
        text: "\u041a\u043e\u043c\u0430\u043d\u0434\u0430 \u043d\u0430 \u043c\u0456\u0441\u0446\u0456 \u2014 \u043e\u043f\u0435\u0440\u0430\u0442\u0438\u0432\u043d\u0438\u0439 \u0434\u043e\u0441\u0442\u0443\u043f \u0434\u043e \u043e\u0431\u2019\u0454\u043a\u0442\u0456\u0432, \u0434\u0435\u0440\u0436\u0430\u0432\u043d\u0438\u0445 \u043e\u0440\u0433\u0430\u043d\u0456\u0432 \u0442\u0430 \u0440\u0435\u0433\u0456\u043e\u043d\u0430\u043b\u044c\u043d\u0438\u0445 \u0434\u0430\u043d\u0438\u0445",
      },
      {
        icon: Database,
        title: "\u0414\u043e\u0441\u0442\u0443\u043f \u0434\u043e \u0440\u0435\u0454\u0441\u0442\u0440\u0456\u0432",
        text: "\u0404\u0414\u0420, \u0414\u0435\u0440\u0436\u0440\u0435\u0454\u0441\u0442\u0440 \u0440\u0435\u0447\u043e\u0432\u0438\u0445 \u043f\u0440\u0430\u0432, \u043f\u043e\u0434\u0430\u0442\u043a\u043e\u0432\u0456 \u0431\u0430\u0437\u0438, \u0441\u0443\u0434\u043e\u0432\u0456 \u0440\u0435\u0454\u0441\u0442\u0440\u0438, \u0417\u0435\u043c\u0435\u043b\u044c\u043d\u0438\u0439 \u043a\u0430\u0434\u0430\u0441\u0442\u0440",
      },
      {
        icon: Languages,
        title: "\u0414\u0432\u043e\u043c\u043e\u0432\u043d\u0430 \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u0430\u0446\u0456\u044f",
        text: "\u0412\u0441\u0456 \u0437\u0432\u0456\u0442\u0438 \u0443\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u043e\u044e \u0442\u0430 \u0430\u043d\u0433\u043b\u0456\u0439\u0441\u044c\u043a\u043e\u044e \u043c\u043e\u0432\u0430\u043c\u0438 \u0437 \u043f\u0440\u0430\u0432\u043e\u0432\u043e\u044e \u0442\u043e\u0447\u043d\u0456\u0441\u0442\u044e",
      },
      {
        icon: GraduationCap,
        title: "\u041d\u0430\u0443\u043a\u043e\u0432\u0430 \u0432\u0430\u0433\u0430",
        text: "\u0421\u0442\u0430\u0442\u0443\u0441 \u043d\u0430\u0443\u043a\u043e\u0432\u043e\u0457 \u0443\u0441\u0442\u0430\u043d\u043e\u0432\u0438 \u043d\u0430\u0434\u0430\u0454 \u0437\u0432\u0456\u0442\u0430\u043c \u0434\u043e\u0434\u0430\u0442\u043a\u043e\u0432\u0443 \u043f\u0440\u0430\u0432\u043e\u0432\u0443 \u0441\u0438\u043b\u0443 \u0432 \u0443\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0456\u0439 \u044e\u0440\u0438\u0441\u0434\u0438\u043a\u0446\u0456\u0457",
      },
      {
        icon: Swords,
        title: "\u0415\u043a\u0441\u043f\u0435\u0440\u0442\u0438\u0437\u0430 \u0432\u043e\u0454\u043d\u043d\u043e\u0433\u043e \u043a\u043e\u043d\u0442\u0435\u043a\u0441\u0442\u0443",
        text: "\u0420\u043e\u0437\u0443\u043c\u0456\u043d\u043d\u044f \u0441\u043f\u0435\u0446\u0438\u0444\u0456\u043a\u0438 \u0440\u043e\u0431\u043e\u0442\u0438 \u0432 \u0443\u043c\u043e\u0432\u0430\u0445 \u0432\u043e\u0454\u043d\u043d\u043e\u0433\u043e \u0441\u0442\u0430\u043d\u0443: \u043b\u043e\u0433\u0456\u0441\u0442\u0438\u043a\u0430, \u0431\u0435\u0437\u043f\u0435\u043a\u0430, \u043f\u0440\u0430\u0432\u043e\u0432\u0456 \u043e\u0431\u043c\u0435\u0436\u0435\u043d\u043d\u044f",
      },
      {
        icon: BadgePercent,
        title: "\u0426\u0456\u043d\u043e\u0432\u0430 \u043f\u0435\u0440\u0435\u0432\u0430\u0433\u0430 40\u201360%",
        text: "\u0412\u0430\u0440\u0442\u0456\u0441\u0442\u044c \u043f\u043e\u0441\u043b\u0443\u0433 \u043d\u0430 40\u201360% \u043d\u0438\u0436\u0447\u0435 \u043d\u0456\u0436 \u0443 Big Four \u043f\u0440\u0438 \u043f\u043e\u0440\u0456\u0432\u043d\u044f\u043d\u043d\u0456\u0439 \u044f\u043a\u043e\u0441\u0442\u0456 \u0434\u043b\u044f \u0443\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u043e\u0433\u043e \u0440\u0438\u043d\u043a\u0443",
      },
    ],
  },
  en: {
    badge: "Advantages",
    title: "Why IIRDU",
    subtitle: "Competitive advantages compared to Big Four and international consulting firms",
    advantages: [
      {
        icon: MapPin,
        title: "On-the-Ground Presence in Ukraine",
        text: "Local team with direct access to sites, government authorities, and regional data",
      },
      {
        icon: Database,
        title: "Access to Ukrainian Registries",
        text: "USR, Property Rights Register, tax databases, court registries, Land Cadastre",
      },
      {
        icon: Languages,
        title: "Bilingual Documentation",
        text: "All reports in Ukrainian and English with legal precision",
      },
      {
        icon: GraduationCap,
        title: "Scientific Institution Legal Weight",
        text: "Scientific institution status provides reports with additional legal standing in Ukrainian jurisdiction",
      },
      {
        icon: Swords,
        title: "War-Context Expertise",
        text: "Understanding the specifics of operating under martial law: logistics, security, legal restrictions",
      },
      {
        icon: BadgePercent,
        title: "40\u201360% Cost Advantage",
        text: "Services cost 40\u201360% less than Big Four with comparable quality for the Ukrainian market",
      },
    ],
  },
};

const clientsContent = {
  uk: {
    badge: "\u041a\u043b\u0456\u0454\u043d\u0442\u0438",
    title: "\u0425\u0442\u043e \u043f\u043e\u0442\u0440\u0435\u0431\u0443\u0454 \u0446\u0456 \u043f\u043e\u0441\u043b\u0443\u0433\u0438",
    subtitle: "\u0426\u0456\u043b\u044c\u043e\u0432\u0456 \u043a\u043b\u0456\u0454\u043d\u0442\u0441\u044c\u043a\u0456 \u0441\u0435\u0433\u043c\u0435\u043d\u0442\u0438",
    segments: [
      {
        icon: HardHat,
        title: "\u0411\u0443\u0434\u0456\u0432\u0435\u043b\u044c\u043d\u0456 \u043a\u043e\u043c\u043f\u0430\u043d\u0456\u0457 \u0404\u0421",
        examples: "Strabag, Vinci, Hochtief, Skanska, Bouygues",
        needs: "CSDDD, ESG, \u0441\u0430\u043d\u043a\u0446\u0456\u0439\u043d\u0438\u0439 \u0441\u043a\u0440\u0438\u043d\u0456\u043d\u0433 \u0441\u0443\u0431\u043f\u0456\u0434\u0440\u044f\u0434\u043d\u0438\u043a\u0456\u0432",
      },
      {
        icon: Banknote,
        title: "\u0424\u0456\u043d\u0430\u043d\u0441\u043e\u0432\u0456 \u0443\u0441\u0442\u0430\u043d\u043e\u0432\u0438 \u0404\u0421",
        examples: "Raiffeisen, OTP Bank, UniCredit, ING",
        needs: "DORA, AML/KYC, \u0441\u0430\u043d\u043a\u0446\u0456\u0457, CSRD",
      },
      {
        icon: Shield,
        title: "\u0421\u0442\u0440\u0430\u0445\u043e\u0432\u0456 \u043a\u043e\u043c\u043f\u0430\u043d\u0456\u0457 \u0404\u0421",
        examples: "Lloyd\u2019s syndicates, Munich Re, Allianz, Generali",
        needs: "DORA, \u043e\u0446\u0456\u043d\u043a\u0430 \u0440\u0438\u0437\u0438\u043a\u0456\u0432, AML",
      },
      {
        icon: Landmark,
        title: "\u0411\u0430\u043d\u043a\u0438 \u0440\u043e\u0437\u0432\u0438\u0442\u043a\u0443",
        examples: "EBRD, EIB, KfW, NEFCO, IFC",
        needs: "ESG, EU Taxonomy, \u0435\u043a\u043e\u043b\u043e\u0433\u0456\u0447\u043d\u0438\u0439 DD",
      },
      {
        icon: Factory,
        title: "\u0412\u0438\u0440\u043e\u0431\u043d\u0438\u043a\u0438 \u0442\u0430 \u043b\u0430\u043d\u0446\u044e\u0433\u0438 \u043f\u043e\u0441\u0442\u0430\u0447\u0430\u043d\u043d\u044f",
        examples: "Siemens, ABB, Schneider Electric, Bosch",
        needs: "CSDDD, NIS2, ESG, \u043f\u0435\u0440\u0435\u0432\u0456\u0440\u043a\u0430 \u043f\u043e\u0441\u0442\u0430\u0447\u0430\u043b\u044c\u043d\u0438\u043a\u0456\u0432",
      },
    ],
  },
  en: {
    badge: "Clients",
    title: "Who Needs These Services",
    subtitle: "Target client segments",
    segments: [
      {
        icon: HardHat,
        title: "EU Construction Companies",
        examples: "Strabag, Vinci, Hochtief, Skanska, Bouygues",
        needs: "CSDDD, ESG, subcontractor sanctions screening",
      },
      {
        icon: Banknote,
        title: "EU Financial Institutions",
        examples: "Raiffeisen, OTP Bank, UniCredit, ING",
        needs: "DORA, AML/KYC, sanctions, CSRD",
      },
      {
        icon: Shield,
        title: "EU Insurers",
        examples: "Lloyd\u2019s syndicates, Munich Re, Allianz, Generali",
        needs: "DORA, risk assessment, AML",
      },
      {
        icon: Landmark,
        title: "Development Banks",
        examples: "EBRD, EIB, KfW, NEFCO, IFC",
        needs: "ESG, EU Taxonomy, environmental DD",
      },
      {
        icon: Factory,
        title: "EU Manufacturers & Supply Chain",
        examples: "Siemens, ABB, Schneider Electric, Bosch",
        needs: "CSDDD, NIS2, ESG, supplier verification",
      },
    ],
  },
};

const packagesContent = {
  uk: {
    badge: "\u041f\u0430\u043a\u0435\u0442\u0438",
    title: "\u041a\u043e\u043c\u043f\u043b\u0435\u043a\u0441\u043d\u0456 \u043f\u0430\u043a\u0435\u0442\u0438",
    subtitle: "\u041e\u043f\u0442\u0438\u043c\u0430\u043b\u044c\u043d\u0456 \u043a\u043e\u043c\u0431\u0456\u043d\u0430\u0446\u0456\u0457 \u043f\u043e\u0441\u043b\u0443\u0433 \u0434\u043b\u044f \u0442\u0438\u043f\u043e\u0432\u0438\u0445 \u0441\u0446\u0435\u043d\u0430\u0440\u0456\u0457\u0432",
    packages: [
      {
        name: "Market Entry",
        desc: "\u0411\u0430\u0437\u043e\u0432\u0438\u0439 \u043f\u0430\u043a\u0435\u0442 \u0434\u043b\u044f \u0432\u0445\u043e\u0434\u0443 \u043d\u0430 \u0443\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0438\u0439 \u0440\u0438\u043d\u043e\u043a",
        includes: ["Enhanced Due Diligence (AML/KYC)", "Sanctions Compliance", "ESG Risk Assessment"],
        price: "\u20ac15,000 \u2013 \u20ac50,000",
        accent: "from-blue-500 to-blue-600",
        popular: false,
      },
      {
        name: "CSRD Ukraine Chapter",
        desc: "\u041f\u043e\u0432\u043d\u0438\u0439 ESG-\u043f\u0430\u043a\u0435\u0442 \u0434\u043b\u044f \u043a\u043e\u0440\u043f\u043e\u0440\u0430\u0442\u0438\u0432\u043d\u043e\u0457 \u0437\u0432\u0456\u0442\u043d\u043e\u0441\u0442\u0456",
        includes: [
          "ESG Risk Assessment",
          "Double Materiality Assessment",
          "EU Taxonomy Alignment",
          "Climate Risk Assessment",
        ],
        price: "\u20ac30,000 \u2013 \u20ac90,000",
        accent: "from-gold-500 to-gold-600",
        popular: true,
      },
      {
        name: "Full CSDDD",
        desc: "\u041a\u043e\u043c\u043f\u043b\u0435\u043a\u0441\u043d\u0430 \u043f\u0435\u0440\u0435\u0432\u0456\u0440\u043a\u0430 \u043b\u0430\u043d\u0446\u044e\u0433\u0430 \u043f\u043e\u0441\u0442\u0430\u0447\u0430\u043d\u043d\u044f",
        includes: [
          "Human Rights Due Diligence",
          "Environmental Due Diligence",
          "Enhanced Due Diligence (AML/KYC)",
        ],
        price: "\u20ac25,000 \u2013 \u20ac80,000",
        accent: "from-emerald-500 to-green-600",
        popular: false,
      },
    ],
  },
  en: {
    badge: "Packages",
    title: "Comprehensive Packages",
    subtitle: "Optimal service combinations for typical scenarios",
    packages: [
      {
        name: "Market Entry",
        desc: "Essential package for entering the Ukrainian market",
        includes: ["Enhanced Due Diligence (AML/KYC)", "Sanctions Compliance", "ESG Risk Assessment"],
        price: "\u20ac15,000 \u2013 \u20ac50,000",
        accent: "from-blue-500 to-blue-600",
        popular: false,
      },
      {
        name: "CSRD Ukraine Chapter",
        desc: "Full ESG package for corporate reporting",
        includes: [
          "ESG Risk Assessment",
          "Double Materiality Assessment",
          "EU Taxonomy Alignment",
          "Climate Risk Assessment",
        ],
        price: "\u20ac30,000 \u2013 \u20ac90,000",
        accent: "from-gold-500 to-gold-600",
        popular: true,
      },
      {
        name: "Full CSDDD",
        desc: "Comprehensive supply chain verification",
        includes: [
          "Human Rights Due Diligence",
          "Environmental Due Diligence",
          "Enhanced Due Diligence (AML/KYC)",
        ],
        price: "\u20ac25,000 \u2013 \u20ac80,000",
        accent: "from-emerald-500 to-green-600",
        popular: false,
      },
    ],
  },
};

const ctaContent = {
  uk: {
    title: "\u0417\u0430\u043c\u043e\u0432\u0438\u0442\u0438 Due Diligence",
    description:
      "\u0417\u0430\u043b\u0438\u0448\u0442\u0435 \u0437\u0430\u044f\u0432\u043a\u0443 \u2014 \u043d\u0430\u0448 \u0444\u0430\u0445\u0456\u0432\u0435\u0446\u044c \u0437\u0432\u2019\u044f\u0436\u0435\u0442\u044c\u0441\u044f \u0437 \u0432\u0430\u043c\u0438 \u043f\u0440\u043e\u0442\u044f\u0433\u043e\u043c \u0440\u043e\u0431\u043e\u0447\u043e\u0433\u043e \u0434\u043d\u044f \u0434\u043b\u044f \u0431\u0435\u0437\u043a\u043e\u0448\u0442\u043e\u0432\u043d\u043e\u0457 \u043a\u043e\u043d\u0441\u0443\u043b\u044c\u0442\u0430\u0446\u0456\u0457.",
    cta: "\u0417\u0430\u043c\u043e\u0432\u0438\u0442\u0438 Due Diligence",
    ctaSecondary: "\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u0438",
  },
  en: {
    title: "Order Due Diligence",
    description:
      "Submit your request \u2014 our specialist will contact you within one business day for a free consultation.",
    cta: "Order Due Diligence",
    ctaSecondary: "Contact Us",
  },
};

// ── Component ───────────────────────────────────────────────────────────────

export default function EuCompliancePage() {
  const params = useParams();
  const locale = (params.locale as string) === "en" ? "en" : "uk";

  const hero = heroContent[locale];
  const directives = directivesContent[locale];
  const servicesLabels = servicesContent[locale];
  const why = whyContent[locale];
  const clients = clientsContent[locale];
  const packages = packagesContent[locale];
  const cta = ctaContent[locale];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
        <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-20" />
        <div className="absolute top-20 right-[15%] w-72 h-72 bg-gold-500/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 left-[10%] w-96 h-96 bg-navy-600/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />

        {/* EU stars motif */}
        <div className="absolute top-16 left-[8%] opacity-10">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const cx = 60 + 45 * Math.cos(angle - Math.PI / 2);
              const cy = 60 + 45 * Math.sin(angle - Math.PI / 2);
              return (
                <polygon
                  key={i}
                  points={`${cx},${cy - 6} ${cx + 2},${cy - 2} ${cx + 6},${cy - 2} ${cx + 3},${cy + 1} ${cx + 4},${cy + 6} ${cx},${cy + 3} ${cx - 4},${cy + 6} ${cx - 3},${cy + 1} ${cx - 6},${cy - 2} ${cx - 2},${cy - 2}`}
                  fill="#EAB308"
                />
              );
            })}
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/30 rounded-full mb-8">
              <Globe className="h-4 w-4 text-gold-400" />
              <span className="text-sm font-medium text-gold-400">
                {hero.badge}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1] mb-6">
              {hero.title}
            </h1>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
              {hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/orders/new`}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-bold text-base px-10 h-14 shadow-gold-glow transition-all duration-300 hover:scale-105"
                >
                  {cta.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#directives">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 text-base px-10 h-14"
                >
                  {locale === "uk" ? "Директиви ЄС" : "EU Directives"}
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ── EU Directives Grid ───────────────────────────────────────── */}
      <section id="directives" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-50 border border-gold-200 rounded-full text-xs font-medium text-gold-700 mb-4">
              {directives.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 mb-4">
              {directives.title}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              {directives.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {directives.directives.map((dir) => {
              const Icon = dir.icon;
              return (
                <Card
                  key={dir.code}
                  className="group border-slate-200 hover:shadow-2xl hover:shadow-navy-900/10 hover:-translate-y-1 hover:border-gold-500/50 transition-all duration-500 overflow-hidden"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`shrink-0 w-10 h-10 bg-gradient-to-br ${dir.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gold-600 bg-gold-50 px-2.5 py-1 rounded-md">
                          {dir.code}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="font-serif text-navy-900 text-base leading-tight">
                      {dir.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        {locale === "uk" ? "Вимагає" : "Requires"}
                      </p>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {dir.requires}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        {locale === "uk" ? "Для кого" : "Applies to"}
                      </p>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {dir.appliesTo}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-100">
                      <p className="text-[10px] font-semibold text-gold-600 uppercase tracking-wider mb-1">
                        {locale === "uk" ? "МІВРУ надає" : "IIRDU provides"}
                      </p>
                      <p className="text-navy-900 text-sm font-medium leading-relaxed">
                        {dir.provides}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Services List (10 services) ──────────────────────────────── */}
      <section className="section-padding bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-gold bg-dot-32 opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-50 border border-gold-200 rounded-full text-xs font-medium text-gold-700 mb-4">
              {servicesLabels.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 mb-4">
              {servicesLabels.title}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              {servicesLabels.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {euCategory.services.map((svc) => {
              const Icon = EU_SERVICE_ICON_MAP[svc.id] || Globe;
              const directive = EU_SERVICE_DIRECTIVE_MAP[svc.id] || "";
              return (
                <div
                  key={svc.id}
                  className="group relative bg-white rounded-xl border border-slate-200 p-6 md:p-8
                    transition-all duration-500 ease-out
                    hover:shadow-2xl hover:shadow-navy-900/10
                    hover:-translate-y-1 hover:border-gold-500/50 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-navy-900/0 to-gold-500/0 group-hover:from-navy-900/[0.02] group-hover:to-gold-500/[0.04] transition-all duration-500 rounded-xl" />
                  <div className="relative">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold text-gold-600 bg-gold-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                            {directive}
                          </span>
                        </div>
                        <h3 className="font-serif font-bold text-lg text-navy-900">
                          {locale === "uk" ? svc.nameUk : svc.nameEn}
                        </h3>
                      </div>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">
                      {locale === "uk" ? svc.descriptionUk : svc.descriptionEn}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-navy-900 font-bold text-base">
                        <DollarSign className="h-4 w-4 text-gold-500" />
                        {formatEuPrice(svc)}
                      </span>
                      <Link href={`/${locale}/orders/new`}>
                        <span className="flex items-center text-gold-600 font-semibold text-xs group-hover:text-gold-700 transition-colors duration-300 cursor-pointer">
                          {locale === "uk" ? "Замовити" : "Order"}
                          <ArrowRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className="accent-line" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why MIVRU ────────────────────────────────────────────────── */}
      <section className="section-padding bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/30 rounded-full text-xs font-medium text-gold-400 mb-4">
              {why.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
              {why.title}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              {why.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {why.advantages.map((adv) => {
              const Icon = adv.icon;
              return (
                <div
                  key={adv.title}
                  className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8
                    hover:bg-white/[0.08] hover:border-gold-500/30 transition-all duration-500"
                >
                  <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="h-6 w-6 text-gold-400" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-white mb-3">
                    {adv.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {adv.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Client Segments ──────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-50 border border-gold-200 rounded-full text-xs font-medium text-gold-700 mb-4">
              {clients.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 mb-4">
              {clients.title}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              {clients.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.segments.map((seg) => {
              const Icon = seg.icon;
              return (
                <Card
                  key={seg.title}
                  className="group border-slate-200 hover:shadow-2xl hover:shadow-navy-900/10 hover:-translate-y-1 hover:border-gold-500/50 transition-all duration-500 overflow-hidden"
                >
                  <CardHeader className="pb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-navy-800 to-navy-900 rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <Icon className="h-6 w-6 text-gold-400" />
                    </div>
                    <CardTitle className="font-serif text-navy-900 text-lg">
                      {seg.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        {locale === "uk" ? "Приклади" : "Examples"}
                      </p>
                      <p className="text-slate-500 text-sm">{seg.examples}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-gold-600 uppercase tracking-wider mb-1">
                        {locale === "uk" ? "Потреби" : "Needs"}
                      </p>
                      <p className="text-navy-900 text-sm font-medium">
                        {seg.needs}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Packages ─────────────────────────────────────────────────── */}
      <section className="section-padding bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-gold bg-dot-32 opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-50 border border-gold-200 rounded-full text-xs font-medium text-gold-700 mb-4">
              {packages.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 mb-4">
              {packages.title}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              {packages.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {packages.packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative bg-white rounded-2xl border p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-navy-900/10 hover:-translate-y-1 overflow-hidden ${
                  pkg.popular
                    ? "border-gold-500/50 shadow-xl shadow-navy-900/10 ring-2 ring-gold-500/20"
                    : "border-slate-200 hover:border-gold-500/50"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-6">
                    <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-gold-500 to-gold-600 rounded-b-lg text-navy-900 text-[10px] font-bold uppercase tracking-wider shadow-lg">
                      <Star className="h-3 w-3" />
                      {locale === "uk" ? "Популярний" : "Popular"}
                    </div>
                  </div>
                )}

                <div
                  className={`w-12 h-12 bg-gradient-to-br ${pkg.accent} rounded-xl flex items-center justify-center shadow-lg mb-6`}
                >
                  <Package className="h-6 w-6 text-white" />
                </div>

                <h3 className="font-serif font-bold text-xl text-navy-900 mb-2">
                  {pkg.name}
                </h3>
                <p className="text-slate-500 text-sm mb-6">{pkg.desc}</p>

                <div className="space-y-3 mb-8">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    {locale === "uk" ? "Включає" : "Includes"}
                  </p>
                  {pkg.includes.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle className="h-4 w-4 text-gold-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-navy-900 font-bold text-lg">
                      {pkg.price}
                    </span>
                  </div>
                  <Link href={`/${locale}/orders/new`} className="block">
                    <Button
                      className={`w-full font-bold h-11 transition-all duration-300 hover:scale-105 ${
                        pkg.popular
                          ? "bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 shadow-gold-glow"
                          : "bg-navy-900 hover:bg-navy-800 text-white"
                      }`}
                    >
                      {locale === "uk" ? "Замовити" : "Order"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 relative">
          <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-20" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold-500/5 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
                {cta.title}
              </h2>
              <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto leading-relaxed">
                {cta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${locale}/orders/new`}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-bold text-base px-10 h-14 shadow-gold-glow transition-all duration-300 hover:scale-105"
                  >
                    {cta.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href={`/${locale}/contacts`}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 text-base px-10 h-14"
                  >
                    {cta.ctaSecondary}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
