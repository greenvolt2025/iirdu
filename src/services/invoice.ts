/**
 * Invoice (Рахунок-фактура) Generation Service
 *
 * Generates Ukrainian invoices for IIRDU services.
 * Uses HTML template → rendered as PDF via Puppeteer or browser print.
 */

import type { Invoice, InvoiceItem } from "@/types";

const SELLER_INFO = {
  name: 'ПНУ "Міжнародний інститут відновлення та розвитку України"',
  code: "45681824",
  address: "м. Київ, Україна",
  bankAccount: process.env.IIRDU_IBAN || "UA000000000000000000000000000",
  bankName: "АТ КБ «ПриватБанк»",
  mfo: "305299",
};

let invoiceCounter = 1;

function generateInvoiceNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const num = String(invoiceCounter++).padStart(4, "0");
  return `INV-${year}${month}-${num}`;
}

export function createInvoice(params: {
  orderId: string;
  buyerName: string;
  buyerCode?: string;
  buyerAddress?: string;
  items: { description: string; quantity: number; unit: string; pricePerUnit: number }[];
  currency?: "UAH" | "USD" | "EUR";
}): Invoice {
  const items: InvoiceItem[] = params.items.map((item) => ({
    ...item,
    amount: item.quantity * item.pricePerUnit,
  }));

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
  const now = new Date();
  const dueDate = new Date(now);
  dueDate.setDate(dueDate.getDate() + 5); // 5 business days

  return {
    id: `inv-${Date.now()}`,
    orderId: params.orderId,
    number: generateInvoiceNumber(),
    date: now.toISOString().split("T")[0],
    dueDate: dueDate.toISOString().split("T")[0],
    seller: SELLER_INFO,
    buyer: {
      name: params.buyerName,
      code: params.buyerCode,
      address: params.buyerAddress,
    },
    items,
    totalAmount,
    currency: params.currency || "UAH",
  };
}

/**
 * Generate invoice HTML for PDF rendering
 */
export function generateInvoiceHtml(invoice: Invoice): string {
  const currencySymbol = { UAH: "грн", USD: "$", EUR: "€" }[invoice.currency];

  return `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Arial', sans-serif; font-size: 12px; color: #333; padding: 40px; }
    .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #0f172a; padding-bottom: 15px; }
    .header h1 { font-size: 18px; color: #0f172a; margin-bottom: 5px; }
    .header .number { font-size: 14px; color: #e6a817; font-weight: bold; }
    .parties { display: flex; gap: 40px; margin-bottom: 30px; }
    .party { flex: 1; }
    .party h3 { font-size: 12px; color: #0f172a; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px; }
    .party p { margin-bottom: 3px; line-height: 1.5; }
    .party .label { color: #666; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    th { background: #0f172a; color: white; padding: 8px 12px; text-align: left; font-size: 11px; text-transform: uppercase; }
    td { padding: 8px 12px; border-bottom: 1px solid #eee; }
    tr:nth-child(even) td { background: #f9f9f9; }
    .total-row { background: #f0f0f0; font-weight: bold; }
    .total-row td { border-top: 2px solid #0f172a; padding: 12px; }
    .footer { margin-top: 40px; }
    .signatures { display: flex; justify-content: space-between; margin-top: 60px; }
    .signature-line { width: 200px; border-top: 1px solid #333; padding-top: 5px; text-align: center; font-size: 11px; }
    .note { margin-top: 20px; font-size: 10px; color: #666; font-style: italic; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="header">
    <h1>РАХУНОК-ФАКТУРА</h1>
    <div class="number">№ ${invoice.number} від ${formatDate(invoice.date)}</div>
  </div>

  <div class="parties">
    <div class="party">
      <h3>Постачальник</h3>
      <p><strong>${invoice.seller.name}</strong></p>
      <p><span class="label">ЄДРПОУ:</span> ${invoice.seller.code}</p>
      <p><span class="label">Адреса:</span> ${invoice.seller.address}</p>
      <p><span class="label">р/р:</span> ${invoice.seller.bankAccount}</p>
      <p><span class="label">Банк:</span> ${invoice.seller.bankName}</p>
      <p><span class="label">МФО:</span> ${invoice.seller.mfo}</p>
    </div>
    <div class="party">
      <h3>Покупець</h3>
      <p><strong>${invoice.buyer.name}</strong></p>
      ${invoice.buyer.code ? `<p><span class="label">ЄДРПОУ:</span> ${invoice.buyer.code}</p>` : ""}
      ${invoice.buyer.address ? `<p><span class="label">Адреса:</span> ${invoice.buyer.address}</p>` : ""}
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>№</th>
        <th>Найменування</th>
        <th>Од.</th>
        <th>Кількість</th>
        <th>Ціна, ${currencySymbol}</th>
        <th>Сума, ${currencySymbol}</th>
      </tr>
    </thead>
    <tbody>
      ${invoice.items.map((item, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${item.description}</td>
        <td>${item.unit}</td>
        <td>${item.quantity}</td>
        <td>${formatAmount(item.pricePerUnit)}</td>
        <td>${formatAmount(item.amount)}</td>
      </tr>
      `).join("")}
      <tr class="total-row">
        <td colspan="5" style="text-align:right">Всього:</td>
        <td>${formatAmount(invoice.totalAmount)} ${currencySymbol}</td>
      </tr>
    </tbody>
  </table>

  <p><strong>Всього до сплати: ${amountToWords(invoice.totalAmount)} ${currencySymbol}</strong></p>

  <p class="note">
    Рахунок дійсний до ${formatDate(invoice.dueDate)}.
    Оплата даного рахунку означає згоду з умовами надання послуг.
  </p>

  <div class="signatures">
    <div>
      <div class="signature-line">Директор</div>
    </div>
    <div>
      <div class="signature-line">М.П.</div>
    </div>
  </div>
</body>
</html>`;
}

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  return `${day}.${month}.${year}`;
}

function formatAmount(amount: number): string {
  return amount.toLocaleString("uk-UA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function amountToWords(amount: number): string {
  // Simplified — in production use a proper library like "n2words"
  return `${Math.floor(amount).toLocaleString("uk-UA")} грн 00 коп.`;
}
