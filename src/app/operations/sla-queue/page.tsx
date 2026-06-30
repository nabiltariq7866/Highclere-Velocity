"use client";

import { RolePage } from "@/components/RolePage";
import { SlaQueueView } from "@/lib/lazyViews";

export default function Page() {
  return (
    <RolePage role="operations">
      <SlaQueueView />
    </RolePage>
  );
}
