import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Navbar() {
  return (
    <header className="w-full py-4 px-6 md:px-10 flex items-center justify-between bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-secondary/10 shadow-sm relative overflow-hidden animate-slide-in-left">
      {/* Curved background decoration */}
      <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-secondary/5 to-transparent opacity-50"
        style={{ 
          clipPath: 'polygon(60% 0%, 100% 0%, 100% 100%, 20% 100%)'
        }}
      ></div>
      
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
        
        <div className="transform transition-transform duration-200 hover:-translate-y-1">
          <Link 
            href="/contacto" 
            className="font-montserrat text-base font-medium text-foreground hover:text-secondary transition-all duration-300 relative group px-3 py-2 rounded-2xl hover:bg-secondary/5"
          >
            Contacto
            <span className="absolute bottom-1 left-3 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-[calc(100%-1.5rem)] rounded-full"></span>
          </Link>
        </div>
      </nav>
      
      <div className="relative z-10 transform transition-transform duration-200 hover:scale-105">
        <Link href="/contacto">
          <Button 
            className="bg-secondary hover:bg-secondary/90 text-white transition-all duration-300 font-semibold px-6 py-2 shadow-md hover:shadow-lg transform hover:-translate-y-1 relative overflow-hidden"
            style={{ borderRadius: '1.5rem 0.5rem 1.5rem 0.5rem' }}
          >
            {/* Button curved background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-[inherit]"></div>
            <span className="relative z-10">Contáctanos</span>
          </Button>
        </Link>
      </div>
      
      {/* Decorative curved element */}
      <div className="absolute bottom-0 left-1/4 w-12 h-1 bg-secondary/20 rounded-full"></div>
    </header>
  );
}