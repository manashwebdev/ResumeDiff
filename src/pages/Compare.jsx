import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import UploadZone from "../components/UploadZone.jsx";
import { compareResumes } from "../lib/api.js";

export default function Compare() {
  const [oldFile, setOldFile] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const canCompare = oldFile && newFile && !loading;

  async function handleCompare() {
    setError(null);
    setLoading(true);
    try {
      const report = await compareResumes(oldFile, newFile);
      sessionStorage.setItem("resumediff-report", JSON.stringify(report));
      sessionStorage.setItem(
        "resumediff-filenames",
        JSON.stringify({ old: oldFile.name, new: newFile.name })
      );
      navigate("/results");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-xl text-center"
      >
        <span className="pill mx-auto">Step 1 of 2</span>
        <h1 className="section-title mt-4">Upload your two resume versions</h1>
        <p className="mt-3 muted">
          We'll extract the text, run the comparison, and generate your full report.
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <UploadZone
          label="Old Resume"
          sublabel="Your previous version"
          file={oldFile}
          onFile={setOldFile}
        />
        <UploadZone
          label="New Resume"
          sublabel="Your latest version"
          file={newFile}
          onFile={setNewFile}
        />
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-bad/30 bg-bad/10 px-4 py-3 text-sm text-bad">
          {error}
        </div>
      )}

      <div className="mt-10 flex flex-col items-center gap-3">
        <button onClick={handleCompare} disabled={!canCompare} className="btn-primary px-8 py-3 text-base">
          {loading ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Analyzing resumes...
            </>
          ) : (
            <>
              Run Comparison
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}
        </button>
        <p className="text-xs muted">Your files are processed in memory and never stored.</p>
      </div>
    </div>
  );
}
