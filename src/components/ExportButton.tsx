"use client";

import { useState } from "react";
import { ExportPreviewModal } from "@/components/ExportPreviewModal";

export function ExportButton({
  label,
  title,
  content,
}: {
  label?: string;
  title: string;
  content: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className="btn-primary" onClick={() => setOpen(true)}>
        {label ?? "Export"}
      </button>
      <ExportPreviewModal open={open} onClose={() => setOpen(false)} title={title} content={content} />
    </>
  );
}
