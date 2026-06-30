"use client";

import { RolePage } from "@/components/RolePage";
import { IntakeView } from "@/lib/lazyViews";

export default function Page() {
  return (
    <RolePage role="operations">
      <IntakeView />
    </RolePage>
  );
}
