import { z } from 'zod'

/**
 * Login form validation schema
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Formato de email inválido'),
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

/**
 * Login form data type
 */
export type LoginFormData = z.infer<typeof loginSchema>

/**
 * Authentication response type
 */
export interface AuthResponse {
  success: boolean
  message: string
  user?: {
    id: string
    email: string
    role?: string
  }
}

/**
 * User profile type from database
 */
export interface UserProfile {
  id: string
  usuario_id: string
  nombre?: string
  apellido?: string
  telefono?: string
  direccion?: string
  ciudad?: string
  pais?: string
  codigo_postal?: string
  rol: 'cliente' | 'admin' | 'moderador'
  activo: boolean
  created_at: string
  updated_at: string
}
