"use client";

import { useEffect, useState } from "react";
import { CalendarPlus, Clock, Download, MessageCircle, Video } from "lucide-react";
import type { Locale } from "@/lib/types";
import { nextSession, community } from "@/data/club";
import { getBook } from "@/lib/club";
import { getDictionary } from "@/lib/i18n";
import { googleCalendarUrl, icsFile, toCalendarEvent } from "@/lib/calendar";
import { Card } from "@/components/ui/Card";
import { ButtonLink, buttonClass } from "@/components/ui/Button";

/**
 * The next scheduled session (from `nextSession` in data/club.ts), shown in
 * the visitor's own time zone with calendar buttons. Before a session is
 * scheduled, or once it has started, shows where announcements are posted.
 */
export function NextSession({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);

  const book = nextSession ? getBook(nextSession.book) : undefined;
  const upcoming = nextSession && book && now && new Date(nextSession.start) > now;

  if (!upcoming || !nextSession || !book) {
    return (
      <Card className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-start gap-4">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-text">
            <Clock className="size-5" aria-hidden />
          </span>
          <div>
            <h3 className="font-semibold text-text">{dict.sessions.noneTitle}</h3>
            <p className="mt-1 text-sm text-muted">{dict.sessions.noneBody}</p>
          </div>
        </div>
        <ButtonLink href={community.link} variant="secondary">
          <MessageCircle className="size-4" aria-hidden />
          {dict.common.joinWhatsApp}
        </ButtonLink>
      </Card>
    );
  }

  const topic = nextSession.topic?.[locale];
  const event = toCalendarEvent(nextSession, book.title, topic);
  const start = new Date(nextSession.start);
  const dateLabel = start.toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", { weekday: "long", month: "long", day: "numeric" });
  const timeLabel = start.toLocaleTimeString(locale === "ar" ? "ar-EG" : "en-US", { hour: "numeric", minute: "2-digit", timeZoneName: "short" });

  const download = () => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([icsFile(event)], { type: "text/calendar" }));
    link.download = "technical-book-club-session.ics";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-6 p-6 sm:flex-row sm:p-8">
        <div className="flex size-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-accent text-accent-fg">
          <span className="text-xs font-medium uppercase opacity-80">
            {start.toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", { month: "short" })}
          </span>
          <span className="text-3xl font-semibold leading-none">
            {start.toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", { day: "numeric" })}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-accent-text">{dict.sessions.next}</p>
          <h3 className="mt-1 text-xl font-semibold text-text">
            <bdi>{book.title}</bdi>
          </h3>
          {topic && <p className="mt-1 text-muted">{topic}</p>}
          <p className="mt-2 text-sm text-muted">
            {dateLabel} · {timeLabel}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-border bg-surface-2/60 px-6 py-4 sm:px-8">
        {nextSession.joinLink && (
          <ButtonLink href={nextSession.joinLink} size="sm">
            <Video className="size-4" aria-hidden />
            {dict.sessions.joinSession}
          </ButtonLink>
        )}
        <ButtonLink href={googleCalendarUrl(event)} variant="secondary" size="sm">
          <CalendarPlus className="size-4" aria-hidden />
          {dict.sessions.addGoogle}
        </ButtonLink>
        <button type="button" onClick={download} className={buttonClass("secondary", "sm")}>
          <Download className="size-4" aria-hidden />
          {dict.sessions.downloadIcs}
        </button>
      </div>
    </Card>
  );
}
