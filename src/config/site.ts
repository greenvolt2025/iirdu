export const siteConfig = {
  name: "МІВРУ",
  nameEn: "IIRDU",
  fullName: "Міжнародний інститут відновлення та розвитку України",
  fullNameEn: "International Institute for Reconstruction and Development of Ukraine",
  description: "Комплексні звіти за методикою RDNA Світового банку для RD4U та ICC",
  edrpou: "45681824",
  url: "https://iirdu.org",
  email: "iirdu@proton.me",
  phone: "+380 75 369 8799",

  colors: {
    primary: "#0f172a", // Navy blue
    accent: "#e6a817", // Gold
    background: "#ffffff",
  },

  social: {
    telegram: "https://t.me/iirdu_org",
  },

  pricing: {
    currency: "UAH",
    apartment: 1000, // Квартира
    house: 1500, // Будинок
    consultation: { min: 100, max: 500 },
    simpleReport: { min: 500, max: 5000 },
    complexReport: { min: 5000, max: 25000 },
    expertReport: { min: 25000, max: 150000 },
    lostProfitAddon: { min: 5000, max: 60000, label: "Розрахунок упущеної вигоди — додатково" },
  },
} as const;
