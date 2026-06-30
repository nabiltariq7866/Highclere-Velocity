"use client";

import { RolePage } from "@/components/RolePage";
import { IntegrationsView } from "@/lib/lazyViews";

export default function Page() {
  return (
    <RolePage role="operations">
      <IntegrationsView />
    </RolePage>
  );
}
