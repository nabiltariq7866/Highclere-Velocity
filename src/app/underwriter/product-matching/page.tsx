"use client";

import { RolePage } from "@/components/RolePage";
import { ProductMatchingView } from "@/lib/lazyViews";

export default function Page() {
  return (
    <RolePage role="underwriter">
      <ProductMatchingView />
    </RolePage>
  );
}
