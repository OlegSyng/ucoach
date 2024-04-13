import { getToken } from 'next-auth/jwt'
import { NextURL } from 'next/dist/server/web/next-url'
import { NextRequest, NextResponse } from 'next/server'
import { BASE_URL } from './utils/endpoints'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) {
    const loginUrl = new NextURL('/auth/login', BASE_URL)
    if (req.nextUrl.pathname !== '/') {
      loginUrl.searchParams.set('redirect_after', req.nextUrl.toString())
    }
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /auth/ routes
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/ (special page for OG tags proxying)
     * 4. /_static (inside /public)
     * 5. /_vercel (Vercel internals)
     * 6. Static files (e.g. /favicon.ico, /sitemap.xml, /robots.txt, etc.)
     */
    '/((?!api/|auth/|_next/|_proxy/|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
}
