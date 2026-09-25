import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const COMMANDS = [
  { label: "Go to Landing Page", path: "/", keywords: "home landing" },
  { label: "Compare Resumes", path: "/compare", keywords: "upload compare new old" },
  { label: "View Results", path: "/results", keywords: "results report ats score" },
];

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    function handleKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onClose(!open);
      }
      if (e.key === "Escape") onClose(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const filtered = COMMANDS.filter(
    (c) =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.keywords.includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-32 backdrop-blur-sm"
          onClick={() => onClose(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card w-full max-w-lg overflow-hidden rounded-2xl"
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a page..."
                className="w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
              />
              <span className="kbd">esc</span>
            </div>
            <div className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-4 text-center text-xs muted">No matches</p>
              )}
              {filtered.map((cmd) => (
                <button
                  key={cmd.path}
                  onClick={() => {
                    navigate(cmd.path);
                    onClose(false);
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-white/80 transition-colors hover:bg-white/[0.06]"
                >
                  {cmd.label}
                  <span className="text-xs muted">↵</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
