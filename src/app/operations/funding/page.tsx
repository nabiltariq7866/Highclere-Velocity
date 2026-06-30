"use client";

import { RolePage } from "@/components/RolePage";
import { FundingView } from "@/lib/lazyViews";

export default function Page() {
  return (
    <RolePage role="operations">
      <FundingView />
    </RolePage>
  );
}
