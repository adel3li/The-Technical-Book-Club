// Values worked out from data/club.ts so pages never disagree.
import { books, guestSessions, stats } from "@/data/club";

export const getBook = (slug: string) => books.find((book) => book.slug === slug);

export const readingBooks = books.filter((book) => book.status === "reading");
export const finishedBooks = books.filter((book) => book.status === "finished");

export const guestSessionsFor = (slug: string) => guestSessions.filter((s) => s.book === slug);

export const recordings = guestSessions.filter((s) => s.recordingUrl);

export const clubStats = {
  sessions: stats.totalSessions,
  hours: stats.totalSessions * stats.hoursPerSession,
  finished: finishedBooks.length,
  members: stats.registeredMembers,
};
