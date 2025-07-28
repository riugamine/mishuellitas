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
  address?: string;
  city?: string;
  state?: string;
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

// Tipos para opciones de envío
export type ShippingType = 'nacional' | 'local';

export interface NationalShipping {
  type: 'nacional';
  company: 'zoom' | 'mrw';
  address: string;
}

export interface LocalShipping {
  type: 'local';
  method: 'delivery' | 'pickup';
  address?: string; // Solo requerido para delivery
}

export interface ShippingData {
  shippingType: ShippingType;
  nationalShipping?: NationalShipping;
  localShipping?: LocalShipping;
}

export interface OrderData {
  customer: CustomerData;
  paymentMethod: string;
  shippingData: ShippingData;
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

// Constantes para opciones de envío
export const SHIPPING_TYPES = [
  {
    id: 'nacional',
    name: 'Envío Nacional',
    description: 'A todo el territorio venezolano',
    icon: '🇻🇪',
  },
  {
    id: 'local',
    name: 'Envío Local Nueva Esparta',
    description: 'Isla de Margarita y Nueva Esparta',
    icon: '🏝️',
  },
];

export const NATIONAL_SHIPPING_COMPANIES = [
  {
    id: 'zoom',
    name: 'Zoom',
    description: 'Entrega segura a nivel nacional',
    estimatedDays: '2-5 días hábiles',
  },
  {
    id: 'mrw',
    name: 'MRW',
    description: 'Envío confiable a todo el país',
    estimatedDays: '2-5 días hábiles',
  },
];

export const LOCAL_SHIPPING_METHODS = [
  {
    id: 'delivery',
    name: 'Delivery',
    description: 'Entrega a domicilio en Nueva Esparta',
    price: 'por zona', // Rango: REF 2-5
    priceRange: {
      min: 2,
      max: 5
    },
  },
  {
    id: 'pickup',
    name: 'Pickup',
    description: 'Recoger en nuestra ubicación',
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