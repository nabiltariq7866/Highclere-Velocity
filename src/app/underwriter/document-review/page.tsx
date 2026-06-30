"use client";

import { RolePage } from "@/components/RolePage";
import { DocumentReviewView } from "@/lib/lazyViews";

export default function Page() {
  return (
    <RolePage role="underwriter">
      <DocumentReviewView />
    </RolePage>
  );
}
