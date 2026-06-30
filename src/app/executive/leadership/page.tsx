"use client";

import { RolePage } from "@/components/RolePage";
import { LeadershipView } from "@/lib/lazyViews";

export default function Page() {
  return (
    <RolePage role="executive">
      <LeadershipView />
    </RolePage>
  );
}
