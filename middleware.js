import { NextResponse } from "next/server";
import { locales, defaultLocale } from "@/i18n";

function pathnameHasLocale(pathname) {
  return locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathnameHasLocale(pathname)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip API routes, Next internals, and files with an extension
  // (favicon, robots.txt, sitemap.xml, images, etc.).
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
