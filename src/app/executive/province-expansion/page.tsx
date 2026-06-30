"use client";

import { RolePage } from "@/components/RolePage";
import { ProvinceExpansionView } from "@/lib/lazyViews";

export default function Page() {
  return (
    <RolePage role="executive">
      <ProvinceExpansionView />
    </RolePage>
  );
}
