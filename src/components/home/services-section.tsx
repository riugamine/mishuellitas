import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faHeadset } from '@fortawesome/free-solid-svg-icons';

export function ServicesSection() {
  return (
    <section id="servicios" className="w-full py-20 bg-muted/30 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-poppins font-bold text-4xl md:text-5xl text-center mb-16 text-foreground">
          Nuestros Servicios
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Delivery Service */}
          <div className="bg-background rounded-2xl p-8 shadow-lg border border-border">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-secondary/10 p-4 rounded-full">
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
                  <span className="font-montserrat font-semibold text-foreground">Gratuito</span>
                  <span className="font-montserrat text-foreground/70">10:00 AM - 6:00 PM</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="font-montserrat font-semibold text-foreground">Pago</span>
                  <span className="font-montserrat text-foreground/70">12:00 PM - 10:00 PM</span>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-secondary/5 rounded-lg">
                <p className="font-montserrat text-sm text-foreground/60">
                  ✅ Disponible todos los días (lunes a lunes)
                </p>
              </div>
            </div>
          </div>
          
          {/* Customer Service */}
          <div className="bg-background rounded-2xl p-8 shadow-lg border border-border">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-secondary/10 p-4 rounded-full">
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
              
              <div className="mt-4 p-4 bg-secondary/5 rounded-lg">
                <p className="font-montserrat text-sm text-foreground/60">
                  💬 Respuesta rápida y personalizada
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Payment Methods */}
        <div className="text-center">
          <h3 className="font-poppins font-bold text-3xl text-foreground mb-8">
            Métodos de Pago
          </h3>
          
          <div className="flex flex-wrap justify-center items-center gap-8">
            <PaymentMethod 
              name="Pago Móvil" 
              bgColor="bg-slate-800" 
              textColor="text-white"
            />
            <PaymentMethod 
              name="Efectivo" 
              bgColor="bg-green-700" 
              textColor="text-white"
            />
            <PaymentMethod 
              name="Zinli" 
              bgColor="bg-green-600" 
              textColor="text-white"
            />
            <PaymentMethod 
              name="Binance" 
              bgColor="bg-orange-500" 
              textColor="text-white"
            />
            <PaymentMethod 
              name="Banesco Panamá" 
              bgColor="bg-teal-600" 
              textColor="text-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

interface PaymentMethodProps {
  name: string;
  bgColor: string;
  textColor: string;
}

function PaymentMethod({ name, bgColor, textColor }: PaymentMethodProps) {
  return (
    <div className={`${bgColor} ${textColor} px-6 py-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 min-w-[140px]`}>
      <span className="font-montserrat font-bold text-sm">{name}</span>
    </div>
  );
}