"use client";

import { RolePage } from "@/components/RolePage";
import { BrokerPortalView } from "@/lib/lazyViews";

export default function Page() {
  return (
    <RolePage role="broker">
      <BrokerPortalView />
    </RolePage>
  );
}
