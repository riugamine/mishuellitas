'use client'

import { AdminLayout } from "@/components/admin/admin-layout";
import { useAuthStore } from "@/lib/store/useAuthStore";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthStore()

  // Only render admin layout if authenticated (from store)
  // The authentication check and login modal are handled in the page component
  if (!isAuthenticated) {
    return <>{children}</>
  }

  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
} 