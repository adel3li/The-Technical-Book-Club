import Image from "next/image";
import Link from "next/link";
import { ExternalLink, PlayCircle } from "lucide-react";
import type { Locale } from "@/lib/types";
import { books } from "@/data/club";
import { getBook, recordings } from "@/lib/club";
import { getDictionary, href, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Container, PageHeader, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { BookCover } from "@/components/ui/BookCover";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return pageMetadata({ locale, path: "/resources", title: dict.resources.title, description: dict.resources.subtitle });
}

export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const withSlides = books.filter((book) => book.slidesUrl);

  return (
    <>
      <PageHeader title={dict.resources.title} subtitle={dict.resources.subtitle} />
      <Container className="space-y-16 py-10 sm:py-14">
        <section>
          <SectionHeading title={dict.resources.recordings} />
          <div className="grid gap-4 md:grid-cols-2">
            {recordings.map((session) => {
              const book = getBook(session.book);
              return (
                <a
                  key={session.id}
                  href={session.recordingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 rounded-2xl border border-border bg-surface p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-border-strong hover:shadow-card-lg"
                >
                  <div className="relative shrink-0">
                    <Image src={session.photo} alt="" width={80} height={80} className="size-20 rounded-xl object-cover" />
                    <span className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/35 text-white opacity-90 transition-opacity group-hover:opacity-100">
                      <PlayCircle className="size-8" aria-hidden />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-accent-text">{book && <bdi>{book.title}</bdi>}</p>
                    <h3 className="mt-1 font-semibold text-text">
                      <bdi>{session.guest}</bdi>
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted">{t(session.description, locale)}</p>
                  </div>
                  <ExternalLink className="size-4 shrink-0 text-subtle" aria-label={dict.common.watchRecording} />
                </a>
              );
            })}
          </div>
        </section>

        <section>
          <SectionHeading title={dict.resources.slides} subtitle={dict.resources.slidesBody} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {withSlides.map((book) => (
              <Card key={book.slug} className="flex items-center gap-4 p-4">
                <Link href={href(`/books/${book.slug}`, locale)} tabIndex={-1} aria-hidden>
                  <BookCover book={book} className="w-14" />
                </Link>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold leading-snug text-text">
                    <bdi>{book.title}</bdi>
                  </h3>
                  <a
                    href={book.slidesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-accent-text hover:underline"
                  >
                    {dict.resources.openDrive}
                    <ExternalLink className="size-3.5" aria-hidden />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
