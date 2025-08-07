'use client'
import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { useCartStore } from '@/lib/store/useCartStore';
import { toast } from 'sonner';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export default function CartPage() {
  const { items, totalItems, orderNotes, updateQuantity, removeItem, setOrderNotes, clearCart } = useCartStore();

  // Calcular totales
  const subtotal = useMemo(() => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [items]);

  const shippingCost = useMemo(() => {
    return subtotal > 200 ? 0 : 25; // Envío gratis para compras mayores a REF 200
  }, [subtotal]);

  const total = subtotal + shippingCost;

  /**
   * Actualizar cantidad de un producto en el carrito
   * @param variantId - ID de la variante del producto
   * @param newQuantity - Nueva cantidad
   */
  const handleUpdateQuantity = (variantId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const item = items.find(i => i.variant_id === variantId);
    if (!item) return;

    if (newQuantity > item.max_stock) {
      toast.error(`Solo hay ${item.max_stock} unidades disponibles`);
      return;
    }

    updateQuantity(variantId, newQuantity);
    toast.success('Cantidad actualizada');
  };

  /**
   * Eliminar producto del carrito
   * @param variantId - ID de la variante del producto
   * @param productName - Nombre del producto
   */
  const handleRemoveItem = (variantId: string, productName: string) => {
    removeItem(variantId);
    toast.success(`${productName} eliminado del carrito`);
  };

  /**
   * Limpiar todo el carrito
   */
  const handleClearCart = () => {
    clearCart();
    toast.success('Carrito vaciado');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-6">
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
              <FontAwesomeIcon icon={faShoppingCart} className="text-6xl text-gray-400" />
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
        </div>
      </div>
    );
  }

  return (
    <div className="px-10 py-6 max-w-7xl lg:max-w-none mx-auto">
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            🐾 Tu Carrito 
            <Badge variant="secondary" className="ml-3">
              {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
            </Badge>
          </h1>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleClearCart}
            className="text-red-600 hover:text-red-700"
          >
            <FontAwesomeIcon icon={faTrash} className="mr-2" />
            Vaciar Carrito
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-3">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Productos en tu carrito</h2>
              
              {/* ScrollArea para manejar muchos productos con scroll horizontal y vertical */}
              <ScrollArea className="h-auto max-h-[70vh] w-full">
                <div className="space-y-4 min-w-[700px]">
                  {items.map((item) => (
                    <div key={item.variant_id} className="p-4 border rounded-lg">
                      {/* Layout para Desktop */}
                      <div className="hidden md:flex items-center gap-6 min-w-[650px]">
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={item.image_url}
                            alt={item.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-[200px]">
                          <h3 className="font-semibold text-lg text-gray-900 truncate">
                            {item.name}
                          </h3>
                          <p className="text-base text-gray-600 mt-1">
                            Talla: {item.size}
                          </p>
                          <p className="text-base font-medium text-gray-900 mt-1">
                            REF {item.price.toFixed(2)}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-3 flex-shrink-0 min-w-[140px]">
                          <Button
                            variant="outline"
                            size="default"
                            onClick={() => handleUpdateQuantity(item.variant_id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-10 w-10 p-0"
                          >
                            <FontAwesomeIcon icon={faMinus} className="h-4 w-4" />
                          </Button>
                          
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleUpdateQuantity(item.variant_id, parseInt(e.target.value) || 1)}
                            className="w-20 h-10 text-center text-base"
                            min="1"
                            max={item.max_stock}
                          />
                          
                          <Button
                            variant="outline"
                            size="default"
                            onClick={() => handleUpdateQuantity(item.variant_id, item.quantity + 1)}
                            disabled={item.quantity >= item.max_stock}
                            className="h-10 w-10 p-0"
                          >
                            <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-4 min-w-[180px] flex-shrink-0">
                          <span className="font-bold text-lg text-gray-900 text-right flex-1">
                            REF {(item.price * item.quantity).toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="default"
                            onClick={() => handleRemoveItem(item.variant_id, item.name)}
                            className="text-red-600 hover:text-red-700 h-10 px-4 whitespace-nowrap"
                          >
                            <FontAwesomeIcon icon={faTrash} className="h-5 w-5 mr-2" />
                            Eliminar
                          </Button>
                        </div>
                      </div>

                      {/* Layout para Mobile - con scroll horizontal también */}
                      <div className="md:hidden">
                        <div className="min-w-[400px] space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="relative w-16 h-16 flex-shrink-0">
                              <Image
                                src={item.image_url}
                                alt={item.name}
                                fill
                                className="object-cover rounded-md"
                              />
                            </div>
                            
                            <div className="flex-1 min-w-[150px]">
                              <h3 className="font-medium text-gray-900 text-sm">
                                {item.name}
                              </h3>
                              <p className="text-xs text-gray-500">
                                Talla: {item.size}
                              </p>
                              <p className="text-sm font-bold text-gray-900 mt-1">
                                REF {(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                            
                            {/* Botones de cantidad a la derecha en móvil */}
                            <div className="flex items-center gap-1 flex-shrink-0 min-w-[120px]">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateQuantity(item.variant_id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="h-8 w-8 p-0"
                              >
                                <FontAwesomeIcon icon={faMinus} className="h-3 w-3" />
                              </Button>
                              
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleUpdateQuantity(item.variant_id, parseInt(e.target.value) || 1)}
                                className="w-12 h-8 text-center text-sm"
                                min="1"
                                max={item.max_stock}
                              />
                              
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateQuantity(item.variant_id, item.quantity + 1)}
                                disabled={item.quantity >= item.max_stock}
                                className="h-8 w-8 p-0"
                              >
                                <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          
                          {/* Botón de papelera debajo en móvil */}
                          <div className="flex justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveItem(item.variant_id, item.name)}
                              className="text-red-600 hover:text-red-700 h-8 px-3"
                            >
                              <FontAwesomeIcon icon={faTrash} className="h-4 w-4 mr-1" />
                              Eliminar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
                <ScrollBar orientation="vertical" />
              </ScrollArea>
              
            </Card>
          </div>
          
          {/* Cart Summary */}
          <div className="lg:col-span-2">
            <Card className="p-6 sticky top-4">
              <h3 className="text-xl font-semibold mb-6">Resumen del Pedido</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-base">Subtotal:</span>
                  <span className="font-medium text-base">REF {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base">Envío:</span>
                  <span className="font-medium text-base">
                    {shippingCost === 0 ? 'Gratis' : `REF ${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                {shippingCost === 0 && (
                  <p className="text-sm text-green-600">
                    ¡Envío gratis por compras mayores a REF 200!
                  </p>
                )}
                {subtotal < 200 && subtotal > 0 && (
                  <p className="text-sm text-gray-600">
                    Agrega REF {(200 - subtotal).toFixed(2)} más para envío gratis
                  </p>
                )}
                <Separator />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span>REF {total.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <Button asChild className="w-full" size="lg">
                  <Link href="/carrito/checkout">
                    Proceder al Pago
                  </Link>
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
    </div>
  );
} 