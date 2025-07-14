// Tipos para el proceso de checkout

export interface LocationData {
  address: string;
  lat: number;
  lng: number;
  city: string;
  state: string;
}

export interface CustomerData {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  dni: string;
  address: string;
  city: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays?: number;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  discount?: number;
  tax?: number;
  total: number;
}

export interface OrderData {
  customer: CustomerData;
  paymentMethod: string;
  shippingMethod?: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    size: string;
    image_url: string;
  }>;
  summary: OrderSummary;
  notes?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Constantes para métodos de pago
export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'pago_movil',
    name: 'Pago Móvil',
    description: 'Transferencia bancaria desde tu teléfono',
  },
  {
    id: 'efectivo',
    name: 'Efectivo',
    description: 'Pago en efectivo contra entrega',
  },
  {
    id: 'zinli',
    name: 'Zinli',
    description: 'Pago digital con Zinli',
  },
  {
    id: 'binance',
    name: 'Binance',
    description: 'Pago con criptomonedas',
  },
  {
    id: 'banesco_panama',
    name: 'Banesco Panamá',
    description: 'Transferencia internacional',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Pago seguro internacional',
  },
];

// Constantes para métodos de envío
export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Envío Standard',
    description: 'Entrega en 3-5 días hábiles',
    price: 25,
    estimatedDays: 4,
  },
  {
    id: 'express',
    name: 'Envío Express',
    description: 'Entrega en 1-2 días hábiles',
    price: 50,
    estimatedDays: 1,
  },
  {
    id: 'pickup',
    name: 'Recoger en tienda',
    description: 'Retira tu pedido en nuestra tienda',
    price: 0,
  },
];

// Configuración para envío gratis
export const FREE_SHIPPING_THRESHOLD = 200;

// Configuración de Venezuela
export const VENEZUELA_CONFIG = {
  country: 'Venezuela',
  currency: 'REF',
  flag: '🇻🇪',
  timezone: 'America/Caracas',
  phonePrefix: '+58',
  coordinates: {
    lat: 10.4806,
    lng: -66.9036,
  },
};

// Configuración de WhatsApp
export const WHATSAPP_CONFIG = {
  number: '+584241234567',
  businessName: 'Mishuellitas.com',
  businessHours: 'Lun-Dom 10:00 AM - 8:00 PM',
  email: 'info@mishuellitas.com',
}; 