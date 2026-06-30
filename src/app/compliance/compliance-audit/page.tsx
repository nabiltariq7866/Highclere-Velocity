"use client";

import { RolePage } from "@/components/RolePage";
import { ComplianceAuditView } from "@/views/ComplianceAuditView";

export default function Page() {
  return (
    <RolePage role="compliance">
      <ComplianceAuditView />
    </RolePage>
  );
}
