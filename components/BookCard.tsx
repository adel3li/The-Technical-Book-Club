import Link from "next/link";
import type { Book, Locale } from "@/lib/types";
import { formatNumber, formatPercent, getDictionary, href } from "@/lib/i18n";
import { BookCover } from "@/components/ui/BookCover";
import { StatusBadge } from "@/components/StatusBadge";
import { Progress } from "@/components/ui/Progress";

/** Library grid card. The whole card links to the book page. */
export function BookCard({ book, locale }: { book: Book; locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <Link
      href={href(`/books/${book.slug}`, locale)}
      className="group flex flex-col rounded-2xl border border-border bg-surface p-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-card-lg"
    >
      <div className="flex items-center justify-center rounded-xl bg-surface-2 px-8 py-7">
        <BookCover book={book} className="w-full max-w-[150px] transition-transform duration-300 group-hover:scale-[1.03]" />
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <StatusBadge status={book.status} locale={locale} className="self-start" />
        <h3 className="mt-3 font-semibold leading-snug text-text">
          <bdi>{book.title}</bdi>
        </h3>
        {book.author && (
          <p className="mt-1 text-sm text-muted">
            <bdi>{book.author}</bdi>
          </p>
        )}
        <div className="mt-auto pt-5">
          <div className="mb-2 flex justify-between text-xs text-subtle">
            <span>{dict.common.sessions(formatNumber(book.sessions, locale))}</span>
            <span>{formatPercent(book.progress, locale)}</span>
          </div>
          <Progress value={book.progress} label={`${dict.common.progress}: ${book.title}`} />
        </div>
      </div>
    </Link>
  );
}
