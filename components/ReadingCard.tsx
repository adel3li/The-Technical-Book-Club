import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import type { Book, Locale } from "@/lib/types";
import { formatNumber, formatPercent, getDictionary, href, t } from "@/lib/i18n";
import { BookCover } from "@/components/ui/BookCover";
import { Card } from "@/components/ui/Card";
import { SessionTrack } from "@/components/ui/Progress";
import { ButtonLink } from "@/components/ui/Button";
import { StatusBadge } from "@/components/StatusBadge";

/** Wide card for a book being read: cover, summary, session progress, actions. */
export function ReadingCard({ book, locale }: { book: Book; locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <Card className="flex flex-col gap-6 p-5 sm:flex-row sm:p-6">
      <Link href={href(`/books/${book.slug}`, locale)} className="self-center sm:self-start" tabIndex={-1} aria-hidden>
        <BookCover book={book} className="w-28 sm:w-32" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <StatusBadge status={book.status} locale={locale} className="self-start" />
        <h3 className="mt-3 text-lg font-semibold leading-snug text-text">
          <Link href={href(`/books/${book.slug}`, locale)} className="hover:underline hover:underline-offset-4">
            <bdi>{book.title}</bdi>
          </Link>
        </h3>
        {book.author && (
          <p className="mt-0.5 text-sm text-muted">
            <bdi>{book.author}</bdi>
          </p>
        )}
        <p className="mt-3 line-clamp-2 text-sm text-muted">{t(book.summary, locale)}</p>
        <div className="mt-5">
          <div className="mb-2 flex justify-between text-xs text-subtle">
            <span>{dict.common.sessions(formatNumber(book.sessions, locale))}</span>
            <span className="font-medium text-text">{formatPercent(book.progress, locale)}</span>
          </div>
          <SessionTrack sessions={book.sessions} progress={book.progress} label={`${dict.common.progress}: ${book.title}`} />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {book.group && (
            <ButtonLink href={book.group.link} size="sm">
              <MessageCircle className="size-4" aria-hidden />
              {dict.common.joinGroup}
            </ButtonLink>
          )}
          <ButtonLink href={href(`/books/${book.slug}`, locale)} variant="ghost" size="sm">
            {dict.common.viewBook}
            <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </Card>
  );
}
