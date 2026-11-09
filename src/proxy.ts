import { NextResponse, type NextRequest } from 'next/server'

/**
 * English is served at the root ("/academic"), Thai under "/th".
 * Internally every page lives under /[locale], so root URLs are rewritten to /en.
 */
export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const url = req.nextUrl.clone()
    url.pathname = pathname.replace(/^\/en/, '') || '/'
    return NextResponse.redirect(url, 308)
  }
  if (pathname === '/th' || pathname.startsWith('/th/')) return NextResponse.next()

  const url = req.nextUrl.clone()
  url.pathname = `/en${pathname === '/' ? '' : pathname}`
  url.search = search
  return NextResponse.rewrite(url)
}

export const config = {
  // Skip the CMS, API, Next internals and any file with an extension (images, sitemap.xml, robots.txt…)
  matcher: ['/((?!admin|api|_next|.*\\..*).*)'],
}
