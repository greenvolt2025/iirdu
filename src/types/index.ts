// ============ User & Auth ============

export type UserRole = "client" | "expert" | "admin";
export type ClientType = "individual" | "legal_entity" | "international_partner";

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: UserRole;
  clientType: ClientType;
  companyName?: string;
  companyEdrpou?: string;
  organizationCountry?: string;
  organizationType?: string;
  avatarUrl?: string;
  createdAt: string;
}

// ============ Orders ============

export type OrderStatus =
  | "draft"
  | "pending_payment"
  | "paid"
  | "documents_uploaded"
  | "processing"
  | "expert_review"
  | "revision"
  | "completed"
  | "cancelled";

export type ReportType =
  | "damage_assessment"
  | "due_diligence"
  | "risk_assessment"
  | "economic_analysis"
  | "legal_support"
  | "consulting";

export interface Order {
  id: string;
  userId: string;
  clientType: ClientType;
  reportType: ReportType;
  reportSubtype: string;
  status: OrderStatus;
  title: string;
  description?: string;
  objectAddress?: string;
  totalAmount: number;
  currency: "UAH" | "USD" | "EUR";
  paidAt?: string;
  assignedExpertId?: string;
  createdAt: string;
  updatedAt: string;
}

// ============ Documents ============

export type UploadChannel = "standard" | "simplex";

export interface Document {
  id: string;
  orderId: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  storagePath: string;
  uploadChannel: UploadChannel;
  ocrStatus: "pending" | "processing" | "completed" | "failed";
  ocrText?: string;
  uploadedAt: string;
}

// ============ Reports ============

export type ReportStatus =
  | "generating"
  | "draft"
  | "expert_review"
  | "approved"
  | "finalized";

export interface Report {
  id: string;
  orderId: string;
  status: ReportStatus;
  title: string;
  contentHtml?: string;
  contentJson?: Record<string, unknown>;
  pdfUrl?: string;
  docxUrl?: string;
  generatedAt?: string;
  approvedAt?: string;
  approvedBy?: string;
}

// ============ Payments ============

export type PaymentMethod = "wayforpay" | "liqpay" | "bank_transfer";
export type PaymentStatus = "pending" | "processing" | "success" | "failed" | "refunded";

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  currency: "UAH" | "USD" | "EUR";
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  invoiceNumber?: string;
  invoiceUrl?: string;
  paidAt?: string;
  createdAt: string;
}

// ============ Invoice ============

export interface Invoice {
  id: string;
  orderId: string;
  number: string;
  date: string;
  dueDate: string;
  seller: {
    name: string;
    code: string; // ЄДРПОУ
    address: string;
    bankAccount: string;
    bankName: string;
    mfo: string;
  };
  buyer: {
    name: string;
    code?: string;
    address?: string;
  };
  items: InvoiceItem[];
  totalAmount: number;
  currency: "UAH" | "USD" | "EUR";
  pdfUrl?: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  amount: number;
}

// ============ SimpleX ============

export interface SimplexConnection {
  contactId: string;
  displayName: string;
  status: "pending" | "connected" | "disconnected";
  createdAt: string;
}

export interface SimplexFileTransfer {
  fileId: number;
  fileName: string;
  fileSize: number;
  status: "sending" | "receiving" | "complete" | "failed";
  progress: number;
}
