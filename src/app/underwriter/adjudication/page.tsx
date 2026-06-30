"use client";

import { RolePage } from "@/components/RolePage";
import { AdjudicationView } from "@/views/AdjudicationView";

export default function Page() {
  return (
    <RolePage role="underwriter">
      <AdjudicationView />
    </RolePage>
  );
}
