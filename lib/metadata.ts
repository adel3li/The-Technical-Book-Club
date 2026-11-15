import type { Metadata } from "next";
import { site } from "@/data/club";
import type { Locale } from "./types";
import { getDictionary, href, locales } from "./i18n";

/** Title, description, canonical/hreflang links and link-preview tags for a page. */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
}: {
  locale: Locale;
  path: string;
  title?: string;
  description?: string;
  image?: string;
}): Metadata {
  const desc = description ?? getDictionary(locale).meta.description;
  const fullTitle = title ? `${title} · ${site.name}` : site.name;
  const url = href(path, locale);
  const images = [image ?? "/og.png"];
  return {
    title: fullTitle,
    description: desc,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [l, href(path, l)])),
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: fullTitle,
      description: desc,
      url,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      images,
    },
    twitter: { card: image ? "summary" : "summary_large_image", title: fullTitle, description: desc, images },
  };
}
