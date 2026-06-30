"use client";

import { RolePage } from "@/components/RolePage";
import { BrokerScenarioView } from "@/views/BrokerViews";

export default function Page() {
  return (
    <RolePage role="broker">
      <BrokerScenarioView />
    </RolePage>
  );
}
