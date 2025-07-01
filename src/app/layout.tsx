import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from '@/components/home/navbar';
import { Footer } from '@/components/home/footer';
import { Toaster } from 'sonner';

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Mis Huellitas - Accesorios para Mascotas | Ropa, Juguetes y Más",
    template: "%s | Mis Huellitas"
  },
  description: "🐾 Todo lo que tu peludo necesita en un solo lugar. Descubre nuestra increíble colección de ropa, accesorios y juguetes para perros y gatos. Productos de calidad, entrega rápida y amor garantizado. ¡Próximamente en línea!",
  keywords: [
    "accesorios mascotas",
    "ropa para perros",
    "ropa para gatos", 
    "juguetes mascotas",
    "collares perros",
    "productos mascotas",
    "tienda mascotas online",
    "Mis Huellitas",
    "accesorios peludos"
  ],
  authors: [{ name: "Mis Huellitas" }],
  creator: "Mis Huellitas",
  publisher: "Mis Huellitas",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mishuellitas.com'),
  alternates: {
    canonical: '/',
    languages: {
      'es-ES': '/es',
      'es': '/'
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://mishuellitas.com',
    title: 'Mis Huellitas - Todo para tu Mascota',
    description: '🐾 Descubre productos increíbles para tu peludo: ropa, accesorios y juguetes de calidad. ¡Próximamente disponible!',
    siteName: 'Mis Huellitas',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mis Huellitas - Accesorios para Mascotas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mis Huellitas - Todo para tu Mascota',
    description: '🐾 Productos increíbles para tu peludo: ropa, accesorios y juguetes. ¡Próximamente!',
    images: ['/twitter-image.jpg'],
    creator: '@mishuellitasmgta',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'TU_CODIGO_GOOGLE_VERIFICATION',
  },
  category: 'pets',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/svg+xml" />
        <meta name="theme-color" content="#355572" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "PetStore",
              "name": "Mis Huellitas",
              "description": "Tienda especializada en accesorios, ropa y juguetes para mascotas",
              "url": "https://mishuellitas.com",
              "logo": "https://mishuellitas.com/logo.png",
              "sameAs": [
                "https://www.instagram.com/mishuellitasmgta/"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Tu Ciudad",
                "addressCountry": "VE"
              },
              "openingHours": "Mo-Su 10:00-20:00",
              "priceRange": "$",
              "telephone": "+58-412-555-5555"
            })
          }}
        />
      </head>
      <body className={`${poppins.variable} ${montserrat.variable} font-montserrat antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
          <Footer />
          <Toaster 
            position="bottom-right"
            richColors
            closeButton
            duration={4000}
            className="font-poppins"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}