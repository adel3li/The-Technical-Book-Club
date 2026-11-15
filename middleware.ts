import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n";

// Old URLs from the previous site, kept working.
const legacy: Record<string, string> = { "/groups": "/community" };

function preferredLocale(request: NextRequest) {
  const saved = request.cookies.get("locale")?.value;
  if (saved && isLocale(saved)) return saved;
  const accepted = request.headers.get("accept-language") ?? "";
  return /^\s*ar\b/i.test(accepted) ? "ar" : defaultLocale;
}

// Every page lives under /en or /ar. Requests without a language prefix are
// redirected to the visitor's saved or browser language.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  if (isLocale(first)) return NextResponse.next();

  const path = legacy[pathname] ?? pathname;
  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${path === "/" ? "" : path}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes and files with an extension (images, og.png, robots.txt…)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
