'use client'
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faLock, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { useCartStore } from '@/lib/store/useCartStore';
import { toast } from 'sonner';

interface CustomerData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: 'card' | 'cash' | '';
}

export default function CheckoutPage() {
  const { items, totalItems, orderNotes, clearCart } = useCartStore();
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  // Calcular totales
  const subtotal = useMemo(() => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [items]);

  const shippingCost = useMemo(() => {
    return subtotal > 200 ? 0 : 25;
  }, [subtotal]);

  const total = subtotal + shippingCost;

  /**
   * Actualizar datos del cliente
   * @param field - Campo a actualizar
   * @param value - Nuevo valor
   */
  const handleCustomerDataChange = (field: keyof CustomerData, value: string) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Procesar el pedido
   */
  const handleProcessOrder = async () => {
    // Validar datos requeridos
    if (!customerData.name || !customerData.email || !customerData.phone || 
        !customerData.address || !customerData.city || !customerData.paymentMethod) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    setIsProcessing(true);

    try {
      // Simular procesamiento del pedido
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aquí iría la lógica para enviar el pedido al backend
      console.log('Pedido procesado:', {
        customer: customerData,
        items,
        orderNotes,
        subtotal,
        shippingCost,
        total
      });

      setOrderCompleted(true);
      clearCart();
      toast.success('¡Pedido procesado exitosamente!');
    } catch (error) {
      console.error('Error procesando pedido:', error);
      toast.error('Error al procesar el pedido. Intenta nuevamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Redirigir si el carrito está vacío
  if (items.length === 0 && !orderCompleted) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">No hay productos en el carrito</h2>
          <p className="text-gray-600 mb-6">
            Agrega algunos productos antes de proceder al checkout.
          </p>
          <Button asChild>
            <Link href="/productos">Ver Productos</Link>
          </Button>
        </Card>
      </div>
    );
  }

  if (orderCompleted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Card className="p-8 text-center">
          <div className="mb-4">
            <FontAwesomeIcon icon={faCheckCircle} className="text-6xl text-green-600" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-green-600">¡Pedido Confirmado!</h2>
          <p className="text-gray-600 mb-6">
            Gracias por tu compra. Hemos recibido tu pedido y lo procesaremos pronto.
            Te enviaremos una confirmación por email.
          </p>
          <div className="space-y-3">
            <Button asChild size="lg">
              <Link href="/productos">Continuar Comprando</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Volver al Inicio</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

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
            <BreadcrumbLink asChild>
              <Link href="/carrito">Carrito</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Checkout</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            <FontAwesomeIcon icon={faLock} className="mr-3 text-green-600" />
            Checkout Seguro
          </h1>
          <Button variant="outline" asChild>
            <Link href="/carrito">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Volver al Carrito
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Información de Contacto</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre completo *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={customerData.name}
                    onChange={(e) => handleCustomerDataChange('name', e.target.value)}
                    placeholder="Tu nombre completo"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerData.email}
                    onChange={(e) => handleCustomerDataChange('email', e.target.value)}
                    placeholder="tu@email.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerData.phone}
                    onChange={(e) => handleCustomerDataChange('phone', e.target.value)}
                    placeholder="Tu número de teléfono"
                    className="mt-1"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Dirección de Entrega</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Dirección *</Label>
                  <Input
                    id="address"
                    type="text"
                    value={customerData.address}
                    onChange={(e) => handleCustomerDataChange('address', e.target.value)}
                    placeholder="Calle, número, apartamento"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="city">Ciudad *</Label>
                  <Input
                    id="city"
                    type="text"
                    value={customerData.city}
                    onChange={(e) => handleCustomerDataChange('city', e.target.value)}
                    placeholder="Tu ciudad"
                    className="mt-1"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Método de Pago</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="card"
                    name="paymentMethod"
                    value="card"
                    checked={customerData.paymentMethod === 'card'}
                    onChange={(e) => handleCustomerDataChange('paymentMethod', e.target.value)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="card" className="cursor-pointer">
                    Tarjeta de Crédito/Débito
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="cash"
                    name="paymentMethod"
                    value="cash"
                    checked={customerData.paymentMethod === 'cash'}
                    onChange={(e) => handleCustomerDataChange('paymentMethod', e.target.value)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="cash" className="cursor-pointer">
                    Efectivo (Pago contra entrega)
                  </Label>
                </div>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
              
              {/* Order Items */}
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.variant_id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {item.size} × {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-medium">
                      REF {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Order Notes */}
              {orderNotes && (
                <div className="mb-6 p-3 bg-gray-50 rounded">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    Notas del pedido:
                  </h4>
                  <p className="text-sm text-gray-600">{orderNotes}</p>
                </div>
              )}

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-medium">REF {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío:</span>
                  <span className="font-medium">
                    {shippingCost === 0 ? 'Gratis' : `REF ${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>REF {total.toFixed(2)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                onClick={handleProcessOrder}
                disabled={isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? 'Procesando...' : 'Confirmar Pedido'}
              </Button>

              <p className="text-xs text-gray-500 mt-3 text-center">
                Al confirmar tu pedido, aceptas nuestros términos y condiciones.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 