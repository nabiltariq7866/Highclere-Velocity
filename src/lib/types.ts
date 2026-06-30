export type UserRole = "executive" | "operations" | "underwriter" | "compliance" | "broker";

export type FileStage =
  | "new_submission"
  | "intake_review"
  | "document_pending"
  | "underwriting_review"
  | "conditional_approval"
  | "appraisal_pending"
  | "compliance_review"
  | "funding_ready"
  | "funded"
  | "declined"
  | "cancelled";

export type ProductType =
  | "Prime"
  | "Insurable"
  | "Alt-A"
  | "Business-for-Self"
  | "Transfer"
  | "Switch"
  | "Collateral Switch";

export type Province = "ON" | "BC" | "AB" | "QC" | "MB" | "SK";

export type SlaStatus = "on_track" | "at_risk" | "breached";

export interface SessionUser {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  email: string;
  title: string;
  redirectTo: string;
}

export interface Broker {
  id: string;
  name: string;
  brokerage: string;
  province: Province;
  volume: number;
  approvalRate: number;
  fundingConversion: number;
  missingDocRate: number;
  avgConditionDays: number;
  reworkRate: number;
  qualityScore: number;
  productMix: string;
}

export interface MortgageSubmission {
  id: string;
  fileNumber: string;
  borrower: string;
  broker: string;
  brokerage: string;
  province: Province;
  product: ProductType;
  amount: number;
  ltv: number;
  gds: number;
  tds: number;
  creditScore: number;
  stage: FileStage;
  slaStatus: SlaStatus;
  approvalScore: number;
  fastTrack: boolean;
  missingDocs: string[];
  underwriter?: string;
  closingDate: string;
  submittedAt: string;
  flags: string[];
  incomeType: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  group: string;
  slug: string;
}

export const STAGE_LABELS: Record<FileStage, string> = {
  new_submission: "New Submission",
  intake_review: "Intake Review",
  document_pending: "Document Pending",
  underwriting_review: "Underwriting Review",
  conditional_approval: "Conditional Approval",
  appraisal_pending: "Appraisal Pending",
  compliance_review: "Compliance Review",
  funding_ready: "Funding Ready",
  funded: "Funded",
  declined: "Declined",
  cancelled: "Cancelled",
};

export const PRODUCTS: ProductType[] = [
  "Prime",
  "Insurable",
  "Alt-A",
  "Business-for-Self",
  "Transfer",
  "Switch",
  "Collateral Switch",
];

export const PROVINCES: Province[] = ["ON", "BC", "AB", "QC", "MB", "SK"];
