// Values worked out from data/club.js, so pages never disagree with each other.
import { books, currentBookSlug, specialSessions, stats } from "@/data/club";

export const STATUS_LABELS = {
  finished: { timeline: "Finished", group: "Completed" },
  reading: { timeline: "Currently Reading", group: "Active" },
  planned: { timeline: "Up Next", group: "Planned" },
};

export function getBook(slug) {
  return books.find((book) => book.slug === slug);
}

export const currentBook = getBook(currentBookSlug);

export function specialSessionCount(slug) {
  return specialSessions.filter((session) => session.book === slug).length;
}

// Book study groups: ones being read first, then finished books, newest first.
export const bookGroups = books
  .filter((book) => book.group)
  .map((book) => ({
    ...book.group,
    title: book.title,
    icon: book.icon,
    platform: "WhatsApp",
    status: STATUS_LABELS[book.status].group,
    progress: `${book.progress}%`,
  }))
  .reverse()
  .sort((a, b) => (a.status === "Active" ? 0 : 1) - (b.status === "Active" ? 0 : 1));

export const booksWithSlides = books.filter((book) => book.driveLink);

export const homeStats = [
  { label: "Total Sessions", value: stats.totalSessions },
  { label: "Hours Discussed", value: stats.totalSessions * stats.hoursPerSession },
  { label: "Books Covered", value: books.filter((book) => book.status === "finished").length },
  {
    label: "Registered Members",
    value: stats.registeredMembers,
    note: `(~${stats.activePerSession} active/session)`,
  },
];

export function sessionsForBook(slug) {
  return specialSessions.filter((session) => session.book === slug);
}
