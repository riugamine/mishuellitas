"use client";

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/home/navbar';
import { Footer } from '@/components/home/footer';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

/**
 * Conditional layout component that shows navbar/footer only for non-admin pages
 */
export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  
  // Check if current path is an admin route
  const isAdminRoute = pathname?.startsWith('/admin');
  
  if (isAdminRoute) {
    return <>{children}</>;
  }
  
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
} 