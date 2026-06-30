"use client";

import { RolePage } from "@/components/RolePage";
import { BrokerMyFilesView } from "@/lib/lazyViews";

export default function Page() {
  return (
    <RolePage role="broker">
      <BrokerMyFilesView />
    </RolePage>
  );
}
