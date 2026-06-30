"use client";

import { RolePage } from "@/components/RolePage";
import { IntakeView } from "@/views/IntakeView";

export default function Page() {
  return (
    <RolePage role="operations">
      <IntakeView />
    </RolePage>
  );
}
