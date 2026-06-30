"use client";

import { RolePage } from "@/components/RolePage";
import { PortfolioView } from "@/views/PortfolioView";

export default function Page() {
  return (
    <RolePage role="executive">
      <PortfolioView />
    </RolePage>
  );
}
