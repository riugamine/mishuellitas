import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer, faPaw, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

interface UnderConstructionProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function UnderConstruction({ title, description, icon }: UnderConstructionProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Animated construction icon */}
        <div className="relative mb-8">
          <div className="flex items-center justify-center space-x-4 text-6xl mb-4">
            {icon || <span>🚧</span>}
            <FontAwesomeIcon 
              icon={faHammer} 
              className="h-12 w-12 text-secondary animate-bounce" 
            />
          </div>
          
          <div className="flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faPaw} className="h-6 w-6 text-secondary" />
            <span className="font-montserrat text-secondary font-medium text-lg">
              Mis Huellitas
            </span>
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-6">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-foreground">
            {title}
          </h1>
          
          <div className="space-y-4">
            <p className="font-montserrat text-xl text-foreground/80 leading-relaxed">
              {description}
            </p>
            
            <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
              <h2 className="font-poppins font-semibold text-2xl text-foreground mb-3">
                🐾 ¡Estamos preparando algo genial!
              </h2>
              <p className="font-montserrat text-foreground/70 leading-relaxed">
                Nuestro equipo está trabajando duro para crear una experiencia increíble 
                llena de productos especiales para tu peludo. Muy pronto podrás disfrutar 
                de todo lo que tenemos preparado con mucho amor.
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link href="/">
            <Button 
              className="bg-secondary hover:bg-secondary/90 text-primary-foreground transition-all duration-300 text-base font-semibold px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              size="lg"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5 mr-2" />
              Volver al inicio
            </Button>
          </Link>
          
          <Link href="https://www.instagram.com/mishuellitasmgta/" target="_blank" rel="noopener noreferrer">
            <Button 
              variant="outline" 
              className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-primary-foreground transition-all duration-300 text-base font-semibold px-8 py-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1"
              size="lg"
            >
              <FontAwesomeIcon icon={faInstagram} className="h-5 w-5 mr-2" />
              Síguenos en Instagram
            </Button>
          </Link>
        </div>

        {/* Footer message */}
        <div className="pt-12 pb-8">
          <p className="font-montserrat text-sm text-foreground/60">
            Síguenos en nuestras redes sociales para estar al día con todas las novedades
          </p>
        </div>
      </div>
    </div>
  );
} 