import { useEffect, useState } from 'react';
import { nextSession } from '@/data/club';
import { getBook } from '@/lib/club';

// Calendar timestamps in the compact UTC form both Google Calendar and .ics use.
function calendarStamp(date) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function sessionDetails(session) {
  const book = getBook(session.book);
  const start = new Date(session.start);
  const end = new Date(start.getTime() + (session.durationMinutes || 90) * 60000);
  const title = `Technical Book Club: ${book.title}`;
  const details = [session.topic, session.joinLink && `Join: ${session.joinLink}`].filter(Boolean).join('\n');
  return { book, start, end, title, details };
}

function googleCalendarUrl({ start, end, title, details }, location) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${calendarStamp(start)}/${calendarStamp(end)}`,
    details,
  });
  if (location) params.set('location', location);
  return `https://calendar.google.com/calendar/render?${params}`;
}

function downloadIcs({ start, end, title, details }, location) {
  const escape = (text) => text.replace(/[\;,]/g, (c) => `\\${c}`).replace(/\n/g, '\\n');
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//The Technical Book Club//EN',
    'BEGIN:VEVENT',
    `UID:${calendarStamp(start)}@technical-book-club`,
    `DTSTAMP:${calendarStamp(new Date())}`,
    `DTSTART:${calendarStamp(start)}`,
    `DTEND:${calendarStamp(end)}`,
    `SUMMARY:${escape(title)}`,
    details && `DESCRIPTION:${escape(details)}`,
    location && `LOCATION:${escape(location)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean).join('\r\n');
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  link.download = 'technical-book-club-session.ics';
  link.click();
  URL.revokeObjectURL(link.href);
}

// "Next session" card. Renders nothing unless `nextSession` is set in
// data/club.js. Dates are formatted after load, in each visitor's own time
// zone, and the card hides itself once the session has started.
export default function NextSession() {
  const [now, setNow] = useState(null);
  useEffect(() => setNow(new Date()), []);

  if (!nextSession || !now) return null;
  const session = sessionDetails(nextSession);
  if (session.start <= now) return null;

  const when = session.start.toLocaleString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  });
  const button = 'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border border-white/15 transition-all duration-200';

  return (
    <section className="px-4 pb-8 animate-fade-in">
      <div className="max-w-4xl mx-auto bg-white/10 border border-white/15 rounded-lg p-6 sm:p-8">
        <div className="text-sm uppercase tracking-wide text-white/50 mb-2">Next session</div>
        <h2 className="text-2xl font-bold mb-1">{session.book.title}</h2>
        {nextSession.topic && <p className="text-white/70 mb-1">{nextSession.topic}</p>}
        <p className="text-white/80 mb-5">🗓️ {when}</p>
        <div className="flex flex-wrap gap-3">
          {nextSession.joinLink && (
            <a href={nextSession.joinLink} target="_blank" rel="noopener noreferrer" className={`${button} bg-white text-black border-white hover:bg-white/90`}>
              Join the session →
            </a>
          )}
          <a href={googleCalendarUrl(session, nextSession.joinLink)} target="_blank" rel="noopener noreferrer" className={`${button} bg-white/5 hover:bg-white/10`}>
            Add to Google Calendar ↗
          </a>
          <button type="button" onClick={() => downloadIcs(session, nextSession.joinLink)} className={`${button} bg-white/5 hover:bg-white/10`}>
            Download .ics (Apple / Outlook)
          </button>
        </div>
      </div>
    </section>
  );
}
