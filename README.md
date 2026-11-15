# The Technical Book Club

A community of developers who read and discuss essential software engineering books together, one chapter per session.

This repository holds the club's website: the reading roadmap, community groups, session recordings, and study materials.

## Books

| Book | Status |
| --- | --- |
| The Pragmatic Programmer | Finished (14 sessions + 1 special session) |
| The Art of Clean Code | Finished (5 sessions) |
| Alice and Bob Learn Application Security | Currently reading |
| Automate the Boring Stuff with Python | Currently reading |

## How to join

Fill in the [registration form](https://forms.gle/9u41zzdHQpmXJhKF6). You'll get an invite to the community WhatsApp group, where sessions are announced.

## Development

Requires Node.js 20 or newer.

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # static export to ./out
```

### Project layout

```
pages/           one file per route (index, books, books/[slug], groups, resources)
components/      shared UI (Navbar, Counter, GroupCard)
data/club.js     all site content
lib/club.js      values calculated from the content
scripts/         build-time helpers (sitemap)
styles/          global CSS and Tailwind setup
public/image/    photos and book covers
```

## Editing content

All site content lives in **`data/club.js`**: books, reading progress, WhatsApp groups, guest sessions, testimonials, stats and links. Edit that one file and every page updates.

Some numbers are calculated, so they always match the book list (see `lib/club.js`):

- **Books Covered**: the number of books with `status: "finished"`
- **Hours Discussed**: `totalSessions × hoursPerSession`
- **Study groups**: built from each book's `group`, with status and progress taken from the book
- **Special sessions** on the Books page: counted from `specialSessions`

Common edits:

- **Update reading progress**: change the book's `progress` (0–100).
- **Start a new book**: add it to `books` with `status: "reading"`, set `currentBookSlug` to its `slug`, and mark the previous book `"finished"`.
- **Add a book cover**: put the image in `public/image/` and set the book's `cover` to its path, e.g. `"/image/automate-python.png"`.
- **Announce the next session**: set `nextSession` (start time, book, optional topic and meeting link). The home page then shows a "Next session" card with **Add to Google Calendar** and **.ics** buttons, in each visitor's own time zone. It hides itself once the session starts. Set it back to `null` when nothing is scheduled.

Every book gets its own page at `/books/<slug>`, showing progress, its study group, slides and guest sessions with recordings.

## Link previews and search

- Every page has a title, description and Open Graph/X tags, so links shared on WhatsApp, LinkedIn or X show a proper preview. Book pages use the book's cover; other pages use `public/og.png`.
- `public/sitemap.xml` is generated from `data/club.js` before every build (`scripts/generate-sitemap.mjs`), and `public/robots.txt` points to it.
- The site's public URL is `site.url` in `data/club.js`. Change it there if you add a custom domain.

## Deployment

The site is deployed on [Vercel](https://vercel.com). Every push to `main` deploys to production, and every pull request gets a preview link.

## Built with

[Next.js](https://nextjs.org) (Pages Router) and [Tailwind CSS](https://tailwindcss.com).
