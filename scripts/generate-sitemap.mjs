// Writes public/sitemap.xml from data/club.js. Runs automatically before
// every build (see "prebuild" in package.json), so new books are included.
import { writeFileSync } from "node:fs";
import { books, site } from "../data/club.js";

const paths = ["/", "/books", "/groups", "/resources", ...books.map((book) => `/books/${book.slug}`)];
const urls = paths
  .map((path) => `  <url><loc>${site.url}${path === "/" ? "" : path}</loc></url>`)
  .join("\n");

writeFileSync(
  new URL("../public/sitemap.xml", import.meta.url),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);
console.log(`sitemap.xml: ${paths.length} pages`);
