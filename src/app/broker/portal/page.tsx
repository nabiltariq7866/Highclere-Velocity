"use client";

import { RolePage } from "@/components/RolePage";
import { BrokerPortalView } from "@/views/BrokerViews";

export default function Page() {
  return (
    <RolePage role="broker">
      <BrokerPortalView />
    </RolePage>
  );
}
