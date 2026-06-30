"use client";

import { RolePage } from "@/components/RolePage";
import { CopilotView } from "@/lib/lazyViews";

export default function Page() {
  return (
    <RolePage role="underwriter">
      <CopilotView />
    </RolePage>
  );
}
