
import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
  locales: ['fa', 'en', 'ar'],
  defaultLocale: 'fa',
  localeDetection: true,
  localePrefix: 'never', 
});

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  const response = NextResponse.next();
  response.headers.set('x-pathname', pathname);
  
  if (pathname.includes('/admin')) {
    return response;
  }
  
  const intlResponse = intlMiddleware(request);
  if (intlResponse) {
    intlResponse.headers.set('x-pathname', pathname);
    return intlResponse;
  }
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};