'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSearch, faShoppingCart, faTag } from '@fortawesome/free-solid-svg-icons';
import { useCartStore } from '@/lib/store/useCartStore';
import { categorias } from '@/lib/placeholder-data';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const totalItems = useCartStore(state => state.totalItems);

  /**
   * Manejar búsqueda de productos
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/productos?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  /**
   * Alternar menú móvil
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /**
   * Cerrar menú móvil
   */
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full py-4 px-6 md:px-10 flex items-center justify-between bg-background/95 backdrop-blur-md sticky top-0 z-50 border-b border-border shadow-sm transition-colors">
      
      {/* Logo */}
      <div className="flex items-center relative z-10">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 transform hover:scale-105">
          <div className="transform transition-transform duration-200 hover:rotate-2">
            <Image 
              src="https://res.cloudinary.com/dhzl31kb8/image/upload/v1750344275/01-A_jidteo_c_crop_w_5003_h_3729_yeywui.png" 
              alt="Mis Huellitas" 
              width={100}
              height={100}
              priority={true}
              className="drop-shadow-sm dark:hidden"
            />
            <Image 
              src="https://res.cloudinary.com/dhzl31kb8/image/upload/v1750344009/01-A_qnmiib.png" 
              alt="Mis Huellitas" 
              width={100}
              height={100}
              priority={true}
              className="drop-shadow-sm hidden dark:block"
            />
          </div>
        </Link>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-2 relative z-10">
        <NavigationMenu>
          <NavigationMenuList>
            {/* Productos */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/productos">Productos</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            {/* Categorías Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-montserrat">
                <FontAwesomeIcon icon={faTag} className="h-4 w-4 mr-2" />
                Categorías
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {categorias.map((categoria) => (
                    <NavigationMenuLink key={categoria.id} asChild>
                      <Link
                        href={`/productos?categoria=${categoria.slug}`}
                        className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 flex-shrink-0">
                            <Image
                              src={categoria.cover_image_url}
                              alt={categoria.nombre}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium leading-none group-hover:text-secondary transition-colors">
                              {categoria.nombre}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                              {categoria.descripcion}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  ))}
                  
                  {/* Ver todas las categorías */}
                  <NavigationMenuLink asChild>
                    <Link
                      href="/productos"
                      className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary hover:text-secondary-foreground focus:bg-secondary focus:text-secondary-foreground border-2 border-dashed border-secondary/30 hover:border-secondary"
                    >
                      <div className="flex items-center justify-center gap-2 text-center">
                        <FontAwesomeIcon icon={faShoppingCart} className="h-5 w-5 text-secondary group-hover:text-secondary-foreground transition-colors" />
                        <div className="text-sm font-medium leading-none text-secondary group-hover:text-secondary-foreground transition-colors">
                          Ver todos los productos
                        </div>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            {/* Acerca de */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/acerca-de">Acerca de</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      {/* Desktop Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <form onSubmit={handleSearch} className="relative w-full">
          <Input
            type="text"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-12 rounded-xl border-2 border-border focus:border-secondary transition-colors"
          />
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 hover:bg-secondary/10"
          >
            <FontAwesomeIcon icon={faSearch} className="h-4 w-4 text-muted-foreground" />
          </Button>
        </form>
      </div>
      
      {/* Desktop Buttons + Cart + Theme Toggle */}
      <div className="hidden md:flex items-center gap-3 relative z-10">
        <ThemeToggle />
        
        {/* Cart Button */}
        <div className="transform transition-transform duration-200 hover:scale-105">
          <Button 
            asChild
            variant="outline"
            className="relative p-3 hover:bg-secondary/10 transition-all duration-200"
          >
            <Link href="/carrito">
              <FontAwesomeIcon icon={faShoppingCart} className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 min-w-[20px] h-5 text-xs px-1 rounded-full"
                >
                  {totalItems}
                </Badge>
              )}
            </Link>
          </Button>
        </div>
        
        {/* Shop Now Button */}
        <div className="transform transition-transform duration-200 hover:scale-105">
          <Button 
            asChild
            className="bg-secondary hover:bg-secondary/90 text-white transition-all duration-300 font-semibold px-6 py-2 shadow-md hover:shadow-lg transform hover:-translate-y-1 relative overflow-hidden"
            style={{ borderRadius: '1.5rem 0.5rem 1.5rem 0.5rem' }}
          >
            <Link href="/productos">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-[inherit]"></div>
              <FontAwesomeIcon icon={faShoppingCart} className="h-4 w-4 mr-2 relative z-10" />
              <span className="relative z-10">Comprar Ahora</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile Menu Button + Cart + Theme Toggle */}
      <div className="md:hidden flex items-center gap-2 relative z-10">
        <ThemeToggle />
        
        {/* Mobile Cart Button */}
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="relative p-2 hover:bg-secondary/10 transition-colors"
        >
          <Link href="/carrito">
            <FontAwesomeIcon icon={faShoppingCart} className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 min-w-[16px] h-4 text-xs px-1 rounded-full"
              >
                {totalItems}
              </Badge>
            )}
          </Link>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMenu}
          className="p-2 hover:bg-secondary/10 transition-colors"
        >
          <FontAwesomeIcon 
            icon={isMenuOpen ? faTimes : faBars} 
            className="h-5 w-5 text-foreground transition-transform duration-200" 
          />
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-lg z-40 animate-slide-in-left">
          <nav className="flex flex-col py-4">
            {/* Mobile Search */}
            <div className="px-6 py-3">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-12 rounded-xl border-2 border-border focus:border-secondary transition-colors"
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 hover:bg-secondary/10"
                >
                  <FontAwesomeIcon icon={faSearch} className="h-4 w-4 text-muted-foreground" />
                </Button>
              </form>
            </div>
            
            <Link 
              href="/productos"
              onClick={closeMenu}
              className="px-6 py-3 text-foreground hover:bg-secondary/5 hover:text-secondary transition-all duration-200 font-montserrat font-medium"
            >
              Productos
            </Link>
            
            {/* Mobile Categories Section */}
            <div className="px-6 py-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                <FontAwesomeIcon icon={faTag} className="h-4 w-4" />
                Categorías
              </div>
              <div className="space-y-1">
                {categorias.map((categoria) => (
                  <Link 
                    key={categoria.id}
                    href={`/productos?categoria=${categoria.slug}`}
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-4 py-2 text-foreground hover:bg-secondary/5 hover:text-secondary transition-all duration-200 font-montserrat font-medium rounded-md border-l-2 border-transparent hover:border-secondary"
                  >
                    <div className="relative w-8 h-8 flex-shrink-0">
                      <Image
                        src={categoria.cover_image_url}
                        alt={categoria.nombre}
                        fill
                        className="object-cover rounded-sm"
                      />
                    </div>
                    <span>{categoria.nombre}</span>
                  </Link>
                ))}
              </div>
            </div>
            
            <Link 
              href="/acerca-de"
              onClick={closeMenu}
              className="px-6 py-3 text-foreground hover:bg-secondary/5 hover:text-secondary transition-all duration-200 font-montserrat font-medium"
            >
              Acerca de
            </Link>
            
            <div className="px-6 py-3">
              <Button 
                asChild
                className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold py-3 rounded-xl transition-all duration-200"
              >
                <Link href="/productos" onClick={closeMenu}>
                  <FontAwesomeIcon icon={faShoppingCart} className="h-4 w-4 mr-2" />
                  Comprar Ahora
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}