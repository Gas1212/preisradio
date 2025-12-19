import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Apply cache headers to sitemap routes
  if (request.nextUrl.pathname.startsWith('/sitemap/')) {
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=86400, stale-while-revalidate=43200'
    );
  }

  return response;
}

export const config = {
  matcher: '/sitemap/:path*',
};
