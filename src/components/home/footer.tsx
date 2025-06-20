'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPaw } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full py-16 bg-background dark:text-white text-primary px-6 md:px-10 relative overflow-hidden">
      {/* Curved background shapes */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-primary/5 dark:bg-white/5 animate-morph opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-primary/10 dark:bg-white/10 animate-blob opacity-40" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-primary/5 dark:bg-white/5 animate-organic-pulse"
        style={{ 
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          animationDelay: '1s'
        }}
      ></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 animate-fade-in-up">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start gap-4 transform transition-transform duration-300 hover:scale-105">
            <Link href="/" className="flex items-center gap-3 transform hover:scale-105 transition-transform duration-300">
              <div className="relative">
                <div className="absolute -inset-2 bg-white/10 rounded-full blur-md"></div>
                <Image 
                  src="https://res.cloudinary.com/dhzl31kb8/image/upload/v1750344275/01-A_jidteo_c_crop_w_5003_h_3729_yeywui.png"
                  alt="Mis Huellitas" 
                  width={150} 
                  height={150} 
                  priority={true}
                  className="relative z-10 drop-shadow-lg dark:hidden"
                />
                <Image 
                  src="https://res.cloudinary.com/dhzl31kb8/image/upload/v1750344009/01-A_qnmiib.png"
                  alt="Mis Huellitas" 
                  width={150} 
                  height={150} 
                  priority={true}
                  className="relative z-10 drop-shadow-lg hidden dark:block"
                />
              </div>
            </Link>
            
            <div className="text-center md:text-left">
              
              <p className="font-montserrat text-sm text-primary dark:text-white max-w-xs">
                Accesorios y ropa con estilo propio para mascotas únicas como la tuya
              </p>
            </div>
          </div>
          
          {/* Center Section */}
          <div className="flex flex-col items-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex flex-wrap justify-center items-center gap-2 font-montserrat text-sm sm:text-base lg:text-lg bg-primary/10 dark:bg-white/10 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full text-center">
              <span>Hecho con</span>
              <div className="animate-pulse">
                <FontAwesomeIcon icon={faHeart} className="h-4 w-4 sm:h-5 sm:w-5 text-red-300" />
              </div>
              <span>para tus peluditos</span>
              <FontAwesomeIcon icon={faPaw} className="h-4 w-4 sm:h-5 sm:w-5 text-primary/80 dark:text-white" />
            </div>
            
            {/* Quick Links */}
            <div className="flex gap-6 text-sm">
              <Link href="#quienes-somos" className="text-primary/80 hover:text-primary dark:text-white transition-colors duration-300 hover:underline">
                Nosotros
              </Link>
              <Link href="#productos" className="text-primary/80 hover:text-primary dark:text-white transition-colors duration-300 hover:underline">
                Productos
              </Link>
              <Link href="#servicios" className="text-primary/80 hover:text-primary dark:text-white transition-colors duration-300 hover:underline">
                Servicios
              </Link>
            </div>
          </div>
          
          {/* Social Section */}
          <div className="flex flex-col items-center md:items-end gap-4 animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
            <div className="text-center md:text-right">
              <h4 className="font-poppins font-semibold text-primary dark:text-white mb-2">Síguenos</h4>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="transform transition-all duration-200 hover:scale-125 hover:rotate-12">
                <Link 
                  href="https://www.instagram.com/mishuellitasmgta/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-primary/10 dark:bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-all duration-300 block"
                >
                  <FontAwesomeIcon icon={faInstagram} className="h-6 w-6 text-primary dark:text-white" />
                </Link>
              </div>
              <div className="transform transition-all duration-200 hover:scale-125 hover:rotate-12">
                <Link 
                  href="https://www.tiktok.com/@mishuellitasmgta" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-primary/10 dark:bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-all duration-300 block"
                >
                  <FontAwesomeIcon icon={faTiktok} className="h-6 w-6 text-primary dark:text-white" />
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <p className="font-montserrat text-sm text-primary dark:text-white/70">
            © 2025 Mis Huellitas. Todos los derechos reservados. Hecho con amor para tu mascota.
          </p>
        </div>
      </div>
      
    </footer>
  );
}