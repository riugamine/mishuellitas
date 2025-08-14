'use client'

import { useState } from 'react'
import { useAuthStore } from '@/lib/store/useAuthStore'
import { toast } from 'sonner'
import type { LoginFormData, AuthResponse } from '@/lib/types/auth.types'

/**
 * Custom hook for authentication operations using async/await
 * Simplified to avoid infinite loops and unnecessary queries
 */
export function useAuth() {
  const { user, isAuthenticated, setUser, isLoading, setLoading, clearAuth } = useAuthStore()
  const [loginError, setLoginError] = useState<Error | null>(null)

  /**
   * Login function using async/await
   */
  const login = async (credentials: LoginFormData): Promise<void> => {
    try {
      setLoading(true)
      setLoginError(null)

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      const data: AuthResponse = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Error al iniciar sesión')
      }

      if (data.user) {
        setUser(data.user)
        toast.success(data.message)
        
        // Redirect to dashboard
        window.location.href = '/admin/dashboard'
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión'
      setLoginError(new Error(errorMessage))
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Logout function using async/await
   */
  const logout = async (): Promise<void> => {
    try {
      setLoading(true)

      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      })

      const data: AuthResponse = await response.json()

      if (response.ok && data.success) {
        toast.success(data.message)
      } else {
        // Still logout locally even if API fails
        console.error('Logout API error:', data.message)
      }
    } catch (error) {
      console.error('Logout error:', error)
      // Still logout locally even if API fails
    } finally {
      // Always clear local state
      clearAuth()
      
      // Redirect to admin login
      window.location.href = '/admin'
    }
  }

  /**
   * Check current user authentication (manual check)
   */
  const checkAuth = async (): Promise<boolean> => {
    try {
      setLoading(true)

      const response = await fetch('/api/auth/me')
      const data: AuthResponse = await response.json()

      if (response.ok && data.success && data.user) {
        setUser(data.user)
        return true
      } else {
        clearAuth()
        return false
      }
    } catch (error) {
      console.error('Auth check error:', error)
      clearAuth()
      return false
    }
  }

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    
    // Actions
    login,
    logout,
    checkAuth,
    
    // Status
    loginError,
  }
}
