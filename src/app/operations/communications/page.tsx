"use client";

import { RolePage } from "@/components/RolePage";
import { CommunicationsView } from "@/lib/lazyViews";

export default function Page() {
  return (
    <RolePage role="operations">
      <CommunicationsView />
    </RolePage>
  );
}
