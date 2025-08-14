import { updateSession } from '@/lib/supabase/middleware'
import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Middleware to protect admin routes and refresh user sessions
 */
export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request)
  
  // Check if the request is for protected admin routes (not the main login page)
  if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin') {
    // For protected admin routes, check authentication
    if (!user) {
      // Redirect to admin login page
      const redirectUrl = new URL('/admin', request.url)
      return NextResponse.redirect(redirectUrl)
    }
    
    // Verify user has admin privileges by checking their profile directly
    try {
      const supabase = createServerClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return request.cookies.getAll()
            },
            setAll() {
              // Don't set cookies in middleware check
            },
          },
        }
      )

      // Get user profile directly
      const { data: profile } = await supabase
        .from('perfiles_usuario')
        .select('rol, activo')
        .eq('usuario_id', user.id)
        .single()

      if (!profile || (profile.rol !== 'admin' && profile.rol !== 'moderador') || !profile.activo) {
        // Redirect to admin login page if not admin or inactive
        const redirectUrl = new URL('/admin', request.url)
        return NextResponse.redirect(redirectUrl)
      }
    } catch (error) {
      console.error('Middleware auth check error:', error)
      // Redirect to admin login page on error
      const redirectUrl = new URL('/admin', request.url)
      return NextResponse.redirect(redirectUrl)
    }
  }
  
  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
