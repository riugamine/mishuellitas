import { AboutSection } from "@/components/home/about-section";
import { HeroSection } from "@/components/home/hero-section";
import { ProductsSection } from "@/components/home/products-section";
import { ServicesSection } from "@/components/home/services-section";


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <ServicesSection />
    </main>
  );
}