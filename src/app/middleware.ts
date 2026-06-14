// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
  locales: ['fa', 'en', 'ar'],
  defaultLocale: 'fa',
  localeDetection: true,
  localePrefix: 'never', 
});

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  if (pathname.includes('/admin/AdminDashboard')) {
    return NextResponse.next();
  }
  
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};