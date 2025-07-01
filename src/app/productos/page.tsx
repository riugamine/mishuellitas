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

// Utilidad para obtener la imagen principal de un producto
const getImagenPrincipal = (productId: string) =>
  imagenesProductos.find((img) => img.product_id === productId && img.is_primary)?.image_url;

export default function ProductosPage() {
  // Estado para filtros
  const [categoria, setCategoria] = useState<string>(categorias[0]?.id || '');
  const [precio, setPrecio] = useState<[number, number]>([0, 500]);

  // Filtrado de productos por categoría y precio
  const productosFiltrados = (catId: string) =>
    productos.filter((p) => {
      const enCategoria = p.categoria_id === catId;
      const enPrecio = p.precio >= precio[0] && p.precio <= precio[1];
      return enCategoria && enPrecio;
    });

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

      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Productos para tu mascota</h1>
      <p className="text-base md:text-lg text-gray-600 mb-8 text-center">Descubre nuestra amplia selección de productos y accesorios.</p>

      {/* Filtros jerárquicos: Tabs de categorías y slider de precio */}
      <Tabs value={categoria} onValueChange={setCategoria} className="w-full mb-8">
        <TabsList className="flex flex-wrap gap-2 bg-muted/50 backdrop-blur-sm border border-secondary/20 rounded-2xl p-1 mb-4">
          {categorias.map((cat) => (
            <TabsTrigger key={cat.id} value={cat.id} className="font-poppins text-sm sm:text-base px-4 py-2 rounded-xl data-[state=active]:bg-secondary data-[state=active]:text-primary-foreground transition-all duration-300">
              {cat.nombre}
            </TabsTrigger>
          ))}
        </TabsList>
        {categorias.map((cat) => (
          <TabsContent key={cat.id} value={cat.id} className="space-y-6">
            {/* Filtro de precio */}
            <div className="w-full md:w-1/2 mb-4">
              <label className="block text-sm font-medium mb-1">Precio (REF)</label>
              <Slider
                min={0}
                max={500}
                step={1}
                value={precio}
                onValueChange={val => setPrecio([val[0], val[1]])}
                className="mt-2"
              />
              <div className="flex justify-between text-xs mt-1">
                <span>REF {precio[0]}</span>
                <span>REF {precio[1]}</span>
              </div>
            </div>
            {/* Listado de productos filtrados */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {productosFiltrados(cat.id).length === 0 && (
                <div className="col-span-full text-center text-gray-500">No se encontraron productos.</div>
              )}
              {productosFiltrados(cat.id).map((producto) => (
                <ProductCard key={producto.id} producto={producto} imagen={getImagenPrincipal(producto.id)} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
} 