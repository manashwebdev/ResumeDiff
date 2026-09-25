import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const FEATURES = [
  {
    title: "Skills Added & Removed",
    desc: "Instantly see every technical and soft skill you added or dropped between versions.",
    icon: "🧩",
  },
  {
    title: "ATS Score Comparison",
    desc: "A transparent, explainable ATS compatibility score for both versions — with reasons, not black-box magic.",
    icon: "🎯",
  },
  {
    title: "Keyword Intelligence",
    desc: "Detect the recruiter keywords that disappeared and the ones you gained.",
    icon: "🔑",
  },
  {
    title: "Readability Analysis",
    desc: "Sentence length, clarity and action-verb usage compared side by side.",
    icon: "📖",
  },
  {
    title: "Section-by-Section Diff",
    desc: "Know exactly which sections — experience, projects, education — actually changed.",
    icon: "🗂️",
  },
  {
    title: "Smart Suggestions",
    desc: "Actionable, specific recommendations based on what your revision actually did.",
    icon: "✨",
  },
];

const STEPS = [
  { title: "Upload two versions", desc: "Drop in your old resume and your new resume — PDF, DOCX or TXT." },
  { title: "We parse & analyze", desc: "ResumeDiff extracts the text and runs it through recruiter-grade heuristics." },
  { title: "Get your report", desc: "A full breakdown of what changed, what improved, and what to fix next." },
];

const FAQS = [
  {
    q: "Do you store my resume?",
    a: "No. Files are processed in memory for the single comparison request and are never written to disk or a database.",
  },
  {
    q: "What file types are supported?",
    a: "PDF, DOCX and TXT. Scanned/image-based PDFs without a text layer can't be parsed.",
  },
  {
    q: "Is the ATS score the same as real ATS software?",
    a: "It's a transparent heuristic model (keyword density, section completeness, action verbs, quantified results, length) designed to mirror what most ATS parsers and recruiters actually screen for — not a guarantee of any specific vendor's score.",
  },
  {
    q: "Is ResumeDiff free?",
    a: "Yes — it runs entirely on deterministic analysis with no paid AI API required, so the whole tool is free to run and self-host.",
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-24 pt-20 sm:pt-28">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-accent-500/20 blur-[120px]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pill mx-auto mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-good" />
            Resume Version Intelligence
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl"
          >
            See exactly what changed
            <br />
            <span className="bg-gradient-to-r from-accent-400 to-good bg-clip-text text-transparent">
              in your resume.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-xl text-lg text-white/55"
          >
            Upload two versions of your resume. ResumeDiff tells you what improved,
            what got worse, and exactly what a recruiter, and an ATS, will notice.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <button onClick={() => navigate("/compare")} className="btn-primary px-6 py-3 text-base">
              Compare Your Resumes
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a href="#how-it-works" className="btn-secondary px-6 py-3 text-base">
              See how it works
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-5 text-xs muted"
          >
            No sign-up · Free forever · Files never stored
          </motion.p>
        </div>

        {/* preview card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="glass-card relative mx-auto mt-16 max-w-4xl rounded-2xl p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <p className="text-xs muted">ATS Score</p>
              <p className="mt-1 text-2xl font-bold">
                72 <span className="text-white/20">→</span> <span className="text-good">86</span>
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <p className="text-xs muted">Skills Added</p>
              <p className="mt-2 flex flex-wrap gap-1.5">
                {["React", "Docker", "AWS"].map((s) => (
                  <span key={s} className="rounded-full border border-good/30 bg-good/10 px-2 py-0.5 text-[11px] text-good">+ {s}</span>
                ))}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <p className="text-xs muted">Keywords Missing</p>
              <p className="mt-2 flex flex-wrap gap-1.5">
                {["jQuery", "Bootstrap"].map((s) => (
                  <span key={s} className="rounded-full border border-bad/30 bg-bad/10 px-2 py-0.5 text-[11px] text-bad">− {s}</span>
                ))}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-title">Everything a resume rewrite needs to prove</h2>
          <p className="mt-3 muted">Not another resume builder. A diff engine for your career document.</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-1"
            >
              <span className="text-2xl">{f.icon}</span>
              <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm muted">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="mx-auto max-w-5xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-title">How it works</h2>
          <p className="mt-3 muted">Three steps. No account required.</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-6"
            >
              <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500/20 text-sm font-bold text-accent-400">
                {i + 1}
              </span>
              <h3 className="text-base font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm muted">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-title">Frequently asked questions</h2>
        </div>
        <div className="mt-10 space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="group glass-card rounded-xl px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
                {f.q}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-white/40 transition-transform group-open:rotate-45"
                >
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </summary>
              <p className="mt-3 text-sm muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="glass-card mx-auto max-w-4xl rounded-3xl p-10 text-center sm:p-16">
          <h2 className="section-title">Ready to see what changed?</h2>
          <p className="mx-auto mt-3 max-w-md muted">
            Upload your last two resume versions and get a full report in seconds.
          </p>
          <button onClick={() => navigate("/compare")} className="btn-primary mt-8 px-7 py-3 text-base">
            Compare Resumes Now
          </button>
        </div>
      </section>
    </div>
  );
}
