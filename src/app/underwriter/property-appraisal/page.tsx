"use client";

import { RolePage } from "@/components/RolePage";
import { PropertyAppraisalView } from "@/views/PropertyAppraisalView";

export default function Page() {
  return (
    <RolePage role="underwriter">
      <PropertyAppraisalView />
    </RolePage>
  );
}
