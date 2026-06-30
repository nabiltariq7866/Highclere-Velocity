"use client";

import { RolePage } from "@/components/RolePage";
import { PropertyAppraisalView } from "@/lib/lazyViews";

export default function Page() {
  return (
    <RolePage role="underwriter">
      <PropertyAppraisalView />
    </RolePage>
  );
}
