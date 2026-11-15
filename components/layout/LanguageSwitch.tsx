"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import { cn } from "@/components/ui/cn";

/** Links to the same page in the other language and remembers the choice. */
export function LanguageSwitch({ locale, className }: { locale: Locale; className?: string }) {
  const pathname = usePathname();
  const other: Locale = locale === "en" ? "ar" : "en";
  const target = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${other}`);
  const dict = getDictionary(locale);
  return (
    <Link
      href={target}
      hrefLang={other}
      lang={other}
      aria-label={dict.nav.switchLanguageLabel}
      onClick={() => {
        document.cookie = `locale=${other};path=/;max-age=31536000;samesite=lax`;
      }}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-muted transition-colors hover:bg-surface-2 hover:text-text",
        className
      )}
    >
      <Languages className="size-4" aria-hidden />
      {dict.nav.switchLanguage}
    </Link>
  );
}
