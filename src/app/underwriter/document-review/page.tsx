"use client";

import { RolePage } from "@/components/RolePage";
import { DocumentReviewView } from "@/views/DocumentReviewView";

export default function Page() {
  return (
    <RolePage role="underwriter">
      <DocumentReviewView />
    </RolePage>
  );
}
