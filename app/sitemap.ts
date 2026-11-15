import type { MetadataRoute } from "next";
import { books, site } from "@/data/club";
import { href, locales } from "@/lib/i18n";

// Every page in both languages, with hreflang alternates. New books are added automatically.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/books", "/sessions", "/community", "/resources", ...books.map((b) => `/books/${b.slug}`)];
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${site.url}${href(path, locale)}`,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${site.url}${href(path, l)}`])) },
    }))
  );
}
