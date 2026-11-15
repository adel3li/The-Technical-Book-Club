# The Technical Book Club

A community of developers reading and discussing essential software engineering books together, one chapter and one live discussion at a time.

This repository holds the club's website, in English and Arabic. It's built so the same content model and design system can carry over to the planned Android/iOS app and backend.

## Pages

| Path | What it shows |
| --- | --- |
| `/{en,ar}` | Home: what's being read, stats, how the club works, guest sessions, testimonials |
| `/{en,ar}/books` | Library with filters (all, reading now, finished) |
| `/{en,ar}/books/<slug>` | One book: cover, summary, session plan, study group, slides, guest sessions |
| `/{en,ar}/sessions` | Next session with Add to calendar, books in progress, how sessions run |
| `/{en,ar}/community` | Main WhatsApp community and each book's study group |
| `/{en,ar}/resources` | Recordings and slides |

A visitor who opens `/` or any path without a language is redirected to their saved language, or their browser's (Arabic → `/ar`, otherwise `/en`). Old links such as `/books` and `/groups` keep working.

## Editing content

All content lives in **`data/club.ts`**: books, progress, study groups, guest sessions, testimonials, stats and links. Edit that one file and every page, in both languages, updates.

- Text visitors read has both versions: `{ en: "…", ar: "…" }`. Book titles, people's names and roles, and testimonials stay as written.
- **Update reading progress**: change the book's `progress` (0–100).
- **Start a new book**: add it to `books` with `status: "reading"`, and mark the previous one `"finished"`.
- **Add a cover**: put the image in `public/image/` and set the book's `cover`. Without one, a coloured placeholder cover is generated.
- **Announce the next session**: set `nextSession` (start time, book, optional topic and meeting link). Home and Sessions then show it in each visitor's time zone, with Add to Google Calendar and `.ics` buttons, until it starts. Set it back to `null` afterwards.

Values such as "books finished" and "hours of discussion" are calculated in `lib/club.ts`, so they always match the book list. Interface text (buttons, headings) for both languages is in `lib/i18n.ts`.

## Design system

- **Tokens**: colours, shadows and fonts are CSS variables in `app/globals.css`, with light and dark sets. Pages use only these tokens, so the palette can change in one place, and mirror it in the mobile app.
- **Components**: `components/ui/` holds the building blocks (Button, Card, Badge, Progress, SessionTrack, BookCover, PageHeader). Feature components such as BookCard, ReadingCard and NextSession are built from them.
- **Right-to-left**: layouts use logical properties (`ms-`, `pe-`, `start-`, `text-start`), so Arabic mirrors automatically. Directional icons flip with `rtl:`.
- **Navigation**: a top bar on desktop and an app-style bottom tab bar on phones.
- **Fonts**: Inter for English and IBM Plex Sans Arabic for Arabic, loaded with `next/font`.

## Development

Requires Node.js 20 or newer.

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

```
app/[locale]/    pages (App Router), one folder per route
app/sitemap.ts   sitemap.xml with both languages
components/ui/   design-system building blocks
components/      feature components and layout (header, tab bar, footer)
data/club.ts     all site content
lib/             types, translations, calculated values, calendar helpers, metadata
middleware.ts    language detection and old-URL redirects
```

## Deployment

The site is deployed on [Vercel](https://vercel.com). Every push to `main` deploys to production, and every pull request gets a preview link. Pages are pre-rendered at build time.
