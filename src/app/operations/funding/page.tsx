"use client";

import { RolePage } from "@/components/RolePage";
import { FundingView } from "@/views/FundingView";

export default function Page() {
  return (
    <RolePage role="operations">
      <FundingView />
    </RolePage>
  );
}
