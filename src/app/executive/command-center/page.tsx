"use client";

import { RolePage } from "@/components/RolePage";
import { CommandCenterView } from "@/views/CommandCenterView";

export default function Page() {
  return (
    <RolePage role="executive">
      <CommandCenterView />
    </RolePage>
  );
}
