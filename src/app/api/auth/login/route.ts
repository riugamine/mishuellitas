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
      .eq('id', authData.user.id)
      .single()
    
    if (profileError || !profile) {
      // Sign out the user since they don't have a valid profile
      await supabase.auth.signOut()
      
      console.error('Profile error:', profileError)
      console.log('Looking for user ID:', authData.user.id)
      
      const response: AuthResponse = {
        success: false,
        message: 'Usuario no encontrado en el sistema. Contacta al administrador para crear tu perfil.'
      }
      return NextResponse.json(response, { status: 404 })
    }
    
    // Check if user is admin (according to schema: 'admin' or 'super_admin')
    if (profile.rol !== 'admin' && profile.rol !== 'super_admin') {
      // Sign out the user since they don't have admin privileges
      await supabase.auth.signOut()
      
      const response: AuthResponse = {
        success: false,
        message: 'No tienes permisos para acceder al panel de administración'
      }
      return NextResponse.json(response, { status: 403 })
    }
    
    // Check if user is active (according to schema: 'is_active')
    if (!profile.is_active) {
      // Sign out the inactive user
      await supabase.auth.signOut()
      
      const response: AuthResponse = {
        success: false,
        message: 'Tu cuenta está desactivada. Contacta al administrador'
      }
      return NextResponse.json(response, { status: 403 })
    }
    
    // Create response with session cookies
    const response: AuthResponse = {
      success: true,
      message: 'Inicio de sesión exitoso',
      user: {
        id: authData.user.id,
        email: authData.user.email!,
        role: profile.rol
      }
    }
    
    // Create NextResponse with the JSON data
    const nextResponse = NextResponse.json(response)
    
    // Set single authentication cookie
    if (authData.session) {
      // Create auth session data
      const authSessionData = {
        userId: authData.user.id,
        email: authData.user.email,
        role: profile.rol,
        expiresAt: Date.now() + (authData.session.expires_in * 1000)
      }
      
      // Set authentication cookie
      nextResponse.cookies.set('auth-session', JSON.stringify(authSessionData), {
        httpOnly: true,
        secure: true, // Always secure in production and development
        sameSite: 'lax',
        maxAge: authData.session.expires_in,
        path: '/',
      })
      
      console.log('✅ Authentication session cookie set successfully')
    }
    
    return nextResponse
    
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
