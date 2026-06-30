"use client";

import { RolePage } from "@/components/RolePage";
import { FraudView } from "@/lib/lazyViews";

export default function Page() {
  return (
    <RolePage role="compliance">
      <FraudView />
    </RolePage>
  );
}
