"use client";

import { RolePage } from "@/components/RolePage";
import { IntegrationsView } from "@/views/IntegrationsView";

export default function Page() {
  return (
    <RolePage role="operations">
      <IntegrationsView />
    </RolePage>
  );
}
