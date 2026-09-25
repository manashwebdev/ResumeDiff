export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-white/40 sm:flex-row">
        <p>© {new Date().getFullYear()} ResumeDiff. Built for job seekers who iterate.</p>
        <p className="flex items-center gap-1">
          See exactly what changed in your resume
          <span className="text-accent-400">→</span>
        </p>
      </div>
    </footer>
  );
}
