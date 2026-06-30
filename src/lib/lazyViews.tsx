"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { ViewSkeleton } from "@/components/ViewSkeleton";

const load = <T extends Record<string, ComponentType<object>>>(
  loader: () => Promise<T>,
  name: keyof T & string
) =>
  dynamic(() => loader().then((m) => m[name]), {
    loading: () => <ViewSkeleton />,
  });

export const CommandCenterView = load(
  () => import("@/views/CommandCenterView"),
  "CommandCenterView"
);
export const IntakeView = load(() => import("@/views/IntakeView"), "IntakeView");
export const BrokerIntelligenceView = load(
  () => import("@/views/BrokerIntelligenceView"),
  "BrokerIntelligenceView"
);
export const CommunicationsView = load(
  () => import("@/views/CommunicationsView"),
  "CommunicationsView"
);
export const SlaQueueView = load(() => import("@/views/SlaQueueView"), "SlaQueueView");
export const FundingView = load(() => import("@/views/FundingView"), "FundingView");
export const IntegrationsView = load(
  () => import("@/views/IntegrationsView"),
  "IntegrationsView"
);
export const AdjudicationView = load(
  () => import("@/views/AdjudicationView"),
  "AdjudicationView"
);
export const ProductMatchingView = load(
  () => import("@/views/ProductMatchingView"),
  "ProductMatchingView"
);
export const DocumentReviewView = load(
  () => import("@/views/DocumentReviewView"),
  "DocumentReviewView"
);
export const PropertyAppraisalView = load(
  () => import("@/views/PropertyAppraisalView"),
  "PropertyAppraisalView"
);
export const CopilotView = load(() => import("@/views/CopilotView"), "CopilotView");
export const FraudView = load(() => import("@/views/FraudView"), "FraudView");
export const ComplianceAuditView = load(
  () => import("@/views/ComplianceAuditView"),
  "ComplianceAuditView"
);
export const LeadershipView = load(
  () => import("@/views/LeadershipView"),
  "LeadershipView"
);
export const PortfolioView = load(() => import("@/views/PortfolioView"), "PortfolioView");
export const ProvinceExpansionView = load(
  () => import("@/views/ProvinceExpansionView"),
  "ProvinceExpansionView"
);
export const ModelOpsView = load(() => import("@/views/ModelOpsView"), "ModelOpsView");
export const BrokerPortalView = load(
  () => import("@/views/BrokerViews"),
  "BrokerPortalView"
);
export const BrokerScenarioView = load(
  () => import("@/views/BrokerViews"),
  "BrokerScenarioView"
);
export const BrokerMyFilesView = load(
  () => import("@/views/BrokerViews"),
  "BrokerMyFilesView"
);
export const BrokerConditionsView = load(
  () => import("@/views/BrokerViews"),
  "BrokerConditionsView"
);
