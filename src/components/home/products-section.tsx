import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { CurvedDivider } from '@/components/ui/curved-divider';

export function ProductsSection() {
  return (
    <>
      <section id="productos" className="w-full py-32 px-4 sm:px-6 md:px-10 bg-background relative overflow-hidden">
        {/* Curved background shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent/20 to-secondary/10 rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-primary/20 to-accent/10 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '3s' }}></div>
        
        {/* Organic decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-secondary/10 opacity-40 animate-float"
          style={{ 
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            animationDelay: '2s'
          }}
        ></div>
        <div className="absolute bottom-40 right-16 w-24 h-24 bg-primary/10 opacity-30 animate-float"
          style={{ 
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            animationDelay: '4s'
          }}
        ></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-center mb-16 text-foreground animate-fade-in-up">
            Nuestros Productos
          </h2>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Tabs defaultValue="ropa" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-12 bg-muted/50 backdrop-blur-sm border border-secondary/20 rounded-3xl p-0">
                <TabsTrigger 
                  value="ropa" 
                  className="font-poppins text-sm sm:text-base text-foreground data-[state=active]:bg-secondary data-[state=active]:text-primary-foreground transition-all duration-300 rounded-2xl"
                >
                  Ropa
                </TabsTrigger>
                <TabsTrigger 
                  value="accesorios" 
                  className="font-poppins text-sm sm:text-base text-foreground data-[state=active]:bg-secondary data-[state=active]:text-primary-foreground transition-all duration-300 rounded-2xl"
                >
                  Accesorios
                </TabsTrigger>
                <TabsTrigger 
                  value="juguetes" 
                  className="font-poppins text-sm sm:text-base text-foreground data-[state=active]:bg-secondary data-[state=active]:text-primary-foreground transition-all duration-300 rounded-2xl"
                >
                  Juguetes
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="ropa" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <ProductCard 
                    title="Ropa para perros pequeños" 
                    description="Diseños exclusivos para los más pequeños"
                    imagePath="https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764397/Sullivan_rosado_2_urmydb.png"
                    delay="0.1s"
                  />
                  <ProductCard 
                    title="Ropa para perros medianos y grandes" 
                    description="Comodidad y estilo para todos los tamaños"
                    imagePath="https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764423/Sudadera_de_tigre_1_n4aj07.png"
                    delay="0.2s"
                  />
                  <ProductCard 
                    title="Ropa para gatitos" 
                    description="Para gatitos con estilo y personalidad"
                    imagePath="https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764378/Sudadera_de_dinosaurio_1_nil4pm.png"
                    delay="0.3s"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="accesorios" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <ProductCard 
                    title="Collares" 
                    description="Con broche, hebilla, corbatín y tácticos"
                    imagePath="https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764446/Collar_de_corazones_1_bwbnkb.png"
                    delay="0.1s"
                  />
                  <ProductCard 
                    title="Bandanas" 
                    description="Estilo y personalidad para tu mascota"
                    imagePath="https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764470/Bandana_azul_huesos_4_dl2t4b.png"
                    delay="0.2s"
                  />
                  <ProductCard 
                    title="Plaquitas personalizadas" 
                    description="Identifica a tu mascota con estilo"
                    imagePath="https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764500/20250308_164403_vl4i1i.jpg"
                    delay="0.3s"
                  />
                  <ProductCard 
                    title="Pecheras" 
                    description="Seguridad y comodidad para tus paseos"
                    imagePath="https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764536/Pechera_peque%C3%B1a_7_fmwtiv.png"
                    delay="0.4s"
                  />
                  <ProductCard 
                    title="Correas" 
                    description="Resistentes y con diseños exclusivos"
                    imagePath="https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764564/Correas_tacticas_1_t8jjku.png"
                    delay="0.5s"
                  />
                  <ProductCard 
                    title="Otros accesorios" 
                    description="Cepillos, fuentes de agua, snacks y más"
                    imagePath="https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764584/Lentes_redondos_1_xndsmy.png"
                    delay="0.6s"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="juguetes" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <ProductCard 
                    title="Juguetes para gatos" 
                    description="Diversión y entretenimiento para tu felino"
                    imagePath="https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764644/Pelota_interactiva_2_q6odbu.png"
                    delay="0.1s"
                  />
                  <ProductCard 
                    title="Juguetes para perros" 
                    description="Resistentes y divertidos para todas las razas"
                    imagePath="https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764743/Gorra_de_dinosaurios_2_mdub81.png"
                    delay="0.2s"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
}

interface ProductCardProps {
  title: string;
  description: string;
  imagePath: string;
  delay?: string;
}

function ProductCard({ title, description, imagePath, delay = '0s' }: ProductCardProps) {
  const borderRadiusVariants = [
    '2rem 0.5rem 2rem 0.5rem',
    '0.5rem 2rem 0.5rem 2rem',
    '2rem 2rem 0.5rem 0.5rem',
    '0.5rem 0.5rem 2rem 2rem',
    '1.5rem 0.8rem 1.5rem 0.8rem',
    '0.8rem 1.5rem 0.8rem 1.5rem'
  ];
  
  const randomBorderRadius = borderRadiusVariants[Math.floor(Math.random() * borderRadiusVariants.length)];

  return (
    <div
      className="h-full animate-fade-in-up"
      style={{ animationDelay: delay }}
    >
      <Card 
        className="pt-0 overflow-hidden hover:shadow-xl transition-all duration-500 group border border-border bg-card/50 backdrop-blur-sm h-full transform hover:-translate-y-2 hover:scale-105"
        style={{ borderRadius: randomBorderRadius }}
      >
        <div className="relative h-64 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Image 
            src={imagePath} 
            alt={title} 
            fill
            className="object-contain transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <CardHeader className="relative">
          <div className="absolute -top-4 left-4 w-8 h-8 bg-secondary/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{ borderRadius: '50% 20% 50% 20%' }}
          ></div>
          <CardTitle className="font-poppins text-lg text-foreground group-hover:text-secondary transition-colors duration-300 relative z-10">
            {title}
          </CardTitle>
          <CardDescription className="font-montserrat text-foreground/70 relative z-10">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}