"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useAuth } from "@/lib/hooks/useAuth";
import { LogoutConfirmationDialog } from "./logout-confirmation-dialog";

// Create a client instance outside of the component to avoid recreation on re-renders
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes [[memory:6541973]]
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

interface AdminLayoutProps {
  children: React.ReactNode;
}

/**
 * Main admin layout component that provides the sidebar navigation and header
 * Optimized with useMemo and useCallback to prevent infinite loops
 * @param children - The content to be rendered in the main area
 */
export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, isAuthenticated, isLoading } = useAuthStore()
  const { logout, checkAuth } = useAuth()
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  /**
   * Memoize auth state to prevent unnecessary re-renders
   */
  const authState = useMemo(() => ({
    hasUser: !!user,
    isAuthenticated,
    isLoading
  }), [user, isAuthenticated, isLoading])

  /**
   * Stable checkAuth function to prevent dependency changes
   */
  const stableCheckAuth = useCallback(() => {
    checkAuth()
  }, [checkAuth])

  /**
   * Sync user state on mount and handle authentication
   * Middleware handles redirects, we only sync user data
   */
  useEffect(() => {
    let mounted = true
    
    // If authenticated but no user data, fetch user info
    if (authState.isAuthenticated && !authState.hasUser && !authState.isLoading && mounted) {
    
      stableCheckAuth()
    }

    return () => {
      mounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.isAuthenticated, authState.hasUser, authState.isLoading]) // Watch for auth state changes

  /**
   * Handle logout action
   */
  const handleLogout = async () => {
    await logout()
  }

  /**
   * Show logout confirmation dialog
   */
  const showLogoutConfirmation = () => {
    setShowLogoutDialog(true)
  }

  // Show loading state while checking authentication
  if (isLoading && !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  // If not authenticated, don't render anything (redirect will happen)
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">Redirigiendo al login...</p>
        </div>
      </div>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 flex flex-col overflow-hidden bg-muted/30">
          {/* Header */}
          <div className="bg-card border-b border-border px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="hover:bg-accent hover:text-accent-foreground rounded-md p-2 transition-colors" />
                <Separator orientation="vertical" className="h-6 bg-border" />
                <div className="flex-1 lg:flex-none">
                  <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
                </div>
              </div>
              
              {/* Header Actions */}
              <div className="flex items-center space-x-3">
                {/* User Info */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={faUser} className="text-primary-foreground text-xs" />
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-foreground font-medium">{user?.email}</p>
                      <p className="text-muted-foreground text-xs capitalize">{user?.role}</p>
                    </div>
                  </div>
                  
                  <Separator orientation="vertical" className="h-8 bg-border" />
                  
                  {/* Logout Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={showLogoutConfirmation}
                    disabled={isLoading}
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Cerrar Sesión</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-background">
            {children}
          </div>
        </main>

        {/* Logout Confirmation Dialog */}
        <LogoutConfirmationDialog
          open={showLogoutDialog}
          onOpenChange={setShowLogoutDialog}
          onConfirm={handleLogout}
          isLoading={isLoading}
        />
      </SidebarProvider>
      
      {/* React Query DevTools (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
} 