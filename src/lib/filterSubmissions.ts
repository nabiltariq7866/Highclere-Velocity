import type { MortgageSubmission, ProductType, Province, SlaStatus, FileStage } from "@/lib/types";

export interface SubmissionFilters {
  province: Province | "all";
  product: ProductType | "all";
  broker: string;
  slaStatus: SlaStatus | "all";
  stage: FileStage | "all";
  quick: "all" | "fast_track" | "missing_docs" | "at_risk" | "appraisal";
}

export const DEFAULT_FILTERS: SubmissionFilters = {
  province: "all",
  product: "all",
  broker: "",
  slaStatus: "all",
  stage: "all",
  quick: "all",
};

export function filterSubmissions(
  submissions: MortgageSubmission[],
  filters: SubmissionFilters
): MortgageSubmission[] {
  return submissions.filter((s) => {
    if (filters.province !== "all" && s.province !== filters.province) return false;
    if (filters.product !== "all" && s.product !== filters.product) return false;
    if (filters.broker && !s.broker.toLowerCase().includes(filters.broker.toLowerCase())) return false;
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
