'use client'

import { useState, useCallback } from 'react'
import { useAuthStore } from '@/lib/store/useAuthStore'
import { toast } from 'sonner'
import { completeAuthCleanup } from '@/lib/utils/auth-cleanup'
import type { LoginFormData, AuthResponse } from '@/lib/types/auth.types'

/**
 * Custom hook for authentication operations using async/await
 * Simplified to avoid infinite loops and unnecessary queries
 */
export function useAuth() {
  const { user, isAuthenticated, setUser, isLoading, setLoading, clearAuth } = useAuthStore()
  const [loginError, setLoginError] = useState<Error | null>(null)

  /**
   * Login function using async/await - memoized to prevent dependency changes
   */
  const login = useCallback(async (credentials: LoginFormData): Promise<void> => {
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
        
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión'
      setLoginError(new Error(errorMessage))
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [setUser, setLoading, setLoginError])

  /**
   * Logout function using async/await - memoized to prevent dependency changes
   * Clears all authentication data: API session, cookies, and local store
   */
  const logout = useCallback(async (): Promise<void> => {
    try {
      setLoading(true)

      // Call logout API to clear server-side session
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      })

      const data: AuthResponse = await response.json()

      if (response.ok && data.success) {
        toast.success(data.message)
      } else {
        // Still logout locally even if API fails
        console.error('Logout API error:', data.message)
        toast.success('Sesión cerrada localmente')
      }
    } catch (error) {
      console.error('Logout error:', error)
      // Still logout locally even if API fails
      toast.success('Sesión cerrada localmente')
    } finally {
      // Clear all local authentication data
      clearAuth()
      
      // Perform complete authentication cleanup
      completeAuthCleanup()
    }
  }, [setLoading, clearAuth])

  /**
   * Check current user authentication (manual check) - memoized to prevent dependency changes
   */
  const checkAuth = useCallback(async (): Promise<boolean> => {
    try {
      setLoading(true)

      const response = await fetch('/api/auth/me', {
        credentials: 'include', // Ensure cookies are included
      })
      const data: AuthResponse = await response.json()

      if (response.ok && data.success && data.user) {
        setUser(data.user)
        console.log('✅ Auth check successful:', data.user.email)
        return true
      } else {
        console.log('❌ Auth check failed:', data.message)
        clearAuth()
        return false
      }
    } catch (error) {
      console.error('Auth check error:', error)
      clearAuth()
      return false
    } finally {
      setLoading(false)
    }
  }, [setLoading, setUser, clearAuth])

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
