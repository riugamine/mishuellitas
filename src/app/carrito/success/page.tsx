'use client'
import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faHome, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PAYMENT_METHODS, WHATSAPP_CONFIG } from '@/lib/types/checkout.types';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="p-8 text-center shadow-lg">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <FontAwesomeIcon icon={faCheckCircle} className="text-4xl text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-green-600 mb-2">
              🐾 ¡Pedido Confirmado!
            </h1>
            <p className="text-gray-600 text-lg">
              Gracias por tu compra en Mishuellitas.com
            </p>
          </div>

          <Separator className="my-6" />

          {/* Order Details */}
          <div className="space-y-4 mb-8">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">
                📱 Próximos Pasos
              </h3>
              <div className="text-sm text-green-700 space-y-2">
                <p>• Tu pedido fue enviado por WhatsApp para procesamiento</p>
                <p>• Nuestro equipo te contactará para confirmar los detalles</p>
                <p>• Recibirás información sobre el pago y la entrega</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">
                📞 Información de Contacto
              </h3>
                             <div className="text-sm text-blue-700 space-y-1">
                 <p>WhatsApp: {WHATSAPP_CONFIG.number}</p>
                 <p>Email: {WHATSAPP_CONFIG.email}</p>
                 <p>Horario: {WHATSAPP_CONFIG.businessHours}</p>
               </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">
                💳 Métodos de Pago Disponibles
              </h3>
                             <div className="flex flex-wrap gap-2 justify-center">
                 {PAYMENT_METHODS.map((method) => (
                   <Badge key={method.id} variant="outline" className="text-xs">
                     {method.name}
                   </Badge>
                 ))}
               </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                asChild 
                className="bg-green-600 hover:bg-green-700"
                size="lg"
              >
                                 <Link href={`https://wa.me/${WHATSAPP_CONFIG.number.replace('+', '')}`} target="_blank">
                  <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
                  Contactar por WhatsApp
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline"
                size="lg"
              >
                <Link href="/productos">
                  <FontAwesomeIcon icon={faShoppingBag} className="mr-2" />
                  Continuar Comprando
                </Link>
              </Button>
            </div>
            
            <Button 
              asChild 
              variant="ghost"
              className="w-full"
            >
              <Link href="/">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Volver al Inicio
              </Link>
            </Button>
          </div>

          {/* Footer Message */}
          <div className="mt-8 pt-6 border-t">
            <p className="text-sm text-gray-500">
              🐾 Gracias por confiar en Mishuellitas.com para cuidar a tu mascota.
              <br />
              ¡Esperamos verte pronto!
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
} 