import { NextRequest, NextResponse } from 'next/server'
import type { NextRequest as NextRequestType } from 'next/server'

/**
 * Efficient middleware to protect admin routes using cookies
 */
export function middleware(request: NextRequestType) {
  const pathname = request.nextUrl.pathname

  // Only protect admin sub-routes, not the main /admin login page
  if (pathname.startsWith('/admin/')) {
    const isAuthenticated = checkAuthenticationFromCookies(request)
    
    if (!isAuthenticated) {
      // Redirect to login page with return URL
      const loginUrl = new URL('/admin', request.url)
      loginUrl.searchParams.set('returnUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  return NextResponse.next()
}

/**
 * Check authentication status using only the auth session cookie
 */
function checkAuthenticationFromCookies(request: NextRequestType) {
  const authSessionCookie = request.cookies.get('auth-session')
  
  if (!authSessionCookie) {
    return false
  }
  
  try {
    const authData = JSON.parse(authSessionCookie.value)
    
    // Check if session is still valid (not expired)
    if (authData.expiresAt && Date.now() < authData.expiresAt) {
      return true
    }
    
    return false
  } catch (error) {
    console.warn('Invalid auth-session cookie format')
    return false
  }
}

export const config = {
  matcher: [
    /*
     * Match all admin routes using the official Next.js pattern
     * This will match /admin/dashboard, /admin/products, etc.
     */
    '/admin/:path*',
  ],
}
