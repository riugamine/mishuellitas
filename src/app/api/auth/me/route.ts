import { createClient } from '@/lib/supabase/server'
import { type AuthResponse } from '@/lib/types/auth.types'
import { NextResponse } from 'next/server'

/**
 * Get current authenticated user
 * GET /api/auth/me
 */
export async function GET(): Promise<NextResponse> {
  console.log('🚨 API /auth/me called - This should NOT happen automatically!')
  try {
    // Create Supabase client
    const supabase = await createClient()
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      const response: AuthResponse = {
        success: false,
        message: 'No hay usuario autenticado'
      }
      return NextResponse.json(response, { status: 401 })
    }
    
    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('perfiles_usuario')
      .select('*')
      .eq('usuario_id', user.id)
      .single()
    
    if (profileError || !profile) {
      // Sign out the user since they don't have a valid profile
      await supabase.auth.signOut()
      
      const response: AuthResponse = {
        success: false,
        message: 'Perfil de usuario no encontrado. Contacta al administrador.'
      }
      return NextResponse.json(response, { status: 404 })
    }
    
    // Check if user is admin
    if (profile.rol !== 'admin' && profile.rol !== 'moderador') {
      // Sign out the user since they don't have admin privileges
      await supabase.auth.signOut()
      
      const response: AuthResponse = {
        success: false,
        message: 'No tienes permisos para acceder al panel de administración'
      }
      return NextResponse.json(response, { status: 403 })
    }
    
    // Check if user is active
    if (!profile.activo) {
      // Sign out the inactive user
      await supabase.auth.signOut()
      
      const response: AuthResponse = {
        success: false,
        message: 'Tu cuenta está desactivada. Contacta al administrador'
      }
      return NextResponse.json(response, { status: 403 })
    }
    
    const response: AuthResponse = {
      success: true,
      message: 'Usuario autenticado',
      user: {
        id: user.id,
        email: user.email!,
        role: profile.rol
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
