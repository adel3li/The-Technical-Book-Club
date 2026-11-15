import type { Locale } from "@/lib/types";
import { books } from "@/data/club";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Container, PageHeader } from "@/components/ui/Section";
import { BookCard } from "@/components/BookCard";
import { LibraryGrid } from "@/components/LibraryGrid";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return pageMetadata({ locale, path: "/books", title: dict.library.title, description: dict.library.subtitle });
}

export default async function LibraryPage({ params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const cards = Object.fromEntries(books.map((book) => [book.slug, <BookCard key={book.slug} book={book} locale={locale} />]));
  return (
    <>
      <PageHeader title={dict.library.title} subtitle={dict.library.subtitle} />
      <Container className="py-10 sm:py-14">
        <LibraryGrid locale={locale} cards={cards} />
      </Container>
    </>
  );
}
