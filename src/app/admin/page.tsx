'use client'

import { useAuthStore } from '@/lib/store/useAuthStore'
import { LoginModal } from '@/components/admin/login-modal'
import { DashboardOverview } from '@/components/admin/dashboard-overview'

/**
 * Main admin page - shows login modal or dashboard based on stored auth status
 * No automatic authentication checks to prevent infinite loops
 */
export default function AdminPage() {
  const { isAuthenticated } = useAuthStore()

  // Show dashboard if authenticated (from store)
  if (isAuthenticated) {
    return <DashboardOverview />
  }

  // Show login modal by default
  return <LoginModal />
} 