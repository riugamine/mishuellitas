import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPaw } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export function HeroSection() {
  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 px-4 sm:px-6 md:px-10 py-12 md:py-24 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 text-6xl">🐕</div>
        <div className="absolute top-32 right-20 text-4xl">🐾</div>
        <div className="absolute bottom-40 left-20 text-5xl">🐈</div>
        <div className="absolute bottom-20 right-10 text-3xl">❤️</div>
      </div>
      
      <div className="flex-1 space-y-6 sm:space-y-8 max-w-2xl z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <FontAwesomeIcon icon={faPaw} className="h-6 w-6 text-secondary" />
            <span className="font-montserrat text-secondary font-medium text-lg">
              Mis Huellitas
            </span>
          </div>
          
          <h1 className="font-poppins font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight">
            Todo lo que tu{" "}
            <span className="text-primary-foreground relative">
              peludo
              <FontAwesomeIcon 
                icon={faHeart} 
                className="h-6 w-6 text-secondary/60 absolute -top-2 -right-8 animate-pulse" 
              />
            </span>{" "}
            necesita, en un solo lugar
          </h1>
          
          <p className="font-montserrat text-lg sm:text-xl text-foreground/70 max-w-2xl leading-relaxed">
            Descubre nuestra increíble colección de <strong className="text-foreground">ropa</strong>, <strong className="text-foreground">accesorios</strong> y <strong className="text-foreground">juguetes </strong> 
            para consentir a tu mascota con estilo, comodidad y mucha diversión.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button 
            className="bg-secondary hover:bg-secondary/90 text-primary-foreground transition-all duration-300 text-base font-semibold px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            size="lg"
          >
            <FontAwesomeIcon icon={faPaw} className="h-5 w-5 mr-2" />
            Explorar Productos
          </Button>
          
          <Button 
            variant="outline" 
            className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-primary-foreground transition-all duration-300 text-base font-semibold px-8 py-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1"
            size="lg"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="h-5 w-5 mr-2" />
            Chatea con nosotros
          </Button>
        </div>
        
        <div className="flex items-center gap-6 pt-4 text-foreground/60">
          <div className="flex items-center gap-2">
            <span className="font-montserrat text-sm">✨ Productos de calidad</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-montserrat text-sm">🚚 Envío rápido</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-montserrat text-sm">💝 Amor garantizado</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 relative w-full max-w-xl aspect-square md:h-[600px] z-10">
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-secondary/10 to-accent/10 p-8">
          <Image 
            src="/hero-image.png" 
            alt="Perrito feliz con productos de Mis Huellitas - accesorios para mascotas" 
            fill
            priority
            className="object-contain"
          />
          
          {/* Floating badges */}
          <div className="absolute top-4 right-4 bg-secondary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            ¡Nuevo!
          </div>
          <div className="absolute bottom-4 left-4 bg-highlight text-primary px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            Pronto disponible
          </div>
        </div>
      </div>
    </section>
  );
}