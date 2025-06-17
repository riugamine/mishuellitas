import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faHeadset } from '@fortawesome/free-solid-svg-icons';
export function ServicesSection() {
  return (
    <>
      <section 
        id="servicios" 
        className="w-full py-32 px-6 md:px-10 relative bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          background: `
            url('https://res.cloudinary.com/dhzl31kb8/image/upload/v1749765962/pexels-helenalopes-5268315_j9axth_c_fill_w_1920_h_1080_ar_16_9_ajycnf.jpg')
          `,
          backgroundBlendMode: 'overlay'
        }}
      >

        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-center mb-16 text-white drop-shadow-lg animate-fade-in-up">
            Nuestros Servicios
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Delivery Service */}
            <div 
              className="bg-primary dark:bg-accent backdrop-blur-sm p-8 shadow-xl border border-white/20 dark:border-primary/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-slide-in-left"
              style={{ 
                borderRadius: '2rem 0.8rem 2rem 0.8rem',
                animationDelay: '0.2s'
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-secondary/20 p-4 rounded-full">
                  <FontAwesomeIcon icon={faTruck} className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-poppins font-bold text-2xl text-white">Delivery</h3>
              </div>
              
              <div className="space-y-4">
                <p className="font-montserrat text-white/70 mb-6">
                  Entrega rápida y confiable para tu comodidad
                </p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="font-montserrat font-semibold text-white">Pago</span>
                    <span className="font-montserrat text-white/70">12:00 PM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-montserrat font-semibold text-white">Envios nacionales</span>
                    <span className="font-montserrat text-white/70">ZOOM , MRW</span>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-secondary/10 rounded-2xl">
                  <p className="font-montserrat text-sm text-white/60">
                    ✅ Disponible todos los días (lunes a lunes)
                  </p>
                </div>
              </div>
            </div>
            
            {/* Customer Service */}
            <div 
              className="bg-primary dark:bg-accent p-8 shadow-xl border border-white/20 dark:border-primary/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-slide-in-right"
              style={{ 
                borderRadius: '0.8rem 2rem 0.8rem 2rem',
                animationDelay: '0.4s'
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-secondary/20 p-4 rounded-full">
                  <FontAwesomeIcon icon={faHeadset} className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-poppins font-bold text-2xl text-white">Atención al Cliente</h3>
              </div>
              
              <div className="space-y-4">
                <p className="font-montserrat text-white/70 mb-6">
                  Soporte personalizado las 24/7
                </p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="font-montserrat font-semibold text-white">Por WhatsApp</span>
                    <span className="font-montserrat text-white/70">10:00 AM - 8:00 PM</span>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-secondary/10 rounded-2xl">
                  <p className="font-montserrat text-sm text-white/60">
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
      className={`${bgColor} ${textColor} cursor-pointer backdrop-blur-sm px-6 py-4 shadow-md hover:bg-primary/80 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 min-w-[140px] animate-fade-in-up`}
      style={{ 
        borderRadius: '1.5rem 0.5rem 1.5rem 0.5rem',
        animationDelay: delay
      }}
    >
      <span className="font-montserrat font-bold text-sm">{name}</span>
    </div>
  );
}