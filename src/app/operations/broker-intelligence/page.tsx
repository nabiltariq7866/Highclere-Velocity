"use client";

import { RolePage } from "@/components/RolePage";
import { BrokerIntelligenceView } from "@/views/BrokerIntelligenceView";

export default function Page() {
  return (
    <RolePage role="operations">
      <BrokerIntelligenceView />
    </RolePage>
  );
}
