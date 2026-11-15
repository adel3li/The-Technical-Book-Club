import { Clock, Layers, Presentation, Wifi } from "lucide-react";
import type { Locale } from "@/lib/types";
import { readingBooks } from "@/lib/club";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Container, PageHeader, SectionHeading } from "@/components/ui/Section";
import { NextSession } from "@/components/NextSession";
import { ReadingCard } from "@/components/ReadingCard";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return pageMetadata({ locale, path: "/sessions", title: dict.sessions.title, description: dict.sessions.subtitle });
}

export default async function SessionsPage({ params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const formatIcons = [Wifi, Clock, Layers, Presentation];
  return (
    <>
      <PageHeader title={dict.sessions.title} subtitle={dict.sessions.subtitle} />
      <Container className="space-y-16 py-10 sm:py-14">
        <NextSession locale={locale} />

        <section>
          <SectionHeading title={dict.sessions.activeTitle} />
          <div className="grid gap-4 lg:grid-cols-2">
            {readingBooks.map((book) => (
              <ReadingCard key={book.slug} book={book} locale={locale} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeading title={dict.sessions.formatTitle} />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dict.sessions.format.map((item, i) => {
              const Icon = formatIcons[i];
              return (
                <li key={item.title} className="rounded-2xl border border-border bg-surface p-6 shadow-card">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent-text">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-semibold text-text">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{item.body}</p>
                </li>
              );
            })}
          </ul>
        </section>
      </Container>
    </>
  );
}
