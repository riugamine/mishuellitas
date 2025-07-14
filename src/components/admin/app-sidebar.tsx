"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHome, 
  faBox, 
  faShoppingCart,
  faTags,
  faCog,
  faSignOutAlt,
  faPaw
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

/**
 * App sidebar component with collapsible functionality and consistent branding
 */
export function AppSidebar() {
  const pathname = usePathname();

  const navigationItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: faHome,
    },
    {
      label: "Productos",
      href: "/admin/productos",
      icon: faBox,
    },
    {
      label: "Órdenes",
      href: "/admin/ordenes",
      icon: faShoppingCart,
    },
    {
      label: "Categorías",
      href: "/admin/categorias",
      icon: faTags,
    },
    {
      label: "Configuración",
      href: "/admin/configuracion",
      icon: faCog,
    },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="border-b border-sidebar-border bg-sidebar">
        <div className="flex items-center gap-3  py-4">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-sidebar-primary-foreground shadow-sm">
            <FontAwesomeIcon icon={faPaw} className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold text-sidebar-foreground">
              Mis Huellitas
            </span>
            <span className="truncate text-xs text-sidebar-foreground/70">
              Admin Panel
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-sidebar">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs font-medium tracking-wide uppercase px-3 py-2">
            Navegación
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    className={`
                      relative group rounded-lg px-3 py-2.5 transition-all duration-200 ease-in-out
                      ${isActive(item.href) 
                        ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm font-medium" 
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-sm"
                      }
                    `}
                    tooltip={item.label}
                  >
                    <Link href={item.href} className="flex items-center gap-3 min-w-0">
                      <FontAwesomeIcon 
                        icon={item.icon} 
                        className={`size-4 shrink-0 transition-all duration-200 ${
                          isActive(item.href) 
                            ? "text-primary" 
                            : "text-sidebar-foreground/70 group-hover:text-primary group-hover:scale-110"
                        }`}
                      />
                      <span className="truncate transition-all duration-200 group-hover:translate-x-0.5">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border bg-sidebar">
        <div className="p-3">
          <Separator className="mb-3 bg-sidebar-border" />
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="w-full justify-start px-3 py-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive transition-all duration-200 ease-in-out group"
                tooltip="Cerrar Sesión"
                onClick={() => {
                  // TODO: Implement logout functionality
                  console.log("Logout clicked");
                }}
              >
                <FontAwesomeIcon 
                  icon={faSignOutAlt} 
                  className="size-4 shrink-0 transition-transform duration-200 group-hover:scale-110" 
                />
                <span className="truncate transition-transform duration-200 group-hover:translate-x-0.5">
                  Cerrar Sesión
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  );
} 