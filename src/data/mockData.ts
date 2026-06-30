import type {
  Broker,
  FileStage,
  MortgageSubmission,
  ProductType,
  Province,
  SlaStatus,
} from "@/lib/types";
import { PRODUCTS, PROVINCES } from "@/lib/types";
import { DEMO_USERS, getUserForRole } from "@/data/demoUsers";
import {
  NAV_BROKER,
  NAV_COMPLIANCE,
  NAV_EXECUTIVE,
  NAV_OPERATIONS,
  NAV_UNDERWRITER,
} from "@/data/navConfig";

export { DEMO_USERS, getUserForRole };
export {
  NAV_BROKER,
  NAV_COMPLIANCE,
  NAV_EXECUTIVE,
  NAV_OPERATIONS,
  NAV_UNDERWRITER,
};

const BORROWERS = [
  "Sarah Chen", "Michael O'Brien", "Priya Sharma", "James Wilson", "Amélie Tremblay",
  "David Kim", "Lisa Nakamura", "Robert Singh", "Emma Thompson", "Carlos Mendez",
  "Jennifer Walsh", "Ahmed Hassan", "Rachel Green", "Thomas Berger", "Nina Patel",
  "Chris Morrison", "Yuki Tanaka", "Olivia Brown", "Marc Dubois", "Kevin Okafor",
];

const BROKERAGES = [
  "Dominion Lending Centres", "Verico Paragon", "Mortgage Architects", "Invis",
  "TMG The Mortgage Group", "Centum Financial", "BrokerLink Mortgages", "CanWise Financial",
];

const BROKER_NAMES = [
  "Angela Morrison", "Raj Patel", "Sophie Laurent", "Mark Henderson", "Tanya Brooks",
  "Jason Lee", "Michelle Roy", "Brian O'Connor", "Fatima Al-Rashid", "Derek Campbell",
];

const UNDERWRITERS = [
  "Karen Mitchell", "Steve Fontaine", "Diana Cho", "Paul Richards", "Nadia Kowalski",
];

const MISSING_DOC_POOL = [
  "Bank statements (90 days)", "NOA 2024", "T1 General", "Pay stubs (recent)",
  "Employment letter", "Business bank statements", "Articles of incorporation",
  "Property tax bill", "Purchase agreement", "Mortgage statement", "Appraisal report",
];

const FLAG_POOL = [
  "Income mismatch", "High LTV", "Appraisal delay", "Broker follow-up",
  "Property risk", "Compliance exception", "Fraud signal", "Fast-track eligible",
];

function pick<T>(arr: T[], i: number): T {
  return arr[i % arr.length];
}

function genSubmissions(count: number): MortgageSubmission[] {
  const stages: FileStage[] = [
    "new_submission", "intake_review", "document_pending", "underwriting_review",
    "conditional_approval", "appraisal_pending", "compliance_review", "funding_ready",
    "funded", "declined", "cancelled",
  ];
  const slaOptions: SlaStatus[] = ["on_track", "on_track", "on_track", "at_risk", "breached"];
  const incomeTypes = ["Salaried", "Self-Employed", "Commission", "Rental Income", "Mixed"];

  return Array.from({ length: count }, (_, i) => {
    const stage = pick(stages, i + 3);
    const product = pick(PRODUCTS, i) as ProductType;
    const province = pick(PROVINCES, i) as Province;
    const approvalScore = 35 + ((i * 17) % 60);
    const hasMissing = i % 5 === 0 || i % 7 === 0;
    const missingDocs = hasMissing
      ? [pick(MISSING_DOC_POOL, i), ...(i % 11 === 0 ? [pick(MISSING_DOC_POOL, i + 2)] : [])]
      : [];
    const fastTrack = approvalScore >= 82 && missingDocs.length === 0 && stage !== "declined";
    const flags: string[] = [];
    if (fastTrack) flags.push("Fast-track eligible");
    if (missingDocs.length) flags.push("Missing documents");
    if (approvalScore < 50) flags.push("Decline risk");
    if (i % 13 === 0) flags.push("Appraisal delay");
    if (i % 17 === 0) flags.push("Income mismatch");

    return {
      id: `sub-${1000 + i}`,
      fileNumber: `HCV-2026-${String(10000 + i).padStart(5, "0")}`,
      borrower: pick(BORROWERS, i),
      broker: pick(BROKER_NAMES, i),
      brokerage: pick(BROKERAGES, i),
      province,
      product,
      amount: 280000 + (i % 40) * 15000,
      ltv: 65 + (i % 30),
      gds: 28 + (i % 12),
      tds: 38 + (i % 15),
      creditScore: 620 + (i % 180),
      stage,
      slaStatus: pick(slaOptions, i),
      approvalScore,
      fastTrack,
      missingDocs,
      underwriter: stage === "underwriting_review" || stage === "conditional_approval"
        ? pick(UNDERWRITERS, i)
        : undefined,
      closingDate: `2026-${String(7 + (i % 5)).padStart(2, "0")}-${String(5 + (i % 24)).padStart(2, "0")}`,
      submittedAt: `2026-06-${String(1 + (i % 28)).padStart(2, "0")}`,
      flags: flags.length ? flags : [pick(FLAG_POOL, i)],
      incomeType: product === "Business-for-Self" ? "Self-Employed" : pick(incomeTypes, i),
    };
  });
}

export const ALL_SUBMISSIONS = genSubmissions(120);
export const ACTIVE_SUBMISSIONS = ALL_SUBMISSIONS.filter(
  (s) => !["funded", "declined", "cancelled"].includes(s.stage)
);

export const COMMAND_CENTER_STATS = {
  totalSubmissions: 5000,
  activeFiles: 300,
  fastTrackReady: 45,
  missingIncomeDocs: 18,
  appraisalWaiting: 9,
  fundingSlaRisk: 6,
  approvedToday: 12,
  fundedThisMonth: 187,
  avgDecisionHours: 4.2,
  conditionClearanceDays: 3.1,
  declinesToday: 3,
  conditionsOutstanding: 142,
};

export const BROKERS: Broker[] = BROKER_NAMES.map((name, i) => ({
  id: `br-${i}`,
  name,
  brokerage: pick(BROKERAGES, i),
  province: pick(PROVINCES, i) as Province,
  volume: 45 + (i % 8) * 22,
  approvalRate: 72 + (i % 20),
  fundingConversion: 65 + (i % 25),
  missingDocRate: 8 + (i % 35),
  avgConditionDays: 2 + (i % 6),
  reworkRate: 3 + (i % 12),
  qualityScore: 55 + (i % 40),
  productMix: pick(PRODUCTS, i),
}));

export const GOLDEN_FILE: MortgageSubmission = {
  id: "sub-golden",
  fileNumber: "HCV-2026-10482",
  borrower: "Sarah Chen",
  broker: "Angela Morrison",
  brokerage: "Dominion Lending Centres",
  province: "ON",
  product: "Business-for-Self",
  amount: 625000,
  ltv: 78,
  gds: 32,
  tds: 41,
  creditScore: 742,
  stage: "document_pending",
  slaStatus: "at_risk",
  approvalScore: 68,
  fastTrack: false,
  missingDocs: ["Business bank statements (90 days)", "T1 General 2024"],
  underwriter: "Karen Mitchell",
  closingDate: "2026-07-18",
  submittedAt: "2026-06-28",
  flags: ["Income mismatch", "Missing documents", "Broker follow-up"],
  incomeType: "Self-Employed",
};

export const ADJUDICATION_BATCH = {
  newToday: 50,
  fastTrack: 20,
  docFollowUp: 18,
  seniorReview: 8,
  declineRisk: 4,
};

export const FUNDING_QUEUE = {
  conditionalApproved: 60,
  readyToFund: 22,
  blockedSolicitor: 17,
  waitingAppraisal: 9,
  brokerFollowUp: 12,
};

export const VOLUME_BY_MONTH = [
  { month: "Jul", submissions: 320, funded: 245, approvals: 278 },
  { month: "Aug", submissions: 380, funded: 290, approvals: 325 },
  { month: "Sep", submissions: 410, funded: 310, approvals: 352 },
  { month: "Oct", submissions: 445, funded: 335, approvals: 380 },
  { month: "Nov", submissions: 390, funded: 298, approvals: 340 },
  { month: "Dec", submissions: 360, funded: 275, approvals: 318 },
  { month: "Jan", submissions: 420, funded: 320, approvals: 365 },
  { month: "Feb", submissions: 455, funded: 348, approvals: 392 },
  { month: "Mar", submissions: 480, funded: 365, approvals: 410 },
  { month: "Apr", submissions: 510, funded: 388, approvals: 435 },
  { month: "May", submissions: 535, funded: 402, approvals: 458 },
  { month: "Jun", submissions: 562, funded: 418, approvals: 472 },
];

export const PRODUCT_MIX = PRODUCTS.map((p, i) => ({
  product: p,
  volume: 420 + i * 85,
  share: 8 + i * 3,
}));

export const PROVINCE_STATS = PROVINCES.map((p, i) => ({
  province: p,
  active: 35 + i * 12,
  funded: 120 + i * 45,
  brokers: 45 + i * 18,
  expansionReady: i < 4,
}));

export const FRAUD_ALERTS = [
  { id: 1, type: "Duplicate document pattern", severity: "High", files: 4, detail: "Same income letter format across unrelated applications" },
  { id: 2, type: "Identity mismatch", severity: "Medium", files: 1, detail: "Borrower name differs between ID and application" },
  { id: 3, type: "Employer irregularity", severity: "High", files: 3, detail: "Repeated employer on unrelated pay stubs" },
  { id: 4, type: "Valuation gap", severity: "Medium", files: 2, detail: "Purchase price 22% above comparable estimate" },
];

export const INTEGRATIONS = [
  { name: "Filogix / Velocity", status: "Connected", lastSync: "2 min ago", events: 1247 },
  { name: "Appraisal Management", status: "Connected", lastSync: "8 min ago", events: 342 },
  { name: "Equifax Credit", status: "Connected", lastSync: "1 min ago", events: 2891 },
  { name: "Document Storage (S3)", status: "Connected", lastSync: "30 sec ago", events: 8420 },
  { name: "Broker CRM", status: "Syncing", lastSync: "15 min ago", events: 156 },
  { name: "Servicing Platform", status: "Connected", lastSync: "5 min ago", events: 89 },
];

export const AUDIT_TIMELINE = [
  { time: "2026-06-28 09:14", event: "Broker submission received via Filogix", actor: "System" },
  { time: "2026-06-28 09:15", event: "AI extracted income: $142,000 stated (BFS)", actor: "AI Intake" },
  { time: "2026-06-28 09:16", event: "Missing docs flagged: bank statements, T1", actor: "AI Intake" },
  { time: "2026-06-28 09:18", event: "Auto-request sent to Angela Morrison", actor: "Communications" },
  { time: "2026-06-28 11:42", event: "T1 General uploaded — extraction confidence 94%", actor: "AI Intake" },
  { time: "2026-06-28 14:20", event: "Income mismatch detected: stated vs NOA", actor: "Document Review" },
  { time: "2026-06-29 08:30", event: "Routed to Karen Mitchell — senior review", actor: "Adjudication" },
];

export const MODEL_METRICS = {
  approvalAccuracy: 87.4,
  approvalAccuracyDelta: 2.1,
  extractionAccuracy: 93.2,
  driftSegments: ["Alt-A Ontario", "BFS Quebec"],
  lastRetrain: "2026-06-15",
  decisionsLearned: 1847,
};

export function getSubmissionsByBroker(brokerName: string) {
  return ALL_SUBMISSIONS.filter((s) => s.broker === brokerName);
}
