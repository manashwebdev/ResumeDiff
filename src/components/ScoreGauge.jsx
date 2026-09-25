import { motion } from "framer-motion";

function colorFor(score) {
  if (score >= 80) return "#3ecf8e";
  if (score >= 60) return "#f5a623";
  return "#f0526a";
}

export default function ScoreGauge({ oldScore, newScore }) {
  const delta = newScore - oldScore;
  const deltaColor = delta > 0 ? "text-good" : delta < 0 ? "text-bad" : "text-white/50";
  const deltaLabel = delta > 0 ? `+${delta}` : delta;

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white/80">ATS Compatibility Score</h3>
        <span className={`text-sm font-bold ${deltaColor}`}>{deltaLabel} pts</span>
      </div>

      <div className="flex items-end gap-8">
        <ScoreDial label="Old Resume" value={oldScore} />
        <div className="pb-6 text-2xl text-white/20">→</div>
        <ScoreDial label="New Resume" value={newScore} highlight />
      </div>
    </div>
  );
}

function ScoreDial({ label, value, highlight }) {
  const color = colorFor(value);
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-24 w-24">
        <svg viewBox="0 0 80 80" className="h-24 w-24 -rotate-90">
          <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
          <motion.circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold" style={{ color: highlight ? color : "white" }}>
            {value}
          </span>
        </div>
      </div>
      <span className="text-xs muted">{label}</span>
    </div>
  );
}
