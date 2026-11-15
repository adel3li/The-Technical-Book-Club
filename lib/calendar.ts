import type { ScheduledSession } from "./types";

// Compact UTC form used by both Google Calendar and .ics files.
export const calendarStamp = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

export interface CalendarEvent {
  start: Date;
  end: Date;
  title: string;
  details: string;
  location?: string;
}

export function toCalendarEvent(session: ScheduledSession, bookTitle: string, topic?: string): CalendarEvent {
  const start = new Date(session.start);
  return {
    start,
    end: new Date(start.getTime() + session.durationMinutes * 60_000),
    title: `Technical Book Club: ${bookTitle}`,
    details: [topic, session.joinLink && `Join: ${session.joinLink}`].filter(Boolean).join("\n"),
    location: session.joinLink,
  };
}

export function googleCalendarUrl(event: CalendarEvent) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${calendarStamp(event.start)}/${calendarStamp(event.end)}`,
    details: event.details,
  });
  if (event.location) params.set("location", event.location);
  return `https://calendar.google.com/calendar/render?${params}`;
}

export function icsFile(event: CalendarEvent) {
  const escape = (text: string) => text.replace(/[\;,]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//The Technical Book Club//EN",
    "BEGIN:VEVENT",
    `UID:${calendarStamp(event.start)}@technical-book-club`,
    `DTSTAMP:${calendarStamp(new Date())}`,
    `DTSTART:${calendarStamp(event.start)}`,
    `DTEND:${calendarStamp(event.end)}`,
    `SUMMARY:${escape(event.title)}`,
    event.details && `DESCRIPTION:${escape(event.details)}`,
    event.location && `LOCATION:${escape(event.location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
}
