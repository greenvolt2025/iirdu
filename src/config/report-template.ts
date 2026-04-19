/**
 * Report Template Configuration for RD4U / ICC Property Damage Claims
 *
 * Based on:
 * - World Bank RDNA (Rapid Damage and Needs Assessment) methodology
 * - World Bank / EU / UN DaLA (Damage and Loss Assessment) framework
 * - ДСТУ 3008:2015 "Інформація та документація. Звіти у сфері науки і техніки. Структура та правила оформлювання"
 * - International Valuation Standards (IVS) 2022
 * - Register of Damage for Ukraine (RD4U) claim requirements
 * - ICC (International Claims Commission) evidentiary standards
 *
 * Prepared for:
 * Міжнародний інститут відновлення та розвитку України
 * International Institute for Reconstruction and Development of Ukraine
 * ЄДРПОУ / EDRPOU: 45681824
 */

// ---------------------------------------------------------------------------
// Enums & Constants
// ---------------------------------------------------------------------------

export enum ReportType {
  RESIDENTIAL = 'residential',
  COMMERCIAL = 'commercial',
  INDUSTRIAL = 'industrial',
  AGRICULTURAL = 'agricultural',
  INFRASTRUCTURE = 'infrastructure',
}

export enum DamageCategory {
  /** Повне руйнування */
  DESTROYED = 'destroyed',
  /** Значні пошкодження (непридатне для проживання / використання) */
  MAJOR = 'major',
  /** Часткові пошкодження */
  PARTIAL = 'partial',
  /** Незначні пошкодження */
  MINOR = 'minor',
}

export enum CauseOfDamage {
  SHELLING = 'shelling',
  AIRSTRIKE = 'airstrike',
  MISSILE_STRIKE = 'missile_strike',
  DRONE_STRIKE = 'drone_strike',
  MINE_UXO = 'mine_uxo',
  FIRE_RESULT_OF_ATTACK = 'fire_result_of_attack',
  OCCUPATION_DAMAGE = 'occupation_damage',
  LOOTING = 'looting',
  OTHER_HOSTILITIES = 'other_hostilities',
}

export enum MethodologyReference {
  /** World Bank Rapid Damage and Needs Assessment */
  RDNA = 'RDNA',
  /** Damage and Loss Assessment (World Bank / EU / UN) */
  DALA = 'DaLA',
  /** ДСТУ 3008:2015 — structure and formatting of scientific-technical reports */
  DSTU_3008 = 'ДСТУ 3008:2015',
  /** International Valuation Standards */
  IVS_2022 = 'IVS 2022',
  /** ДСТУ Б Д.1.1-1:2013 — Ukrainian construction cost estimation standard */
  DSTU_BD = 'ДСТУ Б Д.1.1-1:2013',
  /** Register of Damage for Ukraine procedural rules */
  RD4U_RULES = 'RD4U Procedural Rules',
  /** Постанова КМУ №326 — порядок визначення збитків */
  KMU_326 = 'Постанова КМУ №326',
  /** Постанова КМУ №431 — Реєстр пошкодженого/знищеного майна */
  KMU_431 = 'Постанова КМУ №431',
  /** Методика оцінки майна (Постанова КМУ №1891) */
  KMU_1891 = 'Постанова КМУ №1891',
  /** Національний стандарт оцінки №1 — загальні засади */
  NSO_1 = 'НСО №1',
  /** Національний стандарт оцінки №2 — нерухомість */
  NSO_2 = 'НСО №2',
  /** ICC evidentiary standards and claim form guidance */
  ICC_GUIDANCE = 'ICC Claim Guidance',
}

export enum DocumentStatus {
  REQUIRED = 'required',
  RECOMMENDED = 'recommended',
  IF_AVAILABLE = 'if_available',
}

// ---------------------------------------------------------------------------
// Type Definitions
// ---------------------------------------------------------------------------

export interface ReportSectionField {
  /** Machine-readable key */
  key: string;
  /** Label in Ukrainian */
  labelUk: string;
  /** Label in English */
  labelEn: string;
  /** Field type for UI rendering */
  type: 'text' | 'textarea' | 'number' | 'date' | 'currency' | 'select' | 'file' | 'photo' | 'table' | 'coordinates' | 'checkbox';
  /** Whether the field is mandatory for a valid report */
  required: boolean;
  /** Placeholder / hint */
  hint?: string;
  /** Applicable select options (for type = select) */
  options?: { value: string; labelUk: string; labelEn: string }[];
  /** Table column definitions (for type = table) */
  columns?: { key: string; labelUk: string; labelEn: string; type: string }[];
}

export interface RequiredDocument {
  key: string;
  nameUk: string;
  nameEn: string;
  description: string;
  status: DocumentStatus;
  /** Which report types require this document */
  applicableTo: ReportType[];
}

export interface ReportSection {
  /** Section number as shown in the report (e.g. "5.1") */
  number: string;
  /** Title in Ukrainian */
  titleUk: string;
  /** Title in English */
  titleEn: string;
  /** What content belongs in this section */
  descriptionUk: string;
  descriptionEn: string;
  /** Which methodology / standard governs this section */
  methodologyRefs: MethodologyReference[];
  /** Documents the client must provide for this section */
  requiredDocuments: string[];
  /** Data fields within the section */
  fields: ReportSectionField[];
  /** Nested sub-sections (e.g. 5.1, 5.2, 5.3) */
  subsections?: ReportSection[];
}

export interface PricingTier {
  id: string;
  nameUk: string;
  nameEn: string;
  reportType: ReportType;
  /** Area threshold in m² (up to) */
  areaUpToM2: number | null;
  /** Base price in UAH */
  basePriceUAH: number;
  /** Base price in EUR */
  basePriceEUR: number;
  /** Additional per-m² charge (UAH) beyond the threshold */
  perM2ExtraUAH: number;
  /** Includes lost-profit calculation */
  includesLostProfit: boolean;
  /** Estimated turnaround in business days */
  turnaroundDays: number;
  notes?: string;
}

export interface ApplicableStandard {
  code: string;
  nameUk: string;
  nameEn: string;
  description: string;
  url?: string;
}

export interface ReportTemplateConfig {
  /** Organisation details */
  institute: {
    nameUk: string;
    nameEn: string;
    edrpou: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    directorUk: string;
    directorEn: string;
    licenseInfo: string;
  };
  /** Top-level report metadata */
  meta: {
    reportTypes: { value: ReportType; labelUk: string; labelEn: string }[];
    applicableStandards: ApplicableStandard[];
    damageCategories: { value: DamageCategory; labelUk: string; labelEn: string; rdnaCode: string }[];
    causesOfDamage: { value: CauseOfDamage; labelUk: string; labelEn: string }[];
  };
  /** Ordered array of report sections */
  sections: ReportSection[];
  /** Checklist of documents required from the client */
  requiredDocuments: RequiredDocument[];
  /** Pricing tiers */
  pricingTiers: PricingTier[];
}

// ---------------------------------------------------------------------------
// Institute Details
// ---------------------------------------------------------------------------

const institute: ReportTemplateConfig['institute'] = {
  nameUk: 'Міжнародний інститут відновлення та розвитку України',
  nameEn: 'International Institute for Reconstruction and Development of Ukraine',
  edrpou: '45681824',
  address: 'Україна, м. Київ',
  phone: '',
  email: '',
  website: '',
  directorUk: '',
  directorEn: '',
  licenseInfo: '',
};

// ---------------------------------------------------------------------------
// Meta: Report Types
// ---------------------------------------------------------------------------

const reportTypes: ReportTemplateConfig['meta']['reportTypes'] = [
  { value: ReportType.RESIDENTIAL, labelUk: 'Житлова нерухомість', labelEn: 'Residential Property' },
  { value: ReportType.COMMERCIAL, labelUk: 'Комерційна нерухомість', labelEn: 'Commercial Property' },
  { value: ReportType.INDUSTRIAL, labelUk: 'Промислова нерухомість', labelEn: 'Industrial Property' },
  { value: ReportType.AGRICULTURAL, labelUk: 'Сільськогосподарська нерухомість', labelEn: 'Agricultural Property' },
  { value: ReportType.INFRASTRUCTURE, labelUk: 'Інфраструктура', labelEn: 'Infrastructure' },
];

// ---------------------------------------------------------------------------
// Meta: Applicable Standards
// ---------------------------------------------------------------------------

const applicableStandards: ApplicableStandard[] = [
  {
    code: 'RDNA',
    nameUk: 'Швидка оцінка збитків та потреб (Світовий банк)',
    nameEn: 'Rapid Damage and Needs Assessment (World Bank)',
    description:
      'Framework for rapid post-disaster assessment of physical damage and recovery needs, ' +
      'structured by sector. Applied to Ukraine since RDNA1 (Sept 2022) through RDNA3 (Feb 2024).',
    url: 'https://www.worldbank.org/en/country/ukraine/brief/rdna',
  },
  {
    code: 'DaLA',
    nameUk: 'Оцінка збитків та втрат (Світовий банк / ЄС / ООН)',
    nameEn: 'Damage and Loss Assessment (World Bank / EU / UN)',
    description:
      'Tripartite methodology that separates assessment into: (1) direct damage to physical assets, ' +
      '(2) losses from disrupted economic flows, (3) recovery and reconstruction needs including ' +
      'Build Back Better surcharge.',
  },
  {
    code: 'ДСТУ 3008:2015',
    nameUk: 'Інформація та документація. Звіти у сфері науки і техніки',
    nameEn: 'Information and documentation. Reports in science and technology',
    description:
      'Ukrainian national standard governing structure and formatting of scientific-technical reports: ' +
      'title page, abstract, table of contents, main body sections, conclusions, appendices.',
  },
  {
    code: 'IVS 2022',
    nameUk: 'Міжнародні стандарти оцінки',
    nameEn: 'International Valuation Standards 2022',
    description:
      'Global standards for valuation of real property and business assets. ' +
      'IVS 104 (Bases of Value), IVS 400 (Real Property Interests), IVS 105 (Valuation Approaches).',
    url: 'https://www.ivsc.org/standards/',
  },
  {
    code: 'НСО №1',
    nameUk: 'Національний стандарт оцінки №1 "Загальні засади оцінки майна і майнових прав"',
    nameEn: 'National Valuation Standard No.1 — General Principles',
    description:
      'Ukrainian national valuation standard establishing general principles, valuation bases, ' +
      'approaches and report requirements for property valuation.',
  },
  {
    code: 'НСО №2',
    nameUk: 'Національний стандарт оцінки №2 "Оцінка нерухомого майна"',
    nameEn: 'National Valuation Standard No.2 — Real Estate Valuation',
    description:
      'Specific requirements for real estate valuation including cost, comparative and income approaches.',
  },
  {
    code: 'ДСТУ Б Д.1.1-1:2013',
    nameUk: 'Правила визначення вартості будівництва',
    nameEn: 'Rules for determining construction costs',
    description:
      'Ukrainian standard for construction cost estimation, used as the basis for calculating ' +
      'replacement and restoration costs of damaged buildings.',
  },
  {
    code: 'Постанова КМУ №326',
    nameUk: 'Порядок визначення збитків, завданих Україні внаслідок збройної агресії РФ',
    nameEn: 'CMU Resolution #326 — Procedure for determining damages from RF armed aggression',
    description:
      'Cabinet of Ministers resolution establishing the methodology and procedure for calculating ' +
      'damages caused to Ukraine by Russian armed aggression, including property damage categories.',
  },
  {
    code: 'Постанова КМУ №431',
    nameUk: 'Реєстр пошкодженого та знищеного майна',
    nameEn: 'CMU Resolution #431 — Register of Damaged and Destroyed Property',
    description:
      'Procedure for registration and verification of damaged/destroyed property through the ' +
      'Diia portal and local commissions.',
  },
  {
    code: 'RD4U Rules',
    nameUk: 'Процедурні правила Реєстру збитків для України',
    nameEn: 'Register of Damage for Ukraine — Procedural Rules',
    description:
      'Rules adopted by the Council of Europe governing claim submission, evidence requirements, ' +
      'and assessment procedures for the Register of Damage for Ukraine.',
    url: 'https://rd4u.coe.int/',
  },
  {
    code: 'ICC Guidance',
    nameUk: 'Настанови Міжнародної комісії з розгляду претензій',
    nameEn: 'International Claims Commission — Claim Guidance',
    description:
      'Evidentiary standards, claim form requirements and procedural guidance for claims ' +
      'before the future International Claims Commission for Ukraine.',
  },
];

// ---------------------------------------------------------------------------
// Meta: Damage Categories (aligned with RDNA coding)
// ---------------------------------------------------------------------------

const damageCategories: ReportTemplateConfig['meta']['damageCategories'] = [
  { value: DamageCategory.DESTROYED, labelUk: 'Знищено (>80% пошкоджень)', labelEn: 'Destroyed (>80% damage)', rdnaCode: 'D4' },
  { value: DamageCategory.MAJOR, labelUk: 'Значні пошкодження (40-80%)', labelEn: 'Major damage (40-80%)', rdnaCode: 'D3' },
  { value: DamageCategory.PARTIAL, labelUk: 'Часткові пошкодження (10-40%)', labelEn: 'Partial damage (10-40%)', rdnaCode: 'D2' },
  { value: DamageCategory.MINOR, labelUk: 'Незначні пошкодження (<10%)', labelEn: 'Minor damage (<10%)', rdnaCode: 'D1' },
];

// ---------------------------------------------------------------------------
// Meta: Causes of Damage
// ---------------------------------------------------------------------------

const causesOfDamage: ReportTemplateConfig['meta']['causesOfDamage'] = [
  { value: CauseOfDamage.SHELLING, labelUk: 'Артилерійський обстріл', labelEn: 'Shelling' },
  { value: CauseOfDamage.AIRSTRIKE, labelUk: 'Авіаудар', labelEn: 'Airstrike' },
  { value: CauseOfDamage.MISSILE_STRIKE, labelUk: 'Ракетний удар', labelEn: 'Missile strike' },
  { value: CauseOfDamage.DRONE_STRIKE, labelUk: 'Удар БПЛА (дрон)', labelEn: 'Drone (UAV) strike' },
  { value: CauseOfDamage.MINE_UXO, labelUk: 'Міна / вибухонебезпечний предмет', labelEn: 'Mine / UXO' },
  { value: CauseOfDamage.FIRE_RESULT_OF_ATTACK, labelUk: 'Пожежа внаслідок атаки', labelEn: 'Fire resulting from attack' },
  { value: CauseOfDamage.OCCUPATION_DAMAGE, labelUk: 'Пошкодження під час окупації', labelEn: 'Damage during occupation' },
  { value: CauseOfDamage.LOOTING, labelUk: 'Мародерство / розграбування', labelEn: 'Looting' },
  { value: CauseOfDamage.OTHER_HOSTILITIES, labelUk: 'Інші бойові дії', labelEn: 'Other hostilities' },
];

// ---------------------------------------------------------------------------
// Report Sections
// ---------------------------------------------------------------------------

const titlePageSection: ReportSection = {
  number: '0',
  titleUk: 'Титульний аркуш',
  titleEn: 'Title Page',
  descriptionUk:
    'Оформлюється відповідно до ДСТУ 3008:2015. Містить: назву організації-виконавця, ' +
    'гриф затвердження, назву звіту, вид звіту, номер державної реєстрації (за наявності), ' +
    'шифр роботи, посади та ПІБ виконавців, місто та рік.',
  descriptionEn:
    'Formatted per ДСТУ 3008:2015. Contains: executing organization name, approval stamp, ' +
    'report title, report type, state registration number (if applicable), work cipher, ' +
    'positions and names of executors, city and year.',
  methodologyRefs: [MethodologyReference.DSTU_3008],
  requiredDocuments: [],
  fields: [
    { key: 'reportNumber', labelUk: 'Номер звіту', labelEn: 'Report Number', type: 'text', required: true },
    { key: 'reportDate', labelUk: 'Дата звіту', labelEn: 'Report Date', type: 'date', required: true },
    { key: 'reportType', labelUk: 'Тип об\'єкта', labelEn: 'Object Type', type: 'select', required: true, options: reportTypes.map(rt => ({ value: rt.value, labelUk: rt.labelUk, labelEn: rt.labelEn })) },
    { key: 'objectShortDescription', labelUk: 'Короткий опис об\'єкта', labelEn: 'Brief Object Description', type: 'text', required: true },
    { key: 'objectAddress', labelUk: 'Адреса об\'єкта', labelEn: 'Object Address', type: 'text', required: true },
    { key: 'clientName', labelUk: 'Замовник (ПІБ / назва)', labelEn: 'Client (Name / Entity)', type: 'text', required: true },
    { key: 'executorName', labelUk: 'Виконавець (ПІБ)', labelEn: 'Executor (Name)', type: 'text', required: true },
    { key: 'executorPosition', labelUk: 'Посада виконавця', labelEn: 'Executor Position', type: 'text', required: true },
    { key: 'approverName', labelUk: 'Затвердив (ПІБ)', labelEn: 'Approved By (Name)', type: 'text', required: true },
    { key: 'approverPosition', labelUk: 'Посада', labelEn: 'Position', type: 'text', required: true },
  ],
};

const executiveSummarySection: ReportSection = {
  number: '0A',
  titleUk: 'Анотація',
  titleEn: 'Executive Summary / Abstract',
  descriptionUk:
    'Стисле викладення змісту звіту (до 500 слів): об\'єкт оцінки, причина пошкодження, ' +
    'категорія пошкодження за RDNA, загальна сума прямих збитків, втрат та потреб відновлення. ' +
    'Анотація подається двома мовами (українською та англійською) для цілей RD4U.',
  descriptionEn:
    'Concise summary of the report (up to 500 words): assessment object, cause of damage, ' +
    'RDNA damage category, total direct damage, losses and recovery needs. ' +
    'Abstract is provided in two languages (Ukrainian and English) for RD4U purposes.',
  methodologyRefs: [MethodologyReference.DSTU_3008, MethodologyReference.RD4U_RULES],
  requiredDocuments: [],
  fields: [
    { key: 'abstractUk', labelUk: 'Анотація (українською)', labelEn: 'Abstract (Ukrainian)', type: 'textarea', required: true },
    { key: 'abstractEn', labelUk: 'Анотація (англійською)', labelEn: 'Abstract (English)', type: 'textarea', required: true },
    { key: 'keywordsUk', labelUk: 'Ключові слова (укр)', labelEn: 'Keywords (Ukr)', type: 'text', required: true },
    { key: 'keywordsEn', labelUk: 'Ключові слова (англ)', labelEn: 'Keywords (Eng)', type: 'text', required: true },
    { key: 'totalDirectDamageUAH', labelUk: 'Загальна сума прямих збитків (грн)', labelEn: 'Total Direct Damage (UAH)', type: 'currency', required: true },
    { key: 'totalDirectDamageUSD', labelUk: 'Загальна сума прямих збитків (USD)', labelEn: 'Total Direct Damage (USD)', type: 'currency', required: true },
    { key: 'totalLossesUAH', labelUk: 'Загальна сума втрат (грн)', labelEn: 'Total Losses (UAH)', type: 'currency', required: true },
    { key: 'totalRecoveryNeedsUAH', labelUk: 'Загальна потреба відновлення (грн)', labelEn: 'Total Recovery Needs (UAH)', type: 'currency', required: true },
    { key: 'damageCategory', labelUk: 'Категорія пошкодження', labelEn: 'Damage Category', type: 'select', required: true, options: damageCategories.map(dc => ({ value: dc.value, labelUk: dc.labelUk, labelEn: dc.labelEn })) },
  ],
};

const section1Introduction: ReportSection = {
  number: '1',
  titleUk: 'Вступ',
  titleEn: 'Introduction',
  descriptionUk:
    'Визначає мету та завдання дослідження, правові підстави для проведення оцінки, ' +
    'застосовану методологію (RDNA/DaLA, IVS, НСО), обмеження та застереження, ' +
    'дату оцінки, валюту розрахунків, обмінний курс.',
  descriptionEn:
    'Defines the purpose and scope of the assessment, legal basis for the evaluation, ' +
    'applied methodology (RDNA/DaLA, IVS, NSO), limitations and caveats, ' +
    'valuation date, calculation currency, and exchange rate.',
  methodologyRefs: [
    MethodologyReference.RDNA,
    MethodologyReference.DALA,
    MethodologyReference.IVS_2022,
    MethodologyReference.NSO_1,
    MethodologyReference.DSTU_3008,
    MethodologyReference.RD4U_RULES,
  ],
  requiredDocuments: ['contract', 'powerOfAttorney'],
  fields: [
    { key: 'purpose', labelUk: 'Мета оцінки', labelEn: 'Purpose of Assessment', type: 'textarea', required: true, hint: 'Визначення суми збитків для подання до RD4U / ICC' },
    { key: 'legalBasis', labelUk: 'Правова підстава', labelEn: 'Legal Basis', type: 'textarea', required: true, hint: 'Договір, довіреність, рішення суду тощо' },
    { key: 'valuationDate', labelUk: 'Дата оцінки', labelEn: 'Valuation Date', type: 'date', required: true },
    { key: 'inspectionDate', labelUk: 'Дата обстеження', labelEn: 'Inspection Date', type: 'date', required: true },
    { key: 'currencyBase', labelUk: 'Базова валюта розрахунків', labelEn: 'Base Calculation Currency', type: 'select', required: true, options: [
      { value: 'UAH', labelUk: 'Гривня (UAH)', labelEn: 'Ukrainian Hryvnia (UAH)' },
      { value: 'USD', labelUk: 'Долар США (USD)', labelEn: 'US Dollar (USD)' },
      { value: 'EUR', labelUk: 'Євро (EUR)', labelEn: 'Euro (EUR)' },
    ]},
    { key: 'exchangeRateUAHUSD', labelUk: 'Курс НБУ UAH/USD на дату оцінки', labelEn: 'NBU exchange rate UAH/USD at valuation date', type: 'number', required: true },
    { key: 'exchangeRateUAHEUR', labelUk: 'Курс НБУ UAH/EUR на дату оцінки', labelEn: 'NBU exchange rate UAH/EUR at valuation date', type: 'number', required: true },
    { key: 'methodologyDescription', labelUk: 'Опис застосованої методології', labelEn: 'Description of Applied Methodology', type: 'textarea', required: true },
    { key: 'limitations', labelUk: 'Обмеження та застереження', labelEn: 'Limitations and Caveats', type: 'textarea', required: true },
    { key: 'assumptionsAndConditions', labelUk: 'Припущення та умови', labelEn: 'Assumptions and Conditions', type: 'textarea', required: true },
  ],
};

const section2ObjectIdentification: ReportSection = {
  number: '2',
  titleUk: 'Ідентифікація об\'єкта',
  titleEn: 'Object Identification',
  descriptionUk:
    'Повна ідентифікація об\'єкта нерухомого майна: адреса, кадастровий номер, ' +
    'правовстановлюючі документи, технічний паспорт, площа, поверховість, рік побудови, ' +
    'конструктивна схема, матеріал стін/покрівлі, інженерні мережі. ' +
    'GPS-координати та прив\'язка до кадастрової карти.',
  descriptionEn:
    'Full identification of the real property object: address, cadastral number, ' +
    'title documents, technical passport, area, number of floors, year of construction, ' +
    'structural system, wall/roof materials, utility networks. ' +
    'GPS coordinates and cadastral map reference.',
  methodologyRefs: [
    MethodologyReference.NSO_2,
    MethodologyReference.KMU_431,
    MethodologyReference.RD4U_RULES,
  ],
  requiredDocuments: [
    'ownershipCertificate',
    'technicalPassport',
    'cadastralExtract',
    'btiExtract',
    'landCadastralNumber',
  ],
  fields: [
    { key: 'fullAddress', labelUk: 'Повна адреса', labelEn: 'Full Address', type: 'text', required: true },
    { key: 'cadastralNumber', labelUk: 'Кадастровий номер земельної ділянки', labelEn: 'Land Cadastral Number', type: 'text', required: true },
    { key: 'propertyRegistrationNumber', labelUk: 'Реєстраційний номер об\'єкта нерухомості', labelEn: 'Property Registration Number', type: 'text', required: true },
    { key: 'coordinates', labelUk: 'GPS-координати', labelEn: 'GPS Coordinates', type: 'coordinates', required: true },
    { key: 'ownerName', labelUk: 'Власник (ПІБ / назва юр. особи)', labelEn: 'Owner (Full name / Entity name)', type: 'text', required: true },
    { key: 'ownershipBasis', labelUk: 'Підстава набуття права власності', labelEn: 'Basis of Ownership', type: 'text', required: true },
    { key: 'ownershipDocDetails', labelUk: 'Реквізити правовстановлюючого документа', labelEn: 'Title Document Details', type: 'textarea', required: true },
    { key: 'totalAreaM2', labelUk: 'Загальна площа (м²)', labelEn: 'Total Area (m²)', type: 'number', required: true },
    { key: 'livingAreaM2', labelUk: 'Житлова площа (м²)', labelEn: 'Living Area (m²)', type: 'number', required: false },
    { key: 'landAreaM2', labelUk: 'Площа земельної ділянки (м²)', labelEn: 'Land Plot Area (m²)', type: 'number', required: false },
    { key: 'numberOfFloors', labelUk: 'Кількість поверхів', labelEn: 'Number of Floors', type: 'number', required: true },
    { key: 'yearBuilt', labelUk: 'Рік побудови', labelEn: 'Year Built', type: 'number', required: true },
    { key: 'structuralSystem', labelUk: 'Конструктивна система', labelEn: 'Structural System', type: 'select', required: true, options: [
      { value: 'frame', labelUk: 'Каркасна', labelEn: 'Frame' },
      { value: 'wall_bearing', labelUk: 'Стінова (несучі стіни)', labelEn: 'Wall-bearing' },
      { value: 'combined', labelUk: 'Комбінована', labelEn: 'Combined' },
      { value: 'prefab_panel', labelUk: 'Збірна панельна', labelEn: 'Prefab panel' },
      { value: 'log_timber', labelUk: 'Дерев\'яна зрубна', labelEn: 'Log / Timber' },
      { value: 'other', labelUk: 'Інша', labelEn: 'Other' },
    ]},
    { key: 'wallMaterial', labelUk: 'Матеріал стін', labelEn: 'Wall Material', type: 'text', required: true },
    { key: 'roofMaterial', labelUk: 'Матеріал покрівлі', labelEn: 'Roof Material', type: 'text', required: true },
    { key: 'foundationType', labelUk: 'Тип фундаменту', labelEn: 'Foundation Type', type: 'text', required: true },
    { key: 'utilities', labelUk: 'Інженерні мережі', labelEn: 'Utility Networks', type: 'textarea', required: true, hint: 'Електро, газ, водопостачання, каналізація, опалення' },
    { key: 'generalConditionNote', labelUk: 'Загальний стан (примітки)', labelEn: 'General Condition (Notes)', type: 'textarea', required: false },
  ],
};

const section3PreWarCondition: ReportSection = {
  number: '3',
  titleUk: 'Довоєнний стан об\'єкта',
  titleEn: 'Pre-War Condition (Baseline)',
  descriptionUk:
    'Встановлення базового стану об\'єкта до 24.02.2022 (або до дати пошкодження, якщо об\'єкт ' +
    'знаходився на окупованій з 2014 р. території). Базовий стан визначається на підставі: ' +
    'технічного паспорту, фотографій, супутникових знімків (Maxar, Planet Labs, Google Earth), ' +
    'звітів про оцінку, актів обстеження, показань сусідів/свідків. ' +
    'Визначення ринкової вартості об\'єкта у довоєнному стані згідно з НСО №1, НСО №2, IVS.',
  descriptionEn:
    'Establishing the baseline condition of the object before 24 Feb 2022 (or before the damage date ' +
    'if the object was in territory occupied since 2014). Baseline is determined based on: ' +
    'technical passport, photographs, satellite imagery (Maxar, Planet Labs, Google Earth), ' +
    'valuation reports, inspection acts, neighbor/witness statements. ' +
    'Determination of pre-war market value per NSO No.1, NSO No.2, IVS.',
  methodologyRefs: [
    MethodologyReference.RDNA,
    MethodologyReference.IVS_2022,
    MethodologyReference.NSO_1,
    MethodologyReference.NSO_2,
    MethodologyReference.RD4U_RULES,
  ],
  requiredDocuments: [
    'preWarPhotos',
    'technicalPassport',
    'previousValuationReport',
    'satelliteImageryPreWar',
    'witnessStatements',
  ],
  fields: [
    { key: 'baselineDate', labelUk: 'Дата визначення базового стану', labelEn: 'Baseline Date', type: 'date', required: true, hint: 'Зазвичай 23.02.2022 або дата до початку обстрілів у регіоні' },
    { key: 'physicalConditionPreWar', labelUk: 'Фізичний стан до пошкодження', labelEn: 'Physical Condition Before Damage', type: 'select', required: true, options: [
      { value: 'excellent', labelUk: 'Відмінний', labelEn: 'Excellent' },
      { value: 'good', labelUk: 'Добрий', labelEn: 'Good' },
      { value: 'satisfactory', labelUk: 'Задовільний', labelEn: 'Satisfactory' },
      { value: 'worn', labelUk: 'Зношений', labelEn: 'Worn' },
      { value: 'poor', labelUk: 'Незадовільний', labelEn: 'Poor' },
    ]},
    { key: 'physicalDepreciationPercent', labelUk: 'Фізичний знос (%)', labelEn: 'Physical Depreciation (%)', type: 'number', required: true },
    { key: 'functionalDepreciationPercent', labelUk: 'Функціональний знос (%)', labelEn: 'Functional Obsolescence (%)', type: 'number', required: false },
    { key: 'economicDepreciationPercent', labelUk: 'Економічний (зовнішній) знос (%)', labelEn: 'Economic (External) Obsolescence (%)', type: 'number', required: false },
    { key: 'preWarMarketValueUAH', labelUk: 'Ринкова вартість до війни (грн)', labelEn: 'Pre-War Market Value (UAH)', type: 'currency', required: true },
    { key: 'preWarMarketValueUSD', labelUk: 'Ринкова вартість до війни (USD)', labelEn: 'Pre-War Market Value (USD)', type: 'currency', required: true },
    { key: 'valuationApproachUsed', labelUk: 'Використані підходи до оцінки', labelEn: 'Valuation Approaches Used', type: 'textarea', required: true, hint: 'Витратний, порівняльний та/або дохідний підхід' },
    { key: 'comparableSalesData', labelUk: 'Дані порівняльних продажів', labelEn: 'Comparable Sales Data', type: 'table', required: false, columns: [
      { key: 'address', labelUk: 'Адреса аналога', labelEn: 'Comparable Address', type: 'text' },
      { key: 'saleDate', labelUk: 'Дата продажу', labelEn: 'Sale Date', type: 'date' },
      { key: 'areaM2', labelUk: 'Площа (м²)', labelEn: 'Area (m²)', type: 'number' },
      { key: 'priceUAH', labelUk: 'Ціна (грн)', labelEn: 'Price (UAH)', type: 'currency' },
      { key: 'pricePerM2', labelUk: 'Ціна за м²', labelEn: 'Price per m²', type: 'currency' },
      { key: 'adjustments', labelUk: 'Коригування', labelEn: 'Adjustments', type: 'text' },
    ]},
    { key: 'preWarPhotos', labelUk: 'Фотографії довоєнного стану', labelEn: 'Pre-War Photographs', type: 'photo', required: true },
    { key: 'satelliteImageryPreWar', labelUk: 'Супутникові знімки (до)', labelEn: 'Satellite Imagery (Before)', type: 'file', required: true },
    { key: 'preWarDescriptionNarrative', labelUk: 'Описовий розділ довоєнного стану', labelEn: 'Pre-War Condition Narrative', type: 'textarea', required: true },
    { key: 'recentRepairsOrRenovations', labelUk: 'Нещодавні ремонти/реконструкції', labelEn: 'Recent Repairs / Renovations', type: 'textarea', required: false },
  ],
};

const section4DamageDocumentation: ReportSection = {
  number: '4',
  titleUk: 'Фіксація пошкоджень',
  titleEn: 'Damage Documentation',
  descriptionUk:
    'Детальна фіксація пошкоджень: хронологія подій (дати обстрілів/ударів), ' +
    'джерела підтвердження (акти ДСНС, поліції, ВЦА/ОВА, ЗМІ, OSINT), ' +
    'фотофіксація поточного стану, супутникові знімки "після", ' +
    'класифікація пошкоджень за RDNA (D1-D4), визначення причинно-наслідкового зв\'язку ' +
    'між бойовими діями РФ та пошкодженнями.',
  descriptionEn:
    'Detailed damage documentation: chronology of events (dates of shelling/strikes), ' +
    'corroborating sources (SESU acts, police reports, CMA/OMA, media, OSINT), ' +
    'photographic record of current condition, "after" satellite imagery, ' +
    'RDNA damage classification (D1-D4), establishing causal link between ' +
    'RF hostilities and the damage.',
  methodologyRefs: [
    MethodologyReference.RDNA,
    MethodologyReference.KMU_326,
    MethodologyReference.KMU_431,
    MethodologyReference.RD4U_RULES,
    MethodologyReference.ICC_GUIDANCE,
  ],
  requiredDocuments: [
    'dsnsAct',
    'policeReport',
    'localAdminAct',
    'postDamagePhotos',
    'satelliteImageryPostDamage',
    'mediaReports',
  ],
  fields: [
    { key: 'damageDate', labelUk: 'Дата пошкодження', labelEn: 'Date of Damage', type: 'date', required: true },
    { key: 'damageTime', labelUk: 'Час пошкодження (якщо відомо)', labelEn: 'Time of Damage (if known)', type: 'text', required: false },
    { key: 'causeOfDamage', labelUk: 'Причина пошкодження', labelEn: 'Cause of Damage', type: 'select', required: true, options: causesOfDamage.map(c => ({ value: c.value, labelUk: c.labelUk, labelEn: c.labelEn })) },
    { key: 'damageCategory', labelUk: 'Категорія пошкодження (RDNA)', labelEn: 'Damage Category (RDNA)', type: 'select', required: true, options: damageCategories.map(dc => ({ value: dc.value, labelUk: `${dc.labelUk} [${dc.rdnaCode}]`, labelEn: `${dc.labelEn} [${dc.rdnaCode}]` })) },
    { key: 'damagePercentage', labelUk: 'Відсоток пошкодження (%)', labelEn: 'Damage Percentage (%)', type: 'number', required: true },
    { key: 'chronologyOfEvents', labelUk: 'Хронологія подій', labelEn: 'Chronology of Events', type: 'textarea', required: true, hint: 'Послідовний виклад подій, що призвели до пошкодження' },
    { key: 'causalLinkNarrative', labelUk: 'Обґрунтування причинно-наслідкового зв\'язку', labelEn: 'Causal Link Justification', type: 'textarea', required: true, hint: 'Докази зв\'язку між діями РФ та пошкодженням' },
    { key: 'corroboratingSources', labelUk: 'Джерела підтвердження', labelEn: 'Corroborating Sources', type: 'textarea', required: true, hint: 'Акти ДСНС, поліція, ОВА, ЗМІ, OSINT-звіти' },
    { key: 'damageByElement', labelUk: 'Пошкодження по конструктивних елементах', labelEn: 'Damage by Structural Element', type: 'table', required: true, columns: [
      { key: 'element', labelUk: 'Конструктивний елемент', labelEn: 'Structural Element', type: 'text' },
      { key: 'damageDescription', labelUk: 'Опис пошкодження', labelEn: 'Damage Description', type: 'text' },
      { key: 'damagePercent', labelUk: 'Ступінь пошкодження (%)', labelEn: 'Damage Degree (%)', type: 'number' },
      { key: 'repairOrReplace', labelUk: 'Ремонт / Заміна', labelEn: 'Repair / Replace', type: 'text' },
    ]},
    { key: 'postDamagePhotos', labelUk: 'Фотофіксація пошкоджень', labelEn: 'Damage Photographs', type: 'photo', required: true },
    { key: 'satelliteImageryPostDamage', labelUk: 'Супутникові знімки (після)', labelEn: 'Satellite Imagery (After)', type: 'file', required: true },
    { key: 'additionalDamageEvents', labelUk: 'Додаткові пошкодження (повторні удари)', labelEn: 'Additional Damage (Repeated Strikes)', type: 'textarea', required: false },
    { key: 'hazardousConditions', labelUk: 'Небезпечні умови (асбест, ВНП, тощо)', labelEn: 'Hazardous Conditions (asbestos, UXO, etc.)', type: 'textarea', required: false },
  ],
};

const section5DamageAssessment: ReportSection = {
  number: '5',
  titleUk: 'Оцінка збитків за методологією DaLA',
  titleEn: 'Damage Assessment (DaLA Methodology)',
  descriptionUk:
    'Комплексна оцінка збитків згідно з тристоронньою методологією DaLA (Світовий банк / ЄС / ООН): ' +
    '(1) прямі збитки — вартість зруйнованих/пошкоджених фізичних активів за довоєнними цінами заміщення; ' +
    '(2) втрати — порушені економічні потоки (втрачений дохід, додаткові витрати); ' +
    '(3) потреби відновлення — збитки + втрати + надбавка "Відновити краще" (BBB).',
  descriptionEn:
    'Comprehensive damage assessment per the tripartite DaLA methodology (World Bank / EU / UN): ' +
    '(1) direct damage — cost of destroyed/damaged physical assets at pre-war replacement prices; ' +
    '(2) losses — disrupted economic flows (lost income, additional costs); ' +
    '(3) recovery needs — damage + losses + Build Back Better (BBB) surcharge.',
  methodologyRefs: [
    MethodologyReference.RDNA,
    MethodologyReference.DALA,
    MethodologyReference.IVS_2022,
    MethodologyReference.NSO_1,
    MethodologyReference.NSO_2,
    MethodologyReference.DSTU_BD,
    MethodologyReference.KMU_326,
  ],
  requiredDocuments: [
    'constructionEstimates',
    'contractorQuotes',
    'marketPriceData',
  ],
  fields: [],
  subsections: [
    {
      number: '5.1',
      titleUk: 'Прямі збитки (Direct Damage)',
      titleEn: 'Direct Damage',
      descriptionUk:
        'Вартість заміщення (відновлення) зруйнованих або пошкоджених фізичних активів ' +
        'за довоєнними цінами (станом на 23.02.2022). Розрахунок ведеться за витратним підходом: ' +
        'повна відновна вартість мінус знос до дати пошкодження. ' +
        'Для знищених об\'єктів — повна вартість заміщення. ' +
        'Для пошкоджених — вартість відновлювального ремонту.',
      descriptionEn:
        'Replacement (restoration) cost of destroyed or damaged physical assets at pre-war prices ' +
        '(as of 23 Feb 2022). Calculated using the cost approach: full replacement cost minus ' +
        'depreciation to the date of damage. For destroyed objects — full replacement cost. ' +
        'For damaged objects — restoration repair cost.',
      methodologyRefs: [
        MethodologyReference.DALA,
        MethodologyReference.RDNA,
        MethodologyReference.DSTU_BD,
        MethodologyReference.NSO_2,
      ],
      requiredDocuments: ['constructionEstimates', 'marketPriceData'],
      fields: [
        { key: 'replacementCostNewUAH', labelUk: 'Повна відновна вартість (грн)', labelEn: 'Full Replacement Cost New (UAH)', type: 'currency', required: true },
        { key: 'depreciationBeforeDamageUAH', labelUk: 'Накопичений знос до пошкодження (грн)', labelEn: 'Accumulated Depreciation Before Damage (UAH)', type: 'currency', required: true },
        { key: 'depreciatedReplacementCostUAH', labelUk: 'Залишкова відновна вартість (грн)', labelEn: 'Depreciated Replacement Cost (UAH)', type: 'currency', required: true },
        { key: 'damageByComponentTable', labelUk: 'Розрахунок збитків по компонентах', labelEn: 'Damage Calculation by Component', type: 'table', required: true, columns: [
          { key: 'component', labelUk: 'Компонент / елемент', labelEn: 'Component / Element', type: 'text' },
          { key: 'unit', labelUk: 'Одиниця виміру', labelEn: 'Unit', type: 'text' },
          { key: 'quantity', labelUk: 'Об\'єм', labelEn: 'Quantity', type: 'number' },
          { key: 'unitPricePreWar', labelUk: 'Ціна од. (довоєнна, грн)', labelEn: 'Unit Price (pre-war, UAH)', type: 'currency' },
          { key: 'totalPreWar', labelUk: 'Всього (довоєнна, грн)', labelEn: 'Total (pre-war, UAH)', type: 'currency' },
          { key: 'damagePercent', labelUk: 'Пошкодження (%)', labelEn: 'Damage (%)', type: 'number' },
          { key: 'damageAmountUAH', labelUk: 'Сума збитку (грн)', labelEn: 'Damage Amount (UAH)', type: 'currency' },
        ]},
        { key: 'movablePropertyDamageUAH', labelUk: 'Збитки рухомому майну (грн)', labelEn: 'Movable Property Damage (UAH)', type: 'currency', required: false },
        { key: 'totalDirectDamageUAH', labelUk: 'Загальна сума прямих збитків (грн)', labelEn: 'Total Direct Damage (UAH)', type: 'currency', required: true },
        { key: 'totalDirectDamageUSD', labelUk: 'Загальна сума прямих збитків (USD)', labelEn: 'Total Direct Damage (USD)', type: 'currency', required: true },
        { key: 'priceSourcesAndJustification', labelUk: 'Джерела цін та обґрунтування', labelEn: 'Price Sources and Justification', type: 'textarea', required: true },
      ],
    },
    {
      number: '5.2',
      titleUk: 'Втрати (Losses)',
      titleEn: 'Losses (Disrupted Economic Flows)',
      descriptionUk:
        'Оцінка втрат від порушення нормальних економічних потоків внаслідок пошкодження: ' +
        'втрачений дохід від оренди, додаткові витрати на тимчасове житло, ' +
        'витрати на евакуацію, зберігання майна, транспортні витрати. ' +
        'Розраховуються від дати пошкодження до передбачуваної дати відновлення.',
      descriptionEn:
        'Assessment of losses from disrupted normal economic flows due to damage: ' +
        'lost rental income, additional temporary housing costs, evacuation costs, ' +
        'storage costs, transportation costs. Calculated from damage date to projected recovery date.',
      methodologyRefs: [MethodologyReference.DALA, MethodologyReference.RDNA],
      requiredDocuments: ['rentalAgreements', 'utilityBills', 'temporaryHousingReceipts'],
      fields: [
        { key: 'lossPeriodStart', labelUk: 'Період втрат: початок', labelEn: 'Loss Period: Start', type: 'date', required: true },
        { key: 'lossPeriodEnd', labelUk: 'Період втрат: кінець (прогноз)', labelEn: 'Loss Period: End (Projected)', type: 'date', required: true },
        { key: 'lossesTable', labelUk: 'Розрахунок втрат', labelEn: 'Losses Calculation', type: 'table', required: true, columns: [
          { key: 'lossType', labelUk: 'Вид втрати', labelEn: 'Loss Type', type: 'text' },
          { key: 'periodMonths', labelUk: 'Період (місяців)', labelEn: 'Period (months)', type: 'number' },
          { key: 'monthlyAmountUAH', labelUk: 'Щомісячна сума (грн)', labelEn: 'Monthly Amount (UAH)', type: 'currency' },
          { key: 'totalAmountUAH', labelUk: 'Загальна сума (грн)', labelEn: 'Total Amount (UAH)', type: 'currency' },
          { key: 'evidence', labelUk: 'Підтвердження', labelEn: 'Evidence', type: 'text' },
        ]},
        { key: 'lostRentalIncomeUAH', labelUk: 'Втрачений дохід від оренди (грн)', labelEn: 'Lost Rental Income (UAH)', type: 'currency', required: false },
        { key: 'temporaryHousingCostUAH', labelUk: 'Витрати на тимчасове житло (грн)', labelEn: 'Temporary Housing Cost (UAH)', type: 'currency', required: false },
        { key: 'evacuationCostsUAH', labelUk: 'Витрати на евакуацію (грн)', labelEn: 'Evacuation Costs (UAH)', type: 'currency', required: false },
        { key: 'otherAdditionalCostsUAH', labelUk: 'Інші додаткові витрати (грн)', labelEn: 'Other Additional Costs (UAH)', type: 'currency', required: false },
        { key: 'totalLossesUAH', labelUk: 'Загальна сума втрат (грн)', labelEn: 'Total Losses (UAH)', type: 'currency', required: true },
        { key: 'totalLossesUSD', labelUk: 'Загальна сума втрат (USD)', labelEn: 'Total Losses (USD)', type: 'currency', required: true },
        { key: 'lossCalculationNarrative', labelUk: 'Обґрунтування розрахунку втрат', labelEn: 'Loss Calculation Narrative', type: 'textarea', required: true },
      ],
    },
    {
      number: '5.3',
      titleUk: 'Потреби відновлення (Recovery Needs)',
      titleEn: 'Recovery Needs',
      descriptionUk:
        'Загальні потреби відновлення = Прямі збитки + Втрати + Надбавка "Відновити краще" (BBB). ' +
        'BBB-надбавка враховує: підвищення енергоефективності, сейсмостійкості, ' +
        'доступності для маломобільних груп, використання сучасних матеріалів та технологій. ' +
        'Типова BBB-надбавка за RDNA: 20-35% від прямих збитків.',
      descriptionEn:
        'Total recovery needs = Direct damage + Losses + Build Back Better (BBB) surcharge. ' +
        'BBB surcharge accounts for: improved energy efficiency, seismic resilience, ' +
        'accessibility for persons with reduced mobility, use of modern materials and technologies. ' +
        'Typical RDNA BBB surcharge: 20-35% of direct damage.',
      methodologyRefs: [MethodologyReference.RDNA, MethodologyReference.DALA],
      requiredDocuments: [],
      fields: [
        { key: 'totalDirectDamageUAH', labelUk: 'Прямі збитки (грн)', labelEn: 'Direct Damage (UAH)', type: 'currency', required: true },
        { key: 'totalLossesUAH', labelUk: 'Втрати (грн)', labelEn: 'Losses (UAH)', type: 'currency', required: true },
        { key: 'bbbSurchargePercent', labelUk: 'Надбавка BBB (%)', labelEn: 'BBB Surcharge (%)', type: 'number', required: true, hint: 'Типово 20-35% за RDNA' },
        { key: 'bbbSurchargeUAH', labelUk: 'Надбавка BBB (грн)', labelEn: 'BBB Surcharge (UAH)', type: 'currency', required: true },
        { key: 'bbbJustification', labelUk: 'Обґрунтування надбавки BBB', labelEn: 'BBB Surcharge Justification', type: 'textarea', required: true, hint: 'Конкретні заходи: енергоефективність, доступність, сучасні матеріали' },
        { key: 'totalRecoveryNeedsUAH', labelUk: 'Загальні потреби відновлення (грн)', labelEn: 'Total Recovery Needs (UAH)', type: 'currency', required: true },
        { key: 'totalRecoveryNeedsUSD', labelUk: 'Загальні потреби відновлення (USD)', labelEn: 'Total Recovery Needs (USD)', type: 'currency', required: true },
        { key: 'totalRecoveryNeedsEUR', labelUk: 'Загальні потреби відновлення (EUR)', labelEn: 'Total Recovery Needs (EUR)', type: 'currency', required: true },
      ],
    },
  ],
};

const section6CostCalculation: ReportSection = {
  number: '6',
  titleUk: 'Розрахунок вартості відновлення',
  titleEn: 'Restoration Cost Calculation',
  descriptionUk:
    'Детальний кошторисний розрахунок вартості відновлення/реконструкції об\'єкта ' +
    'відповідно до ДСТУ Б Д.1.1-1:2013 та поточних ринкових цін. ' +
    'Включає: об\'ємні розрахунки, специфікацію матеріалів, вартість робіт, ' +
    'накладні витрати, кошторисний прибуток, ПДВ. ' +
    'Розрахунок ведеться у двох цінових базах: довоєнній (для визначення збитків) ' +
    'та поточній (для визначення потреб відновлення).',
  descriptionEn:
    'Detailed cost estimate for restoration/reconstruction per ДСТУ Б Д.1.1-1:2013 ' +
    'and current market prices. Includes: quantity calculations, material specifications, ' +
    'labor costs, overhead, estimator profit, VAT. ' +
    'Calculation is performed in two price bases: pre-war (for damage determination) ' +
    'and current (for recovery needs determination).',
  methodologyRefs: [
    MethodologyReference.DSTU_BD,
    MethodologyReference.NSO_2,
    MethodologyReference.DALA,
  ],
  requiredDocuments: ['constructionEstimates', 'contractorQuotes', 'marketPriceData'],
  fields: [
    { key: 'estimateMethodology', labelUk: 'Методологія складання кошторису', labelEn: 'Estimate Methodology', type: 'textarea', required: true },
    { key: 'preWarPriceBase', labelUk: 'Довоєнна цінова база', labelEn: 'Pre-War Price Base', type: 'text', required: true, hint: 'Рік та квартал, джерело цін' },
    { key: 'currentPriceBase', labelUk: 'Поточна цінова база', labelEn: 'Current Price Base', type: 'text', required: true },
    { key: 'summaryEstimateTable', labelUk: 'Зведений кошторисний розрахунок', labelEn: 'Summary Cost Estimate', type: 'table', required: true, columns: [
      { key: 'lineNumber', labelUk: '№ п/п', labelEn: 'No.', type: 'text' },
      { key: 'workDescription', labelUk: 'Найменування робіт', labelEn: 'Work Description', type: 'text' },
      { key: 'unit', labelUk: 'Одиниця', labelEn: 'Unit', type: 'text' },
      { key: 'quantity', labelUk: 'Кількість', labelEn: 'Quantity', type: 'number' },
      { key: 'unitPricePreWar', labelUk: 'Ціна од. довоєнна (грн)', labelEn: 'Pre-war Unit Price (UAH)', type: 'currency' },
      { key: 'totalPreWar', labelUk: 'Всього довоєнна (грн)', labelEn: 'Pre-war Total (UAH)', type: 'currency' },
      { key: 'unitPriceCurrent', labelUk: 'Ціна од. поточна (грн)', labelEn: 'Current Unit Price (UAH)', type: 'currency' },
      { key: 'totalCurrent', labelUk: 'Всього поточна (грн)', labelEn: 'Current Total (UAH)', type: 'currency' },
    ]},
    { key: 'directCostsPreWarUAH', labelUk: 'Прямі витрати (довоєнні, грн)', labelEn: 'Direct Costs (Pre-war, UAH)', type: 'currency', required: true },
    { key: 'overheadPreWarUAH', labelUk: 'Загальновиробничі витрати (довоєнні, грн)', labelEn: 'Overhead (Pre-war, UAH)', type: 'currency', required: true },
    { key: 'estimatorProfitPreWarUAH', labelUk: 'Кошторисний прибуток (довоєнний, грн)', labelEn: 'Estimator Profit (Pre-war, UAH)', type: 'currency', required: true },
    { key: 'vatPreWarUAH', labelUk: 'ПДВ (довоєнний, грн)', labelEn: 'VAT (Pre-war, UAH)', type: 'currency', required: true },
    { key: 'totalEstimatePreWarUAH', labelUk: 'Разом за кошторисом (довоєнний, грн)', labelEn: 'Total Estimate (Pre-war, UAH)', type: 'currency', required: true },
    { key: 'directCostsCurrentUAH', labelUk: 'Прямі витрати (поточні, грн)', labelEn: 'Direct Costs (Current, UAH)', type: 'currency', required: true },
    { key: 'overheadCurrentUAH', labelUk: 'Загальновиробничі витрати (поточні, грн)', labelEn: 'Overhead (Current, UAH)', type: 'currency', required: true },
    { key: 'estimatorProfitCurrentUAH', labelUk: 'Кошторисний прибуток (поточний, грн)', labelEn: 'Estimator Profit (Current, UAH)', type: 'currency', required: true },
    { key: 'vatCurrentUAH', labelUk: 'ПДВ (поточний, грн)', labelEn: 'VAT (Current, UAH)', type: 'currency', required: true },
    { key: 'totalEstimateCurrentUAH', labelUk: 'Разом за кошторисом (поточний, грн)', labelEn: 'Total Estimate (Current, UAH)', type: 'currency', required: true },
    { key: 'priceInflationCoefficient', labelUk: 'Коефіцієнт подорожчання (поточний/довоєнний)', labelEn: 'Price Inflation Coefficient (Current / Pre-war)', type: 'number', required: true },
    { key: 'estimateNotes', labelUk: 'Примітки до кошторису', labelEn: 'Estimate Notes', type: 'textarea', required: false },
  ],
};

const section7LostProfits: ReportSection = {
  number: '7',
  titleUk: 'Упущена вигода',
  titleEn: 'Lost Profits',
  descriptionUk:
    'Розрахунок упущеної вигоди (для комерційної, промислової, сільськогосподарської нерухомості). ' +
    'Визначається як чистий дохід, який власник міг би отримати за нормальних умов ' +
    'за період від дати пошкодження до дати повного відновлення. ' +
    'Застосовується дохідний підхід (метод дисконтування грошових потоків або метод прямої капіталізації). ' +
    'Для житлової нерухомості — розрахунок втраченого доходу від оренди (якщо застосовно).',
  descriptionEn:
    'Lost profit calculation (for commercial, industrial, agricultural property). ' +
    'Determined as net income the owner could have earned under normal conditions ' +
    'from the damage date to the full recovery date. ' +
    'Income approach applied (DCF method or direct capitalization method). ' +
    'For residential property — lost rental income calculation (if applicable).',
  methodologyRefs: [
    MethodologyReference.DALA,
    MethodologyReference.IVS_2022,
    MethodologyReference.NSO_1,
    MethodologyReference.KMU_1891,
  ],
  requiredDocuments: [
    'financialStatements',
    'taxReturns',
    'rentalAgreements',
    'businessLicenses',
  ],
  fields: [
    { key: 'applicability', labelUk: 'Застосовність розділу', labelEn: 'Section Applicability', type: 'select', required: true, options: [
      { value: 'applicable', labelUk: 'Застосовується', labelEn: 'Applicable' },
      { value: 'not_applicable', labelUk: 'Не застосовується', labelEn: 'Not Applicable' },
    ]},
    { key: 'incomeType', labelUk: 'Вид доходу', labelEn: 'Income Type', type: 'select', required: false, options: [
      { value: 'rental', labelUk: 'Орендний дохід', labelEn: 'Rental Income' },
      { value: 'business', labelUk: 'Підприємницький дохід', labelEn: 'Business Income' },
      { value: 'agricultural', labelUk: 'Сільськогосподарський дохід', labelEn: 'Agricultural Income' },
      { value: 'mixed', labelUk: 'Змішаний', labelEn: 'Mixed' },
    ]},
    { key: 'preWarAnnualIncomeUAH', labelUk: 'Довоєнний річний дохід (грн)', labelEn: 'Pre-War Annual Income (UAH)', type: 'currency', required: false },
    { key: 'preWarAnnualExpensesUAH', labelUk: 'Довоєнні річні витрати (грн)', labelEn: 'Pre-War Annual Expenses (UAH)', type: 'currency', required: false },
    { key: 'preWarNetIncomeUAH', labelUk: 'Довоєнний чистий дохід (грн)', labelEn: 'Pre-War Net Income (UAH)', type: 'currency', required: false },
    { key: 'lostProfitPeriodMonths', labelUk: 'Період упущеної вигоди (місяців)', labelEn: 'Lost Profit Period (months)', type: 'number', required: false },
    { key: 'discountRate', labelUk: 'Ставка дисконтування (%)', labelEn: 'Discount Rate (%)', type: 'number', required: false },
    { key: 'lostProfitCalculationTable', labelUk: 'Розрахунок упущеної вигоди', labelEn: 'Lost Profit Calculation', type: 'table', required: false, columns: [
      { key: 'period', labelUk: 'Період', labelEn: 'Period', type: 'text' },
      { key: 'grossIncomeUAH', labelUk: 'Валовий дохід (грн)', labelEn: 'Gross Income (UAH)', type: 'currency' },
      { key: 'expensesUAH', labelUk: 'Витрати (грн)', labelEn: 'Expenses (UAH)', type: 'currency' },
      { key: 'netIncomeUAH', labelUk: 'Чистий дохід (грн)', labelEn: 'Net Income (UAH)', type: 'currency' },
      { key: 'discountFactor', labelUk: 'Коефіцієнт дисконтування', labelEn: 'Discount Factor', type: 'number' },
      { key: 'presentValueUAH', labelUk: 'Теперішня вартість (грн)', labelEn: 'Present Value (UAH)', type: 'currency' },
    ]},
    { key: 'totalLostProfitUAH', labelUk: 'Загальна сума упущеної вигоди (грн)', labelEn: 'Total Lost Profit (UAH)', type: 'currency', required: false },
    { key: 'totalLostProfitUSD', labelUk: 'Загальна сума упущеної вигоди (USD)', labelEn: 'Total Lost Profit (USD)', type: 'currency', required: false },
    { key: 'lostProfitNarrative', labelUk: 'Обґрунтування розрахунку', labelEn: 'Calculation Justification', type: 'textarea', required: false },
  ],
};

const section8Conclusions: ReportSection = {
  number: '8',
  titleUk: 'Висновки',
  titleEn: 'Conclusions',
  descriptionUk:
    'Підсумкові висновки звіту: ' +
    '1) Ідентифікація об\'єкта та підтвердження права власності; ' +
    '2) Причинно-наслідковий зв\'язок з агресією РФ; ' +
    '3) Категорія пошкодження (RDNA D1-D4); ' +
    '4) Загальна сума прямих збитків; ' +
    '5) Загальна сума втрат; ' +
    '6) Загальні потреби відновлення (з BBB); ' +
    '7) Упущена вигода (за наявності); ' +
    '8) Загальна сума претензії. ' +
    'Висновки подаються у таблиці-резюме та описово.',
  descriptionEn:
    'Summary conclusions: ' +
    '1) Object identification and ownership confirmation; ' +
    '2) Causal link to RF aggression; ' +
    '3) Damage category (RDNA D1-D4); ' +
    '4) Total direct damage; ' +
    '5) Total losses; ' +
    '6) Total recovery needs (with BBB); ' +
    '7) Lost profits (if applicable); ' +
    '8) Total claim amount. ' +
    'Conclusions are presented as a summary table and narrative.',
  methodologyRefs: [
    MethodologyReference.DSTU_3008,
    MethodologyReference.RDNA,
    MethodologyReference.DALA,
    MethodologyReference.RD4U_RULES,
    MethodologyReference.ICC_GUIDANCE,
  ],
  requiredDocuments: [],
  fields: [
    { key: 'conclusionsSummaryTable', labelUk: 'Зведена таблиця результатів', labelEn: 'Results Summary Table', type: 'table', required: true, columns: [
      { key: 'item', labelUk: 'Стаття', labelEn: 'Item', type: 'text' },
      { key: 'amountUAH', labelUk: 'Сума (грн)', labelEn: 'Amount (UAH)', type: 'currency' },
      { key: 'amountUSD', labelUk: 'Сума (USD)', labelEn: 'Amount (USD)', type: 'currency' },
      { key: 'amountEUR', labelUk: 'Сума (EUR)', labelEn: 'Amount (EUR)', type: 'currency' },
    ]},
    { key: 'totalClaimAmountUAH', labelUk: 'Загальна сума претензії (грн)', labelEn: 'Total Claim Amount (UAH)', type: 'currency', required: true },
    { key: 'totalClaimAmountUSD', labelUk: 'Загальна сума претензії (USD)', labelEn: 'Total Claim Amount (USD)', type: 'currency', required: true },
    { key: 'totalClaimAmountEUR', labelUk: 'Загальна сума претензії (EUR)', labelEn: 'Total Claim Amount (EUR)', type: 'currency', required: true },
    { key: 'conclusionsNarrativeUk', labelUk: 'Текстові висновки (укр)', labelEn: 'Narrative Conclusions (Ukr)', type: 'textarea', required: true },
    { key: 'conclusionsNarrativeEn', labelUk: 'Текстові висновки (англ)', labelEn: 'Narrative Conclusions (Eng)', type: 'textarea', required: true },
    { key: 'rd4uClaimCategory', labelUk: 'Категорія претензії RD4U', labelEn: 'RD4U Claim Category', type: 'select', required: true, options: [
      { value: 'D1', labelUk: 'D1 — Пошкодження або знищення житлової нерухомості', labelEn: 'D1 — Damage to or destruction of residential property' },
      { value: 'D2', labelUk: 'D2 — Пошкодження або знищення іншого нерухомого майна', labelEn: 'D2 — Damage to or destruction of other real property' },
      { value: 'D3', labelUk: 'D3 — Пошкодження або знищення рухомого майна', labelEn: 'D3 — Damage to or destruction of personal property' },
      { value: 'D4', labelUk: 'D4 — Пошкодження або знищення підприємства', labelEn: 'D4 — Damage to or destruction of enterprises' },
    ]},
    { key: 'certificationStatement', labelUk: 'Сертифікаційна заява виконавця', labelEn: 'Executor Certification Statement', type: 'textarea', required: true, hint: 'Підтвердження достовірності, незалежності, кваліфікації' },
  ],
};

const sectionAppendices: ReportSection = {
  number: '9',
  titleUk: 'Додатки',
  titleEn: 'Appendices',
  descriptionUk:
    'Перелік додатків до звіту. Кожен додаток нумерується (Додаток А, Б, В...) ' +
    'відповідно до ДСТУ 3008:2015. Обов\'язкові додатки: ' +
    'А — Копії правовстановлюючих документів; ' +
    'Б — Фотофіксація (довоєнний стан та пошкодження); ' +
    'В — Супутникові знімки (до/після); ' +
    'Г — Акти обстеження (ДСНС, поліція, ВЦА); ' +
    'Д — Кошторисна документація; ' +
    'Е — Розрахункові таблиці; ' +
    'Є — Карти та схеми; ' +
    'Ж — Довідки про ринкові ціни; ' +
    'З — Кваліфікаційні документи виконавця.',
  descriptionEn:
    'List of report appendices. Each appendix is numbered (Appendix A, B, C...) ' +
    'per ДСТУ 3008:2015. Mandatory appendices: ' +
    'A — Copies of title documents; ' +
    'B — Photographs (pre-war condition and damage); ' +
    'C — Satellite imagery (before/after); ' +
    'D — Inspection acts (SESU, police, CMA); ' +
    'E — Cost estimate documentation; ' +
    'F — Calculation tables; ' +
    'G — Maps and diagrams; ' +
    'H — Market price references; ' +
    'I — Executor qualification documents.',
  methodologyRefs: [MethodologyReference.DSTU_3008, MethodologyReference.RD4U_RULES],
  requiredDocuments: [],
  fields: [
    { key: 'appendixA', labelUk: 'Додаток А — Правовстановлюючі документи', labelEn: 'Appendix A — Title Documents', type: 'file', required: true },
    { key: 'appendixB', labelUk: 'Додаток Б — Фотофіксація', labelEn: 'Appendix B — Photographs', type: 'photo', required: true },
    { key: 'appendixC', labelUk: 'Додаток В — Супутникові знімки', labelEn: 'Appendix C — Satellite Imagery', type: 'file', required: true },
    { key: 'appendixD', labelUk: 'Додаток Г — Акти обстеження', labelEn: 'Appendix D — Inspection Acts', type: 'file', required: true },
    { key: 'appendixE', labelUk: 'Додаток Д — Кошторисна документація', labelEn: 'Appendix E — Cost Estimates', type: 'file', required: true },
    { key: 'appendixF', labelUk: 'Додаток Е — Розрахункові таблиці', labelEn: 'Appendix F — Calculation Tables', type: 'file', required: true },
    { key: 'appendixG', labelUk: 'Додаток Є — Карти та схеми', labelEn: 'Appendix G — Maps and Diagrams', type: 'file', required: false },
    { key: 'appendixH', labelUk: 'Додаток Ж — Довідки про ринкові ціни', labelEn: 'Appendix H — Market Price References', type: 'file', required: true },
    { key: 'appendixI', labelUk: 'Додаток З — Кваліфікаційні документи', labelEn: 'Appendix I — Qualification Documents', type: 'file', required: true },
    { key: 'additionalAppendices', labelUk: 'Додаткові додатки', labelEn: 'Additional Appendices', type: 'file', required: false },
  ],
};

// ---------------------------------------------------------------------------
// Required Documents Checklist
// ---------------------------------------------------------------------------

const requiredDocuments: RequiredDocument[] = [
  // Ownership & Legal
  {
    key: 'ownershipCertificate',
    nameUk: 'Витяг з Державного реєстру речових прав на нерухоме майно',
    nameEn: 'Extract from the State Register of Real Property Rights',
    description: 'Current extract confirming ownership of the property',
    status: DocumentStatus.REQUIRED,
    applicableTo: [ReportType.RESIDENTIAL, ReportType.COMMERCIAL, ReportType.INDUSTRIAL, ReportType.AGRICULTURAL, ReportType.INFRASTRUCTURE],
  },
  {
    key: 'titleDocument',
    nameUk: 'Правовстановлюючий документ (договір купівлі-продажу, дарування, свідоцтво про право власності тощо)',
    nameEn: 'Title document (purchase agreement, gift deed, ownership certificate, etc.)',
    description: 'The original document establishing ownership rights',
    status: DocumentStatus.REQUIRED,
    applicableTo: [ReportType.RESIDENTIAL, ReportType.COMMERCIAL, ReportType.INDUSTRIAL, ReportType.AGRICULTURAL, ReportType.INFRASTRUCTURE],
  },
  {
    key: 'passport',
    nameUk: 'Копія паспорта / ID-картки власника',
    nameEn: 'Copy of owner\'s passport / ID card',
    description: 'Identity document of the property owner',
    status: DocumentStatus.REQUIRED,
    applicableTo: [ReportType.RESIDENTIAL, ReportType.COMMERCIAL, ReportType.INDUSTRIAL, ReportType.AGRICULTURAL, ReportType.INFRASTRUCTURE],
  },
  {
    key: 'inn',
    nameUk: 'Копія ІПН (індивідуальний податковий номер)',
    nameEn: 'Copy of TIN (individual tax number)',
    description: 'Tax identification number of the owner',
    status: DocumentStatus.REQUIRED,
    applicableTo: [ReportType.RESIDENTIAL, ReportType.COMMERCIAL, ReportType.INDUSTRIAL, ReportType.AGRICULTURAL, ReportType.INFRASTRUCTURE],
  },
  {
    key: 'powerOfAttorney',
    nameUk: 'Довіреність (якщо звіт замовляє представник)',
    nameEn: 'Power of attorney (if report is ordered by a representative)',
    description: 'Notarized power of attorney authorizing the representative to act on behalf of the owner',
    status: DocumentStatus.IF_AVAILABLE,
    applicableTo: [ReportType.RESIDENTIAL, ReportType.COMMERCIAL, ReportType.INDUSTRIAL, ReportType.AGRICULTURAL, ReportType.INFRASTRUCTURE],
  },
  {
    key: 'contract',
    nameUk: 'Договір на проведення оцінки',
    nameEn: 'Assessment contract',
    description: 'Signed contract between the owner and the Institute for conducting the assessment',
    status: DocumentStatus.REQUIRED,
    applicableTo: [ReportType.RESIDENTIAL, ReportType.COMMERCIAL, ReportType.INDUSTRIAL, ReportType.AGRICULTURAL, ReportType.INFRASTRUCTURE],
  },

  // Technical
  {
    key: 'technicalPassport',
    nameUk: 'Технічний паспорт об\'єкта нерухомості',
    nameEn: 'Technical passport of the real property object',
    description: 'BTI technical passport with floor plans, areas, and technical specifications',
    status: DocumentStatus.REQUIRED,
    applicableTo: [ReportType.RESIDENTIAL, ReportType.COMMERCIAL, ReportType.INDUSTRIAL, ReportType.INFRASTRUCTURE],
  },
  {
    key: 'cadastralExtract',
    nameUk: 'Витяг з Державного земельного кадастру',
    nameEn: 'Extract from the State Land Cadastre',
    description: 'Cadastral extract for the land plot with cadastral number',
    status: DocumentStatus.REQUIRED,
    applicableTo: [ReportType.RESIDENTIAL, ReportType.COMMERCIAL, ReportType.INDUSTRIAL, ReportType.AGRICULTURAL],
  },
  {
    key: 'btiExtract',
    nameUk: 'Довідка БТІ',
    nameEn: 'BTI reference',
    description: 'Bureau of Technical Inventory reference about the property',
    status: DocumentStatus.RECOMMENDED,
    applicableTo: [ReportType.RESIDENTIAL, ReportType.COMMERCIAL, ReportType.INDUSTRIAL],
  },
  {
    key: 'landCadastralNumber',
    nameUk: 'Кадастровий номер земельної ділянки',
    nameEn: 'Land plot cadastral number',
    description: 'Unique cadastral number assigned to the land plot',
    status: DocumentStatus.REQUIRED,
    applicableTo: [ReportType.RESIDENTIAL, ReportType.COMMERCIAL, ReportType.INDUSTRIAL, ReportType.AGRICULTURAL],
  },

  // Damage Evidence
  {
    key: 'dsnsAct',
    nameUk: 'Акт обстеження ДСНС (Державна служба з надзвичайних ситуацій)',
    nameEn: 'SESU (State Emergency Service) inspection act',
    description: 'Official inspection act from the State Emergency Service documenting the damage',
    status: DocumentStatus.REQUIRED,
    applicableTo: [ReportType.RESIDENTIAL, ReportType.COMMERCIAL, ReportType.INDUSTRIAL, ReportType.AGRICULTURAL, ReportType.INFRASTRUCTURE],
  },
  {
    key: 'policeReport',
    nameUk: 'Витяг з ЄРДР / довідка поліції',
    nameEn: 'Extract from URPI / police report',
    description: 'Police report or extract from the Unified Register of Pre-Trial Investigations',
    status: DocumentStatus.REQUIRED,
    applicableTo: [ReportType.RESIDENTIAL, ReportType.COMMERCIAL, ReportType.INDUSTRIAL, ReportType.AGRICULTURAL, ReportType.INFRASTRUCTURE],
  },
  {
    key: 'localAdminAct',
    nameUk: 'Акт обстеження ВЦА / ОВА / органу місцевого самоврядування',
    nameEn: 'CMA / OMA / local government inspection act',
    description: 'Inspection act from the Civil-Military Administration or local authority',
    status: DocumentStatus.REQUIRED,
    applicableTo: [ReportType.RESIDENTIAL, ReportType.COMMERCIAL, ReportType.INDUSTRIAL, ReportType.AGRICULTURAL, ReportType.INFRASTRUCTURE],
  },
  {
    key: 'diiaRegistration',
    nameUk: 'Заявка в Реєстрі пошкодженого майна (Дія)',
    nameEn: 'Application in the Damaged Property Register (Diia)',
    description: 'Registration in the national damaged property register through the Diia portal (CMU Resolution #431)',
    status: DocumentStatus.RECOMMENDED,
    applicableTo: [ReportType.RESIDENTIAL, ReportType.COMMERCIAL, ReportType.INDUSTRIAL, ReportType.AGRICULTURAL, ReportType.INFRASTRUCTURE],
  },

  // Photos & Imagery
  {
    key: 'preWarPhotos',
    nameUk: 'Фотографії об\'єкта до пошкодження',
    nameEn: 'Photographs of the object before damage',
    description: 'Any available photos of the property before the damage occurred (Google Street View, personal photos, real estate listings)',
    status: DocumentStatus.REQUIRED,
    applicableTo: [ReportType.RESIDENTIAL, ReportType.COMMERCIAL, ReportType.INDUSTRIAL, ReportType.AGRICULTURAL, ReportType.INFRASTRUCTURE],
  },
  {
    key: 'postDamagePhotos',
    nameUk: 'Фотографії пошкоджень (поточний стан)',
    nameEn: 'Damage photographs (current condition)',
    description: 'Comprehensive photo documentation of current damage: exterior (all sides), interior (each room/area), structural elements, utilities, surroundings',
    status: DocumentStatus.REQUIRED,
    applicableTo: [ReportType.RESIDENTIAL, ReportType.COMMERCIAL, ReportType.INDUSTRIAL, ReportType.AGRICULTURAL, ReportType.INFRASTRUCTURE],
  },
  {
    key: 'satelliteImageryPreWar',
    nameUk: 'Супутникові знімки "до" (Maxar, Planet Labs, Google Earth)',
    nameEn: 'Satellite imagery "before" (Maxar, Planet Labs, Google Earth)',
    description: 'Satellite images of the property and surroundings before the damage, sourced from Maxar, Planet Labs, or Google Earth historical imagery',
    status: DocumentStatus.REQUIRED,
    applicableTo: [ReportType.RESIDENTIAL, ReportType.COMMERCIAL, ReportType.INDUSTRIAL, ReportType.AGRICULTURAL, ReportType.INFRASTRUCTURE],
  },
  {
    key: 'satelliteImageryPostDamage',
    nameUk: 'Супутникові знімки "після"',
    nameEn: 'Satellite imagery "after"',
    description: 'Satellite images showing the damage, ideally from the same provider as the "before" images',
    status: DocumentStatus.REQUIRED,
    applicableTo: [ReportType.RESIDENTIAL, ReportType.COMMERCIAL, ReportType.INDUSTRIAL, ReportType.AGRICULTURAL, ReportType.INFRASTRUCTURE],
  },
  {
    key: 'mediaReports',
    nameUk: 'Публікації ЗМІ / OSINT-звіти про обстріли',
    nameEn: 'Media publications / OSINT reports about shelling',
    description: 'News articles, OSINT reports (Bellingcat, Conflict Observatory, etc.) corroborating the attack date and nature',
    status: DocumentStatus.RECOMMENDED,
    applicableTo: [ReportType.RESIDENTIAL, ReportType.COMMERCIAL, ReportType.INDUSTRIAL, ReportType.AGRICULTURAL, ReportType.INFRASTRUCTURE],
  },
  {
    key: 'witnessStatements',
    nameUk: 'Свідчення свідків / сусідів',
    nameEn: 'Witness / neighbor statements',
    description: 'Written statements from witnesses or neighbors corroborating the pre-war condition and/or damage events',
    status: DocumentStatus.RECOMMENDED,
    applicableTo: [ReportType.RESIDENTIAL, ReportType.COMMERCIAL, ReportType.INDUSTRIAL, ReportType.AGRICULTURAL, ReportType.INFRASTRUCTURE],
  },

  // Financial (for losses / lost profits)
  {
    key: 'constructionEstimates',
    nameUk: 'Кошторисна документація / комерційні пропозиції підрядників',
    nameEn: 'Cost estimates / contractor commercial proposals',
    description: 'Construction cost estimates or contractor quotes for restoration work',
    status: DocumentStatus.RECOMMENDED,
    applicableTo: [ReportType.RESIDENTIAL, ReportType.COMMERCIAL, ReportType.INDUSTRIAL, ReportType.AGRICULTURAL, ReportType.INFRASTRUCTURE],
  },
  {
    key: 'contractorQuotes',
    nameUk: 'Комерційні пропозиції від будівельних компаній',
    nameEn: 'Commercial proposals from construction companies',
    description: 'At least 2-3 quotes from construction companies for restoration work',
    status: DocumentStatus.RECOMMENDED,
    applicableTo: [ReportType.RESIDENTIAL, ReportType.COMMERCIAL, ReportType.INDUSTRIAL, ReportType.INFRASTRUCTURE],
  },
  {
    key: 'marketPriceData',
    nameUk: 'Дані про ринкові ціни (матеріали, роботи)',
    nameEn: 'Market price data (materials, labor)',
    description: 'Current and pre-war market price references for construction materials and labor',
    status: DocumentStatus.REQUIRED,
    applicableTo: [ReportType.RESIDENTIAL, ReportType.COMMERCIAL, ReportType.INDUSTRIAL, ReportType.AGRICULTURAL, ReportType.INFRASTRUCTURE],
  },
  {
    key: 'rentalAgreements',
    nameUk: 'Договори оренди (якщо об\'єкт здавався в оренду)',
    nameEn: 'Rental agreements (if property was rented out)',
    description: 'Rental/lease agreements demonstrating pre-war rental income',
    status: DocumentStatus.IF_AVAILABLE,
    applicableTo: [ReportType.RESIDENTIAL, ReportType.COMMERCIAL, ReportType.INDUSTRIAL],
  },
  {
    key: 'utilityBills',
    nameUk: 'Комунальні рахунки (до та після пошкодження)',
    nameEn: 'Utility bills (before and after damage)',
    description: 'Utility bills proving occupancy and usage before damage, and additional costs after',
    status: DocumentStatus.IF_AVAILABLE,
    applicableTo: [ReportType.RESIDENTIAL, ReportType.COMMERCIAL, ReportType.INDUSTRIAL],
  },
  {
    key: 'temporaryHousingReceipts',
    nameUk: 'Підтвердження витрат на тимчасове житло',
    nameEn: 'Temporary housing expense receipts',
    description: 'Receipts, agreements, or other proof of temporary housing expenses',
    status: DocumentStatus.IF_AVAILABLE,
    applicableTo: [ReportType.RESIDENTIAL],
  },
  {
    key: 'financialStatements',
    nameUk: 'Фінансова звітність (для комерційних об\'єктів)',
    nameEn: 'Financial statements (for commercial objects)',
    description: 'Annual financial statements for 2-3 years before the damage',
    status: DocumentStatus.IF_AVAILABLE,
    applicableTo: [ReportType.COMMERCIAL, ReportType.INDUSTRIAL, ReportType.AGRICULTURAL],
  },
  {
    key: 'taxReturns',
    nameUk: 'Податкові декларації',
    nameEn: 'Tax returns',
    description: 'Tax returns demonstrating business income before damage',
    status: DocumentStatus.IF_AVAILABLE,
    applicableTo: [ReportType.COMMERCIAL, ReportType.INDUSTRIAL, ReportType.AGRICULTURAL],
  },
  {
    key: 'businessLicenses',
    nameUk: 'Ліцензії / дозволи на господарську діяльність',
    nameEn: 'Business licenses / permits',
    description: 'Licenses and permits for business activities conducted at the property',
    status: DocumentStatus.IF_AVAILABLE,
    applicableTo: [ReportType.COMMERCIAL, ReportType.INDUSTRIAL, ReportType.AGRICULTURAL],
  },
  {
    key: 'insurancePolicy',
    nameUk: 'Страховий поліс (за наявності)',
    nameEn: 'Insurance policy (if available)',
    description: 'Property insurance policy and any claim/settlement documentation',
    status: DocumentStatus.IF_AVAILABLE,
    applicableTo: [ReportType.RESIDENTIAL, ReportType.COMMERCIAL, ReportType.INDUSTRIAL, ReportType.AGRICULTURAL, ReportType.INFRASTRUCTURE],
  },
  {
    key: 'previousValuationReport',
    nameUk: 'Попередній звіт про оцінку (якщо є)',
    nameEn: 'Previous valuation report (if available)',
    description: 'Any prior independent valuation of the property',
    status: DocumentStatus.IF_AVAILABLE,
    applicableTo: [ReportType.RESIDENTIAL, ReportType.COMMERCIAL, ReportType.INDUSTRIAL, ReportType.AGRICULTURAL, ReportType.INFRASTRUCTURE],
  },
];

// ---------------------------------------------------------------------------
// Pricing Tiers
// ---------------------------------------------------------------------------

const pricingTiers: PricingTier[] = [
  // Residential
  {
    id: 'res_small',
    nameUk: 'Житлова — квартира / будинок до 100 м²',
    nameEn: 'Residential — apartment / house up to 100 m²',
    reportType: ReportType.RESIDENTIAL,
    areaUpToM2: 100,
    basePriceUAH: 25000,
    basePriceEUR: 600,
    perM2ExtraUAH: 0,
    includesLostProfit: false,
    turnaroundDays: 10,
  },
  {
    id: 'res_medium',
    nameUk: 'Житлова — будинок 100-300 м²',
    nameEn: 'Residential — house 100-300 m²',
    reportType: ReportType.RESIDENTIAL,
    areaUpToM2: 300,
    basePriceUAH: 40000,
    basePriceEUR: 950,
    perM2ExtraUAH: 100,
    includesLostProfit: false,
    turnaroundDays: 14,
  },
  {
    id: 'res_large',
    nameUk: 'Житлова — будинок понад 300 м²',
    nameEn: 'Residential — house over 300 m²',
    reportType: ReportType.RESIDENTIAL,
    areaUpToM2: null,
    basePriceUAH: 60000,
    basePriceEUR: 1400,
    perM2ExtraUAH: 80,
    includesLostProfit: false,
    turnaroundDays: 18,
  },
  // Commercial
  {
    id: 'com_small',
    nameUk: 'Комерційна — до 200 м²',
    nameEn: 'Commercial — up to 200 m²',
    reportType: ReportType.COMMERCIAL,
    areaUpToM2: 200,
    basePriceUAH: 45000,
    basePriceEUR: 1100,
    perM2ExtraUAH: 0,
    includesLostProfit: true,
    turnaroundDays: 15,
  },
  {
    id: 'com_medium',
    nameUk: 'Комерційна — 200-1000 м²',
    nameEn: 'Commercial — 200-1000 m²',
    reportType: ReportType.COMMERCIAL,
    areaUpToM2: 1000,
    basePriceUAH: 75000,
    basePriceEUR: 1800,
    perM2ExtraUAH: 60,
    includesLostProfit: true,
    turnaroundDays: 20,
  },
  {
    id: 'com_large',
    nameUk: 'Комерційна — понад 1000 м²',
    nameEn: 'Commercial — over 1000 m²',
    reportType: ReportType.COMMERCIAL,
    areaUpToM2: null,
    basePriceUAH: 120000,
    basePriceEUR: 2800,
    perM2ExtraUAH: 40,
    includesLostProfit: true,
    turnaroundDays: 25,
    notes: 'Includes comprehensive lost profit / business interruption analysis',
  },
  // Industrial
  {
    id: 'ind_small',
    nameUk: 'Промислова — до 500 м²',
    nameEn: 'Industrial — up to 500 m²',
    reportType: ReportType.INDUSTRIAL,
    areaUpToM2: 500,
    basePriceUAH: 65000,
    basePriceEUR: 1500,
    perM2ExtraUAH: 0,
    includesLostProfit: true,
    turnaroundDays: 18,
  },
  {
    id: 'ind_large',
    nameUk: 'Промислова — понад 500 м²',
    nameEn: 'Industrial — over 500 m²',
    reportType: ReportType.INDUSTRIAL,
    areaUpToM2: null,
    basePriceUAH: 150000,
    basePriceEUR: 3500,
    perM2ExtraUAH: 50,
    includesLostProfit: true,
    turnaroundDays: 30,
    notes: 'Includes equipment, machinery, and business interruption assessment',
  },
  // Agricultural
  {
    id: 'agr_small',
    nameUk: 'Сільськогосподарська — до 1 га',
    nameEn: 'Agricultural — up to 1 ha',
    reportType: ReportType.AGRICULTURAL,
    areaUpToM2: 10000,
    basePriceUAH: 35000,
    basePriceEUR: 850,
    perM2ExtraUAH: 0,
    includesLostProfit: true,
    turnaroundDays: 15,
  },
  {
    id: 'agr_large',
    nameUk: 'Сільськогосподарська — понад 1 га',
    nameEn: 'Agricultural — over 1 ha',
    reportType: ReportType.AGRICULTURAL,
    areaUpToM2: null,
    basePriceUAH: 80000,
    basePriceEUR: 1900,
    perM2ExtraUAH: 2,
    includesLostProfit: true,
    turnaroundDays: 25,
    notes: 'Includes soil contamination assessment and lost harvest calculation',
  },
  // Infrastructure
  {
    id: 'infra_basic',
    nameUk: 'Інфраструктура — базовий',
    nameEn: 'Infrastructure — basic',
    reportType: ReportType.INFRASTRUCTURE,
    areaUpToM2: null,
    basePriceUAH: 100000,
    basePriceEUR: 2400,
    perM2ExtraUAH: 0,
    includesLostProfit: false,
    turnaroundDays: 25,
    notes: 'Roads, bridges, utilities — individual pricing based on scope',
  },
];

// ---------------------------------------------------------------------------
// Assembled Sections Array
// ---------------------------------------------------------------------------

const sections: ReportSection[] = [
  titlePageSection,
  executiveSummarySection,
  section1Introduction,
  section2ObjectIdentification,
  section3PreWarCondition,
  section4DamageDocumentation,
  section5DamageAssessment,
  section6CostCalculation,
  section7LostProfits,
  section8Conclusions,
  sectionAppendices,
];

// ---------------------------------------------------------------------------
// Export: Complete Report Template Configuration
// ---------------------------------------------------------------------------

export const reportTemplateConfig: ReportTemplateConfig = {
  institute,
  meta: {
    reportTypes,
    applicableStandards,
    damageCategories,
    causesOfDamage,
  },
  sections,
  requiredDocuments,
  pricingTiers,
};

// ---------------------------------------------------------------------------
// Convenience Exports
// ---------------------------------------------------------------------------

export {
  institute as INSTITUTE_INFO,
  reportTypes as REPORT_TYPES,
  applicableStandards as APPLICABLE_STANDARDS,
  damageCategories as DAMAGE_CATEGORIES,
  causesOfDamage as CAUSES_OF_DAMAGE,
  sections as REPORT_SECTIONS,
  requiredDocuments as REQUIRED_DOCUMENTS,
  pricingTiers as PRICING_TIERS,
};

/**
 * Helper: Get all required documents for a specific report type
 */
export function getRequiredDocumentsForType(type: ReportType): RequiredDocument[] {
  return requiredDocuments.filter(doc => doc.applicableTo.includes(type));
}

/**
 * Helper: Get pricing tier for a given report type and area
 */
export function getPricingTier(type: ReportType, areaM2: number): PricingTier | undefined {
  const tiersForType = pricingTiers
    .filter(t => t.reportType === type)
    .sort((a, b) => (a.areaUpToM2 ?? Infinity) - (b.areaUpToM2 ?? Infinity));

  for (const tier of tiersForType) {
    if (tier.areaUpToM2 === null || areaM2 <= tier.areaUpToM2) {
      return tier;
    }
  }

  // Fallback to the largest tier
  return tiersForType[tiersForType.length - 1];
}

/**
 * Helper: Calculate estimated price for a report
 */
export function calculateReportPrice(type: ReportType, areaM2: number): { uah: number; eur: number } | null {
  const tier = getPricingTier(type, areaM2);
  if (!tier) return null;

  const extraArea = tier.areaUpToM2 !== null ? Math.max(0, areaM2 - tier.areaUpToM2) : 0;
  // Note: perM2ExtraUAH is per square meter beyond the tier threshold
  // EUR equivalent is estimated proportionally
  const extraUAH = extraArea * tier.perM2ExtraUAH;
  const ratioEURtoUAH = tier.basePriceEUR / tier.basePriceUAH;

  return {
    uah: tier.basePriceUAH + extraUAH,
    eur: Math.round(tier.basePriceEUR + extraUAH * ratioEURtoUAH),
  };
}

/**
 * Helper: Get flat list of all section numbers and titles (including subsections)
 */
export function getSectionOutline(): { number: string; titleUk: string; titleEn: string }[] {
  const outline: { number: string; titleUk: string; titleEn: string }[] = [];

  function traverse(sectionList: ReportSection[]) {
    for (const section of sectionList) {
      outline.push({
        number: section.number,
        titleUk: section.titleUk,
        titleEn: section.titleEn,
      });
      if (section.subsections) {
        traverse(section.subsections);
      }
    }
  }

  traverse(sections);
  return outline;
}

/**
 * DaLA formula reference:
 *
 * Total Recovery Needs = Direct Damage + Losses + BBB Surcharge
 *
 * Where:
 * - Direct Damage = Sum of (Replacement Cost - Depreciation) for each damaged component
 * - Losses = Sum of (Disrupted Income Flows + Additional Costs) over the recovery period
 * - BBB Surcharge = Direct Damage * BBB% (typically 20-35%)
 *
 * For RD4U submission, the claim amount typically equals:
 * Total Claim = Direct Damage + Losses + Lost Profits (if applicable)
 *
 * Note: BBB surcharge is part of "recovery needs" which may be claimed separately
 * or included in the total depending on RD4U/ICC guidance for the specific category.
 */
export const DALA_FORMULA_REFERENCE = {
  directDamage: 'Sum[ReplacementCost_i * (1 - Depreciation_i) * DamagePercent_i]',
  losses: 'Sum[MonthlyLoss_j * Months_j] for each loss type j',
  bbbSurcharge: 'DirectDamage * BBB_Rate (20-35%)',
  totalRecoveryNeeds: 'DirectDamage + Losses + BBBSurcharge',
  totalClaim: 'DirectDamage + Losses + LostProfits',
} as const;

export default reportTemplateConfig;
