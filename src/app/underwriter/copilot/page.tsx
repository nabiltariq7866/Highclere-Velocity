"use client";

import { RolePage } from "@/components/RolePage";
import { CopilotView } from "@/views/CopilotView";

export default function Page() {
  return (
    <RolePage role="underwriter">
      <CopilotView />
    </RolePage>
  );
}
