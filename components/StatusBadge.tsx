import type { BookStatus, Locale } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import { Badge } from "@/components/ui/Badge";

export function StatusBadge({ status, locale, className }: { status: BookStatus; locale: Locale; className?: string }) {
  const tone = status === "reading" ? "success" : status === "finished" ? "info" : "neutral";
  return (
    <Badge tone={tone} dot className={className}>
      {getDictionary(locale).status[status]}
    </Badge>
  );
}
