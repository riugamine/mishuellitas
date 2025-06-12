import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faHeadset } from '@fortawesome/free-solid-svg-icons';
import { CurvedDivider } from '@/components/ui/curved-divider';

export function ServicesSection() {
  return (
    <>
      <section 
        id="servicios" 
        className="w-full py-32 px-6 md:px-10 relative bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          background: `
            linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--primary)) 100%),
            url('https://res.cloudinary.com/dhzl31kb8/image/upload/v1749399565/pexels-helenalopes-5268315_j9axth.jpg')
          `,
          backgroundBlendMode: 'overlay'
        }}
      >
        {/* Curved background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 via-primary/70 to-accent/60 z-0" />
        
        {/* Organic floating shapes */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 backdrop-blur-sm animate-float opacity-40"
          style={{ 
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            animationDelay: '1s'
          }}
        ></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/15 backdrop-blur-sm animate-float opacity-50"
          style={{ 
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            animationDelay: '3s'
          }}
        ></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 animate-pulse"
          style={{ borderRadius: '50% 20% 50% 20%' }}
        ></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-center mb-16 text-white drop-shadow-lg animate-fade-in-up">
            Nuestros Servicios
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Delivery Service */}
            <div 
              className="bg-white/95 backdrop-blur-sm p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-slide-in-left"
              style={{ 
                borderRadius: '2rem 0.8rem 2rem 0.8rem',
                animationDelay: '0.2s'
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-secondary/20 p-4 rounded-full">
                  <FontAwesomeIcon icon={faTruck} className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-poppins font-bold text-2xl text-foreground">Delivery</h3>
              </div>
              
              <div className="space-y-4">
                <p className="font-montserrat text-foreground/70 mb-6">
                  Entrega rápida y confiable para tu comodidad
                </p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="font-montserrat font-semibold text-foreground">Pago</span>
                    <span className="font-montserrat text-foreground/70">12:00 PM - 10:00 PM</span>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-secondary/10 rounded-2xl">
                  <p className="font-montserrat text-sm text-foreground/60">
                    ✅ Disponible todos los días (lunes a lunes)
                  </p>
                </div>
              </div>
            </div>
            
            {/* Customer Service */}
            <div 
              className="bg-white/95 backdrop-blur-sm p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-slide-in-right"
              style={{ 
                borderRadius: '0.8rem 2rem 0.8rem 2rem',
                animationDelay: '0.4s'
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-secondary/20 p-4 rounded-full">
                  <FontAwesomeIcon icon={faHeadset} className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-poppins font-bold text-2xl text-foreground">Atención al Cliente</h3>
              </div>
              
              <div className="space-y-4">
                <p className="font-montserrat text-foreground/70 mb-6">
                  Soporte personalizado las 24/7
                </p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="font-montserrat font-semibold text-foreground">Por WhatsApp</span>
                    <span className="font-montserrat text-foreground/70">10:00 AM - 8:00 PM</span>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-secondary/10 rounded-2xl">
                  <p className="font-montserrat text-sm text-foreground/60">
                    💬 Respuesta rápida y personalizada
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Payment Methods */}
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <h3 className="font-poppins font-bold text-3xl text-white mb-8 drop-shadow-lg">
              Métodos de Pago
            </h3>
            
            <div className="flex flex-wrap justify-center items-center gap-8">
              <PaymentMethod 
                name="Pago Móvil" 
                bgColor="bg-white/20" 
                textColor="text-white"
                delay="0.8s"
              />
              <PaymentMethod 
                name="Efectivo" 
                bgColor="bg-white/20" 
                textColor="text-white"
                delay="1.0s"
              />
              <PaymentMethod 
                name="Zinli" 
                bgColor="bg-white/20" 
                textColor="text-white"
                delay="1.2s"
              />
              <PaymentMethod 
                name="Binance" 
                bgColor="bg-white/20" 
                textColor="text-white"
                delay="1.4s"
              />
              <PaymentMethod 
                name="Banesco Panamá" 
                bgColor="bg-white/20" 
                textColor="text-white"
                delay="1.6s"
              />
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

interface PaymentMethodProps {
  name: string;
  bgColor: string;
  textColor: string;
  delay?: string;
}

function PaymentMethod({ name, bgColor, textColor, delay = '0s' }: PaymentMethodProps) {
  return (
    <div 
      className={`${bgColor} ${textColor} backdrop-blur-sm px-6 py-4 shadow-md hover:bg-white/30 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 min-w-[140px] animate-fade-in-up`}
      style={{ 
        borderRadius: '1.5rem 0.5rem 1.5rem 0.5rem',
        animationDelay: delay
      }}
    >
      <span className="font-montserrat font-bold text-sm">{name}</span>
    </div>
  );
}