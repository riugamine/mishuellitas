'use client'
import { UnderConstruction } from "@/components/ui/under-construction";
import React, { useState } from 'react';
import Link from 'next/link';
import { categorias, productos, imagenesProductos } from '@/lib/placeholder-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ProductCard } from '@/components/product/product-card';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faHeart, faPaw, faBone, faCircle, faBaseballBall } from '@fortawesome/free-solid-svg-icons';
import { Label } from '@/components/ui/label';
import type { SizeProp } from '@fortawesome/fontawesome-svg-core';

// Utilidad para obtener la imagen principal de un producto
const getImagenPrincipal = (productId: string) =>
  imagenesProductos.find((img) => img.product_id === productId && img.is_primary)?.image_url;

// DecorativeElements para el Drawer (adaptado del Hero)
function DrawerDecorativeElements() {
  const elements: { icon: any; size: SizeProp; className: string }[] = [
    {
      icon: faCircle,
      size: 'lg',
      className: 'absolute top-[8%] left-[5%] text-primary/10 animate-pulse',
    },
    {
      icon: faPaw,
      size: '2xl',
      className: 'absolute top-[40%] left-[8%] text-primary/20 animate-float',
    },
    {
      icon: faBone,
      size: 'xl',
      className: 'absolute top-[15%] right-[10%] text-primary/10 animate-float',
    },
    {
      icon: faBaseballBall,
      size: 'xl',
      className: 'absolute bottom-[18%] right-[12%] text-primary/20 animate-bounce',
    },
    {
      icon: faPaw,
      size: 'xl',
      className: 'absolute bottom-[25%] left-[20%] text-primary/10 animate-float hidden md:block',
    },
  ];
  return (
    <>
      {elements.map((el, i) => (
        <div key={i} className={el.className} style={{zIndex:0}}>
          <FontAwesomeIcon icon={el.icon} size={el.size} />
        </div>
      ))}
    </>
  );
}

export default function ProductosPage() {
  // Estado para filtros
  const [categoria, setCategoria] = useState<string>(categorias[0]?.id || '');
  const [precio, setPrecio] = useState<[number, number]>([0, 500]);
  const [soloStock, setSoloStock] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tempCategoria, setTempCategoria] = useState<string>(categoria);
  const [tempPrecio, setTempPrecio] = useState<[number, number]>(precio);
  const [tempSoloStock, setTempSoloStock] = useState(soloStock);

  // Filtrado de productos por categoría, precio y stock
  const productosFiltrados = (catId: string) =>
    productos.filter((p) => {
      const enCategoria = p.categoria_id === catId;
      const enPrecio = p.precio >= precio[0] && p.precio <= precio[1];
      const enStock = !soloStock || p.stock > 0;
      return enCategoria && enPrecio && enStock;
    });

  // Aplicar filtros temporales
  const handleAplicarFiltro = () => {
    setCategoria(tempCategoria);
    setPrecio(tempPrecio);
    setSoloStock(tempSoloStock);
    setDrawerOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Inicio</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Productos</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Título con icono de filtro a la izquierda */}
      <div className="flex items-center justify-center gap-3 mb-2">
      
        <h1 className="text-2xl md:text-4xl font-bold text-center">Productos para tu mascota</h1>
      </div>
      <p className="text-base md:text-lg text-gray-600 mb-8 text-center">Descubre nuestra amplia selección de productos y accesorios.</p>

      {/* Botón para abrir Drawer de filtros */}
      <div className="flex justify-end mb-4">
        <Button
          onClick={() => setDrawerOpen(true)}
          variant="outline"
          className="font-semibold"
          aria-label="Abrir filtros"
        >
          Filtrar
        </Button>
      </div>

      {/* Drawer de filtros */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent 
          className="pt-0 px-0 flex justify-center items-center min-h-[60vh] w-full" 
          aria-label="Panel de filtros"
        >
          <div className="w-full max-w-sm bg-background rounded-xl shadow-lg mx-auto relative overflow-visible">
            {/* Iconos decorativos animados tipo Hero */}
            <DrawerDecorativeElements />
            <DrawerHeader className="border-b px-6 py-4 flex items-center gap-2 justify-center relative z-10">
              <FontAwesomeIcon icon={faFilter} className="text-primary text-lg" aria-hidden="true" />
              <DrawerTitle className="text-lg font-semibold">Filtros</DrawerTitle>
            </DrawerHeader>
            <div className="flex flex-col gap-6 px-6 py-4 items-center relative z-10">
              {/* Tabs de categorías */}
              <div className="w-full">
                <h3 className="text-sm font-semibold mb-2 text-center">Categoría</h3>
                <Tabs value={tempCategoria} onValueChange={setTempCategoria} className="w-full">
                  <TabsList className="flex flex-wrap justify-center gap-2 bg-muted/50 border border-secondary/20 rounded-2xl p-1">
                    {categorias.map((cat) => (
                      <TabsTrigger
                        key={cat.id}
                        value={cat.id}
                        className="font-poppins text-xs sm:text-sm px-3 py-1.5 rounded-xl data-[state=active]:bg-secondary data-[state=active]:text-primary-foreground transition-all duration-300"
                        role="tab"
                        aria-selected={tempCategoria === cat.id}
                        tabIndex={tempCategoria === cat.id ? 0 : -1}
                      >
                        {cat.nombre}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
              {/* Filtro de precio */}
              <div className="w-full">
                <h3 className="text-sm font-semibold mb-2 text-center">Precio (REF)</h3>
                <Slider
                  id="slider-precio"
                  min={0}
                  max={500}
                  step={1}
                  value={tempPrecio}
                  onValueChange={val => setTempPrecio([val[0], val[1]])}
                  className="mt-2"
                  aria-valuemin={0}
                  aria-valuemax={500}
                  aria-valuenow={tempPrecio[0]}
                  aria-label="Rango de precio"
                />
                <div className="flex justify-between text-xs mt-1" aria-live="polite">
                  <span>REF {tempPrecio[0]}</span>
                  <span>REF {tempPrecio[1]}</span>
                </div>
              </div>
              {/* Filtro de disponibilidad */}
              <div className="flex items-center gap-2 w-full justify-center">
                <input
                  id="solo-stock"
                  type="checkbox"
                  checked={tempSoloStock}
                  onChange={e => setTempSoloStock(e.target.checked)}
                  className="accent-primary h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-primary"
                  aria-checked={tempSoloStock}
                  aria-label="Solo productos en stock"
                />
                <Label htmlFor="solo-stock" className="text-sm select-none cursor-pointer">
                  Solo productos en stock
                </Label>
              </div>
            </div>
            <DrawerFooter className="px-6 pb-6 pt-2 flex flex-col gap-2 relative z-10">
              <Button onClick={handleAplicarFiltro} className="w-full" size="lg" aria-label="Aplicar filtro">
                Aplicar filtro
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" className="w-full" size="lg" aria-label="Cancelar filtros">
                  Cancelar
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Listado de productos filtrados */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {productosFiltrados(categoria).length === 0 && (
          <div className="col-span-full text-center text-gray-500">No se encontraron productos.</div>
        )}
        {productosFiltrados(categoria).map((producto) => (
          <ProductCard key={producto.id} producto={producto} imagen={getImagenPrincipal(producto.id)} />
        ))}
      </div>
    </div>
  );
} 