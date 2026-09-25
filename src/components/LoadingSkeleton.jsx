export function CardSkeleton() {
  return (
    <div className="glass-card h-40 animate-pulse rounded-2xl p-6">
      <div className="mb-4 h-4 w-1/3 rounded bg-white/10" />
      <div className="mb-2 h-3 w-full rounded bg-white/5" />
      <div className="mb-2 h-3 w-5/6 rounded bg-white/5" />
      <div className="h-3 w-2/3 rounded bg-white/5" />
    </div>
  );
}

export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
