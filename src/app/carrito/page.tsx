'use client'
import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
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
            <BreadcrumbPage>Carrito</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="mt-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">🐾 Tu Carrito</h1>
        
        {/* Empty Cart State */}
        <Card className="p-8 text-center">
          <div className="mb-4">
            <span className="text-6xl">🛒</span>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-6">
            Parece que aún no has agregado productos a tu carrito. 
            ¡Explora nuestra increíble colección de productos para mascotas!
          </p>
          <Button asChild size="lg">
            <Link href="/productos">
              Ver Productos
            </Link>
          </Button>
        </Card>
        
        {/* Cart Summary Placeholder */}
        <div className="mt-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Resumen del Pedido</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium">REF 0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Envío:</span>
                <span className="font-medium">REF 0.00</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>REF 0.00</span>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <Button disabled className="w-full" size="lg">
                Proceder al Pago
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/productos">
                  Continuar Comprando
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 