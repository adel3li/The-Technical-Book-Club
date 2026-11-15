import Image from "next/image";
import type { Book } from "@/lib/types";
import { cn } from "./cn";

// Placeholder covers get a stable colour picked from the title.
const palettes = [
  "from-indigo-500 to-violet-600",
  "from-sky-500 to-indigo-600",
  "from-emerald-500 to-teal-700",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-700",
];

function paletteFor(title: string) {
  let hash = 0;
  for (const char of title) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return palettes[hash % palettes.length];
}

export function BookCover({ book, className, priority }: { book: Book; className?: string; priority?: boolean }) {
  return (
    <div className={cn("@container relative aspect-[3/4] shrink-0 overflow-hidden rounded-lg shadow-card-lg ring-1 ring-black/5", className)}>
      {book.cover ? (
        <Image src={book.cover} alt={book.title} fill sizes="(max-width: 640px) 50vw, 240px" className="object-cover" priority={priority} />
      ) : (
        <div dir="ltr" className={cn("flex h-full flex-col justify-between bg-gradient-to-br p-[10%] text-white", paletteFor(book.title))}>
          <div className="h-0.5 w-1/4 rounded-full bg-white/60" />
          {/* Text only on covers big enough to read it; thumbnails show the colour alone */}
          <div className="hidden @min-[72px]:block">
            <div className="text-[clamp(0.55rem,10cqw,1.25rem)] font-semibold leading-tight">{book.title}</div>
            {book.author && <div className="mt-[6%] text-[clamp(0.5rem,6.5cqw,0.85rem)] text-white/75">{book.author}</div>}
          </div>
        </div>
      )}
      {/* spine highlight */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 start-0 w-[6%] bg-gradient-to-r from-black/15 to-transparent rtl:bg-gradient-to-l" />
    </div>
  );
}
