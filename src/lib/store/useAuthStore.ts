import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * User data interface for the store
 */
interface User {
  id: string
  email: string
  role?: string
}

/**
 * Authentication store state interface
 */
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

/**
 * Authentication store actions interface
 */
interface AuthActions {
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  clearAuth: () => void
}

/**
 * Authentication store using Zustand
 * Persists authentication state in localStorage
 */
export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      setUser: (user) => {
        set({
          user,
          isAuthenticated: !!user,
        })
      },

      setLoading: (loading) => {
        set({ isLoading: loading })
      },

      clearAuth: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        })
      },
    }),
    {
      name: 'auth-storage-v2', // Changed name to force fresh start
      version: 1,
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
