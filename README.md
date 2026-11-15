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
pages/           one file per route (index, books, groups, resources)
components/      shared UI (Navbar, Counter, GroupCard)
styles/          global CSS and Tailwind setup
public/image/    photos and book covers
```

Site content (books, sessions, testimonials, stats, group links) currently lives at the top of each page file in `pages/`.

### Adding a book cover

Put the image in `public/image/` and set `coverImage` in `pages/index.js` to its path, e.g. `"/image/automate-python.png"`. While it's `null`, a styled placeholder is shown.

## Deployment

The site is a static export (`output: 'export'` in `next.config.mjs`). Netlify builds it with `npm run build` and serves `./out`; see `netlify.toml`.

## Built with

[Next.js](https://nextjs.org) (Pages Router) and [Tailwind CSS](https://tailwindcss.com).
