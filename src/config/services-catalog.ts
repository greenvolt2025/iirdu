/**
 * МІВРУ / IIRDU — Comprehensive Services Catalog
 *
 * Міжнародний інститут відновлення та розвитку України
 * International Institute for Reconstruction and Development of Ukraine
 *
 * This catalog defines all service lines offered by IIRDU for
 * scientific-legal conclusions (науково-правові висновки),
 * damage assessment, risk analysis, EU compliance, and related services.
 */

// ============================================================================
// Types
// ============================================================================

export interface ServiceCategory {
  id: string;
  nameUk: string;
  nameEn: string;
  descriptionUk: string;
  descriptionEn: string;
  icon: string; // lucide icon name
  color: string; // gradient classes
  quantumEnabled: boolean; // whether quantum computing is used
  services: ServiceItem[];
}

export interface ServiceItem {
  id: string;
  nameUk: string;
  nameEn: string;
  descriptionUk: string;
  descriptionEn: string;
  methodology: string[];
  targetClients: { uk: string; en: string }[];
  priceRange: { min: number; max: number; currency: string };
  turnaroundDays: { min: number; max: number };
  quantumEnhanced?: boolean; // uses quantum computing for calculations
  quantumDescriptionUk?: string;
  quantumDescriptionEn?: string;
}

export interface ServicePackage {
  id: string;
  nameUk: string;
  nameEn: string;
  descriptionUk: string;
  descriptionEn: string;
  includedServiceIds: string[];
  priceRange: { min: number; max: number; currency: string };
  discountPercent: number;
}

// ============================================================================
// Quantum Computing Descriptions
// ============================================================================

export const QUANTUM_DESCRIPTION_UK =
  "Для підвищення точності розрахунків МІВРУ використовує квантові обчислення — технологію, що дозволяє обробляти мільйони сценаріїв одночасно. Це забезпечує більш точне моделювання ризиків, оптимізацію кошторисів та фінансовий аналіз на рівні, недосяжному для класичних комп'ютерів.";

export const QUANTUM_DESCRIPTION_EN =
  "To enhance calculation accuracy, IIRDU utilizes quantum computing — a technology that processes millions of scenarios simultaneously. This enables more precise risk modeling, cost estimate optimization, and financial analysis at a level unattainable by classical computers.";

// ============================================================================
// Category IDs (for type-safe references)
// ============================================================================

export const CATEGORY_IDS = {
  DAMAGE_ASSESSMENT: "damage-assessment",
  RISK_ASSESSMENT: "risk-assessment",
  EU_COMPLIANCE: "eu-compliance",
  ECONOMIC_ANALYSIS: "economic-analysis",
  LEGAL_SUPPORT: "legal-support",
  CONTRACT_ANALYSIS: "contract-analysis",
  CONSULTING: "consulting",
  ENVIRONMENTAL: "environmental",
  EU_MARKET_ACCESS: "eu-market-access",
} as const;

export type CategoryId = (typeof CATEGORY_IDS)[keyof typeof CATEGORY_IDS];

// ============================================================================
// 1. Damage Assessment (Оцінка збитків)
// ============================================================================

const damageAssessmentCategory: ServiceCategory = {
  id: CATEGORY_IDS.DAMAGE_ASSESSMENT,
  nameUk: "Оцінка збитків",
  nameEn: "Damage Assessment",
  descriptionUk:
    "Науково-правові висновки з оцінки збитків за міжнародними методиками RDNA/DaLA Світового банку, ЄК та ООН. Рекомендовані Радою Європи для подання до RD4U та Міжнародної комісії з претензій (Конвенція CETS 225, грудень 2025).",
  descriptionEn:
    "Scientific-legal conclusions on damage assessment using World Bank/EC/UN RDNA/DaLA methodologies. Recommended by the Council of Europe for RD4U and the International Claims Commission (CETS 225 Convention, December 2025).",
  icon: "Building2",
  color: "from-red-500 to-rose-600",
  quantumEnabled: true,
  services: [
    {
      id: "rdna-assessment",
      nameUk: "RDNA оцінка збитків",
      nameEn: "RDNA Damage Assessment",
      descriptionUk:
        "Оцінка прямих фізичних збитків інфраструктурі за методикою Rapid Damage and Needs Assessment (RDNA) Світового банку. Включає документування пошкоджень, розрахунок вартості відновлення та визначення потреб.",
      descriptionEn:
        "Assessment of direct physical damage to infrastructure using the World Bank's Rapid Damage and Needs Assessment (RDNA) methodology. Includes damage documentation, recovery cost estimation, and needs determination.",
      methodology: ["RDNA3", "DaLA", "World Bank Standards", "CMU Resolution 326-2022"],
      targetClients: [
        { uk: "Органи державної влади", en: "Government authorities" },
        { uk: "Міжнародні донори", en: "International donors" },
        { uk: "Власники об'єктів інфраструктури", en: "Infrastructure asset owners" },
        { uk: "Страхові компанії", en: "Insurance companies" },
      ],
      priceRange: { min: 15000, max: 150000, currency: "EUR" },
      turnaroundDays: { min: 15, max: 45 },
    },
    {
      id: "international-claims",
      nameUk: "Документування для міжнародних претензій",
      nameEn: "War Damage Documentation for International Claims",
      descriptionUk:
        "Підготовка доказової бази та документування воєнних збитків для подання до міжнародних компенсаційних органів, включаючи RD4U, ICC та інші механізми. Відповідність вимогам міжнародного права.",
      descriptionEn:
        "Preparation of evidence base and war damage documentation for submission to international compensation bodies, including RD4U, ICC, and other mechanisms. Compliance with international law requirements.",
      methodology: ["RDNA", "IHL Documentation Standards", "ICC Evidence Standards", "RD4U Guidelines"],
      targetClients: [
        { uk: "Держава Україна (як позивач)", en: "State of Ukraine (as claimant)" },
        { uk: "Юридичні особи — власники активів", en: "Legal entities — asset owners" },
        { uk: "Фізичні особи — постраждалі", en: "Individuals — affected persons" },
        { uk: "Міжнародні юридичні фірми", en: "International law firms" },
      ],
      priceRange: { min: 20000, max: 200000, currency: "EUR" },
      turnaroundDays: { min: 20, max: 60 },
    },
    {
      id: "environmental-damage",
      nameUk: "Оцінка екологічних збитків",
      nameEn: "Environmental Damage Assessment",
      descriptionUk:
        "Оцінка шкоди навколишньому середовищу внаслідок воєнних дій: забруднення ґрунтів, водних ресурсів, повітря, знищення екосистем. Розрахунок вартості екологічної ремедіації та відновлення.",
      descriptionEn:
        "Assessment of environmental damage caused by military actions: soil contamination, water resources, air pollution, ecosystem destruction. Calculation of ecological remediation and restoration costs.",
      methodology: ["EU ELD", "UNEP Post-Conflict Environmental Assessment", "ISO 14001", "ESIA"],
      targetClients: [
        { uk: "Міністерство екології", en: "Ministry of Environment" },
        { uk: "Міжнародні екологічні організації", en: "International environmental organizations" },
        { uk: "Муніципалітети", en: "Municipalities" },
        { uk: "Агропідприємства", en: "Agricultural enterprises" },
      ],
      priceRange: { min: 25000, max: 250000, currency: "EUR" },
      turnaroundDays: { min: 25, max: 60 },
    },
    {
      id: "agricultural-damage",
      nameUk: "Оцінка збитків агросектору",
      nameEn: "Agricultural Damage & Loss Assessment",
      descriptionUk:
        "Оцінка збитків сільськогосподарського сектору: знищення посівів, тваринництва, техніки, інфраструктури зберігання та переробки. Розрахунок втрат врожаю та упущеного прибутку.",
      descriptionEn:
        "Assessment of agricultural sector damages: destruction of crops, livestock, equipment, storage and processing infrastructure. Calculation of harvest losses and lost profits.",
      methodology: ["FAO Damage Assessment", "DaLA Agriculture Module", "RDNA3", "KSE Methodology"],
      targetClients: [
        { uk: "Агрохолдинги", en: "Agricultural holdings" },
        { uk: "Фермерські господарства", en: "Farming enterprises" },
        { uk: "Страхові компанії", en: "Insurance companies" },
        { uk: "Міжнародні донори (FAO, USAID)", en: "International donors (FAO, USAID)" },
      ],
      priceRange: { min: 15000, max: 120000, currency: "EUR" },
      turnaroundDays: { min: 15, max: 40 },
    },
    {
      id: "cultural-heritage",
      nameUk: "Оцінка шкоди культурній спадщині",
      nameEn: "Cultural Heritage Damage Assessment",
      descriptionUk:
        "Оцінка пошкоджень об'єктів культурної спадщини, пам'яток архітектури, музеїв, бібліотек та інших культурних цінностей. Документування для ЮНЕСКО та міжнародних механізмів захисту.",
      descriptionEn:
        "Assessment of damage to cultural heritage sites, architectural monuments, museums, libraries, and other cultural assets. Documentation for UNESCO and international protection mechanisms.",
      methodology: ["UNESCO Damage Assessment", "ICOMOS Guidelines", "Hague Convention Standards", "RDNA Cultural Heritage Module"],
      targetClients: [
        { uk: "Міністерство культури", en: "Ministry of Culture" },
        { uk: "ЮНЕСКО", en: "UNESCO" },
        { uk: "Музеї та бібліотеки", en: "Museums and libraries" },
        { uk: "Релігійні громади", en: "Religious communities" },
      ],
      priceRange: { min: 10000, max: 80000, currency: "EUR" },
      turnaroundDays: { min: 20, max: 45 },
    },
    {
      id: "lost-profits",
      nameUk: "Розрахунок упущеної вигоди",
      nameEn: "Lost Profits Calculation",
      descriptionUk:
        "Фінансовий розрахунок упущеної вигоди підприємств та фізичних осіб внаслідок воєнних дій. DCF-моделювання, аналіз контрфактичних сценаріїв, прогнозування грошових потоків із застосуванням квантових обчислень.",
      descriptionEn:
        "Financial calculation of lost profits for businesses and individuals resulting from military actions. DCF modeling, counterfactual scenario analysis, cash flow forecasting enhanced by quantum computing.",
      methodology: ["DCF Analysis", "But-For Scenario Analysis", "Comparable Transactions", "Expert Quantification"],
      targetClients: [
        { uk: "Підприємства, що зазнали збитків", en: "Businesses that suffered losses" },
        { uk: "Індивідуальні підприємці", en: "Individual entrepreneurs" },
        { uk: "Юридичні фірми (для судових справ)", en: "Law firms (for litigation)" },
        { uk: "Страхові компанії", en: "Insurance companies" },
      ],
      priceRange: { min: 5000, max: 60000, currency: "EUR" },
      turnaroundDays: { min: 10, max: 30 },
      quantumEnhanced: true,
      quantumDescriptionUk:
        "Квантові обчислення використовуються для одночасного моделювання мільйонів сценаріїв DCF, що дозволяє точніше визначити діапазон упущеної вигоди та врахувати кореляції між ризик-факторами.",
      quantumDescriptionEn:
        "Quantum computing is used to simultaneously model millions of DCF scenarios, enabling more precise determination of lost profit ranges and accounting for correlations between risk factors.",
    },
    {
      id: "socio-demographic-assessment",
      nameUk: "Соціально-демографічна оцінка (HCA/IDP)",
      nameEn: "Socio-Demographic Assessment (HCA/IDP)",
      descriptionUk:
        "Оцінка соціально-демографічних наслідків воєнних дій: аналіз людського капіталу (HCA), внутрішньо переміщені особи (IDP), демографічні зміни, вплив на ринок праці. Методика Світового банку RDNA4 + UNHCR стандарти.",
      descriptionEn:
        "Assessment of socio-demographic consequences of military actions: Human Capital Approach (HCA), Internally Displaced Persons (IDP), demographic changes, labor market impact. World Bank RDNA4 + UNHCR standards.",
      methodology: ["Human Capital Approach (HCA)", "UNHCR IDP Profiling Standards", "RDNA4 Social Sector", "Demographic Impact Analysis"],
      targetClients: [
        { uk: "Міжнародні організації (UNHCR, IOM)", en: "International organizations (UNHCR, IOM)" },
        { uk: "Місцеві громади та муніципалітети", en: "Local communities and municipalities" },
        { uk: "Державні органи (Мінреінтеграції)", en: "Government agencies (Ministry of Reintegration)" },
        { uk: "Донори та фонди відновлення", en: "Donors and reconstruction funds" },
      ],
      priceRange: { min: 10000, max: 50000, currency: "EUR" },
      turnaroundDays: { min: 15, max: 30 },
    },
  ],
};

// ============================================================================
// 2. Risk Assessment (Оцінка ризиків)
// ============================================================================

const riskAssessmentCategory: ServiceCategory = {
  id: CATEGORY_IDS.RISK_ASSESSMENT,
  nameUk: "Оцінка ризиків",
  nameEn: "Risk Assessment",
  descriptionUk:
    "Науково обґрунтована оцінка ризиків для інвестиційних проєктів, відновлення інфраструктури та операцій в Україні. Використання міжнародних стандартів ISO 31000, COSO ERM, FAIR та квантових обчислень.",
  descriptionEn:
    "Scientifically grounded risk assessment for investment projects, infrastructure reconstruction, and operations in Ukraine. Using international standards ISO 31000, COSO ERM, FAIR, and quantum computing.",
  icon: "ShieldAlert",
  color: "from-amber-500 to-orange-600",
  quantumEnabled: true,
  services: [
    {
      id: "investment-risk",
      nameUk: "Оцінка інвестиційних ризиків (ISO 31000)",
      nameEn: "Investment Risk Assessment",
      descriptionUk:
        "Комплексна оцінка ризиків інвестиційних проєктів в Україні за стандартом ISO 31000. Ідентифікація, аналіз та ранжування ризиків із розробкою стратегій мітигації. Квантове моделювання для оптимального розподілу капіталу.",
      descriptionEn:
        "Comprehensive investment project risk assessment in Ukraine per ISO 31000 standard. Identification, analysis, and ranking of risks with mitigation strategy development. Quantum modeling for optimal capital allocation.",
      methodology: ["ISO 31000", "Monte Carlo Simulation", "VaR/CVaR", "Sensitivity Analysis"],
      targetClients: [
        { uk: "Міжнародні інвестори", en: "International investors" },
        { uk: "Інвестиційні фонди", en: "Investment funds" },
        { uk: "DFI (IFC, EBRD, EIB)", en: "DFIs (IFC, EBRD, EIB)" },
        { uk: "Банки та фінансові установи", en: "Banks and financial institutions" },
      ],
      priceRange: { min: 5000, max: 25000, currency: "EUR" },
      turnaroundDays: { min: 10, max: 20 },
      quantumEnhanced: true,
      quantumDescriptionUk:
        "Квантові обчислення дозволяють одночасно оцінити тисячі інвестиційних сценаріїв та знайти оптимальний розподіл портфеля з урахуванням усіх ризик-факторів.",
      quantumDescriptionEn:
        "Quantum computing enables simultaneous evaluation of thousands of investment scenarios and finding optimal portfolio allocation considering all risk factors.",
    },
    {
      id: "geopolitical-risk",
      nameUk: "Геополітичний та безпековий ризик",
      nameEn: "Geopolitical & Security Risk Assessment",
      descriptionUk:
        "Оцінка геополітичних та безпекових ризиків для операцій в Україні та регіоні. Аналіз ескалаційних сценаріїв, впливу на бізнес-процеси та рекомендації щодо безперервності діяльності.",
      descriptionEn:
        "Geopolitical and security risk assessment for operations in Ukraine and the region. Escalation scenario analysis, business process impact evaluation, and business continuity recommendations.",
      methodology: ["Scenario Analysis", "Political Risk Frameworks", "BCP/BCM Standards", "Intelligence Analysis"],
      targetClients: [
        { uk: "Міжнародні корпорації", en: "International corporations" },
        { uk: "Страхові компанії (political risk)", en: "Insurance companies (political risk)" },
        { uk: "Дипломатичні місії", en: "Diplomatic missions" },
        { uk: "Міжнародні організації", en: "International organizations" },
      ],
      priceRange: { min: 10000, max: 40000, currency: "EUR" },
      turnaroundDays: { min: 15, max: 25 },
    },
    {
      id: "country-risk",
      nameUk: "Країновий/регіональний ризик",
      nameEn: "Country & Regional Risk Assessment",
      descriptionUk:
        "Комплексна оцінка країнового та регіонального ризику України: макроекономічний, політичний, правовий, операційний. Порівняння з бенчмарками для прийняття інвестиційних рішень.",
      descriptionEn:
        "Comprehensive country and regional risk assessment for Ukraine: macroeconomic, political, legal, operational. Benchmark comparison for investment decision-making.",
      methodology: ["Country Risk Rating Models", "PESTEL Analysis", "Sovereign Risk Assessment", "Regional Benchmarking"],
      targetClients: [
        { uk: "Суверенні фонди", en: "Sovereign wealth funds" },
        { uk: "Рейтингові агентства", en: "Rating agencies" },
        { uk: "Міжнародні банки", en: "International banks" },
        { uk: "Експортно-кредитні агентства", en: "Export credit agencies" },
      ],
      priceRange: { min: 15000, max: 80000, currency: "EUR" },
      turnaroundDays: { min: 15, max: 30 },
    },
    {
      id: "project-risk",
      nameUk: "Ризик проєкту відновлення",
      nameEn: "Reconstruction Project Risk Assessment",
      descriptionUk:
        "Оцінка ризиків проєктів відновлення інфраструктури: технічних, фінансових, логістичних, безпекових. Квантова оптимізація для визначення оптимальних термінів та бюджетів.",
      descriptionEn:
        "Risk assessment for infrastructure reconstruction projects: technical, financial, logistical, security. Quantum optimization for determining optimal timelines and budgets.",
      methodology: ["PMBOK Risk Management", "ISO 31000", "Monte Carlo Simulation", "Critical Chain Analysis"],
      targetClients: [
        { uk: "Підрядники відновлення", en: "Reconstruction contractors" },
        { uk: "Замовники проєктів", en: "Project owners" },
        { uk: "Міжнародні донори", en: "International donors" },
        { uk: "Державні замовники", en: "Government clients" },
      ],
      priceRange: { min: 8000, max: 35000, currency: "EUR" },
      turnaroundDays: { min: 12, max: 25 },
      quantumEnhanced: true,
      quantumDescriptionUk:
        "Квантова оптимізація використовується для аналізу тисяч комбінацій термінів, ресурсів та бюджетів проєктів, забезпечуючи оптимальний баланс ризику та ефективності.",
      quantumDescriptionEn:
        "Quantum optimization is used to analyze thousands of combinations of project timelines, resources, and budgets, ensuring an optimal balance of risk and efficiency.",
    },
    {
      id: "supply-chain-risk",
      nameUk: "Ризик ланцюгів постачання",
      nameEn: "Supply Chain Risk Assessment",
      descriptionUk:
        "Оцінка ризиків ланцюгів постачання для відновлення: логістичні маршрути, залежність від постачальників, санкційні ризики, митні процедури, транспортна безпека.",
      descriptionEn:
        "Supply chain risk assessment for reconstruction: logistics routes, supplier dependencies, sanctions risks, customs procedures, transport security.",
      methodology: ["Supply Chain Risk Mapping", "SCOR Model", "Supplier Audit", "Route Risk Analysis"],
      targetClients: [
        { uk: "Генеральні підрядники", en: "General contractors" },
        { uk: "Логістичні компанії", en: "Logistics companies" },
        { uk: "Імпортери будматеріалів", en: "Construction material importers" },
        { uk: "Міжнародні організації", en: "International organizations" },
      ],
      priceRange: { min: 6000, max: 18000, currency: "EUR" },
      turnaroundDays: { min: 10, max: 20 },
    },
    {
      id: "cybersecurity-risk",
      nameUk: "Кібербезпека критичної інфраструктури",
      nameEn: "Critical Infrastructure Cybersecurity Risk",
      descriptionUk:
        "Оцінка кіберризиків критичної інфраструктури України: енергетика, транспорт, фінанси, телекомунікації. Аналіз загроз, вразливостей та відповідності NIS2/NIST.",
      descriptionEn:
        "Cyber risk assessment for Ukraine's critical infrastructure: energy, transport, finance, telecommunications. Threat analysis, vulnerability assessment, and NIS2/NIST compliance.",
      methodology: ["NIST CSF", "ISO 27001/27005", "NIS2 Compliance Framework", "MITRE ATT&CK"],
      targetClients: [
        { uk: "Оператори критичної інфраструктури", en: "Critical infrastructure operators" },
        { uk: "Державні органи", en: "Government agencies" },
        { uk: "Телекомунікаційні компанії", en: "Telecommunications companies" },
        { uk: "Фінансові установи", en: "Financial institutions" },
      ],
      priceRange: { min: 15000, max: 50000, currency: "EUR" },
      turnaroundDays: { min: 15, max: 30 },
    },
    {
      id: "insurance-risk",
      nameUk: "Страховий ризик",
      nameEn: "Insurance Risk Assessment (FAIR)",
      descriptionUk:
        "Актуарна оцінка страхових ризиків для проєктів відновлення та інвестицій в Україні. Моделювання за методологією FAIR із квантовим прискоренням для складних актуарних розрахунків.",
      descriptionEn:
        "Actuarial insurance risk assessment for reconstruction projects and investments in Ukraine. FAIR methodology modeling with quantum acceleration for complex actuarial calculations.",
      methodology: ["FAIR (Factor Analysis of Information Risk)", "Actuarial Standards", "Solvency II", "Loss Distribution Analysis"],
      targetClients: [
        { uk: "Страхові компанії", en: "Insurance companies" },
        { uk: "Перестрахувальники", en: "Reinsurance companies" },
        { uk: "Страхові брокери", en: "Insurance brokers" },
        { uk: "Ризик-менеджери підприємств", en: "Enterprise risk managers" },
      ],
      priceRange: { min: 8000, max: 30000, currency: "EUR" },
      turnaroundDays: { min: 12, max: 25 },
      quantumEnhanced: true,
      quantumDescriptionUk:
        "Квантові обчислення дозволяють виконувати складні актуарні розрахунки з мільйонами сценаріїв збитків, забезпечуючи точніше ціноутворення страхових продуктів для високоризикових ринків.",
      quantumDescriptionEn:
        "Quantum computing enables complex actuarial calculations with millions of loss scenarios, providing more accurate pricing of insurance products for high-risk markets.",
    },
    {
      id: "energy-risk",
      nameUk: "Ризик енергетичного сектору",
      nameEn: "Energy Sector Risk & Resilience",
      descriptionUk:
        "Комплексна оцінка ризиків енергетичного сектору: генерація, передача, розподіл. Аналіз стійкості системи, ризиків децентралізації та переходу на відновлювані джерела.",
      descriptionEn:
        "Comprehensive energy sector risk assessment: generation, transmission, distribution. System resilience analysis, decentralization risks, and renewable energy transition risks.",
      methodology: ["Energy Security Assessment", "Grid Resilience Analysis", "NERC CIP", "EU Energy Risk Frameworks"],
      targetClients: [
        { uk: "Енергогенеруючі компанії", en: "Power generation companies" },
        { uk: "Мережеві оператори", en: "Grid operators" },
        { uk: "Інвестори в ВДЕ", en: "Renewable energy investors" },
        { uk: "Міжнародні фінансові установи", en: "International financial institutions" },
      ],
      priceRange: { min: 20000, max: 100000, currency: "EUR" },
      turnaroundDays: { min: 20, max: 35 },
    },
    {
      id: "fraud-risk",
      nameUk: "Ризик шахрайства в реконструкції",
      nameEn: "Fraud Risk in Reconstruction (COSO)",
      descriptionUk:
        "Оцінка ризиків шахрайства та корупції у програмах відновлення. Аналіз за методологією COSO, виявлення червоних прапорів, рекомендації щодо внутрішнього контролю та моніторингу.",
      descriptionEn:
        "Fraud and corruption risk assessment in reconstruction programs. COSO methodology analysis, red flag identification, recommendations for internal controls and monitoring.",
      methodology: ["COSO Internal Controls", "ACFE Fraud Risk Assessment", "Forensic Analysis", "Red Flag Analysis"],
      targetClients: [
        { uk: "Міжнародні донори", en: "International donors" },
        { uk: "Антикорупційні органи", en: "Anti-corruption agencies" },
        { uk: "Державні замовники", en: "Government clients" },
        { uk: "Аудиторські фірми", en: "Audit firms" },
      ],
      priceRange: { min: 12000, max: 45000, currency: "EUR" },
      turnaroundDays: { min: 15, max: 30 },
    },
    {
      id: "climate-risk",
      nameUk: "Кліматичний ризик",
      nameEn: "Climate Risk Assessment",
      descriptionUk:
        "Оцінка кліматичних ризиків для інфраструктури та проєктів відновлення: фізичні ризики (повені, спека, посухи), перехідні ризики (регуляторні, технологічні). Квантове моделювання кліматичних сценаріїв.",
      descriptionEn:
        "Climate risk assessment for infrastructure and reconstruction projects: physical risks (floods, heat, droughts), transition risks (regulatory, technological). Quantum climate scenario modeling.",
      methodology: ["TCFD Framework", "RCP/SSP Climate Scenarios", "Physical Risk Modeling", "EU Taxonomy Climate Criteria"],
      targetClients: [
        { uk: "Інвестори (ESG/TCFD)", en: "Investors (ESG/TCFD)" },
        { uk: "Муніципалітети", en: "Municipalities" },
        { uk: "Інфраструктурні проєкти", en: "Infrastructure projects" },
        { uk: "Страхові компанії", en: "Insurance companies" },
      ],
      priceRange: { min: 12000, max: 60000, currency: "EUR" },
      turnaroundDays: { min: 15, max: 30 },
      quantumEnhanced: true,
      quantumDescriptionUk:
        "Квантові обчислення забезпечують моделювання складних кліматичних сценаріїв із тисячами взаємозалежних параметрів для точнішого прогнозування впливу на інфраструктуру.",
      quantumDescriptionEn:
        "Quantum computing enables modeling of complex climate scenarios with thousands of interdependent parameters for more accurate infrastructure impact forecasting.",
    },
    {
      id: "financial-risk",
      nameUk: "Валютний та фінансовий ризик",
      nameEn: "Currency & Financial Risk",
      descriptionUk:
        "Оцінка валютних, процентних та фінансових ризиків для проєктів в Україні. Моделювання волатильності гривні, аналіз хеджингових стратегій із квантовою оптимізацією портфеля.",
      descriptionEn:
        "Currency, interest rate, and financial risk assessment for projects in Ukraine. Hryvnia volatility modeling, hedging strategy analysis with quantum portfolio optimization.",
      methodology: ["VaR/CVaR Modeling", "Stress Testing", "FX Risk Analysis", "Interest Rate Modeling"],
      targetClients: [
        { uk: "Банки з операціями в Україні", en: "Banks operating in Ukraine" },
        { uk: "Міжнародні інвестори", en: "International investors" },
        { uk: "Казначейства компаній", en: "Corporate treasuries" },
        { uk: "Фінансові директори", en: "CFOs" },
      ],
      priceRange: { min: 8000, max: 25000, currency: "EUR" },
      turnaroundDays: { min: 10, max: 20 },
      quantumEnhanced: true,
      quantumDescriptionUk:
        "Квантові обчислення оптимізують хеджингові стратегії, аналізуючи мільйони комбінацій фінансових інструментів для мінімізації валютного ризику.",
      quantumDescriptionEn:
        "Quantum computing optimizes hedging strategies by analyzing millions of financial instrument combinations to minimize currency risk.",
    },
    {
      id: "monte-carlo-sensitivity",
      nameUk: "Монте-Карло аналіз чутливості (P10/P50/P90)",
      nameEn: "Monte Carlo Sensitivity Analysis (P10/P50/P90)",
      descriptionUk:
        "Стохастичне моделювання збитків методом Монте-Карло з PERT-розподілом: 10 000 ітерацій, довірчі інтервали P10/P50/P90, торнадо-діаграми чутливості. Ідеальне для складних мультифакторних претензій де точкова оцінка недостатня.",
      descriptionEn:
        "Stochastic damage modeling using Monte Carlo method with PERT distribution: 10,000 iterations, P10/P50/P90 confidence intervals, tornado sensitivity diagrams. Ideal for complex multi-factor claims where point estimates are insufficient.",
      methodology: ["Monte Carlo Simulation (PERT)", "Sensitivity Analysis", "Tornado Diagrams", "Probabilistic Risk Assessment"],
      targetClients: [
        { uk: "Арбітражні трибунали та суди", en: "Arbitral tribunals and courts" },
        { uk: "Страхові компанії", en: "Insurance companies" },
        { uk: "Litigation funders", en: "Litigation funders" },
        { uk: "Великі корпоративні позивачі", en: "Large corporate claimants" },
      ],
      priceRange: { min: 8000, max: 35000, currency: "EUR" },
      turnaroundDays: { min: 7, max: 20 },
      quantumEnhanced: true,
      quantumDescriptionUk:
        "Квантові обчислення паралельно обчислюють тисячі сценаріїв PERT-розподілу, скорочуючи час розрахунку та дозволяючи аналіз складних кореляцій між параметрами збитків.",
      quantumDescriptionEn:
        "Quantum computing parallelizes thousands of PERT distribution scenarios, reducing calculation time and enabling analysis of complex correlations between damage parameters.",
    },
    {
      id: "insurance-survey-pml",
      nameUk: "Страхове обстеження PML/MFL/NLE (Lloyd's)",
      nameEn: "Insurance Survey PML/MFL/NLE (Lloyd's Standard)",
      descriptionUk:
        "Страхове обстеження за стандартами Lloyd's: Probable Maximum Loss (PML), Maximum Foreseeable Loss (MFL), Normal Loss Expectancy (NLE). Для страхових компаній, перестрахувальників та великих промислових активів в зонах конфлікту.",
      descriptionEn:
        "Insurance survey per Lloyd's standards: Probable Maximum Loss (PML), Maximum Foreseeable Loss (MFL), Normal Loss Expectancy (NLE). For insurers, reinsurers, and large industrial assets in conflict zones.",
      methodology: ["Lloyd's PML/MFL/NLE Standards", "SCOR Loss Engineering", "Munich Re NatCat", "War Risk Assessment"],
      targetClients: [
        { uk: "Страхові компанії (воєнні ризики)", en: "Insurers (war risk)" },
        { uk: "Перестрахувальники (Lloyd's, Swiss Re)", en: "Reinsurers (Lloyd's, Swiss Re)" },
        { uk: "Промислові підприємства", en: "Industrial enterprises" },
        { uk: "Портові та логістичні оператори", en: "Port and logistics operators" },
      ],
      priceRange: { min: 15000, max: 80000, currency: "EUR" },
      turnaroundDays: { min: 14, max: 30 },
      quantumEnhanced: true,
      quantumDescriptionUk:
        "Квантові алгоритми оптимізують складні багатовимірні розподіли PML, враховуючи кореляції між категоріями ризику та каскадні ефекти воєнних дій.",
      quantumDescriptionEn:
        "Quantum algorithms optimize complex multidimensional PML distributions, accounting for correlations between risk categories and cascading effects of military actions.",
    },
    {
      id: "political-risk-stability",
      nameUk: "Оцінка політичних ризиків та стабільності",
      nameEn: "Political Risk & Stability Assessment",
      descriptionUk:
        "Аналіз політичних ризиків для іноземних компаній, що працюють в Україні: ризики експропріації, валютних обмежень, політичного насильства, невиконання контрактів. Рекомендації щодо страхування політичних ризиків (MIGA, OPIC, Euler Hermes).",
      descriptionEn:
        "Political risk analysis for foreign companies operating in Ukraine: expropriation, currency transfer restrictions, political violence, contract frustration. Political risk insurance recommendations (MIGA, OPIC, Euler Hermes).",
      methodology: ["Political Risk Insurance Frameworks", "MIGA Coverage Analysis", "Country Political Stability Index", "Policy Stability Assessment"],
      targetClients: [
        { uk: "Міжнародні корпорації в Україні", en: "International corporations in Ukraine" },
        { uk: "Страхові компанії (політичні ризики)", en: "Insurance companies (political risks)" },
        { uk: "Експортно-кредитні агентства", en: "Export credit agencies" },
        { uk: "DFI (MIGA, OPIC, UKEF)", en: "DFIs (MIGA, OPIC, UKEF)" },
      ],
      priceRange: { min: 15000, max: 60000, currency: "EUR" },
      turnaroundDays: { min: 15, max: 30 },
    },
    {
      id: "reputational-risk",
      nameUk: "Репутаційні ризики та ESG-контроверсії",
      nameEn: "Reputational Risk & ESG Controversies",
      descriptionUk:
        "Аналіз репутаційних ризиків для іноземних партнерів українських компаній: ESG-контроверсії, порушення прав людини, корупційні скандали, санкційні зв'язки. Медіа-моніторинг, соціальні мережі, міжнародні бази даних.",
      descriptionEn:
        "Reputational risk analysis for foreign partners of Ukrainian companies: ESG controversies, human rights violations, corruption scandals, sanctions connections. Media monitoring, social networks, international databases.",
      methodology: ["RepRisk Platform", "MSCI ESG Controversies", "Media Sentiment Analysis", "Stakeholder Mapping"],
      targetClients: [
        { uk: "Міжнародні банки (клієнтська перевірка)", en: "International banks (client screening)" },
        { uk: "PE/VC фонди", en: "PE/VC funds" },
        { uk: "Корпорації з публічною звітністю", en: "Publicly reporting corporations" },
        { uk: "PR та консалтингові агентства", en: "PR and consulting agencies" },
      ],
      priceRange: { min: 12000, max: 50000, currency: "EUR" },
      turnaroundDays: { min: 10, max: 20 },
    },
    {
      id: "operational-risk-foreign",
      nameUk: "Операційні ризики для іноземних компаній",
      nameEn: "Operational Risk for Foreign Companies",
      descriptionUk:
        "Оцінка операційних ризиків для іноземних компаній в Україні: надійність місцевих партнерів, логістичні виклики, правова інфраструктура, доступність кваліфікованих кадрів, якість субпідрядників.",
      descriptionEn:
        "Operational risk assessment for foreign companies in Ukraine: local partner reliability, logistical challenges, legal infrastructure, qualified personnel availability, subcontractor quality.",
      methodology: ["ISO 31000", "COSO ERM", "Operational Risk Frameworks", "Third-Party Risk Management"],
      targetClients: [
        { uk: "Іноземні генпідрядники", en: "Foreign general contractors" },
        { uk: "Міжнародні виробники", en: "International manufacturers" },
        { uk: "Логістичні оператори", en: "Logistics operators" },
        { uk: "Торговельні мережі", en: "Retail chains" },
      ],
      priceRange: { min: 10000, max: 45000, currency: "EUR" },
      turnaroundDays: { min: 12, max: 25 },
    },
    {
      id: "sanctions-advanced",
      nameUk: "Поглиблена санкційна перевірка",
      nameEn: "Advanced Sanctions Compliance Screening",
      descriptionUk:
        "Поглиблений санкційний скринінг українських партнерів: прямі та непрямі зв'язки з російськими санкційними списками (OFAC, EU, UK), beneficial ownership, схеми circumvention. Рекомендації щодо de-risking.",
      descriptionEn:
        "Advanced sanctions screening of Ukrainian partners: direct and indirect links to Russian sanctions lists (OFAC, EU, UK), beneficial ownership, circumvention schemes. De-risking recommendations.",
      methodology: ["OFAC SDN List", "EU Sanctions Database", "UK OFSI", "World-Check", "Beneficial Ownership Tracing"],
      targetClients: [
        { uk: "Міжнародні банки", en: "International banks" },
        { uk: "Compliance-підрозділи корпорацій", en: "Corporate compliance departments" },
        { uk: "Trade finance провайдери", en: "Trade finance providers" },
        { uk: "Платіжні системи", en: "Payment systems" },
      ],
      priceRange: { min: 10000, max: 40000, currency: "EUR" },
      turnaroundDays: { min: 10, max: 20 },
    },
    {
      id: "oecd-due-diligence",
      nameUk: "OECD Due Diligence українських постачальників",
      nameEn: "OECD Due Diligence for Ukrainian Suppliers",
      descriptionUk:
        "Перевірка українських постачальників за OECD Due Diligence Guidelines: права людини, трудові стандарти, екологія, корупція, conflict minerals. Для міжнародних компаній, що формують ланцюги постачання в Україні.",
      descriptionEn:
        "Ukrainian supplier verification per OECD Due Diligence Guidelines: human rights, labor standards, environment, corruption, conflict minerals. For international companies building supply chains in Ukraine.",
      methodology: ["OECD Due Diligence Guidelines", "UN Guiding Principles (UNGPs)", "ILO Core Conventions", "Conflict Minerals Framework"],
      targetClients: [
        { uk: "Міжнародні виробники (supply chain)", en: "International manufacturers (supply chain)" },
        { uk: "Роздрібні мережі ЄС/США", en: "EU/US retail chains" },
        { uk: "Automotive та electronics OEM", en: "Automotive and electronics OEMs" },
        { uk: "ESG-fund менеджери", en: "ESG fund managers" },
      ],
      priceRange: { min: 8000, max: 35000, currency: "EUR" },
      turnaroundDays: { min: 10, max: 25 },
    },
    {
      id: "ifc-performance-standards",
      nameUk: "Оцінка за IFC Performance Standards",
      nameEn: "IFC Performance Standards Assessment",
      descriptionUk:
        "Аналіз проєктів відновлення на відповідність 8 стандартам IFC: екологічні та соціальні ризики, rights holders, pollution prevention, community health and safety, land acquisition, biodiversity, indigenous peoples, cultural heritage.",
      descriptionEn:
        "Reconstruction project analysis per 8 IFC Performance Standards: environmental and social risks, rights holders, pollution prevention, community health and safety, land acquisition, biodiversity, indigenous peoples, cultural heritage.",
      methodology: ["IFC Performance Standards 2012", "Equator Principles 4", "World Bank ESF", "E&S Risk Categorization"],
      targetClients: [
        { uk: "DFI (IFC, EBRD, EIB, ADB)", en: "DFIs (IFC, EBRD, EIB, ADB)" },
        { uk: "Міжнародні банки проєктного фінансування", en: "International project finance banks" },
        { uk: "Великі інфраструктурні проєкти", en: "Large infrastructure projects" },
        { uk: "Renewable energy девелопери", en: "Renewable energy developers" },
      ],
      priceRange: { min: 20000, max: 100000, currency: "EUR" },
      turnaroundDays: { min: 20, max: 40 },
    },
    {
      id: "equator-principles",
      nameUk: "Відповідність Equator Principles 4",
      nameEn: "Equator Principles 4 Compliance",
      descriptionUk:
        "Аналіз проєктного фінансування на відповідність Equator Principles 4 (EP4): категоризація проєкту (A/B/C), ESIA, Action Plan, Stakeholder Engagement, Independent Review, Covenant Compliance, Reporting.",
      descriptionEn:
        "Project finance analysis per Equator Principles 4 (EP4): project categorization (A/B/C), ESIA, Action Plan, Stakeholder Engagement, Independent Review, Covenant Compliance, Reporting.",
      methodology: ["Equator Principles 4 (2020)", "IFC Performance Standards", "OECD Common Approaches", "Independent E&S Review"],
      targetClients: [
        { uk: "EP-банки (87 financial institutions)", en: "EP banks (87 financial institutions)" },
        { uk: "Проєктні компанії (SPV)", en: "Project companies (SPVs)" },
        { uk: "Незалежні інженери", en: "Independent engineers" },
        { uk: "Юридичні радники (проєктне фінансування)", en: "Legal advisors (project finance)" },
      ],
      priceRange: { min: 25000, max: 120000, currency: "EUR" },
      turnaroundDays: { min: 25, max: 45 },
    },
    {
      id: "transition-risk-net-zero",
      nameUk: "Transition Risk для зеленого відновлення",
      nameEn: "Transition Risk Assessment for Green Recovery",
      descriptionUk:
        "Оцінка transition risk для проєктів відновлення в контексті Net Zero 2050: ризики carbon-intensive секторів, stranded assets, carbon pricing, технологічні зміни. TCFD-сумісна методологія для інвесторів.",
      descriptionEn:
        "Transition risk assessment for reconstruction projects in Net Zero 2050 context: carbon-intensive sector risks, stranded assets, carbon pricing, technological shifts. TCFD-aligned methodology for investors.",
      methodology: ["TCFD Recommendations", "EU Taxonomy", "Science-Based Targets (SBTi)", "NGFS Climate Scenarios"],
      targetClients: [
        { uk: "Asset managers з ESG мандатами", en: "Asset managers with ESG mandates" },
        { uk: "Green bonds емітенти", en: "Green bond issuers" },
        { uk: "Страхові компанії (climate risk)", en: "Insurance companies (climate risk)" },
        { uk: "Банки (TCFD reporting)", en: "Banks (TCFD reporting)" },
      ],
      priceRange: { min: 15000, max: 80000, currency: "EUR" },
      turnaroundDays: { min: 15, max: 30 },
    },
  ],
};

// ============================================================================
// 3. EU Compliance (Due Diligence та відповідність ЄС)
// ============================================================================

const euComplianceCategory: ServiceCategory = {
  id: CATEGORY_IDS.EU_COMPLIANCE,
  nameUk: "Due Diligence та відповідність ЄС",
  nameEn: "Due Diligence & EU Compliance",
  descriptionUk:
    "Науково-правові висновки щодо відповідності європейським регуляторним вимогам: CSRD, CSDDD, DORA, NIS2, EU Taxonomy. Забезпечення доступу до європейських ринків та фінансування.",
  descriptionEn:
    "Scientific-legal conclusions on compliance with European regulatory requirements: CSRD, CSDDD, DORA, NIS2, EU Taxonomy. Ensuring access to European markets and financing.",
  icon: "ClipboardCheck",
  color: "from-blue-500 to-indigo-600",
  quantumEnabled: false,
  services: [
    {
      id: "cbam-verification",
      nameUk: "Верифікація CBAM (Carbon Border Adjustment)",
      nameEn: "CBAM Verification & Reporting",
      descriptionUk:
        "Підготовка та верифікація звітності для Carbon Border Adjustment Mechanism (CBAM) ЄС. Розрахунок вбудованих викидів, визначення ціни вуглецю, підготовка CBAM-декларацій для українських експортерів.",
      descriptionEn:
        "Preparation and verification of EU Carbon Border Adjustment Mechanism (CBAM) reporting. Embedded emissions calculation, carbon price determination, CBAM declaration preparation for Ukrainian exporters.",
      methodology: ["EU CBAM Regulation 2023/956", "ISO 14064", "GHG Protocol", "EU ETS Methodology"],
      targetClients: [
        { uk: "Українські експортери до ЄС (сталь, алюміній, цемент)", en: "Ukrainian exporters to the EU (steel, aluminum, cement)" },
        { uk: "Виробники добрив та хімічної продукції", en: "Fertilizer and chemical producers" },
        { uk: "Металургійні підприємства", en: "Metallurgical enterprises" },
        { uk: "Торговельні компанії", en: "Trading companies" },
      ],
      priceRange: { min: 5000, max: 25000, currency: "EUR" },
      turnaroundDays: { min: 10, max: 25 },
    },
    {
      id: "csrd-esg",
      nameUk: "ESG-оцінка для операцій в Україні (CSRD)",
      nameEn: "ESG Risk Assessment for Ukraine Operations",
      descriptionUk:
        "Оцінка ESG-ризиків для компаній з операціями в Україні відповідно до Директиви CSRD. Підготовка даних для нефінансової звітності, gap-аналіз та дорожня карта відповідності.",
      descriptionEn:
        "ESG risk assessment for companies operating in Ukraine in accordance with the CSRD Directive. Non-financial reporting data preparation, gap analysis, and compliance roadmap.",
      methodology: ["CSRD/ESRS", "GRI Standards", "SASB", "UN SDGs"],
      targetClients: [
        { uk: "Європейські компанії з операціями в Україні", en: "European companies operating in Ukraine" },
        { uk: "Українські експортери до ЄС", en: "Ukrainian exporters to the EU" },
        { uk: "Компанії, що готуються до IPO", en: "Pre-IPO companies" },
        { uk: "Інвестиційні фонди", en: "Investment funds" },
      ],
      priceRange: { min: 8000, max: 25000, currency: "EUR" },
      turnaroundDays: { min: 15, max: 25 },
    },
    {
      id: "double-materiality",
      nameUk: "Подвійна суттєвість (ESRS)",
      nameEn: "Double Materiality Assessment",
      descriptionUk:
        "Оцінка подвійної суттєвості за стандартами ESRS: визначення впливу компанії на суспільство та довкілля, а також впливу ESG-факторів на фінансові результати компанії.",
      descriptionEn:
        "Double materiality assessment per ESRS standards: determining the company's impact on society and environment, and the impact of ESG factors on the company's financial performance.",
      methodology: ["ESRS", "Double Materiality Matrix", "Stakeholder Engagement", "Impact Pathway Analysis"],
      targetClients: [
        { uk: "Великі підприємства (CSRD scope)", en: "Large enterprises (CSRD scope)" },
        { uk: "Аудиторські фірми", en: "Audit firms" },
        { uk: "ESG-консультанти", en: "ESG consultants" },
        { uk: "Корпоративні юристи", en: "Corporate lawyers" },
      ],
      priceRange: { min: 12000, max: 35000, currency: "EUR" },
      turnaroundDays: { min: 20, max: 30 },
    },
    {
      id: "csddd-human-rights",
      nameUk: "Належна обачність — права людини (CSDDD)",
      nameEn: "Human Rights Due Diligence",
      descriptionUk:
        "Оцінка належної обачності щодо прав людини відповідно до Директиви CSDDD. Аналіз ланцюга створення вартості, ідентифікація ризиків примусової праці, дитячої праці та порушень прав.",
      descriptionEn:
        "Human rights due diligence assessment per CSDDD Directive. Value chain analysis, identification of forced labor, child labor, and rights violation risks.",
      methodology: ["CSDDD", "UN Guiding Principles on Business and Human Rights", "OECD Due Diligence Guidance", "ILO Standards"],
      targetClients: [
        { uk: "Компанії під дією CSDDD", en: "Companies subject to CSDDD" },
        { uk: "Постачальники для ЄС-ринку", en: "Suppliers for the EU market" },
        { uk: "Міжнародні бренди", en: "International brands" },
        { uk: "НУО та правозахисні організації", en: "NGOs and human rights organizations" },
      ],
      priceRange: { min: 15000, max: 45000, currency: "EUR" },
      turnaroundDays: { min: 20, max: 35 },
    },
    {
      id: "csddd-environmental",
      nameUk: "Екологічна належна обачність (CSDDD)",
      nameEn: "Environmental Due Diligence",
      descriptionUk:
        "Оцінка екологічної належної обачності за CSDDD: вплив на довкілля, управління відходами, викиди, водні ресурси. Аналіз ланцюга створення вартості на екологічні ризики.",
      descriptionEn:
        "Environmental due diligence assessment per CSDDD: environmental impact, waste management, emissions, water resources. Value chain environmental risk analysis.",
      methodology: ["CSDDD", "ISO 14001", "EIA Standards", "EU Environmental Regulations"],
      targetClients: [
        { uk: "Промислові підприємства", en: "Industrial enterprises" },
        { uk: "Агропідприємства", en: "Agricultural enterprises" },
        { uk: "Енергетичні компанії", en: "Energy companies" },
        { uk: "Девелопери", en: "Developers" },
      ],
      priceRange: { min: 12000, max: 40000, currency: "EUR" },
      turnaroundDays: { min: 20, max: 35 },
    },
    {
      id: "dora-ict",
      nameUk: "ІКТ-ризики фінансових установ (DORA)",
      nameEn: "ICT Risk for Financial Institutions",
      descriptionUk:
        "Оцінка ІКТ-ризиків фінансових установ відповідно до Регламенту DORA. Аналіз цифрової операційної стійкості, тестування на проникнення, управління ІКТ-інцидентами та ризиками третіх сторін.",
      descriptionEn:
        "ICT risk assessment for financial institutions per DORA Regulation. Digital operational resilience analysis, penetration testing, ICT incident management, and third-party risk management.",
      methodology: ["DORA", "ISO 27001", "NIST CSF", "EBA ICT Guidelines"],
      targetClients: [
        { uk: "Банки", en: "Banks" },
        { uk: "Страхові компанії", en: "Insurance companies" },
        { uk: "Платіжні системи", en: "Payment systems" },
        { uk: "Фінтех-компанії", en: "Fintech companies" },
      ],
      priceRange: { min: 20000, max: 60000, currency: "EUR" },
      turnaroundDays: { min: 20, max: 35 },
    },
    {
      id: "nis2-cybersecurity",
      nameUk: "Кібербезпека за NIS2",
      nameEn: "NIS2 Cybersecurity Compliance",
      descriptionUk:
        "Оцінка відповідності вимогам Директиви NIS2 для операторів критичної та важливої інфраструктури. Gap-аналіз, план дій, підготовка до аудиту.",
      descriptionEn:
        "NIS2 Directive compliance assessment for critical and important infrastructure operators. Gap analysis, action plan, audit preparation.",
      methodology: ["NIS2", "ISO 27001/27002", "ENISA Guidelines", "CIS Controls"],
      targetClients: [
        { uk: "Оператори критичної інфраструктури", en: "Critical infrastructure operators" },
        { uk: "ІТ-компанії", en: "IT companies" },
        { uk: "Хмарні провайдери", en: "Cloud providers" },
        { uk: "Телекомунікаційні оператори", en: "Telecom operators" },
      ],
      priceRange: { min: 15000, max: 50000, currency: "EUR" },
      turnaroundDays: { min: 20, max: 35 },
    },
    {
      id: "eu-taxonomy",
      nameUk: "Відповідність Таксономії ЄС",
      nameEn: "EU Taxonomy Alignment Assessment",
      descriptionUk:
        "Оцінка відповідності економічної діяльності Таксономії ЄС для сталого фінансування. Аналіз суттєвого внеску, відсутності значної шкоди (DNSH), мінімальних соціальних гарантій.",
      descriptionEn:
        "Assessment of economic activity alignment with EU Taxonomy for sustainable financing. Analysis of substantial contribution, do no significant harm (DNSH), and minimum social safeguards.",
      methodology: ["EU Taxonomy Regulation", "Technical Screening Criteria", "DNSH Assessment", "SFDR"],
      targetClients: [
        { uk: "Компанії, що залучають ЄС-фінансування", en: "Companies seeking EU financing" },
        { uk: "Банки (зелене кредитування)", en: "Banks (green lending)" },
        { uk: "Проєкти відновлюваної енергетики", en: "Renewable energy projects" },
        { uk: "Фінансові менеджери (SFDR)", en: "Financial managers (SFDR)" },
      ],
      priceRange: { min: 10000, max: 35000, currency: "EUR" },
      turnaroundDays: { min: 15, max: 25 },
    },
    {
      id: "aml-kyc",
      nameUk: "Перевірка контрагентів (AML/KYC)",
      nameEn: "Enhanced Due Diligence on Counterparties",
      descriptionUk:
        "Поглиблена перевірка контрагентів: AML/KYC-скринінг, бенефіціарна власність, санкційні списки, PEP-перевірка, аналіз ділової репутації та джерел фінансування.",
      descriptionEn:
        "Enhanced counterparty due diligence: AML/KYC screening, beneficial ownership, sanctions lists, PEP checks, business reputation analysis, and funding source verification.",
      methodology: ["FATF Recommendations", "EU AMLD6", "Wolfsberg Principles", "OFAC/EU Sanctions Screening"],
      targetClients: [
        { uk: "Банки та фінансові установи", en: "Banks and financial institutions" },
        { uk: "Інвестиційні фонди", en: "Investment funds" },
        { uk: "Міжнародні підрядники", en: "International contractors" },
        { uk: "Юридичні фірми", en: "Law firms" },
      ],
      priceRange: { min: 3000, max: 15000, currency: "EUR" },
      turnaroundDays: { min: 5, max: 15 },
    },
    {
      id: "sanctions-compliance",
      nameUk: "Санкційний комплаєнс",
      nameEn: "Sanctions Compliance Assessment",
      descriptionUk:
        "Оцінка відповідності санкційним режимам ЄС, США, Великої Британії. Аналіз ризиків обходу санкцій, перевірка ланцюгів постачання, рекомендації щодо комплаєнс-програми.",
      descriptionEn:
        "EU, US, UK sanctions regime compliance assessment. Sanctions circumvention risk analysis, supply chain screening, compliance program recommendations.",
      methodology: ["EU Sanctions Regulations", "OFAC Guidelines", "UK OFSI Framework", "Sanctions Screening Tools"],
      targetClients: [
        { uk: "Компанії з операціями в Україні/РФ", en: "Companies operating in Ukraine/Russia" },
        { uk: "Банки (комплаєнс)", en: "Banks (compliance)" },
        { uk: "Експортери", en: "Exporters" },
        { uk: "Логістичні компанії", en: "Logistics companies" },
      ],
      priceRange: { min: 5000, max: 20000, currency: "EUR" },
      turnaroundDays: { min: 7, max: 15 },
    },
    {
      id: "esia-full",
      nameUk: "Оцінка впливу на довкілля та суспільство (ESIA)",
      nameEn: "Environmental & Social Impact Assessment (ESIA)",
      descriptionUk:
        "Повноцінна оцінка екологічного та соціального впливу (ESIA) за вимогами ЄБРР, ЄІБ та IFC. Обов'язкова для всіх проєктів відновлення, що фінансуються міжнародними фінансовими інституціями.",
      descriptionEn:
        "Full-scope Environmental and Social Impact Assessment (ESIA) per EBRD, EIB, and IFC requirements. Mandatory for all reconstruction projects financed by international financial institutions.",
      methodology: ["EBRD Environmental & Social Policy", "IFC Performance Standards", "EIB Environmental & Social Standards", "Equator Principles"],
      targetClients: [
        { uk: "Позичальники ЄБРР/ЄІБ/IFC", en: "EBRD/EIB/IFC borrowers" },
        { uk: "Проєктні компанії відновлення", en: "Reconstruction project companies" },
        { uk: "Муніципалітети", en: "Municipalities" },
        { uk: "Державні замовники", en: "Government clients" },
      ],
      priceRange: { min: 30000, max: 150000, currency: "EUR" },
      turnaroundDays: { min: 30, max: 90 },
    },
    {
      id: "eu-regulatory",
      nameUk: "Відповідність вимогам ЄС",
      nameEn: "EU Regulatory Compliance",
      descriptionUk:
        "Комплексна оцінка відповідності широкому спектру регуляторних вимог ЄС для компаній, що виходять на європейський ринок або залучають європейське фінансування. Індивідуальний scope за потребою клієнта.",
      descriptionEn:
        "Comprehensive compliance assessment across a wide range of EU regulatory requirements for companies entering European markets or seeking European financing. Custom scope per client needs.",
      methodology: ["EU Acquis Communautaire", "Sector-Specific EU Directives", "Gap Analysis", "Regulatory Mapping"],
      targetClients: [
        { uk: "Українські компанії — експортери до ЄС", en: "Ukrainian companies exporting to the EU" },
        { uk: "Компанії, що проходять євроінтеграцію", en: "Companies undergoing EU integration" },
        { uk: "JV з європейськими партнерами", en: "JVs with European partners" },
        { uk: "Регулятори (бенчмаркінг)", en: "Regulators (benchmarking)" },
      ],
      priceRange: { min: 10000, max: 80000, currency: "EUR" },
      turnaroundDays: { min: 15, max: 30 },
    },
    {
      id: "reconstruction-compliance-passport",
      nameUk: "Паспорт відповідності реконструкції (Taxonomy+CSRD+CSDDD+CBAM)",
      nameEn: "Reconstruction Compliance Passport (Taxonomy+CSRD+CSDDD+CBAM)",
      descriptionUk:
        "Комплексний паспорт відповідності проєкту реконструкції всім ключовим регуляціям ЄС: EU Taxonomy alignment, CSRD sustainability reporting, CSDDD due diligence, CBAM вуглецевий коригувальний механізм. Єдиний документ для донорів та інвесторів.",
      descriptionEn:
        "Comprehensive compliance passport for reconstruction projects covering all key EU regulations: EU Taxonomy alignment, CSRD sustainability reporting, CSDDD due diligence, CBAM carbon border adjustment. Single document for donors and investors.",
      methodology: ["EU Taxonomy Regulation 2020/852", "CSRD / ESRS Standards", "CSDDD Due Diligence", "CBAM Regulation 2023/956"],
      targetClients: [
        { uk: "Проєктні компанії відновлення", en: "Reconstruction project companies" },
        { uk: "Донори та МФІ (ЄБРР, ЄІБ, IFC)", en: "Donors and IFIs (EBRD, EIB, IFC)" },
        { uk: "Державні замовники Great reconstruction", en: "Government clients Great reconstruction" },
        { uk: "Європейські генпідрядники", en: "European general contractors" },
      ],
      priceRange: { min: 25000, max: 80000, currency: "EUR" },
      turnaroundDays: { min: 20, max: 45 },
    },
  ],
};

// ============================================================================
// 5. Economic Analysis (Економічний аналіз)
// ============================================================================

const economicAnalysisCategory: ServiceCategory = {
  id: CATEGORY_IDS.ECONOMIC_ANALYSIS,
  nameUk: "Економічний аналіз",
  nameEn: "Economic Analysis",
  descriptionUk:
    "Глибокий економічний аналіз проєктів відновлення та інвестицій в Україну. Техніко-економічні обґрунтування, аналіз витрат та вигод, оцінка економічного впливу з використанням квантових обчислень.",
  descriptionEn:
    "In-depth economic analysis for reconstruction projects and investments in Ukraine. Feasibility studies, cost-benefit analysis, economic impact assessment powered by quantum computing.",
  icon: "BarChart3",
  color: "from-violet-500 to-purple-600",
  quantumEnabled: true,
  services: [
    {
      id: "feasibility",
      nameUk: "Техніко-економічне обґрунтування (ТЕО)",
      nameEn: "Feasibility Study",
      descriptionUk:
        "Комплексне техніко-економічне обґрунтування проєктів відновлення та нових інвестицій. Технічний, економічний, правовий, екологічний аналіз із квантовою оптимізацією параметрів проєкту.",
      descriptionEn:
        "Comprehensive feasibility study for reconstruction projects and new investments. Technical, economic, legal, environmental analysis with quantum optimization of project parameters.",
      methodology: ["UNIDO Feasibility Study Guidelines", "Cost-Benefit Analysis", "Financial Modeling", "Sensitivity & Scenario Analysis"],
      targetClients: [
        { uk: "Інвестори", en: "Investors" },
        { uk: "Міжнародні фінансові установи", en: "International financial institutions" },
        { uk: "Державні замовники", en: "Government clients" },
        { uk: "Девелопери", en: "Developers" },
      ],
      priceRange: { min: 15000, max: 120000, currency: "EUR" },
      turnaroundDays: { min: 20, max: 45 },
      quantumEnhanced: true,
      quantumDescriptionUk:
        "Квантові обчислення оптимізують параметри проєктів, аналізуючи мільйони комбінацій технічних та фінансових змінних для визначення оптимальної конфігурації.",
      quantumDescriptionEn:
        "Quantum computing optimizes project parameters by analyzing millions of combinations of technical and financial variables to determine the optimal configuration.",
    },
    {
      id: "cost-benefit",
      nameUk: "Аналіз витрат та вигод (CBA)",
      nameEn: "Cost-Benefit Analysis",
      descriptionUk:
        "Аналіз витрат та вигод проєктів відновлення з урахуванням соціальних, економічних та екологічних ефектів. Розрахунок NPV, IRR, BCR із квантовим прискоренням для складних мультифакторних моделей.",
      descriptionEn:
        "Cost-benefit analysis for reconstruction projects considering social, economic, and environmental effects. NPV, IRR, BCR calculation with quantum acceleration for complex multi-factor models.",
      methodology: ["EU CBA Guide", "HM Treasury Green Book", "Social Discount Rate", "Shadow Pricing"],
      targetClients: [
        { uk: "Міжнародні донори", en: "International donors" },
        { uk: "Державні органи", en: "Government agencies" },
        { uk: "Інфраструктурні проєкти", en: "Infrastructure projects" },
        { uk: "NGO та фонди", en: "NGOs and foundations" },
      ],
      priceRange: { min: 12000, max: 80000, currency: "EUR" },
      turnaroundDays: { min: 15, max: 35 },
      quantumEnhanced: true,
      quantumDescriptionUk:
        "Квантові обчислення забезпечують одночасний аналіз тисяч сценаріїв витрат та вигод із урахуванням складних взаємозалежностей між змінними.",
      quantumDescriptionEn:
        "Quantum computing enables simultaneous analysis of thousands of cost-benefit scenarios accounting for complex interdependencies between variables.",
    },
    {
      id: "economic-impact",
      nameUk: "Оцінка економічного впливу",
      nameEn: "Economic Impact Assessment",
      descriptionUk:
        "Оцінка прямого, непрямого та індукованого економічного впливу проєктів відновлення на регіональну та національну економіку. Мультиплікаторний аналіз, моделювання зайнятості, фіскальний ефект.",
      descriptionEn:
        "Assessment of direct, indirect, and induced economic impact of reconstruction projects on regional and national economy. Multiplier analysis, employment modeling, fiscal impact.",
      methodology: ["Input-Output Analysis", "CGE Modeling", "Multiplier Analysis", "Regional Economic Impact Assessment"],
      targetClients: [
        { uk: "Органи влади (центральні та місцеві)", en: "Government authorities (central and local)" },
        { uk: "Міжнародні організації", en: "International organizations" },
        { uk: "Інвестори (impact investing)", en: "Investors (impact investing)" },
        { uk: "Аналітичні центри", en: "Think tanks" },
      ],
      priceRange: { min: 15000, max: 90000, currency: "EUR" },
      turnaroundDays: { min: 15, max: 35 },
      quantumEnhanced: true,
      quantumDescriptionUk:
        "Квантові обчислення прискорюють загальноекономічне моделювання (CGE), дозволяючи враховувати значно більше секторів та взаємозв'язків між ними.",
      quantumDescriptionEn:
        "Quantum computing accelerates computable general equilibrium (CGE) modeling, enabling significantly more sectors and inter-sector relationships to be considered.",
    },
    {
      id: "market-analysis",
      nameUk: "Аналіз ринку",
      nameEn: "Market Analysis",
      descriptionUk:
        "Аналіз ринків будівельних матеріалів, підрядних послуг, нерухомості та інших секторів, релевантних для відновлення. Ціновий моніторинг, конкурентний аналіз, прогнозування попиту.",
      descriptionEn:
        "Market analysis for construction materials, contracting services, real estate, and other reconstruction-relevant sectors. Price monitoring, competitive analysis, demand forecasting.",
      methodology: ["Market Research Methodology", "Porter's Five Forces", "Supply-Demand Analysis", "Price Index Construction"],
      targetClients: [
        { uk: "Інвестори", en: "Investors" },
        { uk: "Виробники будматеріалів", en: "Construction material producers" },
        { uk: "Девелопери", en: "Developers" },
        { uk: "Стратегічні планувальники", en: "Strategic planners" },
      ],
      priceRange: { min: 8000, max: 50000, currency: "EUR" },
      turnaroundDays: { min: 10, max: 25 },
    },
    {
      id: "comparative-legal",
      nameUk: "Порівняльний аналіз UA vs EU",
      nameEn: "Comparative Legal Analysis",
      descriptionUk:
        "Порівняльний аналіз українського та європейського законодавства у сферах, релевантних для відновлення та інвестицій. Ідентифікація прогалин, рекомендації щодо гармонізації, оцінка впливу на бізнес.",
      descriptionEn:
        "Comparative analysis of Ukrainian and European legislation in reconstruction and investment-relevant areas. Gap identification, harmonization recommendations, business impact assessment.",
      methodology: ["Comparative Legal Analysis", "Regulatory Gap Analysis", "EU Acquis Alignment", "Impact Assessment"],
      targetClients: [
        { uk: "Міністерства (євроінтеграція)", en: "Ministries (EU integration)" },
        { uk: "Бізнес-асоціації", en: "Business associations" },
        { uk: "Юридичні фірми", en: "Law firms" },
        { uk: "Міжнародні організації", en: "International organizations" },
      ],
      priceRange: { min: 10000, max: 70000, currency: "EUR" },
      turnaroundDays: { min: 15, max: 30 },
    },
    {
      id: "investment-memorandum",
      nameUk: "Інвестиційний меморандум (DCF/IRR/NPV)",
      nameEn: "Investment Memorandum (DCF/IRR/NPV)",
      descriptionUk:
        "Підготовка інвестиційного меморандуму для проєктів відновлення: фінансове моделювання DCF, розрахунок IRR/NPV, аналіз чутливості, структурування угоди. Для залучення приватного капіталу та донорського фінансування.",
      descriptionEn:
        "Investment memorandum preparation for reconstruction projects: DCF financial modeling, IRR/NPV calculation, sensitivity analysis, deal structuring. For attracting private capital and donor financing.",
      methodology: ["DCF Valuation", "IRR/NPV Analysis", "Sensitivity & Scenario Analysis", "WACC Estimation"],
      targetClients: [
        { uk: "Приватні інвестори (reconstruction equity)", en: "Private investors (reconstruction equity)" },
        { uk: "Інвестиційні фонди", en: "Investment funds" },
        { uk: "DFI та МФІ (ЄБРР, IFC)", en: "DFIs and IFIs (EBRD, IFC)" },
        { uk: "Проєктні компанії (SPV)", en: "Project companies (SPV)" },
      ],
      priceRange: { min: 10000, max: 60000, currency: "EUR" },
      turnaroundDays: { min: 14, max: 30 },
      quantumEnhanced: true,
      quantumDescriptionUk:
        "Квантові обчислення дозволяють одночасне моделювання мільйонів DCF-сценаріїв з різними припущеннями, забезпечуючи надійніший діапазон IRR та оптимізацію структури капіталу.",
      quantumDescriptionEn:
        "Quantum computing enables simultaneous modeling of millions of DCF scenarios with varying assumptions, providing more robust IRR ranges and capital structure optimization.",
    },
    {
      id: "macroeconomic-assessment",
      nameUk: "Макроекономічна оцінка (CPI/CCI/FX)",
      nameEn: "Macroeconomic Assessment (CPI/CCI/FX)",
      descriptionUk:
        "Оцінка макроекономічних факторів впливу на вартість відновлення: інфляційне коригування (CPI/БУДЦІН), індекс вартості будівництва (CCI), валютні ризики (UAH/EUR/USD), облікова ставка НБУ. Для актуалізації розрахунків збитків.",
      descriptionEn:
        "Macroeconomic factor assessment for reconstruction cost valuation: inflation adjustment (CPI/Construction Price Index), Construction Cost Index (CCI), currency risks (UAH/EUR/USD), NBU discount rate. For damage calculation updates.",
      methodology: ["CPI/HICP Inflation Adjustment", "Construction Cost Index (CCI)", "FX Risk Modeling", "Discount Rate Analysis"],
      targetClients: [
        { uk: "Міжнародні організації (Світовий банк)", en: "International organizations (World Bank)" },
        { uk: "Уряд України (Мінекономіки)", en: "Government of Ukraine (Ministry of Economy)" },
        { uk: "Інвестиційні фонди відновлення", en: "Reconstruction investment funds" },
        { uk: "Страхові компанії", en: "Insurance companies" },
      ],
      priceRange: { min: 5000, max: 25000, currency: "EUR" },
      turnaroundDays: { min: 7, max: 15 },
    },
  ],
};

// ============================================================================
// 6. Legal Support (Правова підтримка)
// ============================================================================

const legalSupportCategory: ServiceCategory = {
  id: CATEGORY_IDS.LEGAL_SUPPORT,
  nameUk: "Правова підтримка",
  nameEn: "Legal Support",
  descriptionUk:
    "Науково-правові висновки для ЄСПЛ (ст. 41), Міжнародної комісії з претензій, ICC та національних судів. Підготовка документів для RD4U. ЄСПЛ приймає висновки незалежних наукових установ.",
  descriptionEn:
    "Scientific-legal conclusions for the ECHR (Art. 41), International Claims Commission, ICC, and national courts. RD4U document preparation. The ECHR accepts conclusions from independent scientific institutions.",
  icon: "Scale",
  color: "from-rose-500 to-pink-600",
  quantumEnabled: false,
  services: [
    {
      id: "rd4u-documents",
      nameUk: "Підготовка документів для RD4U",
      nameEn: "RD4U Document Preparation",
      descriptionUk:
        "Підготовка повного комплекту документів для подання до Реєстру збитків (Register of Damage for Ukraine). Формування доказової бази, структурування вимог, відповідність процедурним вимогам RD4U.",
      descriptionEn:
        "Preparation of a complete document package for submission to the Register of Damage for Ukraine (RD4U). Evidence base formation, claim structuring, RD4U procedural compliance.",
      methodology: ["RD4U Submission Guidelines", "IHL Evidence Standards", "Chain of Custody Documentation"],
      targetClients: [
        { uk: "Фізичні особи — постраждалі", en: "Individuals — affected persons" },
        { uk: "Юридичні особи — власники активів", en: "Legal entities — asset owners" },
        { uk: "Держава Україна", en: "State of Ukraine" },
        { uk: "Юридичні фірми — представники", en: "Law firms — representatives" },
      ],
      priceRange: { min: 5000, max: 25000, currency: "EUR" },
      turnaroundDays: { min: 10, max: 20 },
    },
    {
      id: "legal-conclusion",
      nameUk: "Науково-правовий висновок для суду",
      nameEn: "Scientific-Legal Conclusion for Courts",
      descriptionUk:
        "Підготовка науково-правового висновку як доказу для судових процесів. Аналіз правових питань на основі наукових методів, міжнародних стандартів та судової практики.",
      descriptionEn:
        "Preparation of scientific-legal conclusions as evidence for court proceedings. Legal issue analysis based on scientific methods, international standards, and case law.",
      methodology: ["Scientific Legal Analysis", "Case Law Research", "International Law Standards", "Expert Methodology"],
      targetClients: [
        { uk: "Суди (за призначенням)", en: "Courts (by appointment)" },
        { uk: "Юридичні фірми", en: "Law firms" },
        { uk: "Сторони спору", en: "Disputing parties" },
        { uk: "Арбітражні трибунали", en: "Arbitral tribunals" },
      ],
      priceRange: { min: 3000, max: 25000, currency: "EUR" },
      turnaroundDays: { min: 7, max: 20 },
    },
    {
      id: "force-majeure",
      nameUk: "Оцінка форс-мажору",
      nameEn: "Force Majeure Assessment",
      descriptionUk:
        "Науково-правова оцінка обставин форс-мажору, спричинених воєнними діями. Аналіз причинно-наслідкового зв'язку, впливу на виконання зобов'язань, рекомендації щодо юридичних наслідків.",
      descriptionEn:
        "Scientific-legal assessment of force majeure circumstances caused by military actions. Causation analysis, impact on obligation performance, legal consequence recommendations.",
      methodology: ["Force Majeure Legal Analysis", "Causation Analysis", "Contract Law Principles", "ICC Force Majeure Clause"],
      targetClients: [
        { uk: "Підприємства з невиконаними контрактами", en: "Businesses with unperformed contracts" },
        { uk: "Юридичні фірми", en: "Law firms" },
        { uk: "Страхові компанії", en: "Insurance companies" },
        { uk: "Торговельні палати (сертифікація)", en: "Chambers of commerce (certification)" },
      ],
      priceRange: { min: 5000, max: 20000, currency: "EUR" },
      turnaroundDays: { min: 7, max: 15 },
    },
    {
      id: "dispute-expert",
      nameUk: "Експертний висновок для спорів",
      nameEn: "Expert Opinion for Disputes",
      descriptionUk:
        "Підготовка експертного висновку з технічних, економічних або правових питань для використання в судових та арбітражних спорах. Участь як експерт-свідок у слуханнях.",
      descriptionEn:
        "Preparation of expert opinions on technical, economic, or legal matters for use in court and arbitration proceedings. Participation as expert witness in hearings.",
      methodology: ["Expert Witness Standards", "IBA Rules on Evidence", "Daubert Standard", "RICS Expert Witness Guidelines"],
      targetClients: [
        { uk: "Юридичні фірми", en: "Law firms" },
        { uk: "Арбітражні інституції", en: "Arbitration institutions" },
        { uk: "Сторони спору", en: "Disputing parties" },
        { uk: "Суди", en: "Courts" },
      ],
      priceRange: { min: 5000, max: 25000, currency: "EUR" },
      turnaroundDays: { min: 10, max: 25 },
    },
    {
      id: "claims-quantification",
      nameUk: "Квантифікація вимог",
      nameEn: "Claims Quantification",
      descriptionUk:
        "Розрахунок та обґрунтування розміру вимог для судових та арбітражних процесів. Фінансове моделювання збитків, упущеної вигоди, вартості відновлення та моральної шкоди.",
      descriptionEn:
        "Calculation and substantiation of claim amounts for court and arbitration proceedings. Financial modeling of damages, lost profits, restoration costs, and moral damages.",
      methodology: ["Damages Quantification Methodologies", "DCF Analysis", "Comparable Transactions", "Expert Valuation"],
      targetClients: [
        { uk: "Юридичні фірми (litigation)", en: "Law firms (litigation)" },
        { uk: "Litigation funders", en: "Litigation funders" },
        { uk: "Страхові компанії", en: "Insurance companies" },
        { uk: "Арбітражні трибунали", en: "Arbitral tribunals" },
      ],
      priceRange: { min: 8000, max: 40000, currency: "EUR" },
      turnaroundDays: { min: 15, max: 30 },
    },
    {
      id: "delay-analysis",
      nameUk: "Аналіз затримок (CPM)",
      nameEn: "Delay Analysis - Critical Path Method",
      descriptionUk:
        "Аналіз затримок будівельних та інфраструктурних проєктів за методом критичного шляху (CPM). Визначення причин затримок, розрахунок додаткових витрат, розподіл відповідальності між сторонами.",
      descriptionEn:
        "Delay analysis for construction and infrastructure projects using Critical Path Method (CPM). Root cause identification, additional cost calculation, responsibility allocation between parties.",
      methodology: ["SCL Delay and Disruption Protocol", "AACE Forensic Schedule Analysis", "CPM/PERT", "As-Planned vs. As-Built"],
      targetClients: [
        { uk: "Замовники проєктів", en: "Project owners" },
        { uk: "Генеральні підрядники", en: "General contractors" },
        { uk: "Юридичні фірми (будівельні спори)", en: "Law firms (construction disputes)" },
        { uk: "Арбітри", en: "Arbitrators" },
      ],
      priceRange: { min: 8000, max: 30000, currency: "EUR" },
      turnaroundDays: { min: 15, max: 25 },
    },
    {
      id: "regulatory-analysis",
      nameUk: "Регуляторний аналіз для інвесторів",
      nameEn: "Regulatory Analysis for Investors",
      descriptionUk:
        "Аналіз регуляторного середовища для іноземних інвесторів в Україні: дозвільна система, земельне право, податкове законодавство, валютний контроль, захист інвестицій.",
      descriptionEn:
        "Regulatory environment analysis for foreign investors in Ukraine: permitting system, land law, tax legislation, currency control, investment protection.",
      methodology: ["Regulatory Mapping", "Legal Risk Analysis", "Investment Treaty Analysis", "Comparative Regulatory Analysis"],
      targetClients: [
        { uk: "Іноземні інвестори", en: "Foreign investors" },
        { uk: "Міжнародні юридичні фірми", en: "International law firms" },
        { uk: "Торгові представництва", en: "Trade missions" },
        { uk: "Бізнес-асоціації", en: "Business associations" },
      ],
      priceRange: { min: 8000, max: 50000, currency: "EUR" },
      turnaroundDays: { min: 10, max: 25 },
    },
    {
      id: "icc-support",
      nameUk: "Супровід подання до ICC",
      nameEn: "ICC Claims Support",
      descriptionUk:
        "Комплексний супровід підготовки та подання претензій до Міжнародного кримінального суду. Документування, структурування доказів, координація з юридичними командами.",
      descriptionEn:
        "Comprehensive support for ICC claim preparation and submission. Documentation, evidence structuring, coordination with legal teams.",
      methodology: ["ICC Rome Statute", "Evidence Collection Standards", "Victim Participation Rules", "Reparations Framework"],
      targetClients: [
        { uk: "Держава Україна", en: "State of Ukraine" },
        { uk: "Міжнародні юридичні фірми", en: "International law firms" },
        { uk: "Правозахисні організації", en: "Human rights organizations" },
        { uk: "Постраждалі громади", en: "Affected communities" },
      ],
      priceRange: { min: 10000, max: 50000, currency: "EUR" },
      turnaroundDays: { min: 15, max: 30 },
    },
    {
      id: "echr-evidence",
      nameUk: "Висновки для ЄСПЛ (Стаття 41)",
      nameEn: "ECHR Evidence Reports (Article 41)",
      descriptionUk:
        "Підготовка науково-правових висновків для Європейського суду з прав людини: квантифікація матеріальної шкоди (ст. 41 ЄКПЛ), amicus curiae, втручання третьої сторони (Правило 44). ЄСПЛ приймає висновки незалежних наукових установ за принципом вільної оцінки доказів.",
      descriptionEn:
        "Scientific-legal conclusions for the European Court of Human Rights: pecuniary damage quantification (Art. 41 ECHR), amicus curiae briefs, third-party interventions (Rule 44). The ECHR accepts conclusions from independent scientific institutions under the principle of free evaluation of evidence.",
      methodology: ["ECHR Article 41 Just Satisfaction", "Rule 44 Third-Party Intervention", "RDNA/DaLA Damage Quantification", "Pecuniary Damage Evidence Standards"],
      targetClients: [
        { uk: "Держава Україна (міждержавні справи)", en: "State of Ukraine (interstate cases)" },
        { uk: "Юридичні фірми — представники заявників", en: "Law firms — applicant representatives" },
        { uk: "Правозахисні організації (amicus curiae)", en: "Human rights NGOs (amicus curiae)" },
        { uk: "Постраждалі фізичні особи", en: "Affected individuals" },
      ],
      priceRange: { min: 5000, max: 30000, currency: "EUR" },
      turnaroundDays: { min: 14, max: 30 },
    },
    {
      id: "claims-commission",
      nameUk: "Висновки для Міжнародної комісії з претензій",
      nameEn: "International Claims Commission Reports",
      descriptionUk:
        "Підготовка документації та науково-правових висновків для Міжнародної комісії з претензій (Конвенція Ради Європи, грудень 2025). 35 країн та ЄС підписали конвенцію. Висновки базуються на методиках RDNA/DaLA Світового банку та процедурних правилах RD4U.",
      descriptionEn:
        "Documentation and scientific-legal conclusions for the International Claims Commission (Council of Europe Convention, December 2025). 35 countries and the EU signed the convention. Reports based on World Bank RDNA/DaLA methodology and RD4U procedural rules.",
      methodology: ["Claims Commission Convention CETS 225", "RD4U Procedural Rules", "RDNA/DaLA Methodology", "UNCC Precedent Standards"],
      targetClients: [
        { uk: "Фізичні особи — заявники претензій", en: "Individuals — claim applicants" },
        { uk: "Юридичні особи — власники зруйнованих активів", en: "Entities — destroyed asset owners" },
        { uk: "Юридичні фірми — представники", en: "Law firms — representatives" },
        { uk: "Держава Україна", en: "State of Ukraine" },
      ],
      priceRange: { min: 3000, max: 25000, currency: "EUR" },
      turnaroundDays: { min: 10, max: 25 },
    },
    {
      id: "environmental-echr",
      nameUk: "Оцінка екологічних збитків (екоцид)",
      nameEn: "Environmental Damage Assessment (Ecocide)",
      descriptionUk:
        "Науково-технічний висновок щодо екологічних збитків від воєнних дій: забруднення ґрунтів, водних ресурсів, знищення біорізноманіття, вуглецеві викиди (294 млн т CO₂-еквівалент). Для подання до ЄСПЛ, ICC та національних судів. Україна подає кліматичну претензію на $43 млрд.",
      descriptionEn:
        "Scientific-technical conclusions on environmental damage from military actions: soil contamination, water pollution, biodiversity destruction, carbon emissions (294M tonnes CO₂ equivalent). For ECHR, ICC and national court submissions. Ukraine filing $43B climate claim.",
      methodology: ["Environmental Impact Assessment", "Carbon Footprint Methodology", "RDNA Environmental Sector", "Ecocide Assessment Framework"],
      targetClients: [
        { uk: "Держава Україна (кліматична претензія)", en: "State of Ukraine (climate claim)" },
        { uk: "Міжнародні екологічні організації", en: "International environmental organizations" },
        { uk: "Прокуратура (екоцид)", en: "Prosecution (ecocide)" },
        { uk: "Постраждалі громади", en: "Affected communities" },
      ],
      priceRange: { min: 10000, max: 50000, currency: "EUR" },
      turnaroundDays: { min: 20, max: 40 },
    },
    {
      id: "causation-analysis",
      nameUk: "Аналіз причинно-наслідкового зв'язку (Evidence Scoring)",
      nameEn: "Causation Analysis (Evidence Scoring 0-100)",
      descriptionUk:
        "Встановлення причинно-наслідкового зв'язку між воєнними діями та заявленими збитками. Бальна система оцінки доказів (0-100): супутникові знімки, акти обстеження, фото/відео, свідчення, офіційні реєстри. Критичний елемент для RD4U, ЄСПЛ та ICC.",
      descriptionEn:
        "Establishing causal link between military actions and claimed damages. Evidence scoring system (0-100): satellite imagery, inspection reports, photo/video, testimonies, official registries. Critical element for RD4U, ECHR, and ICC claims.",
      methodology: ["Evidence Scoring Framework (0-100)", "Satellite Imagery Analysis", "Chain of Causation", "But-For Test & NESS Test"],
      targetClients: [
        { uk: "Заявники RD4U", en: "RD4U claimants" },
        { uk: "Юридичні фірми (ЄСПЛ, ICC)", en: "Law firms (ECHR, ICC)" },
        { uk: "Страхові компанії (воєнні ризики)", en: "Insurance companies (war risk)" },
        { uk: "Арбітражні трибунали", en: "Arbitral tribunals" },
      ],
      priceRange: { min: 5000, max: 30000, currency: "EUR" },
      turnaroundDays: { min: 7, max: 20 },
    },
  ],
};

// ============================================================================
// 7. Contract Analysis (Аналіз контрактів та угод)
// ============================================================================

const contractAnalysisCategory: ServiceCategory = {
  id: CATEGORY_IDS.CONTRACT_ANALYSIS,
  nameUk: "Аналіз контрактів та угод",
  nameEn: "Contract & Agreement Analysis",
  descriptionUk:
    "Науково-правові висновки щодо контрактів, угод, державних контрактів та проєктів договорів. Аналіз ризиків, відповідності законодавству, фінансових умов.",
  descriptionEn:
    "Scientific-legal conclusions on contracts, agreements, government contracts, and draft agreements. Risk analysis, legal compliance, financial terms.",
  icon: "FileSignature",
  color: "from-indigo-500 to-blue-600",
  quantumEnabled: false,
  services: [
    {
      id: "contract-risk-analysis",
      nameUk: "Аналіз ризиків контракту",
      nameEn: "Contract Risk Analysis",
      descriptionUk:
        "Науковий висновок щодо ризиків контракту: фінансові, правові, операційні ризики. Аналіз умов, зобов'язань сторін, штрафних санкцій, форс-мажору. Рекомендації щодо мітигації ризиків.",
      descriptionEn:
        "Scientific conclusion on contract risks: financial, legal, operational risks. Analysis of terms, party obligations, penalties, force majeure. Risk mitigation recommendations.",
      methodology: ["Contract Risk Analysis", "ISO 31000", "Legal Compliance Review"],
      targetClients: [
        { uk: "Юридичні особи", en: "Legal entities" },
        { uk: "Державні замовники", en: "Government clients" },
        { uk: "Юридичні фірми", en: "Law firms" },
        { uk: "Підприємці", en: "Entrepreneurs" },
      ],
      priceRange: { min: 2000, max: 15000, currency: "EUR" },
      turnaroundDays: { min: 5, max: 15 },
    },
    {
      id: "government-contract-analysis",
      nameUk: "Висновок щодо державного контракту",
      nameEn: "Government Contract Analysis",
      descriptionUk:
        "Науково-правовий висновок щодо державного контракту на відновлення: відповідність законодавству, кошторисна перевірка, аналіз умов, ризиків виконання, відповідність вимогам донорів.",
      descriptionEn:
        "Scientific-legal conclusion on government reconstruction contract: legal compliance, cost estimate verification, terms analysis, execution risks, donor requirement compliance.",
      methodology: ["Public Procurement Law Analysis", "Cost Verification", "Donor Compliance Standards"],
      targetClients: [
        { uk: "Державні замовники", en: "Government procuring entities" },
        { uk: "Підрядники відновлення", en: "Reconstruction contractors" },
        { uk: "Міжнародні донори", en: "International donors" },
        { uk: "Аудиторські палати", en: "Audit chambers" },
      ],
      priceRange: { min: 3000, max: 20000, currency: "EUR" },
      turnaroundDays: { min: 7, max: 20 },
    },
    {
      id: "draft-agreement-analysis",
      nameUk: "Висновок щодо проєкту договору",
      nameEn: "Draft Agreement Analysis",
      descriptionUk:
        "Науковий висновок щодо проєкту договору: аналіз умов, балансу інтересів сторін, відповідності законодавству, прихованих ризиків. Рекомендації щодо покращення умов.",
      descriptionEn:
        "Scientific conclusion on a draft agreement: terms analysis, balance of party interests, legal compliance, hidden risks. Recommendations for term improvement.",
      methodology: ["Contract Law Analysis", "Risk Assessment", "Comparative Legal Analysis"],
      targetClients: [
        { uk: "Фізичні особи", en: "Individuals" },
        { uk: "Малий та середній бізнес", en: "Small and medium businesses" },
        { uk: "Юридичні фірми", en: "Law firms" },
        { uk: "Корпоративні юристи", en: "Corporate lawyers" },
      ],
      priceRange: { min: 1500, max: 8000, currency: "EUR" },
      turnaroundDays: { min: 3, max: 10 },
    },
    {
      id: "international-agreement-analysis",
      nameUk: "Висновок щодо міжнародної угоди",
      nameEn: "International Agreement Analysis",
      descriptionUk:
        "Науково-правовий висновок щодо міжнародної угоди або контракту з іноземним контрагентом: аналіз застосовного права, юрисдикції, арбітражних застережень, валютних ризиків, санкційного комплаєнсу.",
      descriptionEn:
        "Scientific-legal conclusion on international agreement or contract with foreign counterparty: applicable law analysis, jurisdiction, arbitration clauses, currency risks, sanctions compliance.",
      methodology: ["Private International Law", "UNIDROIT Principles", "ICC Incoterms", "Sanctions Compliance"],
      targetClients: [
        { uk: "Експортери/імпортери", en: "Exporters/importers" },
        { uk: "Міжнародні компанії", en: "International companies" },
        { uk: "Юридичні фірми", en: "Law firms" },
        { uk: "Державні підприємства", en: "State-owned enterprises" },
      ],
      priceRange: { min: 3000, max: 15000, currency: "EUR" },
      turnaroundDays: { min: 7, max: 20 },
    },
    {
      id: "concession-ppp-analysis",
      nameUk: "Висновок щодо концесійної угоди / ДПП",
      nameEn: "Concession / PPP Agreement Analysis",
      descriptionUk:
        "Науковий висновок щодо концесійної угоди або договору ДПП: розподіл ризиків, фінансова модель, відповідність законодавству, value for money, захист інтересів.",
      descriptionEn:
        "Scientific conclusion on concession or PPP agreement: risk allocation, financial model, legal compliance, value for money, interest protection.",
      methodology: ["PPP Legal Framework", "Value for Money Assessment", "Risk Allocation Analysis", "Financial Modeling Review"],
      targetClients: [
        { uk: "Державні органи", en: "Government agencies" },
        { uk: "Приватні інвестори", en: "Private investors" },
        { uk: "Міжнародні фінансові установи", en: "International financial institutions" },
        { uk: "Юридичні консультанти", en: "Legal advisors" },
      ],
      priceRange: { min: 5000, max: 25000, currency: "EUR" },
      turnaroundDays: { min: 10, max: 25 },
    },
  ],
};

// ============================================================================
// 8. Consulting (Консалтинг)
// ============================================================================

const consultingCategory: ServiceCategory = {
  id: CATEGORY_IDS.CONSULTING,
  nameUk: "Консалтинг",
  nameEn: "Consulting",
  descriptionUk:
    "Експертне консультування з питань відновлення, інвестицій, оцінки збитків та методології. Оперативні консультації для прийняття стратегічних рішень.",
  descriptionEn:
    "Expert consulting on reconstruction, investments, damage assessment, and methodology. Rapid consultations for strategic decision-making.",
  icon: "Lightbulb",
  color: "from-cyan-500 to-teal-600",
  quantumEnabled: false,
  services: [
    {
      id: "damage-consultation",
      nameUk: "Консультація з оцінки збитків",
      nameEn: "Damage Assessment Consultation",
      descriptionUk:
        "Експертна консультація з питань оцінки збитків від воєнних дій. Попередня оцінка перспектив, визначення обсягу робіт, рекомендації щодо збору доказів та документування.",
      descriptionEn:
        "Expert consultation on war damage assessment. Preliminary prospect evaluation, scope of work determination, evidence collection and documentation recommendations.",
      methodology: ["RDNA Preliminary Assessment", "Damage Scoping", "Evidence Planning"],
      targetClients: [
        { uk: "Власники пошкоджених об'єктів", en: "Damaged property owners" },
        { uk: "Юридичні фірми", en: "Law firms" },
        { uk: "Місцеві адміністрації", en: "Local administrations" },
        { uk: "Страхові компанії", en: "Insurance companies" },
      ],
      priceRange: { min: 2000, max: 5000, currency: "EUR" },
      turnaroundDays: { min: 1, max: 3 },
    },
    {
      id: "investor-advisory",
      nameUk: "Консультування інвесторів",
      nameEn: "Investor Advisory",
      descriptionUk:
        "Стратегічне консультування іноземних та вітчизняних інвесторів щодо можливостей та ризиків інвестицій у відновлення України. Секторальний аналіз, вхідна стратегія, партнерський пошук.",
      descriptionEn:
        "Strategic advisory for foreign and domestic investors on opportunities and risks of investing in Ukraine's reconstruction. Sector analysis, entry strategy, partner search.",
      methodology: ["Investment Advisory", "Market Entry Strategy", "Stakeholder Mapping", "Opportunity Assessment"],
      targetClients: [
        { uk: "Іноземні інвестори", en: "Foreign investors" },
        { uk: "Приватні інвестиційні фонди", en: "Private equity funds" },
        { uk: "Корпоративні інвестори", en: "Corporate investors" },
        { uk: "DFI", en: "DFIs" },
      ],
      priceRange: { min: 5000, max: 15000, currency: "EUR" },
      turnaroundDays: { min: 3, max: 10 },
    },
    {
      id: "methodology-guidance",
      nameUk: "Методичні рекомендації",
      nameEn: "Methodology Guidance",
      descriptionUk:
        "Розробка методичних рекомендацій та стандартів для оцінки збитків, управління ризиками та проведення due diligence в контексті відновлення України.",
      descriptionEn:
        "Development of methodology guidelines and standards for damage assessment, risk management, and due diligence in the context of Ukraine's reconstruction.",
      methodology: ["Standards Development", "Best Practice Codification", "Methodology Adaptation", "Quality Assurance Frameworks"],
      targetClients: [
        { uk: "Державні органи (методологія)", en: "Government agencies (methodology)" },
        { uk: "Міжнародні організації", en: "International organizations" },
        { uk: "Консалтингові компанії", en: "Consulting firms" },
        { uk: "Наукові установи", en: "Research institutions" },
      ],
      priceRange: { min: 3000, max: 10000, currency: "EUR" },
      turnaroundDays: { min: 5, max: 10 },
    },
    {
      id: "esia-consulting",
      nameUk: "Консультування ESIA (ЄБРР/ЄІБ)",
      nameEn: "ESIA Consulting for EBRD/EIB",
      descriptionUk:
        "Консультування та супровід підготовки оцінки екологічного та соціального впливу (ESIA) відповідно до вимог ЄБРР та ЄІБ. Планування досліджень, залучення стейкхолдерів, підготовка ESAP.",
      descriptionEn:
        "Consulting and support for Environmental and Social Impact Assessment (ESIA) preparation per EBRD and EIB requirements. Study planning, stakeholder engagement, ESAP preparation.",
      methodology: ["EBRD Environmental & Social Policy", "EIB Environmental & Social Standards", "IFC Performance Standards", "Equator Principles"],
      targetClients: [
        { uk: "Позичальники ЄБРР/ЄІБ", en: "EBRD/EIB borrowers" },
        { uk: "Проєктні компанії", en: "Project companies" },
        { uk: "Екологічні консультанти", en: "Environmental consultants" },
        { uk: "Державні замовники", en: "Government clients" },
      ],
      priceRange: { min: 25000, max: 120000, currency: "EUR" },
      turnaroundDays: { min: 30, max: 60 },
    },
  ],
};

// ============================================================================
// 9. Environmental & Climate
// ============================================================================

const environmentalCategory: ServiceCategory = {
  id: "environmental",
  nameUk: "Довкілля та клімат",
  nameEn: "Environment & Climate",
  descriptionUk:
    "ESIA для донорських проєктів, оцінка забруднення грунтів, вуглецевий слід, кліматичні ризики, постконфліктна ремедіація та екоцид-дослідження.",
  descriptionEn:
    "ESIA for donor projects, soil contamination assessment, carbon footprint, climate risk, post-conflict remediation, and ecocide research.",
  icon: "Leaf",
  color: "from-green-500 to-emerald-600",
  quantumEnabled: false,
  services: [
    {
      id: "esia-donor",
      nameUk: "ESIA для донорських проєктів (EBRD, EIB, JICA)",
      nameEn: "ESIA for Donor Projects (EBRD, EIB, JICA)",
      descriptionUk:
        "Оцінка екологічного та соціального впливу відповідно до Performance Standards EBRD/IFC, EIB Environmental & Social Standards та JICA Environmental Guidelines.",
      descriptionEn:
        "Environmental and Social Impact Assessment per EBRD/IFC Performance Standards, EIB Environmental & Social Standards, and JICA Environmental Guidelines.",
      methodology: ["IFC Performance Standards", "EBRD ESP", "EIB E&S Standards", "JICA Guidelines"],
      targetClients: [
        { uk: "Муніципалітети", en: "Municipalities" },
        { uk: "Підрядники відновлення", en: "Reconstruction contractors" },
        { uk: "Позичальники DFI", en: "DFI borrowers" },
      ],
      priceRange: { min: 30000, max: 200000, currency: "EUR" },
      turnaroundDays: { min: 30, max: 90 },
    },
    {
      id: "soil-contamination",
      nameUk: "Оцінка забруднення грунтів та водних ресурсів",
      nameEn: "Soil and Water Contamination Assessment",
      descriptionUk:
        "Науковий висновок про стан грунтів та водних ресурсів після бойових дій. Аналіз забруднення боєприпасами, промисловими речовинами, план ремедіації.",
      descriptionEn:
        "Scientific conclusion on soil and water condition after hostilities. Contamination analysis from munitions, industrial substances, remediation plan.",
      methodology: ["ISO 15175", "US EPA Methods", "EU Soil Framework"],
      targetClients: [
        { uk: "Аграрні підприємства", en: "Agricultural enterprises" },
        { uk: "Муніципалітети", en: "Municipalities" },
        { uk: "Екологічні організації", en: "Environmental organizations" },
      ],
      priceRange: { min: 5000, max: 50000, currency: "EUR" },
      turnaroundDays: { min: 14, max: 45 },
    },
    {
      id: "carbon-footprint",
      nameUk: "Розрахунок вуглецевого сліду (ISO 14064)",
      nameEn: "Carbon Footprint Calculation (ISO 14064)",
      descriptionUk:
        "Розрахунок викидів парникових газів (Scope 1, 2, 3) відповідно до ISO 14064 та GHG Protocol. Необхідний для CBAM та CSRD звітності.",
      descriptionEn:
        "Greenhouse gas emissions calculation (Scope 1, 2, 3) per ISO 14064 and GHG Protocol. Required for CBAM and CSRD reporting.",
      methodology: ["ISO 14064", "GHG Protocol", "IPCC Guidelines"],
      targetClients: [
        { uk: "Експортери в ЄС", en: "EU exporters" },
        { uk: "Промислові підприємства", en: "Industrial enterprises" },
        { uk: "Компанії під CSRD", en: "CSRD-reporting companies" },
      ],
      priceRange: { min: 5000, max: 25000, currency: "EUR" },
      turnaroundDays: { min: 10, max: 30 },
    },
    {
      id: "climate-risk",
      nameUk: "Оцінка кліматичних ризиків (TCFD / TNFD)",
      nameEn: "Climate Risk Assessment (TCFD / TNFD)",
      descriptionUk:
        "Оцінка фізичних та перехідних кліматичних ризиків відповідно до TCFD та TNFD рекомендацій. Необхідна для інвесторів та CSRD звітності.",
      descriptionEn:
        "Physical and transition climate risk assessment per TCFD and TNFD recommendations. Required by investors and CSRD reporting.",
      methodology: ["TCFD Recommendations", "TNFD Framework", "IPCC AR6"],
      targetClients: [
        { uk: "Інвестори", en: "Investors" },
        { uk: "Банки", en: "Banks" },
        { uk: "Великий бізнес", en: "Large corporations" },
      ],
      priceRange: { min: 10000, max: 40000, currency: "EUR" },
      turnaroundDays: { min: 14, max: 30 },
    },
    {
      id: "post-conflict-remediation",
      nameUk: "План постконфліктної ремедіації території",
      nameEn: "Post-Conflict Territory Remediation Plan",
      descriptionUk:
        "Науково-технічний висновок та план ремедіації територій після бойових дій: деконтамінація, відновлення екосистем, оцінка придатності для використання.",
      descriptionEn:
        "Scientific-technical conclusion and remediation plan for post-conflict territories: decontamination, ecosystem restoration, usability assessment.",
      methodology: ["UNEP Post-Conflict Assessment", "ISO 15175", "NATO STANAG"],
      targetClients: [
        { uk: "Муніципалітети", en: "Municipalities" },
        { uk: "Міністерство довкілля", en: "Ministry of Environment" },
        { uk: "Міжнародні організації", en: "International organizations" },
      ],
      priceRange: { min: 10000, max: 80000, currency: "EUR" },
      turnaroundDays: { min: 20, max: 60 },
    },
    {
      id: "biodiversity-impact",
      nameUk: "Оцінка впливу на біорізноманіття",
      nameEn: "Biodiversity Impact Assessment",
      descriptionUk:
        "Оцінка впливу проєктів або наслідків конфлікту на біорізноманіття відповідно до IFC PS6 та EU Biodiversity Strategy.",
      descriptionEn:
        "Assessment of project or conflict impact on biodiversity per IFC PS6 and EU Biodiversity Strategy.",
      methodology: ["IFC PS6", "EU Biodiversity Strategy", "CBD Guidelines"],
      targetClients: [
        { uk: "Донорські проєкти", en: "Donor-funded projects" },
        { uk: "Природоохоронні організації", en: "Conservation organizations" },
      ],
      priceRange: { min: 8000, max: 40000, currency: "EUR" },
      turnaroundDays: { min: 14, max: 45 },
    },
    {
      id: "ecocide-research",
      nameUk: "Екоцид-дослідження для ICC",
      nameEn: "Ecocide Research for ICC",
      descriptionUk:
        "Науковий висновок про широкомасштабну, довготривалу та серйозну шкоду довкіллю. Каховська ГЕС, лісові пожежі, промислове забруднення. Доказова база для ICC.",
      descriptionEn:
        "Scientific conclusion on widespread, long-term, and severe environmental damage. Kakhovka Dam, forest fires, industrial contamination. Evidence base for ICC.",
      methodology: ["Rome Statute Art. 8(2)(b)(iv)", "UNEP Assessment", "NRDA"],
      targetClients: [
        { uk: "Прокуратура", en: "Prosecutor's Office" },
        { uk: "ICC OTP", en: "ICC OTP" },
        { uk: "Міжнародні юрфірми", en: "International law firms" },
      ],
      priceRange: { min: 20000, max: 500000, currency: "EUR" },
      turnaroundDays: { min: 30, max: 120 },
    },
    {
      id: "environmental-damage-nrda",
      nameUk: "Оцінка екологічних збитків (NRDA)",
      nameEn: "Environmental Damage Assessment (NRDA)",
      descriptionUk:
        "Natural Resource Damage Assessment за методикою US EPA, адаптованою для постконфліктних умов. Оцінка вартості відновлення екосистемних послуг.",
      descriptionEn:
        "Natural Resource Damage Assessment per US EPA methodology adapted for post-conflict conditions. Ecosystem service restoration cost valuation.",
      methodology: ["NRDA", "US EPA", "UNCC F4 precedent"],
      targetClients: [
        { uk: "Держава", en: "Government" },
        { uk: "Міжнародні організації", en: "International organizations" },
        { uk: "Юрфірми", en: "Law firms" },
      ],
      priceRange: { min: 15000, max: 200000, currency: "EUR" },
      turnaroundDays: { min: 20, max: 90 },
    },
  ],
};

// ============================================================================
// 10. EU Market Access
// ============================================================================

const euMarketAccessCategory: ServiceCategory = {
  id: "eu-market-access",
  nameUk: "Доступ до ринку ЄС",
  nameEn: "EU Market Access",
  descriptionUk:
    "Комплекс науково-технічних досліджень для українських експортерів та постачальників ЄС-компаній. CBAM, CSDDD, EUDR, PPWR, EU AI Act та інші регуляторні вимоги.",
  descriptionEn:
    "Full range of scientific-technical studies for Ukrainian exporters and EU company suppliers. CBAM, CSDDD, EUDR, PPWR, EU AI Act and other regulatory requirements.",
  icon: "ShoppingBag",
  color: "from-sky-500 to-blue-600",
  quantumEnabled: false,
  services: [
    {
      id: "cbam-verification",
      nameUk: "CBAM верифікація (метал, цемент, добрива, електроенергія)",
      nameEn: "CBAM Verification (metals, cement, fertilizers, electricity)",
      descriptionUk:
        "Розрахунок вбудованих викидів (embedded emissions) для CBAM-звітності. Верифікація даних, підготовка CBAM-декларацій відповідно до Регламенту ЄС 2023/956.",
      descriptionEn:
        "Embedded emissions calculation for CBAM reporting. Data verification, CBAM declaration preparation per EU Regulation 2023/956.",
      methodology: ["EU Regulation 2023/956", "ISO 14064", "GHG Protocol"],
      targetClients: [
        { uk: "Металурги", en: "Steel producers" },
        { uk: "Хімічна промисловість", en: "Chemical industry" },
        { uk: "Виробники цементу", en: "Cement manufacturers" },
        { uk: "Енергокомпанії", en: "Energy companies" },
      ],
      priceRange: { min: 8000, max: 50000, currency: "EUR" },
      turnaroundDays: { min: 14, max: 30 },
    },
    {
      id: "csddd-supply-chain",
      nameUk: "CSDDD — аналіз ланцюгів постачання",
      nameEn: "CSDDD — Supply Chain Analysis",
      descriptionUk:
        "Аналіз відповідності вимогам Директиви ЄС 2024/1760 щодо належної перевірки у ланцюгах постачання (права людини, екологічний вплив).",
      descriptionEn:
        "Compliance analysis per EU Directive 2024/1760 on corporate sustainability due diligence in supply chains (human rights, environmental impact).",
      methodology: ["EU CSDDD 2024/1760", "OECD Due Diligence Guidance", "UN Guiding Principles"],
      targetClients: [
        { uk: "Постачальники ЄС-компаній", en: "EU company suppliers" },
        { uk: "Експортери", en: "Exporters" },
        { uk: "Виробники", en: "Manufacturers" },
      ],
      priceRange: { min: 10000, max: 50000, currency: "EUR" },
      turnaroundDays: { min: 14, max: 30 },
    },
    {
      id: "eudr-deforestation",
      nameUk: "EUDR — Due Diligence щодо знеліснення",
      nameEn: "EUDR — Deforestation Due Diligence",
      descriptionUk:
        "Аналіз відповідності Регламенту ЄС 2023/1115 про знеліснення. Геолокація ділянок, оцінка ризиків, підготовка due diligence statement для експортерів деревини та сої.",
      descriptionEn:
        "Compliance analysis per EU Regulation 2023/1115 on deforestation. Plot geolocation, risk assessment, due diligence statement for timber and soy exporters.",
      methodology: ["EU Regulation 2023/1115", "FAO Forest Definition"],
      targetClients: [
        { uk: "Експортери деревини", en: "Timber exporters" },
        { uk: "Аграрні підприємства", en: "Agricultural enterprises" },
        { uk: "Олійні компанії", en: "Oil companies" },
      ],
      priceRange: { min: 5000, max: 25000, currency: "EUR" },
      turnaroundDays: { min: 10, max: 20 },
    },
    {
      id: "ppwr-packaging",
      nameUk: "PPWR — відповідність упаковки вимогам ЄС",
      nameEn: "PPWR — EU Packaging Compliance",
      descriptionUk:
        "Аналіз відповідності упаковки Регламенту ЄС про упаковку та відходи упаковки (PPWR). Розрахунок recyclability, аналіз мінімізації упаковки.",
      descriptionEn:
        "Packaging compliance analysis per EU Packaging and Packaging Waste Regulation (PPWR). Recyclability calculation, packaging minimization analysis.",
      methodology: ["EU PPWR", "EN 13427-13432", "ISO 18604"],
      targetClients: [
        { uk: "Харчова промисловість", en: "Food industry" },
        { uk: "Виробники напоїв", en: "Beverage manufacturers" },
        { uk: "Рітейл", en: "Retail" },
      ],
      priceRange: { min: 3000, max: 15000, currency: "EUR" },
      turnaroundDays: { min: 7, max: 14 },
    },
    {
      id: "eu-ai-act",
      nameUk: "EU AI Act — оцінка ризиків AI-систем",
      nameEn: "EU AI Act — AI System Risk Assessment",
      descriptionUk:
        "Класифікація AI-систем за категоріями ризику (Регламент ЄС 2024/1689), підготовка технічної документації, оцінка відповідності для high-risk систем.",
      descriptionEn:
        "AI system risk classification (EU Regulation 2024/1689), technical documentation preparation, conformity assessment for high-risk systems.",
      methodology: ["EU AI Act 2024/1689", "ISO/IEC 42001", "NIST AI RMF"],
      targetClients: [
        { uk: "IT-компанії", en: "IT companies" },
        { uk: "Розробники AI", en: "AI developers" },
        { uk: "SaaS-провайдери", en: "SaaS providers" },
      ],
      priceRange: { min: 5000, max: 30000, currency: "EUR" },
      turnaroundDays: { min: 10, max: 30 },
    },
    {
      id: "digital-product-passport",
      nameUk: "Digital Product Passport (ESPR)",
      nameEn: "Digital Product Passport (ESPR)",
      descriptionUk:
        "Підготовка цифрового паспорта продукту відповідно до Ecodesign for Sustainable Products Regulation. Аналіз вимог до конкретних категорій продуктів.",
      descriptionEn:
        "Digital product passport preparation per Ecodesign for Sustainable Products Regulation. Product-specific requirements analysis.",
      methodology: ["EU ESPR", "ISO 14040/14044 (LCA)"],
      targetClients: [
        { uk: "Виробники", en: "Manufacturers" },
        { uk: "Експортери в ЄС", en: "EU exporters" },
      ],
      priceRange: { min: 5000, max: 20000, currency: "EUR" },
      turnaroundDays: { min: 10, max: 20 },
    },
    {
      id: "battery-regulation",
      nameUk: "EU Battery Regulation Due Diligence",
      nameEn: "EU Battery Regulation Due Diligence",
      descriptionUk:
        "Аналіз відповідності Регламенту ЄС 2023/1542 про батареї: вуглецевий слід, due diligence ланцюга постачання, вимоги до маркування та вторинного використання.",
      descriptionEn:
        "Compliance analysis per EU Regulation 2023/1542 on batteries: carbon footprint, supply chain due diligence, labeling and second-life requirements.",
      methodology: ["EU Regulation 2023/1542", "ISO 14064", "OECD Due Diligence"],
      targetClients: [
        { uk: "Виробники батарей", en: "Battery manufacturers" },
        { uk: "Автомобільна промисловість", en: "Automotive industry" },
        { uk: "Імпортери/дистриб'ютори", en: "Importers/distributors" },
      ],
      priceRange: { min: 10000, max: 40000, currency: "EUR" },
      turnaroundDays: { min: 14, max: 30 },
    },
    {
      id: "eu-taxonomy",
      nameUk: "Аналіз відповідності EU Taxonomy",
      nameEn: "EU Taxonomy Compliance Analysis",
      descriptionUk:
        "Аналіз відповідності економічної діяльності критеріям EU Taxonomy Regulation. Визначення taxonomy-eligible та taxonomy-aligned видів діяльності.",
      descriptionEn:
        "Economic activity compliance analysis per EU Taxonomy Regulation. Identification of taxonomy-eligible and taxonomy-aligned activities.",
      methodology: ["EU Taxonomy Regulation 2020/852", "Technical Screening Criteria"],
      targetClients: [
        { uk: "Інвестори", en: "Investors" },
        { uk: "Банки", en: "Banks" },
        { uk: "Компанії під CSRD", en: "CSRD-reporting companies" },
      ],
      priceRange: { min: 8000, max: 30000, currency: "EUR" },
      turnaroundDays: { min: 10, max: 20 },
    },
    {
      id: "food-safety-haccp",
      nameUk: "HACCP / безпека харчових продуктів для експорту",
      nameEn: "HACCP / Food Safety for EU Export",
      descriptionUk:
        "Аналіз відповідності системи безпечності харчових продуктів вимогам ЄС (Regulation EC 852/2004). Підготовка до впровадження HACCP.",
      descriptionEn:
        "Food safety system compliance analysis per EU requirements (Regulation EC 852/2004). HACCP implementation preparation.",
      methodology: ["Codex Alimentarius HACCP", "EU Regulation 852/2004", "ISO 22000"],
      targetClients: [
        { uk: "Харчова промисловість", en: "Food industry" },
        { uk: "Аграрії", en: "Agricultural companies" },
        { uk: "Молочні підприємства", en: "Dairy companies" },
      ],
      priceRange: { min: 5000, max: 20000, currency: "EUR" },
      turnaroundDays: { min: 10, max: 30 },
    },
    {
      id: "eu-market-readiness",
      nameUk: "Комплексний аналіз готовності до ринку ЄС",
      nameEn: "Comprehensive EU Market Readiness Analysis",
      descriptionUk:
        "Повний аналіз готовності компанії до роботи на ринку ЄС: регуляторні вимоги, стандарти якості, необхідні сертифікації, план дій з виходу на ринок.",
      descriptionEn:
        "Full company readiness analysis for the EU market: regulatory requirements, quality standards, necessary certifications, market entry action plan.",
      methodology: ["EU Single Market Acquis", "CE Marking Directives", "EU-Ukraine DCFTA"],
      targetClients: [
        { uk: "Експортери", en: "Exporters" },
        { uk: "Малий та середній бізнес", en: "SMEs" },
        { uk: "Стартапи", en: "Startups" },
      ],
      priceRange: { min: 5000, max: 25000, currency: "EUR" },
      turnaroundDays: { min: 10, max: 20 },
    },
  ],
};

// ============================================================================
// Services Catalog (main export)
// ============================================================================

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  damageAssessmentCategory,
  riskAssessmentCategory,
  euComplianceCategory,
  economicAnalysisCategory,
  legalSupportCategory,
  contractAnalysisCategory,
  consultingCategory,
  environmentalCategory,
  euMarketAccessCategory,
];

// ============================================================================
// Service Packages (bundled offerings)
// ============================================================================

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: "investor-entry",
    nameUk: "Пакет «Вхід інвестора»",
    nameEn: "Investor Entry Package",
    descriptionUk:
      "Комплексний пакет для іноземних інвесторів, що входять на ринок України: оцінка інвестиційних ризиків, регуляторний аналіз та країновий ризик. Забезпечує повну картину ризиків та можливостей.",
    descriptionEn:
      "Comprehensive package for foreign investors entering the Ukrainian market: investment risk assessment, regulatory analysis, and country risk evaluation. Provides a complete risk and opportunity picture.",
    includedServiceIds: ["investment-risk", "regulatory-analysis", "country-risk"],
    priceRange: { min: 25000, max: 100000, currency: "EUR" },
    discountPercent: 15,
  },
  {
    id: "reconstruction-project",
    nameUk: "Пакет «Проєкт відновлення»",
    nameEn: "Reconstruction Project Package",
    descriptionUk:
      "Повний пакет для проєктів відновлення інфраструктури: RDNA-оцінка збитків, техніко-економічне обґрунтування, відповідність ЄС та оцінка будівельних ризиків. Від документування до реалізації.",
    descriptionEn:
      "Complete package for infrastructure reconstruction projects: RDNA damage assessment, feasibility study, EU compliance, and construction risk assessment. From documentation to implementation.",
    includedServiceIds: ["rdna-assessment", "feasibility", "csrd-esg", "project-risk"],
    priceRange: { min: 40000, max: 200000, currency: "EUR" },
    discountPercent: 20,
  },
  {
    id: "eu-compliance-full",
    nameUk: "Пакет «Повний ЄС-комплаєнс»",
    nameEn: "Full EU Compliance Package",
    descriptionUk:
      "Комплексний пакет відповідності всім ключовим регуляторним вимогам ЄС: CSRD/ESG, CSDDD (права людини + екологія), санкційний комплаєнс та AML/KYC. Повна готовність до роботи з ЄС.",
    descriptionEn:
      "Comprehensive compliance package covering all key EU regulatory requirements: CSRD/ESG, CSDDD (human rights + environmental), sanctions compliance, and AML/KYC. Full EU market readiness.",
    includedServiceIds: ["csrd-esg", "csddd-human-rights", "sanctions-compliance", "aml-kyc"],
    priceRange: { min: 25000, max: 80000, currency: "EUR" },
    discountPercent: 15,
  },
  {
    id: "international-claims",
    nameUk: "Пакет «Міжнародні претензії»",
    nameEn: "International Claims Package",
    descriptionUk:
      "Комплексний пакет для підготовки міжнародних претензій щодо воєнних збитків: документування для міжнародних органів, розрахунок упущеної вигоди та оцінка екологічних збитків.",
    descriptionEn:
      "Comprehensive package for international war damage claims preparation: documentation for international bodies, lost profits calculation, and environmental damage assessment.",
    includedServiceIds: ["international-claims", "lost-profits", "environmental-damage"],
    priceRange: { min: 50000, max: 300000, currency: "EUR" },
    discountPercent: 10,
  },
  {
    id: "advanced-claims-analytics",
    nameUk: "Пакет «Поглиблена аналітика претензій»",
    nameEn: "Advanced Claims Analytics Package",
    descriptionUk:
      "Комплексний аналітичний пакет для обґрунтування складних претензій: причинно-наслідковий аналіз (Evidence Scoring), стохастичне моделювання Монте-Карло (P10/P50/P90), макроекономічне коригування. Максимально підвищує обґрунтованість та доказовість вимог.",
    descriptionEn:
      "Comprehensive analytics package for substantiating complex claims: causation analysis (Evidence Scoring), Monte Carlo stochastic modeling (P10/P50/P90), macroeconomic adjustment. Maximizes claim substantiation and evidentiary value.",
    includedServiceIds: ["causation-analysis", "monte-carlo-sensitivity", "macroeconomic-assessment"],
    priceRange: { min: 15000, max: 70000, currency: "EUR" },
    discountPercent: 20,
  },
];

// ============================================================================
// Utility functions
// ============================================================================

/** Find a service category by its ID */
export function getCategoryById(categoryId: string): ServiceCategory | undefined {
  return SERVICE_CATEGORIES.find((cat) => cat.id === categoryId);
}

/** Find a specific service by its ID across all categories */
export function getServiceById(serviceId: string): { category: ServiceCategory; service: ServiceItem } | undefined {
  for (const category of SERVICE_CATEGORIES) {
    const service = category.services.find((s) => s.id === serviceId);
    if (service) {
      return { category, service };
    }
  }
  return undefined;
}

/** Get all quantum-enhanced services */
export function getQuantumEnhancedServices(): { category: ServiceCategory; service: ServiceItem }[] {
  const results: { category: ServiceCategory; service: ServiceItem }[] = [];
  for (const category of SERVICE_CATEGORIES) {
    for (const service of category.services) {
      if (service.quantumEnhanced) {
        results.push({ category, service });
      }
    }
  }
  return results;
}

/** Get all services in a flat array */
export function getAllServices(): ServiceItem[] {
  return SERVICE_CATEGORIES.flatMap((cat) => cat.services);
}

/** Get total service count */
export function getTotalServiceCount(): number {
  return SERVICE_CATEGORIES.reduce((total, cat) => total + cat.services.length, 0);
}

/** Find a service package by its ID */
export function getPackageById(packageId: string): ServicePackage | undefined {
  return SERVICE_PACKAGES.find((pkg) => pkg.id === packageId);
}

/** Get services included in a package */
export function getPackageServices(packageId: string): { category: ServiceCategory; service: ServiceItem }[] {
  const pkg = getPackageById(packageId);
  if (!pkg) return [];
  return pkg.includedServiceIds
    .map((sid) => getServiceById(sid))
    .filter((result): result is { category: ServiceCategory; service: ServiceItem } => result !== undefined);
}
