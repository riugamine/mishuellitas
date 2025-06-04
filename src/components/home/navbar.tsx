import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

export function Navbar() {
  return (
    <header className="w-full py-6 px-6 md:px-10 flex items-center justify-between bg-background/95 backdrop-blur-md sticky top-0 z-50 border-b border-border">
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="relative w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faPaw} className="h-6 w-6 text-secondary" />
          </div>
          <span className="font-poppins font-bold text-xl text-foreground">
            Mis Huellitas
          </span>
        </Link>
      </div>
      
      <nav className="hidden md:flex items-center gap-8">
        <Link 
          href="/acerca-de" 
          className="font-montserrat text-sm font-medium text-foreground/80 hover:text-secondary transition-colors"
        >
          Acerca de
        </Link>
        <Link 
          href="/productos" 
          className="font-montserrat text-sm font-medium text-foreground/80 hover:text-secondary transition-colors"
        >
          Productos
        </Link>
        <Link 
          href="/servicios" 
          className="font-montserrat text-sm font-medium text-foreground/80 hover:text-secondary transition-colors"
        >
          Servicios
        </Link>
      </nav>
      
      <Link href="/contacto">
        <Button 
          variant="outline" 
          className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-primary-foreground transition-all duration-300 font-semibold"
        >
          Contáctanos
        </Button>
      </Link>
    </header>
  );
}