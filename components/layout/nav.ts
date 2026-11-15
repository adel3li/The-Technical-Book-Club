import { BookOpen, CalendarDays, FolderOpen, House, Users } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";

export const navItems = (dict: Dictionary) => [
  { path: "/", label: dict.nav.home, icon: House },
  { path: "/books", label: dict.nav.library, icon: BookOpen },
  { path: "/sessions", label: dict.nav.sessions, icon: CalendarDays },
  { path: "/community", label: dict.nav.community, icon: Users },
  { path: "/resources", label: dict.nav.resources, icon: FolderOpen },
];

/** Is `path` (without locale) the current section? */
export function isActive(pathname: string, path: string) {
  const current = pathname.replace(/^\/(en|ar)/, "") || "/";
  return path === "/" ? current === "/" : current === path || current.startsWith(`${path}/`);
}
