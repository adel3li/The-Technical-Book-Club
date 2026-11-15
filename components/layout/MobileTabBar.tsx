"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/types";
import { getDictionary, href } from "@/lib/i18n";
import { cn } from "@/components/ui/cn";
import { isActive, navItems } from "./nav";

/** App-style bottom navigation on phones, mirroring the future mobile app. */
export function MobileTabBar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const dict = getDictionary(locale);
  return (
    <nav
      aria-label={dict.nav.menu}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
    >
      <ul className="grid grid-cols-5">
        {navItems(dict).map(({ path, label, icon: Icon }) => {
          const active = isActive(pathname, path);
          return (
            <li key={path}>
              <Link
                href={href(path, locale)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1 pt-2.5 pb-2 text-[11px] font-medium transition-colors",
                  active ? "text-accent" : "text-subtle hover:text-text"
                )}
              >
                <Icon className="size-[22px]" strokeWidth={active ? 2.25 : 1.75} aria-hidden />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
