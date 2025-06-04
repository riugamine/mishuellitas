import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPaw } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-8 bg-primary text-primary-foreground px-6 md:px-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary-foreground/10 p-2 rounded-full">
            <FontAwesomeIcon icon={faPaw} className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-poppins font-bold text-lg">Mis Huellitas</span>
        </div>
        
        <div className="flex items-center gap-1 font-montserrat text-sm">
          <span>Hecho con</span>
          <FontAwesomeIcon icon={faHeart} className="h-4 w-4 text-highlight animate-pulse" />
          <span>para tus peluditos</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Link 
            href="https://www.instagram.com/mishuellitasmgta/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-foreground hover:text-highlight transition-colors duration-300 transform hover:scale-110"
          >
            <FontAwesomeIcon icon={faInstagram} className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
}