"use client";

import { RolePage } from "@/components/RolePage";
import { ComplianceAuditView } from "@/lib/lazyViews";

export default function Page() {
  return (
    <RolePage role="compliance">
      <ComplianceAuditView />
    </RolePage>
  );
}
