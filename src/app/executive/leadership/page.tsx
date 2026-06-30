"use client";

import { RolePage } from "@/components/RolePage";
import { LeadershipView } from "@/views/LeadershipView";

export default function Page() {
  return (
    <RolePage role="executive">
      <LeadershipView />
    </RolePage>
  );
}
