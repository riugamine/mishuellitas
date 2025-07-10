"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPaw,
  faBone,
  faCircle,
  faBaseballBall,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { CurvedDivider } from "@/components/ui/curved-divider";
import type { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";

export function HeroSection() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+584248805609";
    const message = encodeURIComponent("¡Hola! Bienvenido a Mis Huellitas Margarita, estamos encantados de tenerte aquí. ¿Cómo podemos ayudarte?");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="w-full flex flex-col justify-center bg-secondary dark:bg-secondary relative overflow-hidden">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-10 ">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[70vh]">
            {/* Left Content */}
            <div className="space-y-8 z-10 animate-slide-in-left z-20">
              <div className="space-y-6">
                <h1 className="font-poppins font-bold text-5xl sm:text-6xl md:text-7xl lg:text-6xl text-white leading-tight">
                  Estilo y comodidad
                  <br className="hidden sm:block" />
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                      para tu mascota
                    </span>
                  </span>
                </h1>

                <p className="font-montserrat text-xl text-white/80 max-w-lg leading-relaxed">
                  Conoce nuestra colección de accesorios y ropa para mascotas.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6 ">
                <Link href="/productos">
                  <Button
                    className=" bg-white text-primary hover:bg-white/90 transition-all duration-300 text-lg font-semibold px-10 py-7 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105"
                    size="lg"
                  >
                    <FontAwesomeIcon icon={faPaw} className="h-6 w-6 mr-3" />
                    VER PRODUCTOS
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  onClick={handleWhatsAppClick}
                  className="border-2 border-white text-primary dark:text-white hover:bg-white hover:text-primary transition-all duration-300 text-lg font-semibold px-10 py-7 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105"
                  size="lg"
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="h-6 w-6 mr-3" />
                  CONTACTAR
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative z-10 h-full min-h-[600px] lg:min-h-[80vh] animate-fade-in-up">
              <div className="relative w-full h-full max-w-2xl mx-auto">
                {/* Main dog image */}
                <div className="relative w-full h-full">
                  <Image
                    src="https://res.cloudinary.com/dhzl31kb8/image/upload/v1751399917/Fondo_Landing_Page_desaturada_ryz6cg.png"
                    alt="Perro y gato - Accesorios premium Mis Huellitas"
                    fill
                    priority
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Floating decorative elements */}
                <div
                  className="absolute top-10 -left-0 bg-white/20 backdrop-blur-sm text-white px-6 py-4 rounded-full text-lg font-bold shadow-xl animate-fade-in-up"
                  style={{ animationDelay: "0.8s" }}
                >
                  <FontAwesomeIcon icon={faHeart} className="h-5 w-5 mr-2" />
                  Con amor
                </div>

                <div
                  className="absolute top-1/4 -right-0 bg-white/20 backdrop-blur-sm text-white px-6 py-4 rounded-full text-lg font-bold shadow-xl animate-fade-in-up"
                  style={{ animationDelay: "1.2s" }}
                >
                  <FontAwesomeIcon icon={faPaw} className="h-5 w-5 mr-2" />
                  Premium
                </div>

                <div
                  className="absolute bottom-50 -left-0 bg-white/20 backdrop-blur-sm text-white px-6 py-4 rounded-full text-lg font-bold shadow-xl animate-fade-in-up"
                  style={{ animationDelay: "1.6s" }}
                >
                  ✨ Calidad
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Curved divider from hero */}
      <CurvedDivider
        variant="organic"
        direction="up"
        color="hsl(var(--background))"
        height={150}
        className="-mt-50 z-10 md:-mt-30 lg:-mt-50"
      />
      {/* Decorative pet-themed elements */}
      <DecorativeElements />
    </section>
  );
}

/**
 * Renders a collection of decorative pet-themed icons, positioned absolutely
 * within the hero section. These elements add visual flair and are animated
 * to create a dynamic background.
 */
function DecorativeElements() {
  interface DecorativeElement {
    icon: IconProp;
    size: SizeProp;
    className: string;
  }

  const elements: DecorativeElement[] = [
    // Top-left decorative elements
    {
      icon: faCircle,
      size: "lg",
      className:
        "absolute top-[10%] left-[5%] sm:top-[12%] sm:left-[8%] text-white/30 animate-pulse",
    },
    {
      icon: faPaw,
      size: "2xl",
      className:
        "absolute top-[45%] left-[8%] sm:top-[50%] sm:left-[5%] text-white/40 animate-float transform rotate-12",
    },
    // Center-top decorative element
    {
      icon: faBone,
      size: "2xl",
      className:
        "absolute top-[18%] left-[40%] sm:top-[15%] sm:left-1/2 text-white/30 animate-float transform -rotate-45",
    },
    {
      icon: faPaw,
      size: "2xl",
      className:
        "absolute top-[40%] left-[40%] sm:top-[45%] sm:left-1/2 text-white/30 animate-float transform -rotate-45",
    },
    // Top-right decorative elements
    {
      icon: faBone,
      size: "xl",
      className:
        "absolute top-[8%] right-[10%] sm:top-[10%] sm:right-[12%] text-white/40 animate-float transform rotate-45",
    },
    {
      icon: faBaseballBall,
      size: "2xl",
      className:
        "absolute top-[40%] right-[8%] sm:top-[45%] sm:right-[10%] text-white/50 animate-bounce",
    },
    // Bottom-right decorative elements
    {
      icon: faCircle,
      size: "xl",
      className:
        "absolute bottom-[20%] right-[15%] sm:bottom-[18%] sm:right-[12%] text-white/30 animate-pulse",
    },
    // Bottom-left decorative element (visible on larger screens)
    {
      icon: faPaw,
      size: "xl",
      className:
        "absolute bottom-[25%] left-[20%] text-white/40 animate-float transform -rotate-12 hidden md:block",
    },
  ];

  return (
    <>
      {elements.map((el, index) => (
        <div key={index} className={el.className}>
          <FontAwesomeIcon icon={el.icon} size={el.size} />
        </div>
      ))}
    </>
  );
}
