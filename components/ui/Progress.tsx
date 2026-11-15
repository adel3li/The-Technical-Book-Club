import { cn } from "./cn";

export function Progress({ value, label, className }: { value: number; label: string; className?: string }) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-surface-2", className)}
    >
      <div className="h-full rounded-full bg-accent transition-[width] duration-700" style={{ width: `${value}%` }} />
    </div>
  );
}

/** One segment per planned session; segments fill up to the book's progress. */
export function SessionTrack({ sessions, progress, label }: { sessions: number; progress: number; label: string }) {
  const filled = (progress / 100) * sessions;
  return (
    <div role="progressbar" aria-label={label} aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} className="flex gap-1">
      {Array.from({ length: sessions }, (_, i) => {
        const amount = Math.max(0, Math.min(1, filled - i));
        return (
          <div key={i} className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
            <div className="h-full rounded-full bg-accent" style={{ width: `${amount * 100}%` }} />
          </div>
        );
      })}
    </div>
  );
}
