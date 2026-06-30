"use client";

import { RolePage } from "@/components/RolePage";
import { ModelOpsView } from "@/views/ModelOpsView";

export default function Page() {
  return (
    <RolePage role="executive">
      <ModelOpsView />
    </RolePage>
  );
}
