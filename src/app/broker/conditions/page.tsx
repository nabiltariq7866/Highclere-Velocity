"use client";

import { RolePage } from "@/components/RolePage";
import { BrokerConditionsView } from "@/views/BrokerViews";

export default function Page() {
  return (
    <RolePage role="broker">
      <BrokerConditionsView />
    </RolePage>
  );
}
