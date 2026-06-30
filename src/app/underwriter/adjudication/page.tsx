"use client";

import { RolePage } from "@/components/RolePage";
import { AdjudicationView } from "@/lib/lazyViews";

export default function Page() {
  return (
    <RolePage role="underwriter">
      <AdjudicationView />
    </RolePage>
  );
}
