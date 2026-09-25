import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ScoreGauge from "../components/ScoreGauge.jsx";
import { ResultCard, PillList, BulletDiffList } from "../components/DiffCard.jsx";
import LoadingSkeleton from "../components/LoadingSkeleton.jsx";

const SECTION_LABELS = {
  contact: "Contact Info",
  summary: "Summary / Objective",
  skills: "Skills",
  experience: "Experience",
  projects: "Projects",
  education: "Education",
  certifications: "Certifications",
  achievements: "Achievements / Awards",
};

const SUGGESTION_STYLES = {
  positive: { color: "text-good", bg: "bg-good/10", border: "border-good/25", icon: "✓" },
  warning: { color: "text-bad", bg: "bg-bad/10", border: "border-bad/25", icon: "!" },
  tip: { color: "text-accent-400", bg: "bg-accent-500/10", border: "border-accent-500/25", icon: "→" },
};

export default function Results() {
  const [report, setReport] = useState(null);
  const [filenames, setFilenames] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = sessionStorage.getItem("resumediff-report");
    const names = sessionStorage.getItem("resumediff-filenames");
    if (!raw) {
      setNotFound(true);
      return;
    }
    setReport(JSON.parse(raw));
    if (names) setFilenames(JSON.parse(names));
  }, []);

  if (notFound) {
    return (
      <div className="mx-auto max-w-lg px-6 py-32 text-center">
        <h1 className="section-title">No report found</h1>
        <p className="mt-3 muted">Upload two resumes first to generate a comparison report.</p>
        <button onClick={() => navigate("/compare")} className="btn-primary mt-8 px-6 py-3">
          Go to Compare
        </button>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16">
        <LoadingSkeleton />
      </div>
    );
  }

  const readabilityDelta = report.readability.new.score - report.readability.old.score;
  const changedSections = Object.entries(report.sections.changes);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <span className="pill">Step 2 of 2 — Report</span>
        <h1 className="section-title mt-4">Here's what changed</h1>
        {filenames && (
          <p className="mt-2 text-sm muted">
            {filenames.old} <span className="text-white/20">→</span> {filenames.new}
          </p>
        )}
      </motion.div>

      <div className="grid grid-cols-1 gap-5">
        <ScoreGauge oldScore={report.ats.old} newScore={report.ats.new} />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <ResultCard title="Skills Added" icon="＋">
            <PillList items={report.skills.added} tone="good" emptyText="No new skills detected." />
          </ResultCard>
          <ResultCard title="Skills Removed" icon="－">
            <PillList items={report.skills.removed} tone="bad" emptyText="No skills were removed." />
          </ResultCard>
        </div>

        <ResultCard title="Keyword Analysis" icon="🔑">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-medium muted">New keywords found</p>
              <PillList items={report.keywords.added} tone="good" emptyText="No new keywords." />
            </div>
            <div>
              <p className="mb-2 text-xs font-medium muted">Missing / removed keywords</p>
              <PillList items={report.keywords.removed} tone="bad" emptyText="Nothing removed." />
            </div>
          </div>
        </ResultCard>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <ResultCard title="Experience Changes" icon="💼">
            <BulletDiffList added={report.experience.added} removed={report.experience.removed} />
          </ResultCard>
          <ResultCard title="Project Changes" icon="🛠️">
            <BulletDiffList added={report.projects.added} removed={report.projects.removed} />
          </ResultCard>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <ResultCard title="Readability" icon="📖">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs muted">Old resume</p>
                <p className="text-lg font-bold">{report.readability.old.score}</p>
                <p className="text-xs muted">{report.readability.old.label}</p>
              </div>
              <span className="text-white/20">→</span>
              <div className="text-right">
                <p className="text-xs muted">New resume</p>
                <p className={`text-lg font-bold ${readabilityDelta >= 0 ? "text-good" : "text-bad"}`}>
                  {report.readability.new.score}
                </p>
                <p className="text-xs muted">{report.readability.new.label}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-xs muted">
              <p>Avg words/sentence: <span className="text-white/80">{report.readability.new.avgWordsPerSentence}</span></p>
              <p>Action verbs: <span className="text-white/80">{report.stats.newActionVerbs}</span></p>
            </div>
          </ResultCard>

          <ResultCard title="Section Changes" icon="🗂️">
            {changedSections.length === 0 ? (
              <p className="text-xs muted">No sections were added or removed.</p>
            ) : (
              <ul className="space-y-2">
                {changedSections.map(([key, status]) => (
                  <li key={key} className="flex items-center justify-between text-sm">
                    <span className="text-white/80">{SECTION_LABELS[key] || key}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${status === "added" ? "bg-good/10 text-good" : "bg-bad/10 text-bad"}`}>
                      {status === "added" ? "Added" : "Removed"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </ResultCard>
        </div>

        <ResultCard title="Smart Suggestions" icon="✨">
          <div className="space-y-3">
            {report.suggestions.map((s, i) => {
              const style = SUGGESTION_STYLES[s.type] || SUGGESTION_STYLES.tip;
              return (
                <div
                  key={i}
                  className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${style.bg} ${style.border}`}
                >
                  <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${style.color}`}>
                    {style.icon}
                  </span>
                  <p className="text-white/80">{s.text}</p>
                </div>
              );
            })}
          </div>
        </ResultCard>
      </div>

      <div className="mt-10 flex justify-center gap-3">
        <button onClick={() => navigate("/compare")} className="btn-secondary px-6 py-3">
          Compare Another Version
        </button>
      </div>
    </div>
  );
}
