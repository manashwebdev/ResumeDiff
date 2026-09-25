import { useRef, useState } from "react";
import { motion } from "framer-motion";

const ACCEPTED = [".pdf", ".docx", ".txt"];

export default function UploadZone({ label, sublabel, file, onFile, accentClass = "accent-500" }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  function handleFiles(files) {
    if (!files || files.length === 0) return;
    const f = files[0];
    const ext = "." + f.name.split(".").pop().toLowerCase();
    if (!ACCEPTED.includes(ext)) {
      alert(`Unsupported file type: ${ext}. Please upload PDF, DOCX or TXT.`);
      return;
    }
    onFile(f);
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={`glass-card group relative flex h-64 cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border-dashed px-6 text-center transition-all duration-200 ${
        dragging ? "border-accent-400/60 bg-accent-500/[0.06]" : "hover:border-white/20"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {file ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-good/15 text-good">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
          <p className="max-w-[220px] truncate text-sm font-medium text-white">{file.name}</p>
          <p className="text-xs muted">{(file.size / 1024).toFixed(0)} KB — click to replace</p>
        </motion.div>
      ) : (
        <>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-white/50 transition-colors group-hover:text-accent-400">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 16V4M12 4l-4 4M12 4l4 4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{label}</p>
            <p className="mt-1 text-xs muted">{sublabel}</p>
          </div>
          <p className="pill mt-1">PDF · DOCX · TXT — max 8MB</p>
        </>
      )}
    </div>
  );
}
