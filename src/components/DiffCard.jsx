import { motion } from "framer-motion";

export function ResultCard({ title, icon, children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`glass-card rounded-2xl p-6 ${className}`}
    >
      <div className="mb-4 flex items-center gap-2">
        {icon && <span className="text-accent-400">{icon}</span>}
        <h3 className="text-sm font-semibold text-white/80">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}

export function PillList({ items, tone = "neutral", emptyText = "None detected" }) {
  const toneClasses = {
    good: "border-good/30 bg-good/10 text-good",
    bad: "border-bad/30 bg-bad/10 text-bad",
    neutral: "border-white/10 bg-white/[0.04] text-white/70",
  };

  if (!items || items.length === 0) {
    return <p className="text-xs muted">{emptyText}</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className={`rounded-full border px-2.5 py-1 text-xs font-medium ${toneClasses[tone]}`}
        >
          {tone === "good" ? "+ " : tone === "bad" ? "− " : ""}
          {item}
        </span>
      ))}
    </div>
  );
}

export function BulletDiffList({ added = [], removed = [] }) {
  if (added.length === 0 && removed.length === 0) {
    return <p className="text-xs muted">No line-level changes detected.</p>;
  }
  return (
    <ul className="space-y-2 text-sm">
      {added.map((line, i) => (
        <li key={`a${i}`} className="flex gap-2 rounded-lg bg-good/[0.06] px-3 py-2 text-good/90">
          <span className="font-mono text-xs">+</span>
          <span className="text-white/80">{line}</span>
        </li>
      ))}
      {removed.map((line, i) => (
        <li key={`r${i}`} className="flex gap-2 rounded-lg bg-bad/[0.06] px-3 py-2 text-bad/90">
          <span className="font-mono text-xs">−</span>
          <span className="text-white/60 line-through decoration-bad/40">{line}</span>
        </li>
      ))}
    </ul>
  );
}
