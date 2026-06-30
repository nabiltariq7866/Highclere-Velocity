import type { MortgageSubmission, ProductType, Province, SlaStatus, FileStage } from "@/lib/types";

export type DealSizeBand = "all" | "under_500k" | "500k_750k" | "over_750k";
export type BorrowerTypeFilter = "all" | "salaried" | "self_employed" | "other";

export interface SubmissionFilters {
  province: Province | "all";
  product: ProductType | "all";
  broker: string;
  brokerage: string;
  underwriter: string;
  borrowerType: BorrowerTypeFilter;
  dealSize: DealSizeBand;
  slaStatus: SlaStatus | "all";
  stage: FileStage | "all";
  quick: "all" | "fast_track" | "missing_docs" | "at_risk" | "appraisal";
}

export const DEFAULT_FILTERS: SubmissionFilters = {
  province: "all",
  product: "all",
  broker: "",
  brokerage: "",
  underwriter: "",
  borrowerType: "all",
  dealSize: "all",
  slaStatus: "all",
  stage: "all",
  quick: "all",
};

function matchesBorrowerType(s: MortgageSubmission, filter: BorrowerTypeFilter): boolean {
  if (filter === "all") return true;
  const t = s.incomeType.toLowerCase();
  if (filter === "salaried") return t.includes("salaried") || t === "commission";
  if (filter === "self_employed") return t.includes("self") || s.product === "Business-for-Self";
  return !t.includes("salaried") && !t.includes("self") && s.product !== "Business-for-Self";
}

function matchesDealSize(amount: number, band: DealSizeBand): boolean {
  if (band === "all") return true;
  if (band === "under_500k") return amount < 500000;
  if (band === "500k_750k") return amount >= 500000 && amount <= 750000;
  return amount > 750000;
}

export function filterSubmissions(
  submissions: MortgageSubmission[],
  filters: SubmissionFilters
): MortgageSubmission[] {
  return submissions.filter((s) => {
    if (filters.province !== "all" && s.province !== filters.province) return false;
    if (filters.product !== "all" && s.product !== filters.product) return false;
    if (filters.broker && !s.broker.toLowerCase().includes(filters.broker.toLowerCase())) return false;
    if (filters.brokerage && s.brokerage !== filters.brokerage) return false;
    if (filters.underwriter && s.underwriter !== filters.underwriter) return false;
    if (!matchesBorrowerType(s, filters.borrowerType)) return false;
    if (!matchesDealSize(s.amount, filters.dealSize)) return false;
    if (filters.slaStatus !== "all" && s.slaStatus !== filters.slaStatus) return false;
    if (filters.stage !== "all" && s.stage !== filters.stage) return false;

    switch (filters.quick) {
      case "fast_track":
        if (!s.fastTrack) return false;
        break;
      case "missing_docs":
        if (s.missingDocs.length === 0) return false;
        break;
      case "at_risk":
        if (s.slaStatus === "on_track") return false;
        break;
      case "appraisal":
        if (s.stage !== "appraisal_pending" && !s.flags.some((f) => f.toLowerCase().includes("appraisal"))) {
          return false;
        }
        break;
      default:
        break;
    }

    return true;
  });
}

export function getUniqueBrokers(submissions: MortgageSubmission[]): string[] {
  return [...new Set(submissions.map((s) => s.broker))].sort();
}

export function getUniqueBrokerages(submissions: MortgageSubmission[]): string[] {
  return [...new Set(submissions.map((s) => s.brokerage))].sort();
}

export function getUniqueUnderwriters(submissions: MortgageSubmission[]): string[] {
  return [...new Set(submissions.map((s) => s.underwriter).filter(Boolean) as string[])].sort();
}
