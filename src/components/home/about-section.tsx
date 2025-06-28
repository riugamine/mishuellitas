import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faPaw } from '@fortawesome/free-solid-svg-icons';

export function AboutSection() {
  return (
    <>
      <section 
        id="quienes-somos" 
        className="w-full pt-16 pb-32 bg-background px-6 md:px-10 relative overflow-hidden"
      >
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="bg-secondary/20 p-3 rounded-full">
                <FontAwesomeIcon icon={faPaw} className="h-8 w-8 text-secondary" />
              </div>
              <span className="font-montserrat text-secondary font-medium text-xl">
                Nuestra Historia
              </span>
            </div>
            
            <h2 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              ¿Quiénes somos?
            </h2>
            
            <p className="font-montserrat text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Somos amantes de los animales que creen que cada peludo merece sentirse amado, cómodo y especial. Más que una tienda, somos un rincón hecho con cariño para quienes entienden que una mascota es familia.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div className="relative order-2 lg:order-1 animate-slide-in-left">
              <div className="relative h-[500px] md:h-[600px] w-full">
                
                <div 
                  className="relative h-full w-full bg-gradient-to-br from-secondary/10 via-accent/10 to-primary/10 shadow-2xl overflow-hidden"
                  style={{
                    borderRadius: '3rem 6rem 3rem 6rem'
                  }}
                >
                  <Image 
                    src="https://res.cloudinary.com/dhzl31kb8/image/upload/f_auto,q_auto:good,w_700,h_700,c_fill,g_center/v1749071557/el-perro-dalmata-feliz-sonriendo_syafug.jpg" 
                    alt="Familia Mis Huellitas - Amantes de las mascotas dedicados a brindar productos de calidad" 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                
                {/* Floating elements with curved backgrounds */}
                <div className="absolute top-8 right-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                  <div className="bg-white/95 backdrop-blur-sm text-secondary px-6 py-4 shadow-xl rounded-3xl">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faHeart} className="h-5 w-5" />
                      <span className="font-bold text-lg">Con amor</span>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-8 right-12 animate-fade-in-up" style={{ animationDelay: '1s' }}>
                  <div className="bg-secondary text-white px-6 py-4 shadow-xl rounded-3xl">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faStar} className="h-5 w-5" />
                      <span className="font-bold text-lg">Calidad</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8 order-1 lg:order-2 animate-slide-in-right">
              <div className="space-y-6">
                <h3 className="font-poppins font-bold text-3xl md:text-4xl text-foreground">
                  Nuestra pasión por los peluditos
                </h3>
                
                <div className="space-y-4 text-foreground/80">
                  <p className="font-montserrat text-lg leading-relaxed">
                    En <strong className="text-secondary">Mis Huellitas</strong> sabemos que tu mascota no es solo una compañía, 
                    es un miembro más de la familia. Por eso, nos dedicamos a ofrecerte una cuidadosa selección de 
                    <strong className="text-foreground"> ropa, accesorios y juguetes</strong> que harán que tu peludo se sienta cómodo, seguro y feliz.
                  </p>
                  
                  <p className="font-montserrat text-lg leading-relaxed">
                    Cada producto que elegimos pasa por un riguroso proceso de selección, priorizando la 
                    <strong className="text-secondary"> calidad, seguridad y comodidad</strong> para tu mascota.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div 
                  className="text-center p-8 bg-white/90 dark:bg-accent backdrop-blur-sm shadow-lg border border-secondary/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                  style={{ 
                    borderRadius: '2rem 0.5rem 2rem 0.5rem',
                    animationDelay: '0.2s'
                  }}
                >
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <Image 
                      src="/icons/perro.png"
                      alt="Perro icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h4 className="font-poppins font-semibold text-foreground mb-3 text-lg">Para tu peludo</h4>
                  <p className="font-montserrat text-sm text-foreground/70">
                  Ropa y accesorios 
                  </p>
                </div>
                
                <div 
                  className="text-center p-8 bg-white/90 dark:bg-accent backdrop-blur-sm shadow-lg border border-secondary/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                  style={{ 
                    borderRadius: '0.5rem 2rem 0.5rem 2rem',
                    animationDelay: '0.4s'
                  }}
                >
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <Image 
                      src="/icons/gato.png"
                      alt="Gato icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h4 className="font-poppins font-semibold text-foreground mb-3 text-lg">Variedad que encanta</h4>
                  <p className="font-montserrat text-sm text-foreground/70">
                  Práctico, lindo y seguro
                  </p>
                </div>
                
                <div 
                  className="text-center p-8 bg-white/90 dark:bg-accent backdrop-blur-sm shadow-lg border border-secondary/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                  style={{ 
                    borderRadius: '2rem 0.5rem 2rem 0.5rem',
                    animationDelay: '0.6s'
                  }}
                >
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <Image 
                      src="/icons/corazon.png"
                      alt="Corazón icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h4 className="font-poppins font-semibold text-foreground mb-3 text-lg">Con Amor</h4>
                  <p className="font-montserrat text-sm text-foreground/70">
                    Productos seleccionados pensando en el estilo de tu mascota
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative curved elements más elaborados */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-secondary/20 to-primary/10 opacity-30 animate-float"
          style={{ 
            borderRadius: '50% 20% 50% 20%',
            animationDelay: '2s' 
          }}
        ></div>
        
        <div className="absolute bottom-32 left-8 w-24 h-24 bg-gradient-to-tl from-accent/20 to-secondary/10 opacity-40 animate-float"
          style={{ 
            borderRadius: '20% 50% 20% 50%',
            animationDelay: '3s' 
          }}
        ></div>
        
        <div className="absolute top-1/2 left-16 w-16 h-16 bg-primary/10 opacity-30 animate-pulse"
          style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
        ></div>
      </section>
      

    </>
  );
}