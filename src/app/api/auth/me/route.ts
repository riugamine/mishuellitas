import { type AuthResponse } from '@/lib/types/auth.types'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Get current authenticated user from session cookie
 * GET /api/auth/me
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Get auth session cookie
    const authSessionCookie = request.cookies.get('auth-session')
    
    if (!authSessionCookie) {
      const response: AuthResponse = {
        success: false,
        message: 'No hay usuario autenticado'
      }
      return NextResponse.json(response, { status: 401 })
    }
    
    // Parse session data
    let sessionData
    try {
      sessionData = JSON.parse(authSessionCookie.value)
    } catch (error) {
      const response: AuthResponse = {
        success: false,
        message: 'Sesión inválida'
      }
      return NextResponse.json(response, { status: 401 })
    }
    
    // Check if session is still valid (not expired)
    if (!sessionData.expiresAt || Date.now() >= sessionData.expiresAt) {
      const response: AuthResponse = {
        success: false,
        message: 'Sesión expirada'
      }
      return NextResponse.json(response, { status: 401 })
    }
    
    // Validate session data structure
    if (!sessionData.userId || !sessionData.email || !sessionData.role) {
      const response: AuthResponse = {
        success: false,
        message: 'Datos de sesión incompletos'
      }
      return NextResponse.json(response, { status: 401 })
    }
    
    const response: AuthResponse = {
      success: true,
      message: 'Usuario autenticado',
      user: {
        id: sessionData.userId,
        email: sessionData.email,
        role: sessionData.role
      }
    }
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Get user error:', error)
    
    const response: AuthResponse = {
      success: false,
      message: 'Error interno del servidor'
    }
    
    return NextResponse.json(response, { status: 500 })
  }
}
