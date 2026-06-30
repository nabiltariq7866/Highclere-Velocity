"use client";

import { RolePage } from "@/components/RolePage";
import { ProductMatchingView } from "@/views/ProductMatchingView";

export default function Page() {
  return (
    <RolePage role="underwriter">
      <ProductMatchingView />
    </RolePage>
  );
}
