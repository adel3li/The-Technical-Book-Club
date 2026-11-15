import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, MessagesSquare, PlayCircle, Quote, Users } from "lucide-react";
import type { Locale } from "@/lib/types";
import { guestSessions, site, testimonials } from "@/data/club";
import { clubStats, getBook, readingBooks } from "@/lib/club";
import { formatNumber, formatPercent, getDictionary, href, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Container, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BookCover } from "@/components/ui/BookCover";
import { Progress } from "@/components/ui/Progress";
import { ReadingCard } from "@/components/ReadingCard";
import { NextSession } from "@/components/NextSession";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata({ locale, path: "/" });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const [featured] = readingBooks;
  const stepIcons = [Users, BookOpenCheck, MessagesSquare];
  const stats = [
    { value: clubStats.sessions, label: dict.home.stats.sessions, plus: true },
    { value: clubStats.hours, label: dict.home.stats.hours, plus: true },
    { value: clubStats.finished, label: dict.home.stats.finished },
    { value: clubStats.members, label: dict.home.stats.members, plus: true },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden className="hero-glow absolute inset-0" />
        <div aria-hidden className="dot-grid absolute inset-0 opacity-70" />
        <Container className="relative grid grid-cols-1 items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="min-w-0 animate-rise">
            {featured && (
              <Link
                href={href(`/books/${featured.slug}`, locale)}
                className="inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-surface py-1 ps-1 pe-3 text-sm shadow-card transition-colors hover:border-border-strong"
              >
                <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-text">{dict.home.eyebrow}</span>
                <span className="truncate text-muted">
                  <bdi>{featured.title}</bdi>
                </span>
                <ArrowRight className="size-3.5 shrink-0 text-subtle rtl:rotate-180" aria-hidden />
              </Link>
            )}
            <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-text sm:text-5xl lg:text-6xl">
              {dict.home.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted">{dict.home.subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={site.joinForm} size="lg">
                {dict.home.primaryCta}
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
              </ButtonLink>
              <ButtonLink href={href("/books", locale)} variant="secondary" size="lg">
                {dict.home.secondaryCta}
              </ButtonLink>
            </div>
          </div>

          {/* Product-style preview of what's being read */}
          <div className="relative mx-auto w-full min-w-0 max-w-md animate-rise [animation-delay:120ms] lg:max-w-none" aria-hidden>
            <div className="absolute -inset-6 rounded-[2rem] bg-accent-soft blur-2xl" />
            <Card className="relative p-5 shadow-card-lg">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-text">{dict.home.readingTitle}</span>
                <span className="flex gap-1">
                  <span className="size-2 rounded-full bg-border-strong" />
                  <span className="size-2 rounded-full bg-border-strong" />
                  <span className="size-2 rounded-full bg-border-strong" />
                </span>
              </div>
              <div className="space-y-3">
                {readingBooks.map((book) => (
                  <div key={book.slug} className="flex items-center gap-4 rounded-xl border border-border bg-bg p-3">
                    <BookCover book={book} className="w-12" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium leading-snug text-text">
                        <bdi>{book.title}</bdi>
                      </div>
                      <div className="mt-0.5 text-xs text-subtle">
                        <bdi>{book.author}</bdi>
                      </div>
                      <div className="mt-2.5 flex items-center gap-3">
                        <Progress value={book.progress} label={book.title} />
                        <span className="text-xs font-medium text-muted">{formatPercent(book.progress, locale)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-surface-2 px-4 py-3 text-sm">
                <span className="text-muted">{dict.home.stats.members}</span>
                <span className="font-semibold text-text">{formatNumber(clubStats.members, locale)}+</span>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-surface">
        <Container className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-2 py-8 text-center sm:py-10 ${i % 2 === 0 ? "border-e border-border" : ""} ${i < 2 ? "border-b border-border lg:border-b-0" : ""} ${i === 1 ? "lg:border-e" : ""}`}
            >
              <div className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                {formatNumber(stat.value, locale)}
                {stat.plus && <span className="text-accent">+</span>}
              </div>
              <div className="mt-1 text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </Container>
      </section>

      {/* Reading now + next session */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            title={dict.home.readingTitle}
            subtitle={dict.home.readingSubtitle}
            action={
              <ButtonLink href={href("/books", locale)} variant="ghost" size="sm">
                {dict.common.allBooks}
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
              </ButtonLink>
            }
          />
          <div className="grid gap-4 lg:grid-cols-2">
            {readingBooks.map((book) => (
              <ReadingCard key={book.slug} book={book} locale={locale} />
            ))}
          </div>
          <div className="mt-4">
            <NextSession locale={locale} />
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="border-y border-border bg-surface py-16 sm:py-24">
        <Container>
          <SectionHeading title={dict.home.howTitle} subtitle={dict.home.howSubtitle} />
          <ol className="grid gap-4 md:grid-cols-3">
            {dict.home.steps.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <li key={step.title} className="relative rounded-2xl border border-border bg-bg p-6">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent-text">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="text-sm font-semibold text-subtle">{formatNumber(i + 1, locale).padStart(2, locale === "ar" ? "٠" : "0")}</span>
                  </div>
                  <h3 className="mt-5 font-semibold text-text">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* Guest sessions */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading title={dict.home.guestTitle} subtitle={dict.home.guestSubtitle} />
          <div className="grid gap-4">
            {guestSessions.map((session) => {
              const book = getBook(session.book);
              return (
                <Card key={session.id} className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
                  <Image src={session.photo} alt={session.guest} width={96} height={96} className="size-20 rounded-2xl object-cover sm:size-24" />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-text">
                      <bdi>{session.guest}</bdi>
                    </h3>
                    <p className="text-sm text-muted">
                      <bdi>{session.role}</bdi>
                    </p>
                    <p className="mt-3 text-muted">{t(session.description, locale)}</p>
                    {book && (
                      <Link href={href(`/books/${book.slug}`, locale)} className="mt-2 inline-block text-sm font-medium text-accent-text hover:underline">
                        <bdi>{book.title}</bdi>
                      </Link>
                    )}
                  </div>
                  {session.recordingUrl && (
                    <ButtonLink href={session.recordingUrl} variant="secondary" className="self-start sm:self-center">
                      <PlayCircle className="size-4" aria-hidden />
                      {dict.common.watchRecording}
                    </ButtonLink>
                  )}
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border bg-surface py-16 sm:py-24">
        <Container>
          <SectionHeading title={dict.home.testimonialsTitle} />
          <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
            {testimonials.map((item) => (
              <figure key={item.name} className="mb-4 break-inside-avoid rounded-2xl border border-border bg-bg p-6">
                <Quote className="size-5 text-accent rtl:-scale-x-100" aria-hidden />
                <blockquote dir="auto" className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-text">
                  {item.text}
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent-text" aria-hidden>
                    {item.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-text">
                      <bdi>{item.name}</bdi>
                    </span>
                    <span className="block text-xs text-muted">
                      <bdi>{item.role}</bdi>
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* Call to action */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-accent px-6 py-12 text-center text-accent-fg sm:px-12 sm:py-16">
            <div aria-hidden className="absolute -top-24 start-1/2 size-72 -translate-x-1/2 rounded-full bg-white/15 blur-3xl rtl:translate-x-1/2" />
            <h2 className="relative text-3xl font-semibold tracking-tight sm:text-4xl">{dict.home.ctaTitle}</h2>
            <p className="relative mx-auto mt-3 max-w-xl opacity-85">{dict.home.ctaBody}</p>
            <a
              href={site.joinForm}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 font-medium text-[#121217] shadow-card-lg transition-transform hover:-translate-y-0.5"
            >
              {dict.home.primaryCta}
              <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
