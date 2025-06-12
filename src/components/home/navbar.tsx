'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleWhatsAppClick = () => {
    const phoneNumber = "+584248805609";
    const message = encodeURIComponent("¡Hola! Me gustaría obtener más información sobre sus servicios.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full py-4 px-6 md:px-10 flex items-center justify-between bg-background/95 backdrop-blur-md sticky top-0 z-50 border-b border-border shadow-sm transition-colors">
      
      <div className="flex items-center relative z-10">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 transform hover:scale-105">
          <div className="transform transition-transform duration-200 hover:rotate-2">
            <Image 
              src="https://res.cloudinary.com/dhzl31kb8/image/upload/v1749072088/01-A_jidteo.png" 
              alt="Mis Huellitas" 
              width={150} 
              height={150} 
              sizes="150px"
              className="drop-shadow-sm"
            />
          </div>
        </Link>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8 relative z-10">
        <div className="transform transition-transform duration-200 hover:-translate-y-1">
          <Link 
            href="/acerca-de" 
            className="font-montserrat text-base font-medium text-foreground hover:text-secondary transition-all duration-300 relative group px-3 py-2 rounded-2xl hover:bg-secondary/5"
          >
            Acerca de
            <span className="absolute bottom-1 left-3 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-[calc(100%-1.5rem)] rounded-full"></span>
          </Link>
        </div>
        
        <div className="transform transition-transform duration-200 hover:-translate-y-1">
          <Link 
            href="/productos" 
            className="font-montserrat text-base font-medium text-foreground hover:text-secondary transition-all duration-300 relative group px-3 py-2 rounded-2xl hover:bg-secondary/5"
          >
            Productos
            <span className="absolute bottom-1 left-3 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-[calc(100%-1.5rem)] rounded-full"></span>
          </Link>
        </div>
        
        <div className="transform transition-transform duration-200 hover:-translate-y-1">
          <Link 
            href="/servicios" 
            className="font-montserrat text-base font-medium text-foreground hover:text-secondary transition-all duration-300 relative group px-3 py-2 rounded-2xl hover:bg-secondary/5"
          >
            Servicios
            <span className="absolute bottom-1 left-3 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-[calc(100%-1.5rem)] rounded-full"></span>
          </Link>
        </div>
      </nav>
      
      {/* Desktop Buttons + Theme Toggle */}
      <div className="hidden md:flex items-center gap-3 relative z-10">
        <ThemeToggle />
        <div className="transform transition-transform duration-200 hover:scale-105">
          <Button 
            onClick={handleWhatsAppClick}
            className="bg-secondary hover:bg-secondary/90 text-white transition-all duration-300 font-semibold px-6 py-2 shadow-md hover:shadow-lg transform hover:-translate-y-1 relative overflow-hidden"
            style={{ borderRadius: '1.5rem 0.5rem 1.5rem 0.5rem' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-[inherit]"></div>
            <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4 mr-2 relative z-10" />
            <span className="relative z-10">Contáctanos</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu Button + Theme Toggle */}
      <div className="md:hidden flex items-center gap-2 relative z-10">
        <ThemeToggle />
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
            <Link 
              href="/acerca-de"
              onClick={closeMenu}
              className="px-6 py-3 text-foreground hover:bg-secondary/5 hover:text-secondary transition-all duration-200 font-montserrat font-medium"
            >
              Acerca de
            </Link>
            <Link 
              href="/productos"
              onClick={closeMenu}
              className="px-6 py-3 text-foreground hover:bg-secondary/5 hover:text-secondary transition-all duration-200 font-montserrat font-medium"
            >
              Productos
            </Link>
            <Link 
              href="/servicios"
              onClick={closeMenu}
              className="px-6 py-3 text-foreground hover:bg-secondary/5 hover:text-secondary transition-all duration-200 font-montserrat font-medium"
            >
              Servicios
            </Link>
            <div className="px-6 py-3">
              <Button 
                onClick={() => {
                  handleWhatsAppClick();
                  closeMenu();
                }}
                className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold py-3 rounded-xl transition-all duration-200"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4 mr-2" />
                Contáctanos
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}