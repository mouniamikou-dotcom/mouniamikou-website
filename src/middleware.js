import { NextResponse } from 'next/server';
import { englishPath, hasFrenchRoute, localizedPath } from './i18n/routes';

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const french = pathname === '/fr' || pathname.startsWith('/fr/');
  const originalPath = request.headers.get('x-site-original-path');
  const internalFrench = request.headers.get('x-site-language') === 'fr'
    && originalPath?.startsWith('/fr') && englishPath(originalPath) === pathname;
  const path = englishPath(pathname);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-site-language', french || internalFrench ? 'fr' : 'en');
  requestHeaders.set('x-site-path', path);

  if (french) {
    // Preserve the locale if a reverse proxy re-enters middleware after rewriting.
    requestHeaders.set('x-site-original-path', pathname);
    const destination = request.nextUrl.clone();
    // Keep rewrites on the incoming host, including local/IP preview servers.
    destination.host = request.headers.get('host') || destination.host;
    const valid = hasFrenchRoute(path) && localizedPath(path, 'fr') === pathname;
    destination.pathname = valid ? path : '/__unsupported-french-page';
    return NextResponse.rewrite(destination, { request: { headers: requestHeaders } });
  }
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ['/((?!api(?:/|$)|_next(?:/|$)|studio(?:/|$)|.*\\..*).*)'],
};
