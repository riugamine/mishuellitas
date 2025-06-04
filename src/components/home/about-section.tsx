import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faPaw } from '@fortawesome/free-solid-svg-icons';

export function AboutSection() {
  return (
    <section id="quienes-somos" className="w-full py-20 bg-muted/30 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <FontAwesomeIcon icon={faPaw} className="h-8 w-8 text-secondary" />
            <span className="font-montserrat text-secondary font-medium text-lg">
              Nuestra Historia
            </span>
          </div>
          
          <h2 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            ¿Quiénes somos?
          </h2>
          
          <p className="font-montserrat text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Somos una familia de amantes de las mascotas que entiende perfectamente el amor incondicional que sientes por tu peludo
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden bg-gradient-to-br from-secondary/10 to-accent/10 p-6">
              <Image 
                src="/about-image.png" 
                alt="Familia Mis Huellitas - Amantes de las mascotas dedicados a brindar productos de calidad" 
                fill
                className="object-contain"
              />
              
              {/* Floating elements */}
              <div className="absolute top-6 right-6 bg-secondary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                <FontAwesomeIcon icon={faHeart} className="h-4 w-4" />
                Con amor
              </div>
              
              <div className="absolute bottom-6 right-6 bg-highlight text-primary px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                <FontAwesomeIcon icon={faStar} className="h-4 w-4" />
                Calidad
              </div>
            </div>
          </div>
          
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-6">
              <h3 className="font-poppins font-bold text-2xl md:text-3xl text-foreground">
                Nuestra pasión por los peluditos
              </h3>
              
              <div className="space-y-4 text-foreground/80">
                <p className="font-montserrat text-lg leading-relaxed">
                  En <strong className="text-secondary">Mis Huellitas</strong> sabemos que tu mascota no es solo una compañía, 
                  es un miembro más de la familia. Por eso, nos dedicamos a ofrecerte una cuidadosa selección de 
                  <strong className="text-foreground"> ropa, accesorios y juguetes</strong> que harán que tu peludo se sienta cómodo, seguro y feliz.
                </p>
                

              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-background rounded-2xl border border-border shadow-md">
                <div className="text-3xl mb-3">🐕</div>
                <h4 className="font-poppins font-semibold text-foreground mb-2">Para Perros</h4>
                <p className="font-montserrat text-sm text-foreground/70">
                  Ropa, collares y juguetes
                </p>
              </div>
              
              <div className="text-center p-6 bg-background rounded-2xl border border-border shadow-md">
                <div className="text-3xl mb-3">🐱</div>
                <h4 className="font-poppins font-semibold text-foreground mb-2">Para Gatos</h4>
                <p className="font-montserrat text-sm text-foreground/70">
                  Accesorios y diversión
                </p>
              </div>
              
              <div className="text-center p-6 bg-background rounded-2xl border border-border shadow-md">
                <div className="text-3xl mb-3">❤️</div>
                <h4 className="font-poppins font-semibold text-foreground mb-2">Con Amor</h4>
                <p className="font-montserrat text-sm text-foreground/70">
                  Productos seleccionados especialmente
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}