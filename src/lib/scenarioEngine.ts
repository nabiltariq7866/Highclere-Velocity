import type { ProductType, Province } from "@/lib/types";

export type BorrowerType = "salaried" | "bfs" | "new-se" | "commission";
export type TransactionType = "purchase" | "refinance" | "transfer";

export interface ScenarioInput {
  borrowerType: BorrowerType;
  province: Province;
  creditScore: number;
  ltv: number;
  gds?: number;
  tds?: number;
  transactionType: TransactionType;
  selfEmployedYears?: number;
}

export interface ProductFit {
  product: ProductType;
  fit: number;
  recommended: boolean;
  notes: string;
}

export interface ScenarioResult {
  recommended: ProductType;
  fit: number;
  approvalLikelihoodComplete: number;
  approvalLikelihoodCurrent: number;
  friction: string[];
  requiredDocs: string[];
  products: ProductFit[];
  qualityScore: number;
}

const BASE_DOCS = ["Signed mortgage application", "Government-issued ID", "Credit report"];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function runScenario(input: ScenarioInput): ScenarioResult {
  const { borrowerType, creditScore, ltv, gds = 32, tds = 40, selfEmployedYears = 3 } = input;
  const friction: string[] = [];
  const requiredDocs = [...BASE_DOCS];

  let primeFit = 0;
  let insurableFit = 0;
  let altAFit = 0;
  let bfsFit = 0;

  if (borrowerType === "salaried") {
    requiredDocs.push("Pay stubs (30 days)", "Employment letter", "NOA (most recent)");
    primeFit = creditScore >= 680 && ltv <= 80 && gds <= 39 && tds <= 44 ? 92 : 45;
    insurableFit = creditScore >= 600 && ltv <= 95 ? 78 : 35;
    altAFit = creditScore >= 580 && ltv <= 80 ? 55 : 20;
    bfsFit = 8;
    if (creditScore < 680) friction.push("Credit below Prime threshold — consider Insurable or Alt-A");
    if (ltv > 80) friction.push("LTV above 80% — Prime path unlikely");
  } else if (borrowerType === "bfs") {
    requiredDocs.push(
      "NOA (2 years)",
      "T1 General (2 years)",
      "Business bank statements (90 days)",
      "Articles of incorporation (if applicable)"
    );
    bfsFit = selfEmployedYears >= 2 && creditScore >= 620 && ltv <= 80 ? 88 : 42;
    altAFit = creditScore >= 600 && ltv <= 85 ? 62 : 28;
    primeFit = 12;
    insurableFit = 8;
    if (selfEmployedYears < 2) friction.push("Less than 2 years self-employed — BFS guidelines not met");
    if (ltv > 80) friction.push("LTV at upper BFS range — stronger equity may be required");
    friction.push("Income documentation is the primary approval friction point");
  } else if (borrowerType === "new-se") {
    requiredDocs.push("NOA", "T1 General", "Business registration", "Business plan or contracts");
    altAFit = creditScore >= 640 && ltv <= 75 ? 58 : 25;
    bfsFit = 22;
    primeFit = 5;
    insurableFit = 10;
    friction.push("Newly self-employed — limited product paths; Alt-A may apply");
  } else {
    requiredDocs.push("Pay stubs", "Commission history (2 years)", "NOA");
    altAFit = creditScore >= 620 && ltv <= 80 ? 72 : 38;
    insurableFit = creditScore >= 600 && ltv <= 90 ? 65 : 30;
    primeFit = creditScore >= 700 && ltv <= 75 ? 70 : 25;
    bfsFit = 15;
    friction.push("Variable income — lender may average over 2 years");
  }

  if (input.transactionType === "transfer" || input.transactionType === "refinance") {
    requiredDocs.push("Mortgage statement", "Property tax bill");
  } else {
    requiredDocs.push("Purchase agreement");
  }

  const products: ProductFit[] = [
    { product: "Prime" as ProductType, fit: primeFit, recommended: false, notes: primeFit >= 70 ? "Strong match" : "Not eligible or weak fit" },
    { product: "Insurable" as ProductType, fit: insurableFit, recommended: false, notes: insurableFit >= 65 ? "Possible with insurance" : "Limited fit" },
    { product: "Alt-A" as ProductType, fit: altAFit, recommended: false, notes: altAFit >= 55 ? "Alternative path available" : "Unlikely fit" },
    { product: "Business-for-Self" as ProductType, fit: bfsFit, recommended: false, notes: bfsFit >= 70 ? "Best fit for self-employed" : "Requirements not met" },
  ].sort((a, b) => b.fit - a.fit);

  const best = products[0];
  best.recommended = true;

  let approvalComplete = clamp(best.fit - 10 + (creditScore - 600) / 20, 35, 95);
  let approvalCurrent = approvalComplete;

  if (borrowerType === "bfs" || borrowerType === "new-se") {
    approvalCurrent = clamp(approvalComplete - 27, 25, approvalComplete);
    if (!friction.includes("Income documentation is the primary approval friction point")) {
      friction.push("Incomplete income package reduces approval likelihood");
    }
  }

  if (ltv > 85) {
    approvalComplete -= 12;
    approvalCurrent -= 15;
    friction.push("High LTV increases review scrutiny");
  }

  const qualityScore = clamp(
    Math.round(approvalCurrent * 0.7 + (requiredDocs.length < 8 ? 15 : 0)),
    30,
    95
  );

  return {
    recommended: best.product,
    fit: best.fit,
    approvalLikelihoodComplete: Math.round(approvalComplete),
    approvalLikelihoodCurrent: Math.round(approvalCurrent),
    friction,
    requiredDocs,
    products,
    qualityScore,
  };
}
