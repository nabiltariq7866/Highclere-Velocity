"use client";

import { RolePage } from "@/components/RolePage";
import { BrokerConditionsView } from "@/lib/lazyViews";

export default function Page() {
  return (
    <RolePage role="broker">
      <BrokerConditionsView />
    </RolePage>
  );
}
