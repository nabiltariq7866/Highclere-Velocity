"use client";

import { RolePage } from "@/components/RolePage";
import { PortfolioView } from "@/lib/lazyViews";

export default function Page() {
  return (
    <RolePage role="executive">
      <PortfolioView />
    </RolePage>
  );
}
