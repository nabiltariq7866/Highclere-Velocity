"use client";

import { RolePage } from "@/components/RolePage";
import { ModelOpsView } from "@/lib/lazyViews";

export default function Page() {
  return (
    <RolePage role="executive">
      <ModelOpsView />
    </RolePage>
  );
}
