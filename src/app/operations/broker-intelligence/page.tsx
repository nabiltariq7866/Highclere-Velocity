"use client";

import { RolePage } from "@/components/RolePage";
import { BrokerIntelligenceView } from "@/lib/lazyViews";

export default function Page() {
  return (
    <RolePage role="operations">
      <BrokerIntelligenceView />
    </RolePage>
  );
}
