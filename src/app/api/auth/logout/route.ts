import { createClient } from '@/lib/supabase/server'
import { type AuthResponse } from '@/lib/types/auth.types'
import { NextResponse } from 'next/server'

/**
 * Handle user logout
 * POST /api/auth/logout
 */
export async function POST(): Promise<NextResponse> {
  try {
    // Create Supabase client
    const supabase = await createClient()
    
    // Sign out user
    const { error: signOutError } = await supabase.auth.signOut()
    
    if (signOutError) {
      console.error('Logout error:', signOutError)
      const response: AuthResponse = {
        success: false,
        message: 'Error al cerrar sesión'
      }
      return NextResponse.json(response, { status: 500 })
    }
    
    const response: AuthResponse = {
      success: true,
      message: 'Sesión cerrada exitosamente'
    }
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Logout error:', error)
    
    const response: AuthResponse = {
      success: false,
      message: 'Error interno del servidor'
    }
    
    return NextResponse.json(response, { status: 500 })
  }
}
