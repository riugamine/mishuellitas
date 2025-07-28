'use client'
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faLock } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { useCartStore } from '@/lib/store/useCartStore';
import { useCustomerStore } from '@/lib/store/useCustomerStore';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  CustomerData, 
  PaymentMethod, 
  ShippingType,
  ShippingData,
  NationalShipping,
  LocalShipping,
  PAYMENT_METHODS, 
  SHIPPING_TYPES,
  NATIONAL_SHIPPING_COMPANIES,
  LOCAL_SHIPPING_METHODS,
  VENEZUELA_CONFIG, 
  WHATSAPP_CONFIG,
  FREE_SHIPPING_THRESHOLD 
} from '@/lib/types/checkout.types';
import { 
  formasPlacas, 
  coloresPlacas, 
  tipografiasPlacas, 
  iconosPlacas 
} from '@/lib/placeholder-data';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalItems, orderNotes, setOrderNotes, clearCart } = useCartStore();
  const { customerInfo, setCustomerInfo } = useCustomerStore();
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: customerInfo.name || '',
    lastName: customerInfo.lastName || '',
    email: customerInfo.email || '',
    phone: customerInfo.phone || '',
    dni: customerInfo.dni || '',
    address: customerInfo.address || '',
    city: '',
    state: '',
  });

  const [shippingData, setShippingData] = useState<ShippingData>({
    shippingType: 'nacional',
  });

  // Calcular totales
  const subtotal = useMemo(() => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [items]);

  const shippingCost = useMemo(() => {
    // Envío gratis si supera el threshold
    if (subtotal > FREE_SHIPPING_THRESHOLD) return 0;
    
    // Costo según tipo de envío
    if (shippingData.shippingType === 'local' && shippingData.localShipping) {
      const method = LOCAL_SHIPPING_METHODS.find(m => m.id === shippingData.localShipping?.method);
      if (method && method.id === 'pickup') return 0;
      // Para delivery, no añadimos costo fijo ya que es "por zona"
    }
    
    // Envío nacional (se coordina con la empresa)
    return 0;
  }, [subtotal, shippingData]);

  const isDeliveryByZone = useMemo(() => {
    return shippingData.shippingType === 'local' && 
           shippingData.localShipping?.method === 'delivery' && 
           subtotal <= FREE_SHIPPING_THRESHOLD;
  }, [shippingData, subtotal]);

  const total = subtotal + shippingCost;

  /**
   * Actualizar datos del cliente
   */
  const handleCustomerDataChange = (field: keyof CustomerData, value: string) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Manejar cambio de tipo de envío
   */
  const handleShippingTypeChange = (type: ShippingType) => {
    setShippingData({
      shippingType: type,
    });
  };

  /**
   * Manejar datos de envío nacional
   */
  const handleNationalShippingChange = (company: 'zoom' | 'mrw', address: string) => {
    setShippingData(prev => ({
      ...prev,
      nationalShipping: {
        type: 'nacional',
        company,
        address,
      },
    }));
  };

  /**
   * Manejar datos de envío local
   */
  const handleLocalShippingChange = (method: 'delivery' | 'pickup', address?: string) => {
    setShippingData(prev => ({
      ...prev,
      localShipping: {
        type: 'local',
        method,
        address: method === 'delivery' ? address : undefined,
      },
    }));
  };

  /**
   * Generar mensaje de WhatsApp
   */
  const generateWhatsAppMessage = () => {
    const itemsList = items.map(item => {
      let itemDescription = `• ${item.name} (${item.size}) - Cantidad: ${item.quantity} - REF ${(item.price * item.quantity).toFixed(2)}`;
      
      // Agregar detalles de personalización si es una placa
      if (item.tipo_producto === 'placa' && item.personalizacion) {
        const forma = formasPlacas.find(f => f.id === item.personalizacion?.forma_id);
        const color = coloresPlacas.find(c => c.id === item.personalizacion?.color_id);
        const tipografia = tipografiasPlacas.find(t => t.id === item.personalizacion?.tipografia_id);
        const icono = item.personalizacion.icono_id ? iconosPlacas.find(i => i.id === item.personalizacion?.icono_id) : null;
        
                 itemDescription += `\n  🏷️ PERSONALIZACIÓN:`;
         itemDescription += `\n    • Nombre: ${item.personalizacion.nombre_mascota}`;
         itemDescription += `\n    • Forma: ${forma?.nombre || 'No especificada'}`;
         itemDescription += `\n    • Color: ${color?.nombre || 'No especificado'}`;
         itemDescription += `\n    • Tipografía: ${tipografia?.nombre || 'No especificada'}`;
         if (icono) {
           itemDescription += `\n    • Icono: ${icono.nombre}`;
         }
      }
      
      return itemDescription;
    }).join('\n');

    const selectedPayment = PAYMENT_METHODS.find((pm: PaymentMethod) => pm.id === selectedPaymentMethod);
    
    // Información de envío
    let shippingInfo = '';
    if (shippingData.shippingType === 'nacional' && shippingData.nationalShipping) {
      const company = NATIONAL_SHIPPING_COMPANIES.find(c => c.id === shippingData.nationalShipping?.company);
      shippingInfo = `🚛 *ENVÍO NACIONAL:*
Empresa: ${company?.name || 'No seleccionada'}
Dirección: ${shippingData.nationalShipping.address}`;
    } else if (shippingData.shippingType === 'local' && shippingData.localShipping) {
      const method = LOCAL_SHIPPING_METHODS.find(m => m.id === shippingData.localShipping?.method);
      shippingInfo = `🏝️ *ENVÍO LOCAL (Nueva Esparta):*
Método: ${method?.name || 'No seleccionado'}${shippingData.localShipping.method === 'delivery' ? `
Dirección: ${shippingData.localShipping.address || 'No especificada'}` : ''}`;
    }
    
    return `🐾 *NUEVO PEDIDO - MISHUELLITAS.COM*

👤 *DATOS DEL CLIENTE:*
Nombre: ${customerData.name} ${customerData.lastName}
Cédula: ${customerData.dni}
Email: ${customerData.email}
Teléfono: ${customerData.phone}

${shippingInfo}

📦 *PRODUCTOS:*
${itemsList}

💰 *RESUMEN:*
Subtotal: REF ${subtotal.toFixed(2)}
Envío: ${shippingCost === 0 ? 'Gratis' : isDeliveryByZone ? 'Por zona (REF 2-5)' : `REF ${shippingCost.toFixed(2)}`}
Total: REF ${total.toFixed(2)}${isDeliveryByZone ? ' + envío por zona' : ''}

💳 *MÉTODO DE PAGO:*
${selectedPayment?.name || 'No seleccionado'}

📝 *NOTAS ESPECIALES:*
${orderNotes || 'Ninguna'}

¡Gracias por tu compra! 🐾`;
  };

  /**
   * Procesar el pedido
   */
  const handleProcessOrder = async () => {
    // Validar datos básicos del cliente
    if (!customerData.name || !customerData.lastName || !customerData.email || 
        !customerData.phone || !customerData.dni || !selectedPaymentMethod) {
      toast.error('🐾 Por favor completa todos los campos requeridos');
      return;
    }

    // Validar datos de envío
    if (shippingData.shippingType === 'nacional') {
      if (!shippingData.nationalShipping?.company || !shippingData.nationalShipping?.address) {
        toast.error('🐾 Por favor selecciona la empresa de envío y la dirección');
        return;
      }
    } else if (shippingData.shippingType === 'local') {
      if (!shippingData.localShipping?.method) {
        toast.error('🐾 Por favor selecciona el método de entrega local');
        return;
      }
      if (shippingData.localShipping.method === 'delivery' && !shippingData.localShipping.address) {
        toast.error('🐾 Por favor ingresa la dirección para delivery');
        return;
      }
    }

    setIsProcessing(true);

    try {
      // Simular procesamiento del pedido
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Guardar información del cliente
      setCustomerInfo({
        name: customerData.name,
        lastName: customerData.lastName,
        email: customerData.email,
        phone: customerData.phone,
        dni: customerData.dni,
        address: customerData.address || '', // Mantener compatibilidad
      });

             // Generar mensaje de WhatsApp
       const message = generateWhatsAppMessage();
       const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.number.replace('+', '')}?text=${encodeURIComponent(message)}`;
       
       // Abrir WhatsApp
       window.open(whatsappUrl, '_blank');
      
      // Limpiar carrito
      clearCart();
      
      toast.success('🐾 ¡Pedido procesado! Redirigiendo...');
      
      // Redirigir a página de éxito
      setTimeout(() => {
        router.push('/carrito/success');
      }, 1500);
    } catch (error) {
      console.error('Error procesando pedido:', error);
      toast.error('🐾 Error al procesar el pedido. Intenta nuevamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Redirigir si el carrito está vacío
  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">🐾 No hay productos en el carrito</h2>
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
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
            🐾 Checkout Seguro
          </h1>
          <Button variant="outline" asChild>
            <Link href="/carrito">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Volver al Carrito
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario de datos del cliente */}
          <div className="space-y-6">
            {/* Información personal */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">👤 Información Personal</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nombre *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={customerData.name}
                      onChange={(e) => handleCustomerDataChange('name', e.target.value)}
                      placeholder="Tu nombre"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Apellido *</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={customerData.lastName}
                      onChange={(e) => handleCustomerDataChange('lastName', e.target.value)}
                      placeholder="Tu apellido"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="dni">Cédula de Identidad *</Label>
                  <Input
                    id="dni"
                    type="text"
                    value={customerData.dni}
                    onChange={(e) => handleCustomerDataChange('dni', e.target.value)}
                    placeholder="V-12345678"
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
                    placeholder="+58 412 123 4567"
                    className="mt-1"
                  />
                </div>
              </div>
            </Card>

            {/* Opciones de envío */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">🚛 Opciones de Envío</h2>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    <strong>País:</strong> Venezuela 🇻🇪
                  </p>
                </div>
                
                {/* Selección tipo de envío */}
                <div className="space-y-3">
                  {SHIPPING_TYPES.map((type) => (
                    <div
                      key={type.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        shippingData.shippingType === type.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => handleShippingTypeChange(type.id as ShippingType)}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id={type.id}
                          name="shippingType"
                          value={type.id}
                          checked={shippingData.shippingType === type.id}
                          onChange={() => handleShippingTypeChange(type.id as ShippingType)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div>
                          <Label htmlFor={type.id} className="font-medium cursor-pointer">
                            {type.icon} {type.name}
                          </Label>
                          <p className="text-sm text-gray-600">{type.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Opciones para envío nacional */}
                {shippingData.shippingType === 'nacional' && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-medium">Selecciona la empresa de envío:</h3>
                    <div className="space-y-3">
                      {NATIONAL_SHIPPING_COMPANIES.map((company) => (
                        <div
                          key={company.id}
                          className={`p-3 border rounded cursor-pointer ${
                            shippingData.nationalShipping?.company === company.id
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          onClick={() => {
                            const address = shippingData.nationalShipping?.address || '';
                            handleNationalShippingChange(company.id as 'zoom' | 'mrw', address);
                          }}
                        >
                          <div className="flex items-center space-x-3">
                            <input
                              type="radio"
                              id={`company-${company.id}`}
                              name="shippingCompany"
                              value={company.id}
                              checked={shippingData.nationalShipping?.company === company.id}
                              readOnly
                              className="w-4 h-4 text-green-600"
                            />
                            <div>
                              <Label htmlFor={`company-${company.id}`} className="font-medium cursor-pointer">
                                {company.name}
                              </Label>
                              <p className="text-sm text-gray-600">{company.description}</p>
                              <p className="text-xs text-gray-500">{company.estimatedDays}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div>
                      <Label htmlFor="nationalAddress">Dirección de entrega *</Label>
                      <Textarea
                        id="nationalAddress"
                        placeholder="Ingresa la dirección completa donde quieres recibir tu pedido..."
                        value={shippingData.nationalShipping?.address || ''}
                        onChange={(e) => {
                          const company = shippingData.nationalShipping?.company || 'zoom';
                          handleNationalShippingChange(company as 'zoom' | 'mrw', e.target.value);
                        }}
                        className="mt-2 resize-none"
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {/* Opciones para envío local */}
                {shippingData.shippingType === 'local' && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-medium">Método de entrega en Nueva Esparta:</h3>
                    <div className="space-y-3">
                      {LOCAL_SHIPPING_METHODS.map((method) => (
                        <div
                          key={method.id}
                          className={`p-3 border rounded cursor-pointer ${
                            shippingData.localShipping?.method === method.id
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          onClick={() => {
                            const address = method.id === 'delivery' ? (shippingData.localShipping?.address || '') : undefined;
                            handleLocalShippingChange(method.id as 'delivery' | 'pickup', address);
                          }}
                        >
                          <div className="flex items-center space-x-3">
                            <input
                              type="radio"
                              id={`local-${method.id}`}
                              name="localMethod"
                              value={method.id}
                              checked={shippingData.localShipping?.method === method.id}
                              readOnly
                              className="w-4 h-4 text-green-600"
                            />
                            <div>
                              <Label htmlFor={`local-${method.id}`} className="font-medium cursor-pointer">
                                {method.name} {method.id === 'pickup' ? '(Gratis)' : '(REF 2-5 por zona)'}
                              </Label>
                              <p className="text-sm text-gray-600">{method.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {shippingData.localShipping?.method === 'delivery' && (
                      <div>
                        <Label htmlFor="deliveryAddress">Dirección para delivery *</Label>
                        <Textarea
                          id="deliveryAddress"
                          placeholder="Ingresa la dirección en Nueva Esparta donde quieres recibir tu pedido..."
                          value={shippingData.localShipping?.address || ''}
                          onChange={(e) => handleLocalShippingChange('delivery', e.target.value)}
                          className="mt-2 resize-none"
                          rows={3}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>

            {/* Método de pago */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">💳 Método de Pago</h2>
                             <div className="space-y-3">
                 {PAYMENT_METHODS.map((method: PaymentMethod) => (
                  <div
                    key={method.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedPaymentMethod === method.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id={method.id}
                        name="paymentMethod"
                        value={method.id}
                        checked={selectedPaymentMethod === method.id}
                        onChange={() => setSelectedPaymentMethod(method.id)}
                        className="w-4 h-4 text-green-600"
                      />
                      <div>
                        <Label htmlFor={method.id} className="font-medium cursor-pointer">
                          {method.name}
                        </Label>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Notas del pedido */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">📝 Notas del Pedido</h2>
              <div>
                <Label htmlFor="orderNotes">Instrucciones especiales (opcional)</Label>
                                 <Textarea
                   id="orderNotes"
                   placeholder="Dinos si hay algo especial que debemos saber sobre tu pedido..."
                   value={orderNotes}
                   onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setOrderNotes(e.target.value)}
                   className="mt-2 resize-none"
                   rows={4}
                 />
              </div>
            </Card>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">📋 Resumen del Pedido</h2>
              
              {/* Productos */}
              <ScrollArea className="max-h-64 mb-6">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.variant_id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
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
              </ScrollArea>

              {/* Totales */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-medium">REF {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío:</span>
                  <span className="font-medium">
                    {shippingCost === 0 ? 'Gratis' : isDeliveryByZone ? 'Por zona (REF 2-5)' : `REF ${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                                 {shippingCost === 0 && (
                   <p className="text-sm text-green-600">
                     ¡Envío gratis por compras mayores a {VENEZUELA_CONFIG.currency} {FREE_SHIPPING_THRESHOLD}!
                   </p>
                 )}
                <Separator />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-green-600">
                    REF {total.toFixed(2)}{isDeliveryByZone ? '*' : ''}
                  </span>
                </div>
                {isDeliveryByZone && (
                  <p className="text-xs text-gray-500 mt-2">
                    * El costo final incluirá el delivery según zona (REF 2-5)
                  </p>
                )}
              </div>

              {/* Botón de confirmar pedido */}
              <div className="mt-6 space-y-4">
                <Button
                  onClick={handleProcessOrder}
                  disabled={isProcessing}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
                      Confirmar Pedido
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Al confirmar tu pedido, aceptas nuestros términos y condiciones.
                  El pedido se enviará por WhatsApp para procesamiento.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 