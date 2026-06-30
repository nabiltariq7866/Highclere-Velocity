import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";

const routes = [
  { role: "executive", slug: "command-center", view: "CommandCenterView" },
  { role: "executive", slug: "leadership", view: "LeadershipView" },
  { role: "executive", slug: "portfolio", view: "PortfolioView" },
  { role: "executive", slug: "province-expansion", view: "ProvinceExpansionView" },
  { role: "executive", slug: "model-ops", view: "ModelOpsView" },
  { role: "operations", slug: "command-center", view: "CommandCenterView" },
  { role: "operations", slug: "intake", view: "IntakeView" },
  { role: "operations", slug: "broker-intelligence", view: "BrokerIntelligenceView" },
  { role: "operations", slug: "communications", view: "CommunicationsView" },
  { role: "operations", slug: "sla-queue", view: "SlaQueueView" },
  { role: "operations", slug: "funding", view: "FundingView" },
  { role: "operations", slug: "integrations", view: "IntegrationsView" },
  { role: "underwriter", slug: "adjudication", view: "AdjudicationView" },
  { role: "underwriter", slug: "product-matching", view: "ProductMatchingView" },
  { role: "underwriter", slug: "document-review", view: "DocumentReviewView" },
  { role: "underwriter", slug: "property-appraisal", view: "PropertyAppraisalView" },
  { role: "underwriter", slug: "copilot", view: "CopilotView" },
  { role: "compliance", slug: "fraud", view: "FraudView" },
  { role: "compliance", slug: "compliance-audit", view: "ComplianceAuditView" },
  { role: "broker", slug: "portal", view: "BrokerPortalView" },
  { role: "broker", slug: "scenario-desk", view: "BrokerScenarioView" },
  { role: "broker", slug: "my-files", view: "BrokerMyFilesView" },
  { role: "broker", slug: "conditions", view: "BrokerConditionsView" },
];

const brokerViews = new Set([
  "BrokerPortalView",
  "BrokerScenarioView",
  "BrokerMyFilesView",
  "BrokerConditionsView",
]);

const base = "D:/AspireXLLC/Highclere-Velocity/src/app";

for (const role of ["executive", "operations", "underwriter", "compliance", "broker"]) {
  const redirectPath = join(base, role, "page.tsx");
  mkdirSync(dirname(redirectPath), { recursive: true });
  const first = routes.find((r) => r.role === role);
  writeFileSync(
    redirectPath,
    `import { redirect } from "next/navigation";

export default function Page() {
  redirect("/${role}/${first.slug}");
}
`
  );
}

for (const r of routes) {
  const actualImport = brokerViews.has(r.view)
    ? "@/views/BrokerViews"
    : `@/views/${r.view}`;

  const pagePath = join(base, r.role, r.slug, "page.tsx");
  mkdirSync(dirname(pagePath), { recursive: true });

  writeFileSync(
    pagePath,
    `"use client";

import { RolePage } from "@/components/RolePage";
import { ${r.view} } from "${actualImport}";

export default function Page() {
  return (
    <RolePage role="${r.role}">
      <${r.view} />
    </RolePage>
  );
}
`
  );
}

console.log(`Created ${routes.length} pages + 5 redirects`);
