"use client";

import { RolePage } from "@/components/RolePage";
import { BrokerMyFilesView } from "@/views/BrokerViews";

export default function Page() {
  return (
    <RolePage role="broker">
      <BrokerMyFilesView />
    </RolePage>
  );
}
