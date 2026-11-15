"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/types";
import { getDictionary, href } from "@/lib/i18n";
import { site } from "@/data/club";
import { buttonClass } from "@/components/ui/Button";
import { cn } from "@/components/ui/cn";
import { LanguageSwitch } from "./LanguageSwitch";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";
import { isActive, navItems } from "./nav";

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const dict = getDictionary(locale);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={href("/", locale)} className="flex items-center gap-2.5 rounded-lg" aria-label={site.name}>
          <Logo />
          <span className="hidden text-[15px] font-semibold tracking-tight text-text sm:inline">{site.name}</span>
        </Link>

        <nav aria-label={dict.nav.menu} className="hidden items-center gap-1 md:flex">
          {navItems(dict).map((item) => {
            const active = isActive(pathname, item.path);
            return (
              <Link
                key={item.path}
                href={href(item.path, locale)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active ? "bg-surface-2 text-text" : "text-muted hover:text-text"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitch locale={locale} />
          <ThemeToggle label={dict.nav.theme} />
          <a href={site.joinForm} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "sm", "ms-2 hidden sm:inline-flex")}>
            {dict.nav.join}
          </a>
        </div>
      </div>
    </header>
  );
}
