"use client";

import { RolePage } from "@/components/RolePage";
import { FraudView } from "@/views/FraudView";

export default function Page() {
  return (
    <RolePage role="compliance">
      <FraudView />
    </RolePage>
  );
}
