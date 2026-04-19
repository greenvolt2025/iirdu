/**
 * WayForPay Payment Integration
 * https://wiki.wayforpay.com/
 *
 * Flow: Create invoice → Redirect to WayForPay → Callback → Update order status
 */

import { createHmac } from "crypto";

interface WayForPayConfig {
  merchantAccount: string;
  merchantDomainName: string;
  merchantSecretKey: string;
}

interface PaymentRequest {
  orderId: string;
  amount: number;
  currency: "UAH" | "USD" | "EUR";
  productName: string;
  productCount: number;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
}

interface WayForPayFormData {
  merchantAccount: string;
  merchantDomainName: string;
  merchantTransactionSecureType: string;
  merchantSignature: string;
  orderReference: string;
  orderDate: number;
  amount: number;
  currency: string;
  productName: string[];
  productPrice: number[];
  productCount: number[];
  clientFirstName: string;
  clientLastName: string;
  clientEmail: string;
  clientPhone: string;
  returnUrl: string;
  serviceUrl: string;
  language: string;
}

const getConfig = (): WayForPayConfig => ({
  merchantAccount: process.env.WAYFORPAY_MERCHANT_ACCOUNT || "",
  merchantDomainName: process.env.WAYFORPAY_DOMAIN || "iirdu.org",
  merchantSecretKey: process.env.WAYFORPAY_SECRET_KEY || "",
});

/**
 * Generate HMAC MD5 signature for WayForPay
 */
function generateSignature(data: string[], secretKey: string): string {
  const signString = data.join(";");
  return createHmac("md5", secretKey).update(signString, "utf8").digest("hex");
}

/**
 * Create payment form data for WayForPay redirect
 */
export function createPaymentFormData(request: PaymentRequest, locale: string = "uk"): WayForPayFormData {
  const config = getConfig();
  const orderDate = Math.floor(Date.now() / 1000);
  const [firstName, ...lastNameParts] = request.clientName.split(" ");
  const lastName = lastNameParts.join(" ") || firstName;

  const signatureData = [
    config.merchantAccount,
    config.merchantDomainName,
    request.orderId,
    String(orderDate),
    String(request.amount),
    request.currency,
    request.productName,
    String(request.productCount),
    String(request.amount),
  ];

  const signature = generateSignature(signatureData, config.merchantSecretKey);

  return {
    merchantAccount: config.merchantAccount,
    merchantDomainName: config.merchantDomainName,
    merchantTransactionSecureType: "AUTO",
    merchantSignature: signature,
    orderReference: request.orderId,
    orderDate,
    amount: request.amount,
    currency: request.currency,
    productName: [request.productName],
    productPrice: [request.amount],
    productCount: [request.productCount],
    clientFirstName: firstName,
    clientLastName: lastName,
    clientEmail: request.clientEmail,
    clientPhone: request.clientPhone || "",
    returnUrl: `https://${config.merchantDomainName}/${locale}/orders/${request.orderId}`,
    serviceUrl: `https://${config.merchantDomainName}/api/webhooks/wayforpay`,
    language: locale === "uk" ? "UA" : "EN",
  };
}

/**
 * Verify WayForPay callback signature
 */
export function verifyCallbackSignature(
  data: Record<string, string>,
  signature: string
): boolean {
  const config = getConfig();
  const signatureData = [
    data.merchantAccount,
    data.orderReference,
    data.amount,
    data.currency,
    data.authCode,
    data.cardPan,
    data.transactionStatus,
    data.reasonCode,
  ];

  const expectedSignature = generateSignature(signatureData, config.merchantSecretKey);
  return signature === expectedSignature;
}

/**
 * Generate callback response for WayForPay
 */
export function generateCallbackResponse(orderReference: string, status: "accept" | "refuse"): object {
  const config = getConfig();
  const time = Math.floor(Date.now() / 1000);

  const signatureData = [orderReference, status, String(time)];
  const signature = generateSignature(signatureData, config.merchantSecretKey);

  return {
    orderReference,
    status,
    time,
    signature,
  };
}
