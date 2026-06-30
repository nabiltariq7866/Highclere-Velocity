"use client";

import { RolePage } from "@/components/RolePage";
import { BrokerScenarioView } from "@/lib/lazyViews";

export default function Page() {
  return (
    <RolePage role="broker">
      <BrokerScenarioView />
    </RolePage>
  );
}
