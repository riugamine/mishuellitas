import { createClient } from '@/lib/supabase/server'
import { loginSchema, type AuthResponse } from '@/lib/types/auth.types'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Handle user login
 * POST /api/auth/login
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json()
    
    // Validate request data
    const validatedData = loginSchema.parse(body)
    
    // Create Supabase client
    const supabase = await createClient()
    
    // Attempt to sign in
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: validatedData.email,
      password: validatedData.password,
    })
    
    if (authError) {
      const response: AuthResponse = {
        success: false,
        message: authError.message === 'Invalid login credentials' 
          ? 'Credenciales inválidas o usuario no registrado en el sistema' 
          : 'Error al iniciar sesión'
      }
      return NextResponse.json(response, { status: 401 })
    }
    
    if (!authData.user) {
      const response: AuthResponse = {
        success: false,
        message: 'No se pudo autenticar al usuario'
      }
      return NextResponse.json(response, { status: 401 })
    }
    
    // Get user profile to check role
    const { data: profile, error: profileError } = await supabase
      .from('perfiles_usuario')
      .select('*')
      .eq('usuario_id', authData.user.id)
      .single()
    
    if (profileError || !profile) {
      // Sign out the user since they don't have a valid profile
      await supabase.auth.signOut()
      
      const response: AuthResponse = {
        success: false,
        message: 'Usuario no encontrado en el sistema. Contacta al administrador para crear tu perfil.'
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
      message: 'Inicio de sesión exitoso',
      user: {
        id: authData.user.id,
        email: authData.user.email!,
        role: profile.rol
      }
    }
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Login error:', error)
    
    const response: AuthResponse = {
      success: false,
      message: error instanceof Error && error.message.includes('validation') 
        ? 'Datos de entrada inválidos'
        : 'Error interno del servidor'
    }
    
    return NextResponse.json(response, { status: 500 })
  }
}
