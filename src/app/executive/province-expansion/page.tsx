"use client";

import { RolePage } from "@/components/RolePage";
import { ProvinceExpansionView } from "@/views/ProvinceExpansionView";

export default function Page() {
  return (
    <RolePage role="executive">
      <ProvinceExpansionView />
    </RolePage>
  );
}
