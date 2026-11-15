// Shared content types. These mirror what the future backend and mobile app
// will use, so keeping them in one place makes that move straightforward.

export type Locale = "en" | "ar";

/** Text in both site languages. */
export type Localized = Record<Locale, string>;

export type BookStatus = "finished" | "reading" | "planned";

export interface StudyGroup {
  members: number;
  link: string;
  description: Localized;
}

export interface Book {
  slug: string;
  title: string;
  author?: string;
  /** Image in public/, e.g. "/image/my-book.png" */
  cover?: string;
  status: BookStatus;
  /** Planned number of sessions for the book */
  sessions: number;
  /** Percent of the book covered so far (0-100) */
  progress: number;
  summary: Localized;
  group?: StudyGroup;
  /** Google Drive folder with session slides */
  slidesUrl?: string;
}

export interface GuestSession {
  id: string;
  guest: string;
  /** As the guest describes themself; not translated */
  role: string;
  /** Slug of a book */
  book: string;
  description: Localized;
  photo: string;
  recordingUrl?: string;
}

export interface Testimonial {
  name: string;
  /** As the member describes themself; not translated */
  role: string;
  /** Kept in the language it was written in */
  text: string;
}

export interface ScheduledSession {
  /** ISO date-time, e.g. "2026-11-22T18:00:00Z" */
  start: string;
  durationMinutes: number;
  /** Slug of a book */
  book: string;
  topic?: Localized;
  joinLink?: string;
}
