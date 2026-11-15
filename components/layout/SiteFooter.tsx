import Link from "next/link";
import type { Locale } from "@/lib/types";
import { getDictionary, href } from "@/lib/i18n";
import { community, site } from "@/data/club";
import { Container } from "@/components/ui/Section";
import { Logo } from "./Logo";
import { navItems } from "./nav";

export function SiteFooter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <footer className="border-t border-border bg-surface pb-24 md:pb-0">
      <Container className="grid gap-10 py-12 sm:grid-cols-[2fr_1fr_1fr]">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <Logo />
            <span className="font-semibold text-text">{site.name}</span>
          </div>
          <p className="mt-4 text-sm text-muted">{dict.footer.tagline}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-text">{dict.footer.explore}</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navItems(dict).slice(1).map((item) => (
              <li key={item.path}>
                <Link href={href(item.path, locale)} className="text-muted transition-colors hover:text-text">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-text">{dict.footer.connect}</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href={site.joinForm} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-text">
                {dict.nav.join}
              </a>
            </li>
            <li>
              <a href={community.link} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-text">
                {dict.common.joinWhatsApp}
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-6 text-xs text-subtle sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>
            {dict.footer.builtBy}{" "}
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text" dir="ltr">
              @adel3li
            </a>
          </span>
        </Container>
      </div>
    </footer>
  );
}
