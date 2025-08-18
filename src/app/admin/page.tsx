'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/lib/store/useAuthStore'
import { LoginModal } from '@/components/admin/login-modal'

/**
 * Main admin login page - simplified to work with middleware protection
 * Middleware handles all authentication checks, this page only handles redirects for authenticated users
 */
export default function AdminPage() {
  const { isAuthenticated, user } = useAuthStore()
  const router = useRouter()
  const searchParams = useSearchParams()

  /**
   * Simple redirect for already authenticated users
   */
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('isAuthenticated', isAuthenticated)
      console.log('user', user)
      // Get return URL from middleware redirect or default to dashboard
      const returnUrl = searchParams.get('returnUrl') || '/admin/dashboard'
      router.replace(returnUrl)
    }
  }, [isAuthenticated, user, router, searchParams])

  // Show login modal - middleware ensures only unauthenticated users reach here
  return (
    <div className="min-h-screen">
      <LoginModal />
    </div>
  )
} 