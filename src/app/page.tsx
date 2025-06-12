import { AboutSection } from "@/components/home/about-section";
import { Footer } from "@/components/home/footer";
import { HeroSection } from "@/components/home/hero-section";
import { Navbar } from "@/components/home/navbar";
import { ProductsSection } from "@/components/home/products-section";
import { ServicesSection } from "@/components/home/services-section";


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <ServicesSection />
      <Footer />
    </main>
  );
}