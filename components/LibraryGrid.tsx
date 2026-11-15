"use client";

import { useState, type ReactNode } from "react";
import type { BookStatus, Locale } from "@/lib/types";
import { books } from "@/data/club";
import { getDictionary } from "@/lib/i18n";
import { cn } from "@/components/ui/cn";

type Filter = "all" | Exclude<BookStatus, "planned">;

/** Filter tabs over the book grid. Cards are rendered on the server and passed in by slug. */
export function LibraryGrid({ locale, cards }: { locale: Locale; cards: Record<string, ReactNode> }) {
  const dict = getDictionary(locale);
  const [filter, setFilter] = useState<Filter>("all");
  const filters: Filter[] = ["all", "reading", "finished"];
  const visible = books.filter((book) => filter === "all" || book.status === filter);
  const count = (f: Filter) => books.filter((book) => f === "all" || book.status === f).length;

  return (
    <>
      <div role="tablist" aria-label={dict.library.title} className="mb-8 inline-flex rounded-full border border-border bg-surface p-1 shadow-card">
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            type="button"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              filter === f ? "bg-text text-bg" : "text-muted hover:text-text"
            )}
          >
            {dict.library.filters[f]}
            <span className={cn("text-xs", filter === f ? "opacity-70" : "text-subtle")}>{count(f)}</span>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {visible.map((book) => (
          <div key={book.slug}>{cards[book.slug]}</div>
        ))}
      </div>
    </>
  );
}
