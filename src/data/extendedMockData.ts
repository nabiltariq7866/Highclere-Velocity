import type { ProductType, Province } from "@/lib/types";

export const PILOT_DATA_STATS = {
  totalDocuments: 25000,
  conditionalApproved: 1500,
  opsUsers: 50,
  appraisalRecords: 2000,
};

export const OPS_USERS = [
  { name: "Maria Santos", role: "VP Operations", team: "Operations" },
  { name: "Karen Mitchell", role: "Senior Underwriter", team: "Underwriting" },
  { name: "Steve Fontaine", role: "Underwriter", team: "Underwriting" },
  { name: "Diana Cho", role: "Underwriter", team: "Underwriting" },
  { name: "Paul Richards", role: "Underwriter", team: "Underwriting" },
  { name: "Nadia Kowalski", role: "Underwriter", team: "Underwriting" },
  { name: "David Okonkwo", role: "Chief Compliance", team: "Compliance" },
  { name: "James Liu", role: "Intake Specialist", team: "Operations" },
  { name: "Priya Nair", role: "Funding Coordinator", team: "Closing" },
  { name: "Tom Berger", role: "Account Rep", team: "Broker Relations" },
];

export const COMM_TEMPLATES: Record<string, string> = {
  Prime: "Your Prime purchase file {file} is in underwriting. Outstanding: {items}. Please upload via portal by {due}.",
  Insurable: "Insurable file {file} — insurer documentation required: {items}. Closing target {due}.",
  "Alt-A": "Alt-A file {file} — alternative income docs needed: {items}. Broker desk available for scenario review.",
  "Business-for-Self": "BFS file {file} — business income package incomplete: {items}. Include NOA, T1, and 90-day business bank statements.",
};

export const CONDITION_ITEMS = [
  { id: "c1", item: "Updated business bank statements (90 days)", due: "2026-07-05", status: "outstanding" as const, product: "Business-for-Self" },
  { id: "c2", item: "T1 General 2024 — all schedules", due: "2026-07-05", status: "outstanding" as const, product: "Business-for-Self" },
  { id: "c3", item: "Letter of explanation — income variance", due: "2026-07-08", status: "outstanding" as const, product: "Business-for-Self" },
  { id: "c4", item: "Signed disclosure statement", due: "2026-07-02", status: "received" as const, product: "Business-for-Self" },
  { id: "c5", item: "Fire insurance binder", due: "2026-07-12", status: "outstanding" as const, product: "Business-for-Self" },
];

export const FUNDING_FILES = [
  { file: "HCV-2026-10321", borrower: "Michael O'Brien", readiness: 98, blocker: null, closing: "2026-07-08" },
  { file: "HCV-2026-10345", borrower: "Priya Sharma", readiness: 95, blocker: null, closing: "2026-07-10" },
  { file: "HCV-2026-10367", borrower: "James Wilson", readiness: 92, blocker: null, closing: "2026-07-12" },
  { file: "HCV-2026-10378", borrower: "Emma Thompson", readiness: 71, blocker: "Solicitor commitment", closing: "2026-07-14" },
  { file: "HCV-2026-10389", borrower: "Robert Singh", readiness: 65, blocker: "Appraisal pending", closing: "2026-07-15" },
  { file: "HCV-2026-10402", borrower: "Lisa Nakamura", readiness: 88, blocker: "Broker follow-up", closing: "2026-07-16" },
];

export const NEW_BROKER_ONBOARDING = [
  { name: "Atlantic Mortgage Group", province: "NS" as Province, stage: "Documentation", progress: 60, docs: "License, E&O, compliance attestation" },
  { name: "Maritime Brokers Co.", province: "NB" as Province, stage: "Product training", progress: 40, docs: "BFS & Alt-A certification pending" },
  { name: "Prairie Connect", province: "SK" as Province, stage: "Live", progress: 100, docs: "Fully onboarded — 12 submissions MTD" },
];

export const DECLINE_REASONS_BY_BROKER: Record<string, string> = {
  "Angela Morrison": "Income docs (12%), Policy LTV (5%)",
  "Raj Patel": "Credit (18%), GDS/TDS (8%)",
  "Sophie Laurent": "Property valuation (10%)",
  "Mark Henderson": "Missing docs (22%), Income (14%)",
  "Tanya Brooks": "Fraud flag (3%), Income (11%)",
};

export const CREDIT_TIER_DIST = [
  { tier: "760+", count: 420, share: 28 },
  { tier: "700-759", count: 380, share: 25 },
  { tier: "680-699", count: 290, share: 19 },
  { tier: "620-679", count: 245, share: 16 },
  { tier: "<620", count: 185, share: 12 },
];

export const CAPITAL_ALLOCATION = [
  { pool: "Prime Insured", allocated: "$48M", utilized: 82, yield: "4.2%" },
  { pool: "Alt-A Warehouse", allocated: "$22M", utilized: 67, yield: "5.8%" },
  { pool: "BFS Specialty", allocated: "$18M", utilized: 74, yield: "6.1%" },
  { pool: "Transfer/Switch", allocated: "$12M", utilized: 55, yield: "4.5%" },
];

export const COLLATERAL_EXPOSURE = [
  { region: "GTA / Ontario", ltvBand: "75-80%", exposure: "$42M", risk: "Medium" },
  { region: "Lower Mainland BC", ltvBand: "80%+", exposure: "$28M", risk: "High" },
  { region: "Calgary AB", ltvBand: "65-75%", exposure: "$18M", risk: "Low" },
];

export const SLA_AGING_BY_PRODUCT = [
  { product: "Prime", avgDays: 3.2, overSla: 2 },
  { product: "Insurable", avgDays: 3.8, overSla: 3 },
  { product: "Alt-A", avgDays: 5.1, overSla: 6 },
  { product: "Business-for-Self", avgDays: 6.4, overSla: 8 },
  { product: "Transfer", avgDays: 2.9, overSla: 1 },
];

export const EMAIL_INTAKE_QUEUE = [
  { id: "em1", from: "angela@dominionlending.ca", subject: "Fwd: Sarah Chen — additional T1", file: "HCV-2026-10482", status: "Processed", attachments: 2 },
  { id: "em2", from: "raj@verico.ca", subject: "New submission package — Wilson", file: "HCV-2026-10501", status: "Processing", attachments: 8 },
  { id: "em3", from: "ops@highclere.ca", subject: "Appraisal report — 42 Maple Ave", file: "HCV-2026-10412", status: "Queued", attachments: 1 },
];

export const DATA_MAPPINGS = [
  { source: "Filogix", field: "borrower.income", target: "application.statedIncome", status: "Mapped" },
  { source: "Filogix", field: "property.purchasePrice", target: "collateral.value", status: "Mapped" },
  { source: "Equifax", field: "credit.score", target: "risk.creditScore", status: "Mapped" },
  { source: "Email intake", field: "attachment.pdf", target: "documents.raw", status: "Mapped" },
  { source: "Appraisal API", field: "appraisal.value", target: "collateral.appraisedValue", status: "Syncing" },
];

export const PRODUCT_EXCEPTIONS = [
  { id: "ex1", file: "HCV-2026-10482", type: "Income variance", status: "Pending review", requestedBy: "Karen Mitchell" },
  { id: "ex2", file: "HCV-2026-10412", type: "LTV 82% — policy exception", status: "Approved", requestedBy: "Steve Fontaine" },
];

export const PRODUCT_RULE_VERSIONS = [
  { product: "Prime", version: "v3.1", effective: "2026-05-01", changes: "GDS limit 39% unchanged" },
  { product: "Business-for-Self", version: "v2.4", effective: "2026-04-15", changes: "2-year SE minimum; bank stmt 90 days" },
  { product: "Alt-A", version: "v1.8", effective: "2026-06-01", changes: "Non-traditional income expanded" },
];

export const PROVINCIAL_GUIDELINES: Record<Province, string> = {
  ON: "FSRA licensed — BFS max LTV 80% purchase",
  BC: "BCFSA — foreign buyer check required Vancouver LHA",
  AB: "RECAlberta — standard Prime/Insurable guidelines",
  QC: "AMF — French disclosure templates mandatory",
  MB: "MB Securities Commission — transfer rules apply",
  SK: "FCAA — regional appraisal panel required >$750K",
};

export const UW_PRODUCTIVITY = [
  { name: "Karen Mitchell", filesToday: 6, avgMinutes: 18, decisions: 4 },
  { name: "Steve Fontaine", filesToday: 5, avgMinutes: 22, decisions: 3 },
  { name: "Diana Cho", filesToday: 8, avgMinutes: 14, decisions: 7 },
  { name: "Paul Richards", filesToday: 4, avgMinutes: 28, decisions: 2 },
];

export const FRAUD_FILE_DETAILS = [
  { file: "HCV-2026-10455", check: "Document metadata", result: "Failed", detail: "PDF created same day as pay date" },
  { file: "HCV-2026-10461", check: "Employer verification", result: "Failed", detail: "Phone number VOIP — unverified employer" },
  { file: "HCV-2026-10472", check: "Duplicate template", result: "Failed", detail: "Matches pattern FP-2026-044" },
  { file: "HCV-2026-10480", check: "Identity cross-check", result: "Review", detail: "Name variant on ID vs application" },
];

export const SALARIED_DOC_PACKAGE = {
  borrower: "James Wilson",
  file: "HCV-2026-10312",
  docs: [
    { name: "Pay stubs (30 days)", type: "Income", extracted: "$6,850 bi-weekly", confidence: 97, flag: null },
    { name: "Employment letter", type: "Income", extracted: "TechCorp Inc. — Full time", confidence: 95, flag: null },
    { name: "T4 2024", type: "Tax", extracted: "$89,200", confidence: 98, flag: null },
    { name: "NOA 2024", type: "Tax", extracted: "$88,950 line 150", confidence: 96, flag: null },
  ],
  income: { stated: 89200, noa: 88950, deposits: 89100 },
};

export const INTEGRATION_EVENT_TEMPLATE = [
  { step: "Filogix webhook", msg: "New submission {file} received from {broker}" },
  { step: "Document pipeline", msg: "12 documents ingested to S3 · AI extraction started" },
  { step: "Equifax", msg: "Credit pull complete · Score {score} · GDS/TDS calculated" },
  { step: "Appraisal API", msg: "Appraisal order placed · ETA 4 business days" },
  { step: "Command Center", msg: "Dashboard updated · File routed to intake · Broker notified" },
];

export const DEAL_QUALITY_TRENDS = [
  { month: "Jan", quality: 71, rework: 14 },
  { month: "Feb", quality: 72, rework: 13 },
  { month: "Mar", quality: 73, rework: 12 },
  { month: "Apr", quality: 74, rework: 11 },
  { month: "May", quality: 75, rework: 10 },
  { month: "Jun", quality: 76, rework: 9 },
];

export const PORTFOLIO_LTV_BANDS = [
  { band: "<65%", volume: "$28M", share: 18 },
  { band: "65-75%", volume: "$52M", share: 34 },
  { band: "75-80%", volume: "$48M", share: 31 },
  { band: "80%+", volume: "$26M", share: 17 },
];

export const URGENT_CLOSINGS = [
  { file: "HCV-2026-10321", borrower: "Michael O'Brien", closing: "Jul 8", daysLeft: 2, priority: "Critical", route: "Diana Cho" },
  { file: "HCV-2026-10482", borrower: "Sarah Chen", closing: "Jul 18", daysLeft: 5, priority: "High", route: "Karen Mitchell" },
  { file: "HCV-2026-10345", borrower: "Priya Sharma", closing: "Jul 10", daysLeft: 3, priority: "High", route: "Fast-track queue" },
];

export const LATE_FUNDING_DELAYS = [
  { file: "HCV-2026-10378", borrower: "Emma Thompson", closing: "Jul 14", risk: "High", reason: "Solicitor commitment overdue 3 days" },
  { file: "HCV-2026-10389", borrower: "Robert Singh", closing: "Jul 15", risk: "Medium", reason: "Appraisal delayed — 12 days past ETA" },
  { file: "HCV-2026-10402", borrower: "Lisa Nakamura", closing: "Jul 16", risk: "Medium", reason: "Broker follow-up — insurance binder missing" },
];

export const HIGH_VALUE_BROKERS = [
  { name: "Angela Morrison", brokerage: "Dominion Lending", volume: 186, fundedYtd: "$42M", priority: "Platinum", sla: "98%" },
  { name: "Raj Patel", brokerage: "Verico Paragon", volume: 164, fundedYtd: "$38M", priority: "Platinum", sla: "96%" },
  { name: "Sophie Laurent", brokerage: "Mortgage Architects", volume: 142, fundedYtd: "$31M", priority: "Gold", sla: "94%" },
];

export const BROKER_GROWTH_ALERTS = [
  { broker: "Prairie Connect (SK)", signal: "Volume +45% MoM — capacity review", type: "Growth" },
  { broker: "Mark Henderson", signal: "Missing-doc rate 38% — education required", type: "Risk" },
  { broker: "Atlantic Mortgage Group", signal: "NS onboarding — first submissions expected Aug", type: "Expansion" },
];

export const ACCOUNT_REP_DASHBOARD = [
  { rep: "Tom Berger", brokers: 48, volume: 892, issues: 3, topBroker: "Angela Morrison" },
  { rep: "Lisa Chen", brokers: 52, volume: 756, issues: 7, topBroker: "Raj Patel" },
  { rep: "Mike Sullivan", brokers: 41, volume: 612, issues: 2, topBroker: "Sophie Laurent" },
];

export const BROKER_PRODUCT_SEGMENTATION = [
  { segment: "Prime / Insurable", brokers: 312, volume: "62%", trend: "+4%" },
  { segment: "Alt-A", brokers: 98, volume: "18%", trend: "+12%" },
  { segment: "Business-for-Self", brokers: 76, volume: "14%", trend: "+8%" },
  { segment: "Transfer / Switch", brokers: 64, volume: "6%", trend: "+2%" },
];

export const FRAUD_EXTENDED_SIGNALS = [
  { type: "Property flipping risk", file: "HCV-2026-10433", detail: "3 purchases same building in 18 months", severity: "High" },
  { type: "Synthetic profile indicator", file: "HCV-2026-10467", detail: "Thin-file credit + new employer < 90 days", severity: "Medium" },
  { type: "Repeated employer irregularity", file: "HCV-2026-10455", detail: "Same employer on 4 unrelated borrowers", severity: "High" },
];

export const UNIFIED_DATA_LAYERS = [
  { layer: "Submission", entities: "Application, Borrower, Broker", sources: "Filogix, Portal, Email" },
  { layer: "Documents", entities: "Files, Extractions, Checklists", sources: "S3, OCR pipeline" },
  { layer: "Risk", entities: "Scores, Ratios, Fraud flags", sources: "Equifax, AI models" },
  { layer: "Collateral", entities: "Property, Appraisal, LTV", sources: "Appraisal API" },
  { layer: "Workflow", entities: "Stages, Conditions, SLA", sources: "Internal HCV engine" },
];

export const BROKER_COMM_TIMELINE = [
  { time: "Jun 28 09:45", event: "Missing document request sent — bank statements, T1", from: "Highclere Ops" },
  { time: "Jun 29 14:20", event: "Reminder: 3 conditions due Jul 5", from: "Automated" },
  { time: "Jun 30 10:00", event: "Sarah Chen file — income variance explanation requested", from: "Karen Mitchell" },
];

export const BROKER_EDUCATION_TIPS = [
  "BFS files: include 90-day business bank statements before submit",
  "Alt-A: alternative income docs must match NOA within 15%",
  "Prime: employment letter dated within 30 days of application",
];

export function getCommTemplate(product: ProductType, file: string, items: string, due: string) {
  const t = COMM_TEMPLATES[product] ?? COMM_TEMPLATES.Prime;
  return t.replace("{file}", file).replace("{items}", items).replace("{due}", due);
}
