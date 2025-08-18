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
 * Check authentication status using only cookies to avoid DB queries
 * Priority order: auth-storage-v2 (Zustand store) > Supabase cookies
 */
function checkAuthenticationFromCookies(request: NextRequestType): boolean {
  // 1. First priority: Check Zustand auth store cookie (most reliable)
  const authStorageCookie = request.cookies.get('auth-storage-v2')
  if (authStorageCookie) {
    try {
      const authData = JSON.parse(authStorageCookie.value)
      const isValid = authData?.state?.isAuthenticated === true && 
                     authData?.state?.user?.id && 
                     authData?.state?.user?.email
      
      if (isValid) {
        return true
      }
    } catch (error) {
      // Invalid JSON, continue to other checks
      console.warn('Invalid auth-storage-v2 cookie format')
    }
  }
  
  // 2. Second priority: Check Supabase session cookies
  const supabaseAccessToken = request.cookies.get('sb-access-token')
  const supabaseRefreshToken = request.cookies.get('sb-refresh-token')
  
  if (supabaseAccessToken?.value && supabaseRefreshToken?.value) {
    // Basic validation: check if tokens exist and are not empty
    const accessTokenValid = supabaseAccessToken.value.length > 20
    const refreshTokenValid = supabaseRefreshToken.value.length > 20
    
    if (accessTokenValid && refreshTokenValid) {
      return true
    }
  }
  
  // 3. Fallback: Check legacy Supabase auth token
  const legacyAuthToken = request.cookies.get('supabase-auth-token')
  if (legacyAuthToken?.value && legacyAuthToken.value.length > 20) {
    return true
  }
  
  return false
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
