import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, MessageCircle, PlayCircle, Presentation } from "lucide-react";
import type { Locale } from "@/lib/types";
import { books } from "@/data/club";
import { getBook, guestSessionsFor } from "@/lib/club";
import { formatNumber, formatPercent, getDictionary, href, locales, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { BookCover } from "@/components/ui/BookCover";
import { ButtonLink } from "@/components/ui/Button";
import { SessionTrack } from "@/components/ui/Progress";
import { StatusBadge } from "@/components/StatusBadge";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((locale) => books.map((book) => ({ locale, slug: book.slug })));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const book = getBook(slug);
  if (!book) return {};
  return pageMetadata({ locale, path: `/books/${slug}`, title: book.title, description: t(book.summary, locale), image: book.cover });
}

export default async function BookPage({ params }: Props) {
  const { locale, slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();
  const dict = getDictionary(locale);
  const guests = guestSessionsFor(slug);
  const facts = [
    { label: dict.sessions.title, value: formatNumber(book.sessions, locale) },
    { label: dict.common.progress, value: `${formatPercent(book.progress, locale)}` },
    ...(book.group ? [{ label: dict.library.groupMembers, value: `${formatNumber(book.group.members, locale)}+` }] : []),
    ...(guests.length ? [{ label: dict.library.guestSessions, value: formatNumber(guests.length, locale) }] : []),
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden className="hero-glow absolute inset-0" />
        <Container className="relative py-8 sm:py-12">
          <Link href={href("/books", locale)} className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-text">
            <ChevronLeft className="size-4 rtl:rotate-180" aria-hidden />
            {dict.common.allBooks}
          </Link>
          <div className="mt-8 flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-12">
            <BookCover book={book} className="w-44 sm:w-56" priority />
            <div className="flex-1 text-center sm:text-start">
              <StatusBadge status={book.status} locale={locale} />
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                <bdi>{book.title}</bdi>
              </h1>
              {book.author && (
                <p className="mt-2 text-lg text-muted">
                  {dict.common.by("")}
                  <bdi>{book.author}</bdi>
                </p>
              )}
              <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-muted sm:mx-0">{t(book.summary, locale)}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-2 sm:justify-start">
                {book.group && (
                  <ButtonLink href={book.group.link} size="lg">
                    <MessageCircle className="size-4" aria-hidden />
                    {dict.common.joinGroup}
                  </ButtonLink>
                )}
                {book.slidesUrl && (
                  <ButtonLink href={book.slidesUrl} variant="secondary" size="lg">
                    <Presentation className="size-4" aria-hidden />
                    {dict.common.slides}
                  </ButtonLink>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="grid gap-4 py-10 sm:py-14 lg:grid-cols-3">
        <dl className="grid grid-cols-2 gap-4 lg:col-span-3 lg:grid-cols-4">
          {facts.map((fact) => (
            <Card key={fact.label} className="p-5">
              <dt className="text-sm text-muted">{fact.label}</dt>
              <dd className="mt-1 text-2xl font-semibold text-text">{fact.value}</dd>
            </Card>
          ))}
        </dl>

        <Card className="p-6 lg:col-span-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-semibold text-text">{dict.library.sessionPlan}</h2>
            <span className="text-sm text-muted">{dict.library.sessionPlanBody(formatNumber(book.sessions, locale))}</span>
          </div>
          <div className="mt-5">
            <SessionTrack sessions={book.sessions} progress={book.progress} label={`${dict.common.progress}: ${book.title}`} />
          </div>
          {book.group && <p className="mt-5 text-sm text-muted">{t(book.group.description, locale)}</p>}
        </Card>

        {guests.length > 0 && (
          <section className="lg:col-span-3">
            <h2 className="mb-4 mt-6 text-xl font-semibold text-text">{dict.library.guestSessions}</h2>
            <div className="grid gap-4">
              {guests.map((session) => (
                <Card key={session.id} className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
                  <Image src={session.photo} alt={session.guest} width={80} height={80} className="size-16 rounded-2xl object-cover" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-text">
                      <bdi>{session.guest}</bdi>
                    </h3>
                    <p className="text-sm text-muted">
                      <bdi>{session.role}</bdi>
                    </p>
                    <p className="mt-2 text-sm text-muted">{t(session.description, locale)}</p>
                  </div>
                  {session.recordingUrl && (
                    <ButtonLink href={session.recordingUrl} variant="secondary" className="self-start sm:self-center">
                      <PlayCircle className="size-4" aria-hidden />
                      {dict.common.watchRecording}
                    </ButtonLink>
                  )}
                </Card>
              ))}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
