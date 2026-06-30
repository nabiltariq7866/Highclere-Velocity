"use client";

import { RolePage } from "@/components/RolePage";
import { CommandCenterView } from "@/lib/lazyViews";

export default function Page() {
  return (
    <RolePage role="executive">
      <CommandCenterView />
    </RolePage>
  );
}
