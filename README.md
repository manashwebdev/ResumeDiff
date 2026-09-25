# ResumeDiff — Frontend

React + Vite + Tailwind CSS + Framer Motion. Premium SaaS UI inspired by Linear / Stripe / Raycast / Vercel.

## Run locally

```bash
cd frontend
npm install
cp .env.example .env   # point VITE_API_URL at your backend
npm run dev             # http://localhost:5173
```

## Pages

- `/` — Landing page (hero, features, how it works, FAQ, CTA)
- `/compare` — Upload dashboard (two drag-and-drop zones)
- `/results` — Full comparison report (ATS score, skills, keywords, readability, sections, suggestions)

## Highlights

- Dark-mode-first design system with glassmorphism cards, animated score gauges and staggered fade-up transitions (Framer Motion)
- `⌘K` / `Ctrl+K` command palette for quick navigation
- Fully responsive, keyboard accessible
- Report data is passed from `/compare` to `/results` via `sessionStorage` — no backend session state needed

## Deploy (free)

**Vercel**
1. Import this repo, set root directory to `frontend`
2. Framework preset: Vite
3. Add env var `VITE_API_URL` = your deployed backend URL (e.g. Render)
4. Deploy
