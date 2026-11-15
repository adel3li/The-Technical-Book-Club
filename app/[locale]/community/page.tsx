import Link from "next/link";
import { MessageCircle, Users } from "lucide-react";
import type { Locale } from "@/lib/types";
import { books, community } from "@/data/club";
import { formatNumber, formatPercent, getDictionary, href, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Container, PageHeader, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BookCover } from "@/components/ui/BookCover";
import { Progress } from "@/components/ui/Progress";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return pageMetadata({ locale, path: "/community", title: dict.community.title, description: dict.community.subtitle });
}

export default async function CommunityPage({ params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  // Active groups first, then finished books (newest first)
  const groups = [...books].reverse().filter((book) => book.group).sort((a, b) => Number(b.status === "reading") - Number(a.status === "reading"));

  return (
    <>
      <PageHeader title={dict.community.title} subtitle={dict.community.subtitle} />
      <Container className="space-y-16 py-10 sm:py-14">
        <Card className="relative overflow-hidden p-6 sm:p-10">
          <div aria-hidden className="absolute -end-20 -top-20 size-64 rounded-full bg-accent-soft blur-3xl" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-5">
              <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-fg shadow-card">
                <Users className="size-7" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-medium text-accent-text">{dict.community.mainLabel}</p>
                <h2 className="mt-1 text-xl font-semibold text-text sm:text-2xl">{t(community.name, locale)}</h2>
                <p className="mt-2 max-w-xl text-muted">{t(community.description, locale)}</p>
                <p className="mt-3 text-sm text-subtle">{dict.common.members(formatNumber(community.members, locale))}</p>
              </div>
            </div>
            <ButtonLink href={community.link} size="lg" className="self-start sm:self-center">
              <MessageCircle className="size-4" aria-hidden />
              {dict.common.joinWhatsApp}
            </ButtonLink>
          </div>
        </Card>

        <section>
          <SectionHeading title={dict.community.groupsTitle} />
          <div className="grid gap-4 md:grid-cols-2">
            {groups.map((book) => (
              <Card key={book.slug} className="flex gap-5 p-5">
                <Link href={href(`/books/${book.slug}`, locale)} tabIndex={-1} aria-hidden>
                  <BookCover book={book} className="w-16" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold leading-snug text-text">
                      <Link href={href(`/books/${book.slug}`, locale)} className="hover:underline hover:underline-offset-4">
                        <bdi>{book.title}</bdi>
                      </Link>
                    </h3>
                    <Badge tone={book.status === "reading" ? "success" : "info"} dot className="shrink-0">
                      {book.status === "reading" ? dict.community.active : dict.community.completed}
                    </Badge>
                  </div>
                  <p className="mt-1.5 text-sm text-muted">{t(book.group!.description, locale)}</p>
                  <div className="mt-4 flex items-center gap-3 text-xs text-subtle">
                    <span className="shrink-0">{dict.common.members(formatNumber(book.group!.members, locale))}</span>
                    <Progress value={book.progress} label={`${dict.common.progress}: ${book.title}`} className="max-w-24" />
                    <span className="shrink-0">{formatPercent(book.progress, locale)}</span>
                  </div>
                  <ButtonLink href={book.group!.link} variant="secondary" size="sm" className="mt-4 self-start">
                    <MessageCircle className="size-4" aria-hidden />
                    {dict.common.joinWhatsApp}
                  </ButtonLink>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
