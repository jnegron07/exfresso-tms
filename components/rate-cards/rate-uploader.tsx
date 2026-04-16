"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type UploadState = "idle" | "uploading" | "analyzing" | "mapping" | "done";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: "pending" | "processing" | "done" | "error";
}

interface ExtractedColumn {
  id: string;
  name: string;
  confidence: "high" | "medium" | "low";
  mappedTo?: string;
  values: string[];
}

interface ExtractedData {
  columns: ExtractedColumn[];
  rowCount: number;
}

const FIELD_OPTIONS = [
  { value: "", label: "What is this column?" },
  { value: "origin_port", label: "Origin Port" },
  { value: "destination_port", label: "Destination Port" },
  { value: "rate_per_kg", label: "Rate per KG" },
  { value: "rate_per_cbm", label: "Rate per CBM" },
  { value: "carrier", label: "Carrier" },
  { value: "valid_from", label: "Valid From" },
  { value: "valid_until", label: "Valid Until" },
  { value: "currency", label: "Currency" },
  { value: "container_type", label: "Container Type" },
  { value: "transit_time", label: "Transit Time" },
  { value: "ignore", label: "Ignore Column" },
];

const MOCK_PARSED_DATA: ExtractedData = {
  rowCount: 156,
  columns: [
    { id: "col1", name: "Origin", confidence: "high", mappedTo: "origin_port", values: ["SIN", "HKG", "NGB", "PUS", "TKO"] },
    { id: "col2", name: "Destination", confidence: "high", mappedTo: "destination_port", values: ["LAX", "NYC", "LON", "RTM", "HAM"] },
    { id: "col3", name: "Rate/kg", confidence: "medium", mappedTo: "rate_per_kg", values: ["2.45", "3.20", "2.85", "4.10", "2.95"] },
    { id: "col4", name: "Carrier", confidence: "high", mappedTo: "carrier", values: ["Maersk", "MSC", "CMA CGM", "Hapag", "ONE"] },
    { id: "col5", name: "Valid From", confidence: "low", values: ["Jan 1", "Feb 15", "Mar 1", "Apr 1", "May 1"] },
    { id: "col6", name: "UnmappedCol", confidence: "low", values: ["EXP", "STD", "ECO", "EXP", "STD"] },
  ],
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function FileDropzone({
  onFilesSelected,
  files,
  onCancelFile,
}: {
  onFilesSelected: (files: File[]) => void;
  files: UploadedFile[];
  onCancelFile: (id: string) => void;
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const fileArray = Array.from(e.dataTransfer.files).filter(
          (f) => f.type === "application/pdf" || f.name.endsWith(".csv") || f.name.endsWith(".xlsx") || f.name.endsWith(".xls")
        );
        if (fileArray.length > 0) onFilesSelected(fileArray);
      }
    },
    [onFilesSelected]
  );

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files));
    }
  };

  return (
    <div className="w-full">
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        animate={{
          borderColor: isDragOver ? "#6BD8CB" : "rgba(255,255,255,0.1)",
          backgroundColor: isDragOver ? "rgba(107,216,203,0.05)" : "rgba(19,27,46,0.4)",
        }}
        className="relative cursor-pointer rounded-3xl border-2 border-dashed p-16 flex flex-col items-center justify-center transition-colors"
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.csv,.xlsx,.xls"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <motion.div
          animate={{ scale: isDragOver ? 1.1 : 1 }}
          className="w-20 h-20 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6"
        >
          <span className="material-symbols-outlined text-4xl text-secondary">description</span>
        </motion.div>
        
        <h3 className="text-xl font-bold text-on-surface mb-2">
          {isDragOver ? "Drop files here" : "Drop your rate sheet here"}
        </h3>
        <p className="text-sm text-on-surface-variant text-center max-w-md mb-4">
          PDF, Excel, CSV • Multiple files supported
        </p>
        
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-highest/50 border border-white/5">
          <span className="material-symbols-outlined text-sm text-secondary">upload_file</span>
          <span className="text-xs font-medium text-on-surface-variant">or click to browse</span>
        </div>
      </motion.div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-3 p-4 rounded-xl bg-surface-container-high/50 border border-white/5"
            >
              <span className="material-symbols-outlined text-secondary">
                {file.name.endsWith(".pdf") ? "picture_as_pdf" : "table_rows"}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-on-surface truncate">{file.name}</p>
                <p className="text-xs text-on-surface-variant">{formatFileSize(file.size)}</p>
              </div>
              {file.status === "pending" && (
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${file.progress}%` }}
                      transition={{ duration: 0.3 }}
                      className="h-full bg-secondary rounded-full"
                    />
                  </div>
                  <span className="text-xs text-on-surface-variant">{file.progress}%</span>
                </div>
              )}
              {file.status === "done" && (
                <span className="material-symbols-outlined text-secondary">check_circle</span>
              )}
              <button
                onClick={() => onCancelFile(file.id)}
                className="text-on-surface-variant hover:text-error transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AnalyzingState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mt-8 rounded-3xl border border-white/5 p-8 flex flex-col items-center justify-center"
      style={{ background: "rgba(19,27,46,0.6)" }}
    >
      <div className="relative w-24 h-24 mb-6">
        {[60, 90, 120].map((size, i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
            className="absolute inset-0 rounded-full border border-secondary/30"
            style={{ width: size, height: size, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="material-symbols-outlined text-5xl text-secondary animate-pulse">analytics</span>
        </div>
      </div>
      <h3 className="text-xl font-bold text-on-surface mb-2">Analyzing document with AI...</h3>
      <p className="text-sm text-on-surface-variant text-center max-w-md">
        Extracting data, detecting columns and mapping fields automatically
      </p>
    </motion.div>
  );
}

function DataMappingPanel({
  data,
  onFieldChange,
  onValueEdit,
}: {
  data: ExtractedData;
  onFieldChange: (columnId: string, field: string) => void;
  onValueEdit: (columnId: string, rowIndex: number, value: string) => void;
}) {
  return (
    <div className="bg-surface-container-low/30 rounded-2xl border border-white/5 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="p-4 text-left text-[10px] font-black text-on-surface-variant uppercase tracking-wider">
                Detected Column
              </th>
              <th className="p-4 text-left text-[10px] font-black text-on-surface-variant uppercase tracking-wider">
                Confidence
              </th>
              <th className="p-4 text-left text-[10px] font-black text-on-surface-variant uppercase tracking-wider">
                Mapping
              </th>
              {Array.from({ length: 5 }).map((_, i) => (
                <th key={i} className="p-4 text-left text-[10px] font-black text-on-surface-variant uppercase tracking-wider">
                  Row {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.columns.map((col) => (
              <tr key={col.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                <td className="p-4">
                  <span className="text-sm font-semibold text-on-surface">{col.name}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1.5">
                    {col.confidence === "high" && (
                      <>
                        <span className="material-symbols-outlined text-emerald-400 text-lg">check_circle</span>
                        <span className="text-xs text-emerald-400 font-medium">High</span>
                      </>
                    )}
                    {col.confidence === "medium" && (
                      <>
                        <span className="material-symbols-outlined text-amber-400 text-lg">warning</span>
                        <span className="text-xs text-amber-400 font-medium">Medium</span>
                      </>
                    )}
                    {col.confidence === "low" && (
                      <>
                        <span className="material-symbols-outlined text-rose-400 text-lg">error</span>
                        <span className="text-xs text-rose-400 font-medium">Low</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  {!col.mappedTo ? (
                    <select
                      onChange={(e) => onFieldChange(col.id, e.target.value)}
                      className="h-9 px-3 rounded-lg bg-surface-container-highest border border-white/10 text-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary/40"
                      defaultValue=""
                    >
                      {FIELD_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-xs px-2 py-1 rounded-md bg-secondary/10 text-secondary font-medium">
                      {FIELD_OPTIONS.find((f) => f.value === col.mappedTo)?.label}
                    </span>
                  )}
                </td>
                {col.values.slice(0, 5).map((val, i) => (
                  <td key={i} className="p-4">
                    <input
                      type="text"
                      defaultValue={val}
                      onBlur={(e) => onValueEdit(col.id, i, e.target.value)}
                      className="w-20 px-2 py-1 rounded bg-transparent border border-transparent hover:border-white/20 focus:border-secondary focus:outline-none text-sm text-on-surface text-center"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ConfirmationCard({
  data,
  onSave,
  onShare,
  onCancel,
}: {
  data: ExtractedData;
  onSave: () => void;
  onShare: () => void;
  onCancel: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 rounded-3xl border border-white/5 p-8"
      style={{ background: "rgba(19,27,46,0.6)" }}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-4xl text-secondary">check_circle</span>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-on-surface">Rates Extracted!</h3>
          <p className="text-on-surface-variant">Review the summary before saving</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-surface-container-high/50 border border-white/5">
          <p className="text-3xl font-black text-on-surface">{data.rowCount}</p>
          <p className="text-xs text-on-surface-variant uppercase tracking-wider">Rates Extracted</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-container-high/50 border border-white/5">
          <p className="text-3xl font-black text-on-surface">
            {new Set(data.columns.filter((c) => c.mappedTo === "origin_port" || c.mappedTo === "destination_port").flatMap((c) => c.values)).size}
          </p>
          <p className="text-xs text-on-surface-variant uppercase tracking-wider">Routes Covered</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-container-high/50 border border-white/5">
          <p className="text-3xl font-black text-secondary">Q1-Q2</p>
          <p className="text-xs text-on-surface-variant uppercase tracking-wider">Valid Period</p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onCancel}
          className="flex-1 py-4 rounded-xl border border-white/10 text-on-surface-variant text-sm font-bold hover:border-white/20 hover:text-on-surface transition-all"
        >
          Cancel
        </button>
        <button
          onClick={onShare}
          className="flex-1 py-4 rounded-xl border border-secondary/20 text-secondary text-sm font-bold hover:bg-secondary/10 transition-all"
        >
          Share to Network
        </button>
        <button
          onClick={onSave}
          className="flex-[2] py-4 rounded-xl bg-secondary text-[#0b1326] text-sm font-bold hover:bg-secondary/90 shadow-lg shadow-secondary/20 transition-all"
        >
          Save to My Rates
        </button>
      </div>
    </motion.div>
  );
}

export function RateCardUploader() {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    const uploaded: UploadedFile[] = newFiles.map((f, i) => ({
      id: `file-${Date.now()}-${i}`,
      name: f.name,
      size: f.size,
      progress: 0,
      status: "pending",
    }));
    setFiles(uploaded);
    setUploadState("uploading");

    uploaded.forEach((file, i) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f, j) => (j === i ? { ...f, progress: 100, status: "done" } : f))
          );
          setTimeout(() => {
            setUploadState("analyzing");
          }, 500);
        } else {
          setFiles((prev) =>
            prev.map((f, j) => (j === i ? { ...f, progress: Math.round(progress) } : f))
          );
        }
      }, 200);
    });
  }, []);

  const handleCancelFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    if (files.length <= 1) {
      setUploadState("idle");
    }
  }, [files.length]);

  useEffect(() => {
    if (uploadState === "analyzing") {
      const timer = setTimeout(() => {
        setExtractedData(MOCK_PARSED_DATA);
        setUploadState("mapping");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [uploadState]);

  const handleFieldChange = useCallback((columnId: string, field: string) => {
    if (extractedData) {
      setExtractedData({
        ...extractedData,
        columns: extractedData.columns.map((col) =>
          col.id === columnId ? { ...col, mappedTo: field || undefined } : col
        ),
      });
    }
  }, [extractedData]);

  const handleSave = useCallback(() => {
    setUploadState("done");
  }, []);

  const handleShare = useCallback(() => {
    alert("Shared to network!");
  }, []);

  const handleCancel = useCallback(() => {
    setUploadState("idle");
    setFiles([]);
    setExtractedData(null);
  }, []);

  if (uploadState === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-secondary/30 p-12 flex flex-col items-center justify-center text-center"
        style={{ background: "rgba(107,216,203,0.05)" }}
      >
        <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-6xl text-secondary">check_circle</span>
        </div>
        <h3 className="text-3xl font-black text-on-surface mb-2">Saved!</h3>
        <p className="text-on-surface-variant mb-8">
          Your rates have been saved to My Rate Cards
        </p>
        <button
          onClick={handleCancel}
          className="px-8 py-3 rounded-xl bg-secondary text-[#0b1326] font-bold"
        >
          Upload More
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {uploadState === "idle" && (
        <FileDropzone
          onFilesSelected={handleFilesSelected}
          files={files}
          onCancelFile={handleCancelFile}
        />
      )}

      {(uploadState === "uploading" || uploadState === "analyzing") && (
        <>
          <FileDropzone
            onFilesSelected={() => {}}
            files={files}
            onCancelFile={handleCancelFile}
          />
          {uploadState === "analyzing" && <AnalyzingState />}
        </>
      )}

      {uploadState === "mapping" && extractedData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <DataMappingPanel
            data={extractedData}
            onFieldChange={handleFieldChange}
            onValueEdit={() => {}}
          />
          <ConfirmationCard
            data={extractedData}
            onSave={handleSave}
            onShare={handleShare}
            onCancel={handleCancel}
          />
        </motion.div>
      )}
    </div>
  );
}