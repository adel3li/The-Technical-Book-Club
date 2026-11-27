# Project Overview: The Technical Book Club

_Last updated: 2026-11-27. Written as the hand-off document for anyone joining the project._

## 1. What the project is

**The Technical Book Club (TTBC)** is a community of developers who read essential software-engineering books together, one chapter and one live discussion at a time. Members coordinate through WhatsApp (a main community of ~150 people, plus one study group per book), and sessions are run online.

This repository is the club's **public website**. Its goals:

- Show what the club is reading now, what it has finished, and how to join.
- Give each book a page (summary, session plan, study group link, slides, guest sessions).
- Announce the next session in each visitor's time zone, with "Add to calendar" buttons.
- Serve both **English and Arabic** audiences (full right-to-left support).
- Act as the content model and design system for a **planned Android/iOS app and backend** (not started).

Books so far (from `data/club.ts`):

| Book | Author | Status |
| --- | --- | --- |
| The Pragmatic Programmer | David Thomas & Andrew Hunt | Finished (14 sessions, guest session with Mohamed Elsherif) |
| The Art of Clean Code | Christian Mayer | Finished (5 sessions) |
| Alice and Bob Learn Application Security | Tanya Janca | Reading, 70% |
| Automate the Boring Stuff with Python | Al Sweigart | Reading, 10% |

## 2. Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 15.5 (App Router), React 19.1 |
| Language | TypeScript 5.9 (strict) |
| Styling | Tailwind CSS v4 (via `@tailwindcss/postcss`) + CSS-variable design tokens in `app/globals.css` |
| Icons | `lucide-react` |
| Fonts | Inter (English), IBM Plex Sans Arabic (Arabic), via `next/font` |
| Lint | ESLint 9 flat config (`eslint.config.mjs`, `next/core-web-vitals` + `next/typescript`) |
| Hosting | Vercel (production = `main`, preview per PR) |
| Data | Static TypeScript file (`data/club.ts`); no database, no API, no auth |

**Environment variables:** none. The code reads no `process.env` values, and no `.env` file is needed. The site URL is hard-coded in `data/club.ts` (`site.url`).

## 3. Run, build, deploy

Requires Node.js 20+.

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # this is exactly what Vercel runs
npm run start   # serve the production build
```

**Deploy:** push/merge to `main` and Vercel deploys to production automatically. Every PR gets a Vercel preview link. All pages are pre-rendered at build time (23 pages).

**Gotcha:** always test with `npm run build`, not `next build` directly. npm runs `pre*` scripts only through `npm run`, and a stale `prebuild` script broke production once (see PR #6).

## 4. Structure

```
app/
  [locale]/                 every page lives under /en or /ar
    layout.tsx              html lang/dir, fonts, header, footer, mobile tab bar
    page.tsx                Home
    books/page.tsx          Library (filters: all / reading / finished)
    books/[slug]/page.tsx   One book
    sessions/page.tsx       Next session + books in progress
    community/page.tsx      WhatsApp community + study groups
    resources/page.tsx      Recordings and slides
    not-found.tsx
  globals.css               design tokens (light + dark), Tailwind import
  sitemap.ts                sitemap.xml, both languages, hreflang
  robots.ts
components/
  ui/                       design-system building blocks: Button, Card, Badge,
                            Progress (+ SessionTrack), Section (+ PageHeader), BookCover, cn
  layout/                   SiteHeader, SiteFooter, MobileTabBar, Logo, nav, ThemeToggle,
                            ThemeScript (no-flash dark mode), LanguageSwitch
  BookCard, LibraryGrid, ReadingCard, NextSession, StatusBadge
data/club.ts                ALL site content (books, groups, guests, testimonials, stats, links)
lib/
  types.ts                  shared types (Book, StudyGroup, GuestSession, ScheduledSession…)
  i18n.ts                   locales, UI strings for en/ar, number/percent formatting, href()
  club.ts                   derived values (finished count, hours, lookups)
  calendar.ts               Google Calendar link + .ics generation
  metadata.ts               per-page title, canonical, hreflang, Open Graph/X tags
middleware.ts               language detection + legacy URL redirects
public/                     favicon, og.png (1200×630), image/ (book cover, guest photo)
```

### How to edit content

Everything is in `data/club.ts`; README.md has the full guide. In short:

- Visitor-facing text is `{ en: "…", ar: "…" }`. Book titles, people's names/roles and testimonials stay as written.
- Update progress: change a book's `progress` (0–100).
- New book: add to `books` with `status: "reading"` and mark the old one `"finished"`.
- Next session: set `nextSession` (start ISO time, duration, book slug, optional topic and join link), and set it back to `null` afterwards. The card hides itself once the session starts.
- UI strings (buttons, headings) are in `lib/i18n.ts`.

### Routing

- `/` or any path without a language redirects to the saved language (`locale` cookie), otherwise the browser language (Arabic → `/ar`, otherwise `/en`).
- Legacy URLs still work: `/books`, `/books/<slug>`, `/resources` gain a locale prefix, and `/groups` → `/community`.

## 5. Work history

### Before Claude sessions (May–July 2025, by the owner)

- **2025-05-05:** Created from Create Next App (Pages Router, JavaScript). Several attempts at GitHub Pages deployment (workflows, CNAME, `gh-pages` branch), then Netlify (`netlify.toml`). Commits are mostly titled "updating".
- **2025-05-06 → 2025-07-15:** Content updates (quote section, Drive links, UI tweaks). The July commits left `pages/index.js` with a syntax error, so every build and Vercel deploy failed from then on.

### Claude Code sessions

All six PRs came from **one branch, `claude/pensive-fermi-hvjjmy`**, in one session (`session_01Ya9qA1u8hLYopNadKGvh6v`), a phased "website upgrade". All are **merged into `main`**.

| # | PR | Date | What it did | Status |
| --- | --- | --- | --- | --- |
| 1 | [Fix broken build and clean up project setup](https://github.com/adel3li/The-Technical-Book-Club/pull/1) | 2026-11-15 | Fixed the `pages/index.js` syntax error. Upgraded Next 15.3.1 → 15.5.29 (Vercel blocks the vulnerable version). Merged duplicate Next configs, migrated ESLint to flat config, removed unused code (next-auth, BookVoting, etc.), rewrote the README. | Done |
| 2 | [Move all site content into one data file; deploy only on Vercel](https://github.com/adel3li/The-Technical-Book-Club/pull/2) | 2026-11-15 | Moved all content into `data/club.js`, with derived stats in `lib/club.js`. Removed Netlify and GitHub Pages config. | Done |
| 3 | [Fix mobile layouts, star background, fonts and page titles](https://github.com/adel3li/The-Technical-Book-Club/pull/3) | 2026-11-15 | Fixed mobile overflow, the timeline redesign, the star background (hydration mismatch), the Geist font and page titles. **Mostly superseded by #5.** | Done |
| 4 | [Add book pages, link previews, sitemap and next-session card](https://github.com/adel3li/The-Technical-Book-Club/pull/4) | 2026-11-15 | Added `/books/<slug>` pages, OG/X tags, `og.png`, sitemap/robots and the `nextSession` card with Google Calendar/.ics. | Done |
| 5 | [Redesign the site from scratch: bilingual (EN/AR), app-ready design system](https://github.com/adel3li/The-Technical-Book-Club/pull/5) | 2026-11-15 | Full rewrite on the App Router + TypeScript. EN/AR with RTL, locale middleware, design tokens, the `components/ui` system, light/dark mode, mobile tab bar, shared types. This is the **current architecture**. | Done |
| 6 | [Fix Vercel build: remove stale prebuild script](https://github.com/adel3li/The-Technical-Book-Club/pull/6) | 2026-11-16 | Removed the `prebuild` script that pointed at the deleted `scripts/generate-sitemap.mjs`, which broke the production deploy. | Done |
| 7 | _This session_ (`claude/peaceful-heisenberg-bchqvn`) | 2026-11-27 | Added this `PROJECT_OVERVIEW.md`. No code changes. | In progress |

### Branches

| Branch | Purpose | State |
| --- | --- | --- |
| `main` | Production (Vercel). Head `8e7fa5c`. | Active |
| `claude/pensive-fermi-hvjjmy` | Website upgrade, PRs #1–#6 | Fully merged; safe to delete |
| `gh-pages` | Old static export for GitHub Pages (last commit 2025-07-14, Pages Router build) | Abandoned; GitHub Pages deploy was dropped in PR #2 |
| `claude/peaceful-heisenberg-bchqvn` | This overview session | In progress |

There are no GitHub issues.

## 6. Decisions and why

- **Vercel only.** The repo had been deploying to Netlify, two Vercel projects and GitHub Pages at once. GitHub Pages couldn't serve the site correctly (no `basePath` or `.nojekyll`), so Vercel was kept (PRs #1–#2).
- **Upgrade to Next 15.5.29.** Vercel refuses to deploy `next@15.3.1` as a vulnerable version (PR #1).
- **One content file.** Content was duplicated across pages and had drifted apart. Derived numbers (books finished, hours) are now computed so they can't disagree (PR #2).
- **No `engines` field in package.json.** Vercel read it as "newest Node" and ignored the project's 22.x setting (PR #1).
- **Rewrite on the App Router + TypeScript with shared types.** This gives the content model and design tokens a shape that can be reused by the future backend and mobile app (PR #5).
- **Locale-prefixed URLs (`/en`, `/ar`) with middleware detection,** keeping old links working (PR #5).
- **Logical CSS properties (`ms-`, `pe-`, `start-`)** so Arabic mirrors automatically (PR #5).
- **Names, roles and testimonials aren't translated.** This avoids guessing gendered Arabic job titles (PR #5).
- **Sitemap generated by `app/sitemap.ts`** instead of a prebuild script (PRs #5–#6).
- **Book voting removed.** The old component was unused, and voting needs a storage decision (Google Form or database) (PRs #1, #4).

## 7. Open items, known issues, next steps

**Known issues / decisions pending**

- `currentSessionsLink` in `data/club.ts` points at the **Alice & Bob** WhatsApp group. *Automate the Boring Stuff* has no study group listed yet. A decision is needed (flagged since PR #2).
- *Automate the Boring Stuff* has no cover image (a generated placeholder is shown) and no slides link.
- `nextSession` is `null`, so no upcoming session is announced.
- Stats in `data/club.ts` are typed by hand (`totalSessions: 32`, `registeredMembers: 350`, `activePerSession: 10`) and need manual updates.
- `npm audit` reports a `postcss` copy bundled inside Next (build-time only, not exploitable here). Fixing it needs a Next 16 major upgrade.
- The Vercel free plan has hit the `api-deployments-free-per-day` limit before, so previews can fail on busy days.
- There are no automated tests and no CI workflow; checks are manual (`npm run lint`, `npm run build`).

**Cleanup**

- Delete the merged branch `claude/pensive-fermi-hvjjmy` and the abandoned `gh-pages` branch.
- Remove extra hosting projects still connected to the repo. Two Vercel projects still get every push: `the-technical-book-club` (the real one) and `the-technical-book` (a duplicate whose deploys show "Blocked"). PR #1 also found a Netlify site, `ttechclub`.
- `.gitignore` still lists `.netlify`. This is harmless.

**Possible next steps**

- Book voting / suggestions (needs a storage choice).
- A backend + Android/iOS app reusing `lib/types.ts` and the design tokens.
- Next 16 upgrade.
- Add CI (lint + build on PRs).
- A custom domain (currently `the-technical-book-club.vercel.app`).

## 8. Important links

| What | Link |
| --- | --- |
| Repository | https://github.com/adel3li/The-Technical-Book-Club |
| Production site | https://the-technical-book-club.vercel.app (from `site.url`) |
| Join form | https://forms.gle/9u41zzdHQpmXJhKF6 |
| WhatsApp community | https://chat.whatsapp.com/KCSluMrzenhKJlziP351jA |
| Owner's GitHub | https://github.com/adel3li |
| Slides (Drive folders) | Per book, in `data/club.ts` (`slidesUrl`) |
| Guest session recording | In `data/club.ts` (`guestSessions[].recordingUrl`) |
| Designs | None found in the repo (no Figma or other design files are linked) |
| Vercel project (main) | https://vercel.com/adel3lis-projects/the-technical-book-club (builds and previews OK) |
| Vercel project (duplicate) | https://vercel.com/adel3lis-projects/the-technical-book (also connected to the repo; its deploys show "Blocked"; candidate for removal) |
