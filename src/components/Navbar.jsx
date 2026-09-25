import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";

export default function Navbar({ onOpenPalette }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-base-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500 shadow-glow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M11 17l3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 8h9l5 5v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
            </svg>
          </span>
          <span className="text-[15px] font-bold tracking-tight">ResumeDiff</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-white/60 md:flex">
          <a href="/#features" className="transition-colors hover:text-white">Features</a>
          <a href="/#how-it-works" className="transition-colors hover:text-white">How it works</a>
          <a href="/#faq" className="transition-colors hover:text-white">FAQ</a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPalette}
            className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/50 transition-colors hover:bg-white/[0.07] sm:flex"
          >
            Search
            <span className="kbd">⌘K</span>
          </button>
          <ThemeToggle />
          <button onClick={() => navigate("/compare")} className="btn-primary">
            Compare Resumes
          </button>
        </div>
      </div>
    </header>
  );
}
