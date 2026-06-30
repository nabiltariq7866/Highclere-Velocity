"use client";

import { RolePage } from "@/components/RolePage";
import { SlaQueueView } from "@/views/SlaQueueView";

export default function Page() {
  return (
    <RolePage role="operations">
      <SlaQueueView />
    </RolePage>
  );
}
