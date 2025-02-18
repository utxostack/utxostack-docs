import { NextRequest, NextResponse } from "next/server";
import i18nConfig from "@/config/i18n";

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    "/((?!api|_pagefind|logo.svg|_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png|video|image|manifest).*)",
  ],
};

export function middleware(request: NextRequest) {
  const locales = i18nConfig.map((x) => x.locale);
  const defaultLocale = i18nConfig[0].locale;
  const locale = request.cookies.get('NEXT_LOCALE')?.value || defaultLocale;
  const [, lang] = request.nextUrl.pathname.split("/", 2);
  if (locales.includes(lang)) return NextResponse.next();
  request.nextUrl.pathname = `/${locale}${request.nextUrl.pathname}`;
  return NextResponse.redirect(request.nextUrl);
}
