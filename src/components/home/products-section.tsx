import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export function ProductsSection() {
  return (
    <section id="productos" className="w-full py-20 px-4 sm:px-6 md:px-10 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-poppins font-bold text-4xl md:text-5xl text-center mb-16 text-foreground">
          Nuestros Productos
        </h2>
        
        <Tabs defaultValue="ropa" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-12 bg-muted">
            <TabsTrigger 
              value="ropa" 
              className="font-poppins text-sm sm:text-base text-foreground data-[state=active]:bg-secondary data-[state=active]:text-primary-foreground transition-colors duration-300"
            >
              Ropa
            </TabsTrigger>
            <TabsTrigger 
              value="accesorios" 
              className="font-poppins text-sm sm:text-base text-foreground data-[state=active]:bg-secondary data-[state=active]:text-primary-foreground transition-colors duration-300"
            >
              Accesorios
            </TabsTrigger>
            <TabsTrigger 
              value="juguetes" 
              className="font-poppins text-sm sm:text-base text-foreground data-[state=active]:bg-secondary data-[state=active]:text-primary-foreground transition-colors duration-300"
            >
              Juguetes
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ropa" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <ProductCard 
                title="Ropa para perros pequeños" 
                description="Diseños exclusivos para los más pequeños"
                imagePath="/products/small-dog-clothes.png"
              />
              <ProductCard 
                title="Ropa para perros medianos y grandes" 
                description="Comodidad y estilo para todos los tamaños"
                imagePath="/products/large-dog-clothes.png"
              />
              <ProductCard 
                title="Ropa para gatitos" 
                description="Para gatitos con estilo y personalidad"
                imagePath="/products/cat-clothes.png"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="accesorios" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <ProductCard 
                title="Collares" 
                description="Con broche, hebilla, corbatín y tácticos"
                imagePath="/products/collars.png"
              />
              <ProductCard 
                title="Bandanas" 
                description="Estilo y personalidad para tu mascota"
                imagePath="/products/bandanas.png"
              />
              <ProductCard 
                title="Plaquitas personalizadas" 
                description="Identifica a tu mascota con estilo"
                imagePath="/products/tags.png"
              />
              <ProductCard 
                title="Pecheras" 
                description="Seguridad y comodidad para tus paseos"
                imagePath="/products/harnesses.png"
              />
              <ProductCard 
                title="Correas" 
                description="Resistentes y con diseños exclusivos"
                imagePath="/products/leashes.png"
              />
              <ProductCard 
                title="Otros accesorios" 
                description="Cepillos, fuentes de agua, snacks y más"
                imagePath="/products/accessories.png"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="juguetes" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <ProductCard 
                title="Juguetes para gatos" 
                description="Diversión y entretenimiento para tu felino"
                imagePath="/products/cat-toys.png"
              />
              <ProductCard 
                title="Juguetes para perros" 
                description="Resistentes y divertidos para todas las razas"
                imagePath="/products/dog-toys.png"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

interface ProductCardProps {
  title: string;
  description: string;
  imagePath: string;
}

function ProductCard({ title, description, imagePath }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border border-border bg-card">
      <div className="relative h-48 w-full overflow-hidden">
        <Image 
          src={imagePath} 
          alt={title} 
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader>
        <CardTitle className="font-poppins text-lg text-foreground group-hover:text-secondary transition-colors duration-300">
          {title}
        </CardTitle>
        <CardDescription className="font-montserrat text-foreground/70">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}