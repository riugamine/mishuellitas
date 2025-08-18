'use client'

import { usePathname } from 'next/navigation'
import { AdminLayout } from "@/components/admin/admin-layout";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname()
  
  // Don't use AdminLayout for the main login page
  if (pathname === '/admin') {
    return <>{children}</>
  }
  
  // Use AdminLayout for all other admin routes
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
} 