"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Separator } from "@/components/ui/separator";

interface AdminLayoutProps {
  children: React.ReactNode;
}

/**
 * Main admin layout component that provides the sidebar navigation and header
 * @param children - The content to be rendered in the main area
 */
export function AdminLayout({ children }: AdminLayoutProps) {
  return (
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
              <div className="text-sm text-muted-foreground">
                Mis Huellitas Admin
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-background">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
} 