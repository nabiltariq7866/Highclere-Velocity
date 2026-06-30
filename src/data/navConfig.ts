import type { NavItem } from "@/lib/types";

export const NAV_EXECUTIVE: NavItem[] = [
  { id: "command-center", label: "Command Center", icon: "command", group: "Overview", slug: "command-center" },
  { id: "leadership", label: "Leadership Dashboard", icon: "leadership", group: "Executive", slug: "leadership" },
  { id: "portfolio", label: "Portfolio & Capital", icon: "portfolio", group: "Executive", slug: "portfolio" },
  { id: "province", label: "Province Expansion", icon: "province", group: "Executive", slug: "province-expansion" },
  { id: "model-ops", label: "AI Model Operations", icon: "model", group: "AI & Governance", slug: "model-ops" },
];

export const NAV_OPERATIONS: NavItem[] = [
  { id: "command-center", label: "Command Center", icon: "command", group: "Operations", slug: "command-center" },
  { id: "intake", label: "AI Intake & Quality", icon: "intake", group: "Operations", slug: "intake" },
  { id: "broker-intel", label: "Broker Intelligence", icon: "brokers", group: "Partners", slug: "broker-intelligence" },
  { id: "communications", label: "Broker Communications", icon: "comms", group: "Partners", slug: "communications" },
  { id: "sla", label: "SLA & Queue Mgmt", icon: "sla", group: "Capacity", slug: "sla-queue" },
  { id: "funding", label: "Funding Readiness", icon: "funding", group: "Closing", slug: "funding" },
  { id: "integrations", label: "Integration Layer", icon: "integrations", group: "Platform", slug: "integrations" },
];

export const NAV_UNDERWRITER: NavItem[] = [
  { id: "adjudication", label: "Adjudication Engine", icon: "adjudication", group: "Underwriting", slug: "adjudication" },
  { id: "products", label: "Product Matching", icon: "products", group: "Underwriting", slug: "product-matching" },
  { id: "documents", label: "Document & Income", icon: "documents", group: "Verification", slug: "document-review" },
  { id: "property", label: "Property & Appraisal", icon: "property", group: "Verification", slug: "property-appraisal" },
  { id: "copilot", label: "Underwriter Copilot", icon: "copilot", group: "AI", slug: "copilot" },
];

export const NAV_COMPLIANCE: NavItem[] = [
  { id: "fraud", label: "Fraud & Integrity", icon: "fraud", group: "Risk", slug: "fraud" },
  { id: "audit", label: "Compliance & Audit", icon: "audit", group: "Governance", slug: "compliance-audit" },
];

export const NAV_BROKER: NavItem[] = [
  { id: "portal", label: "Broker Portal", icon: "portal", group: "Self-Service", slug: "portal" },
  { id: "scenario", label: "Scenario Desk", icon: "scenario", group: "Self-Service", slug: "scenario-desk" },
  { id: "my-files", label: "My Submissions", icon: "files", group: "Pipeline", slug: "my-files" },
  { id: "conditions", label: "Conditions Tracker", icon: "conditions", group: "Pipeline", slug: "conditions" },
];
