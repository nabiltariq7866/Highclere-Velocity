"use client";

import { useCallback, useState } from "react";
import { useDemoState } from "@/context/DemoStateProvider";

export type UploadTarget = {
  checklistId: string;
  label: string;
  accept?: string;
};

export function UploadSimulator({
  open,
  onClose,
  fileNumber,
  borrower,
  targets,
  defaultTargetId,
}: {
  open: boolean;
  onClose: () => void;
  fileNumber: string;
  borrower: string;
  targets: UploadTarget[];
  defaultTargetId?: string;
}) {
  const { markDocUploaded } = useDemoState();
  const [selected, setSelected] = useState(defaultTargetId ?? targets[0]?.checklistId ?? "");
  const [phase, setPhase] = useState<"idle" | "uploading" | "extracting" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");

  const reset = useCallback(() => {
    setPhase("idle");
    setProgress(0);
    setFileName("");
  }, []);

  const handleClose = () => {
    reset();
    onClose();
  };

  const runSimulation = (name: string) => {
    setFileName(name);
    setPhase("uploading");
    setProgress(0);

    const uploadInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 55) {
          clearInterval(uploadInterval);
          setPhase("extracting");
          const extractInterval = setInterval(() => {
            setProgress((q) => {
              if (q >= 100) {
                clearInterval(extractInterval);
                setPhase("done");
                const target = targets.find((t) => t.checklistId === selected);
                if (target) markDocUploaded(target.checklistId, target.label);
                return 100;
              }
              return q + 8;
            });
          }, 120);
          return 55;
        }
        return p + 11;
      });
    }, 100);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) runSimulation(file.name);
    e.target.value = "";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && phase === "idle") runSimulation(file.name);
  };

  if (!open) return null;

  const target = targets.find((t) => t.checklistId === selected);

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(3, 56, 64, 0.45)",
        zIndex: 1500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
      onClick={handleClose}
    >
      <div
        className="card"
        style={{ width: "100%", maxWidth: 480, boxShadow: "var(--shadow-panel)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>Upload Documents</div>
        <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 16 }}>
          {fileNumber} · {borrower}
        </div>

        {phase === "idle" && (
          <>
            <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>Document type</label>
            <select
              className="top-bar-search"
              style={{ width: "100%", marginBottom: 16 }}
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              {targets.map((t) => (
                <option key={t.checklistId} value={t.checklistId}>{t.label}</option>
              ))}
            </select>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
              style={{
                border: "2px dashed var(--border)",
                borderRadius: 12,
                padding: 32,
                textAlign: "center",
                background: "var(--ai-bg)",
                cursor: "pointer",
              }}
              onClick={() => document.getElementById("hcv-file-input")?.click()}
            >
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Drop file here or click to browse</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>PDF, JPG, PNG — demo simulation only</div>
              <input
                id="hcv-file-input"
                type="file"
                accept={target?.accept ?? ".pdf,.jpg,.jpeg,.png"}
                style={{ display: "none" }}
                onChange={onFileChange}
              />
            </div>
          </>
        )}

        {(phase === "uploading" || phase === "extracting" || phase === "done") && (
          <div>
            <div style={{ fontSize: 13, marginBottom: 8 }}>
              {phase === "done" ? "Complete" : phase === "extracting" ? "AI extracting fields…" : "Uploading…"}
              {fileName && <span style={{ color: "var(--muted)" }}> — {fileName}</span>}
            </div>
            <div className="progress-bar" style={{ height: 10, marginBottom: 12 }}>
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            {phase === "done" && (
              <div className="ai-panel" style={{ fontSize: 13, marginBottom: 12 }}>
                <strong>{target?.label}</strong> received. Extraction confidence 94%. Intake checklist updated.
              </div>
            )}
          </div>
        )}

        <div style={{ display: "flex", gap: 8, marginTop: 16, justifyContent: "flex-end" }}>
          <button type="button" className="btn-secondary" onClick={handleClose}>
            {phase === "done" ? "Close" : "Cancel"}
          </button>
          {phase === "idle" && (
            <button
              type="button"
              className="btn-primary"
              onClick={() => runSimulation(`${target?.label.replace(/\s+/g, "_")}_demo.pdf`)}
            >
              Simulate upload
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
