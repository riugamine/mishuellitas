// Datos estáticos de ejemplo para simular la base de datos de Supabase
// Productos, categorías, imágenes, variantes

export type Categoria = {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string;
  cover_image_url: string;
  parent_id?: string | null;
};

export type Producto = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  slug: string;
  categoria_id: string;
  is_active: boolean;
  tipo?: 'normal' | 'placa';
};

export type ImagenProducto = {
  id: string;
  product_id: string;
  image_url: string;
  is_primary: boolean;
};

export type VarianteProducto = {
  id: string;
  product_id: string;
  talla: string;
  stock: number;
};

// Tipos para plaquitas personalizadas
export type FormaPlaca = {
  id: string;
  nombre: string;
  descripcion: string;
  precio_adicional: number;
  max_characters: number; // Máximo de caracteres permitidos para esta forma
};

export type ColorPlaca = {
  id: string;
  nombre: string;
  codigo_hex: string;
  precio_adicional: number;
  restricciones?: string[]; // IDs de formas que NO pueden usar este color
};

export type TipografiaPlaca = {
  id: string;
  nombre: string;
  font_family: string;
  precio_adicional: number;
};

export type IconoPlaca = {
  id: string;
  nombre: string;
  categoria: string;
  codigo_icon: string; // Para FontAwesome o similar
  precio_adicional: number;
};

export type PersonalizacionPlaca = {
  id?: string;
  nombre_mascota: string;
  forma_id: string;
  color_id: string;
  tipografia_id: string;
  icono_id?: string;
  created_at?: string;
};

// Tipos para el sistema de usuarios y autenticación
export type PerfilUsuario = {
  id: string;
  email: string;
  nombre_completo: string;
  rol: 'admin' | 'super_admin';
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

// Tipos para el sistema de órdenes
export type EstadoOrden = 'pendiente' | 'contactado' | 'confirmado' | 'preparando' | 'enviado' | 'entregado' | 'cancelado';
export type MetodoContacto = 'whatsapp' | 'telefono' | 'email';

export type Orden = {
  id: string;
  numero_orden: string;
  
  // Datos del cliente
  cliente_nombre: string;
  cliente_telefono: string;
  cliente_email?: string;
  cliente_direccion?: string;
  cliente_ciudad?: string;
  cliente_codigo_postal?: string;
  
  // Datos de la orden
  subtotal: number;
  impuestos: number;
  envio: number;
  total: number;
  
  // Estado y seguimiento
  estado: EstadoOrden;
  metodo_contacto: MetodoContacto;
  
  // Notas
  notas_cliente?: string;
  notas_admin?: string;
  
  // Timestamps
  created_at: string;
  updated_at: string;
  contactado_at?: string;
  confirmado_at?: string;
  enviado_at?: string;
  entregado_at?: string;
};

export type OrdenItem = {
  id: string;
  orden_id: string;
  producto_id: string;
  variante_id?: string;
  personalizacion_id?: string;
  
  cantidad: number;
  precio_unitario: number;
  precio_total: number;
  
  // Snapshot de datos
  producto_nombre: string;
  producto_descripcion?: string;
  variante_talla?: string;
  
  created_at: string;
};

export type OrdenHistorial = {
  id: string;
  orden_id: string;
  estado_anterior?: EstadoOrden;
  estado_nuevo: EstadoOrden;
  comentario?: string;
  usuario_admin_id?: string;
  created_at: string;
};

export type RestriccionColorForma = {
  id: string;
  color_id: string;
  forma_id: string;
};

// Categorías de ejemplo
export const categorias: Categoria[] = [
  {
    id: '1',
    nombre: 'Alimentos',
    slug: 'alimentos',
    descripcion: 'Comida para mascotas de todas las edades.',
    cover_image_url: 'https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764397/Sullivan_rosado_2_urmydb.png',
  },
  {
    id: '2',
    nombre: 'Ropa',
    slug: 'ropa',
    descripcion: 'Ropa cómoda y divertida para mascotas.',
    cover_image_url: 'https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764423/Sudadera_de_tigre_1_n4aj07.png',
  },
  {
    id: '3',
    nombre: 'Juguetes',
    slug: 'juguetes',
    descripcion: 'Juguetes para el entretenimiento de tu mascota.',
    cover_image_url: 'https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764378/Sudadera_de_dinosaurio_1_nil4pm.png',
  },
  {
    id: '4',
    nombre: 'Placas',
    slug: 'placas',
    descripcion: 'Placas personalizadas para identificar a tu mascota.',
    cover_image_url: 'https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764397/Sullivan_rosado_2_urmydb.png',
  },
];

// Productos de ejemplo
export const productos: Producto[] = [
  {
    id: 'p1',
    nombre: 'Alimento Premium para Perros Adultos',
    descripcion: 'Alimento completo y balanceado para perros adultos. Ingredientes naturales premium.',
    precio: 89.99,
    stock: 20,
    slug: 'alimento-premium-perros-adultos',
    categoria_id: '1',
    is_active: true,
  },
  {
    id: 'p2',
    nombre: 'Alimento para Gatos Esterilizados',
    descripcion: 'Fórmula especial para gatos esterilizados, ayuda a mantener el peso ideal.',
    precio: 120.0,
    stock: 15,
    slug: 'alimento-gatos-esterilizados',
    categoria_id: '1',
    is_active: true,
  },
  {
    id: 'p3',
    nombre: 'Sudadera de Tigre',
    descripcion: 'Sudadera cálida y cómoda con diseño de tigre para perros pequeños.',
    precio: 250.0,
    stock: 10,
    slug: 'sudadera-tigre',
    categoria_id: '2',
    is_active: true,
  },
  {
    id: 'p4',
    nombre: 'Sudadera de Dinosaurio',
    descripcion: 'Divertida sudadera de dinosaurio para gatos y perros.',
    precio: 230.0,
    stock: 8,
    slug: 'sudadera-dinosaurio',
    categoria_id: '2',
    is_active: true,
  },
  {
    id: 'p5',
    nombre: 'Pelota Mordedora',
    descripcion: 'Pelota resistente para perros, ideal para juegos de buscar y traer.',
    precio: 45.0,
    stock: 30,
    slug: 'pelota-mordedora',
    categoria_id: '3',
    is_active: true,
  },
  {
    id: 'p6',
    nombre: 'Ratón de Juguete',
    descripcion: 'Ratón de peluche con catnip para gatos.',
    precio: 35.0,
    stock: 25,
    slug: 'raton-juguete',
    categoria_id: '3',
    is_active: true,
  },
  {
    id: 'p7',
    nombre: 'Placa Personalizada Básica',
    descripcion: 'Placa personalizada para collar de mascota con grabado del nombre.',
    precio: 25.0,
    stock: 100,
    slug: 'placa-personalizada-basica',
    categoria_id: '4',
    is_active: true,
    tipo: 'placa',
  },
  {
    id: 'p8',
    nombre: 'Placa Personalizada Premium',
    descripcion: 'Placa personalizada premium con múltiples opciones de diseño y grabado.',
    precio: 45.0,
    stock: 50,
    slug: 'placa-personalizada-premium',
    categoria_id: '4',
    is_active: true,
    tipo: 'placa',
  },
];

// Imágenes de productos de ejemplo
export const imagenesProductos: ImagenProducto[] = [
  // Alimento Premium para Perros Adultos
  {
    id: 'img1',
    product_id: 'p1',
    image_url: 'https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764397/Sullivan_rosado_2_urmydb.png',
    is_primary: true,
  },
  {
    id: 'img1b',
    product_id: 'p1',
    image_url: 'https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764398/Sullivan_rosado_detalle1.png',
    is_primary: false,
  },
  {
    id: 'img1c',
    product_id: 'p1',
    image_url: 'https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764399/Sullivan_rosado_detalle2.png',
    is_primary: false,
  },
  // Alimento para Gatos Esterilizados
  {
    id: 'img2',
    product_id: 'p2',
    image_url: 'https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764397/Sullivan_rosado_2_urmydb.png',
    is_primary: true,
  },
  {
    id: 'img2b',
    product_id: 'p2',
    image_url: 'https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764398/Sullivan_rosado_detalle1.png',
    is_primary: false,
  },
  // Sudadera de Tigre
  {
    id: 'img3',
    product_id: 'p3',
    image_url: 'https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764423/Sudadera_de_tigre_1_n4aj07.png',
    is_primary: true,
  },
  {
    id: 'img3b',
    product_id: 'p3',
    image_url: 'https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764424/Sudadera_de_tigre_detalle1.png',
    is_primary: false,
  },
  {
    id: 'img3c',
    product_id: 'p3',
    image_url: 'https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764425/Sudadera_de_tigre_detalle2.png',
    is_primary: false,
  },
  // Sudadera de Dinosaurio
  {
    id: 'img4',
    product_id: 'p4',
    image_url: 'https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764378/Sudadera_de_dinosaurio_1_nil4pm.png',
    is_primary: true,
  },
  {
    id: 'img4b',
    product_id: 'p4',
    image_url: 'https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764379/Sudadera_de_dinosaurio_detalle1.png',
    is_primary: false,
  },
  // Pelota Mordedora
  {
    id: 'img5',
    product_id: 'p5',
    image_url: 'https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764423/Sudadera_de_tigre_1_n4aj07.png',
    is_primary: true,
  },
  {
    id: 'img5b',
    product_id: 'p5',
    image_url: 'https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764424/Sudadera_de_tigre_detalle1.png',
    is_primary: false,
  },
  // Ratón de Juguete
  {
    id: 'img6',
    product_id: 'p6',
    image_url: 'https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764378/Sudadera_de_dinosaurio_1_nil4pm.png',
    is_primary: true,
  },
  {
    id: 'img6b',
    product_id: 'p6',
    image_url: 'https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764379/Sudadera_de_dinosaurio_detalle1.png',
    is_primary: false,
  },
  // Placa Personalizada Básica
  {
    id: 'img7',
    product_id: 'p7',
    image_url: 'https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764397/Sullivan_rosado_2_urmydb.png',
    is_primary: true,
  },
  {
    id: 'img7b',
    product_id: 'p7',
    image_url: 'https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764398/Sullivan_rosado_detalle1.png',
    is_primary: false,
  },
  // Placa Personalizada Premium
  {
    id: 'img8',
    product_id: 'p8',
    image_url: 'https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764423/Sudadera_de_tigre_1_n4aj07.png',
    is_primary: true,
  },
  {
    id: 'img8b',
    product_id: 'p8',
    image_url: 'https://res.cloudinary.com/dhzl31kb8/image/upload/v1749764424/Sudadera_de_tigre_detalle1.png',
    is_primary: false,
  },
];

// Variantes de productos de ejemplo
export const variantesProductos: VarianteProducto[] = [
  // Alimento para perros adultos
  { id: 'v1', product_id: 'p1', talla: '15kg', stock: 10 },
  { id: 'v2', product_id: 'p1', talla: '7kg', stock: 10 },
  // Alimento para gatos
  { id: 'v3', product_id: 'p2', talla: '5kg', stock: 8 },
  { id: 'v4', product_id: 'p2', talla: '2kg', stock: 7 },
  // Sudadera de tigre
  { id: 'v5', product_id: 'p3', talla: 'S', stock: 3 },
  { id: 'v6', product_id: 'p3', talla: 'M', stock: 4 },
  { id: 'v7', product_id: 'p3', talla: 'L', stock: 3 },
  // Sudadera de dinosaurio
  { id: 'v8', product_id: 'p4', talla: 'S', stock: 2 },
  { id: 'v9', product_id: 'p4', talla: 'M', stock: 3 },
  { id: 'v10', product_id: 'p4', talla: 'L', stock: 3 },
  // Pelota mordedora
  { id: 'v11', product_id: 'p5', talla: 'Única', stock: 30 },
  // Ratón de juguete
  { id: 'v12', product_id: 'p6', talla: 'Única', stock: 25 },
  // Placa básica
  { id: 'v13', product_id: 'p7', talla: 'Estándar', stock: 100 },
  // Placa premium
  { id: 'v14', product_id: 'p8', talla: 'Estándar', stock: 50 },
];

// Configuración para placas personalizadas - Actualizado según especificaciones de la clienta
export const formasPlacas: FormaPlaca[] = [
  {
    id: 'forma_huesito_grande',
    nombre: 'Huesito Grande',
    descripcion: 'Forma de hueso grande',
    precio_adicional: 0,
    max_characters: 10,
  },
  {
    id: 'forma_huesito_pequeno',
    nombre: 'Huesito Pequeño',
    descripcion: 'Forma de hueso pequeño',
    precio_adicional: 0,
    max_characters: 8,
  },
  {
    id: 'forma_corazon',
    nombre: 'Corazón',
    descripcion: 'Forma de corazón adorable',
    precio_adicional: 0,
    max_characters: 8,
  },
  {
    id: 'forma_estrella',
    nombre: 'Estrella',
    descripcion: 'Forma de estrella única',
    precio_adicional: 0,
    max_characters: 8,
  },
  {
    id: 'forma_huellita',
    nombre: 'Huellita',
    descripcion: 'Forma de huella de mascota',
    precio_adicional: 0,
    max_characters: 8,
  },
  {
    id: 'forma_circulo',
    nombre: 'Círculo',
    descripcion: 'Forma circular clásica',
    precio_adicional: 0,
    max_characters: 10,
  },
];

export const coloresPlacas: ColorPlaca[] = [
  {
    id: 'color_azul_rey',
    nombre: 'Azul Rey',
    codigo_hex: '#4169E1',
    precio_adicional: 0,
  },
  {
    id: 'color_morado',
    nombre: 'Morado',
    codigo_hex: '#800080',
    precio_adicional: 0,
  },
  {
    id: 'color_rosado',
    nombre: 'Rosado',
    codigo_hex: '#FFB6C1',
    precio_adicional: 0,
  },
  {
    id: 'color_verde',
    nombre: 'Verde',
    codigo_hex: '#228B22',
    precio_adicional: 0,
  },
  {
    id: 'color_negro',
    nombre: 'Negro',
    codigo_hex: '#000000',
    precio_adicional: 0,
  },
  {
    id: 'color_rojo',
    nombre: 'Rojo',
    codigo_hex: '#DC143C',
    precio_adicional: 0,
  },
  {
    id: 'color_turquesa',
    nombre: 'Turquesa',
    codigo_hex: '#40E0D0',
    precio_adicional: 0,
    restricciones: ['forma_huellita', 'forma_huesito_grande'], // No disponible para huellita y huesito grande
  },
];

// Tipografías reales disponibles en public/placas/tipografias/
export const tipografiasPlacas: TipografiaPlaca[] = [
  {
    id: 'tipo1',
    nombre: 'Archivo Black',
    font_family: 'ArchivoBlack',
    precio_adicional: 0,
  },
  {
    id: 'tipo2',
    nombre: 'Best Curry',
    font_family: 'BestCurry',
    precio_adicional: 0,
  },
  {
    id: 'tipo3',
    nombre: 'Bestime',
    font_family: 'Bestime',
    precio_adicional: 0,
  },
  {
    id: 'tipo4',
    nombre: 'Calling Heart',
    font_family: 'CallingHeart',
    precio_adicional: 0,
  },
  {
    id: 'tipo5',
    nombre: 'CHERI',
    font_family: 'CHERI',
    precio_adicional: 0,
  },
  {
    id: 'tipo6',
    nombre: 'Choco Shake',
    font_family: 'ChocoShake',
    precio_adicional: 0,
  },
  {
    id: 'tipo7',
    nombre: 'Cream Cake Bold',
    font_family: 'CreamCakeBold',
    precio_adicional: 0,
  },
  {
    id: 'tipo8',
    nombre: 'Dinosaur',
    font_family: 'Dinosaur',
    precio_adicional: 0,
  },
  {
    id: 'tipo9',
    nombre: 'Gosent Black',
    font_family: 'GosentBlack',
    precio_adicional: 0,
  },
  {
    id: 'tipo10',
    nombre: 'Happy Selfie',
    font_family: 'HappySelfie',
    precio_adicional: 0,
  },
  {
    id: 'tipo11',
    nombre: 'Hello Valentina',
    font_family: 'HelloValentina',
    precio_adicional: 0,
  },
  {
    id: 'tipo12',
    nombre: 'Learn Thing',
    font_family: 'LearnThing',
    precio_adicional: 0,
  },
  {
    id: 'tipo13',
    nombre: 'Milk Peach Clean',
    font_family: 'MilkPeachClean',
    precio_adicional: 0,
  },
  {
    id: 'tipo14',
    nombre: 'Showdex',
    font_family: 'Showdex',
    precio_adicional: 0,
  },
];

// Iconos reales disponibles en public/placas/iconos/
export const iconosPlacas: IconoPlaca[] = [
  {
    id: 'icono1',
    nombre: 'Amante de los Gatos',
    categoria: 'mascotas',
    codigo_icon: '/placas/iconos/amante-de-los-gatos.png',
    precio_adicional: 0,
  },
  {
    id: 'icono2',
    nombre: 'Amigable con Animales',
    categoria: 'mascotas',
    codigo_icon: '/placas/iconos/amigable-con-los-animales.png',
    precio_adicional: 0,
  },
  {
    id: 'icono3',
    nombre: 'Amor de Mascotas',
    categoria: 'amor',
    codigo_icon: '/placas/iconos/amor-de-mascotas.png',
    precio_adicional: 0,
  },
  {
    id: 'icono4',
    nombre: 'Animal Gato',
    categoria: 'mascotas',
    codigo_icon: '/placas/iconos/animal-gato.png',
    precio_adicional: 0,
  },
  {
    id: 'icono5',
    nombre: 'Cohete',
    categoria: 'espacial',
    codigo_icon: '/placas/iconos/cohete.png',
    precio_adicional: 0,
  },
  {
    id: 'icono6',
    nombre: 'Comida de Perro',
    categoria: 'mascotas',
    codigo_icon: '/placas/iconos/comida-de-perro.png',
    precio_adicional: 0,
  },
  {
    id: 'icono7',
    nombre: 'Corona',
    categoria: 'premium',
    codigo_icon: '/placas/iconos/corona.png',
    precio_adicional: 0,
  },
  {
    id: 'icono8',
    nombre: 'Corona Premium',
    categoria: 'premium',
    codigo_icon: '/placas/iconos/corona (1).png',
    precio_adicional: 0,
  },
  {
    id: 'icono9',
    nombre: 'Estrella',
    categoria: 'especial',
    codigo_icon: '/placas/iconos/estrella (1).png',
    precio_adicional: 0,
  },
  {
    id: 'icono10',
    nombre: 'Feliz',
    categoria: 'emocional',
    codigo_icon: '/placas/iconos/feliz.png',
    precio_adicional: 0,
  },
  {
    id: 'icono11',
    nombre: 'Gato',
    categoria: 'mascotas',
    codigo_icon: '/placas/iconos/gato.png',
    precio_adicional: 0,
  },
  {
    id: 'icono12',
    nombre: 'Gato Negro',
    categoria: 'mascotas',
    codigo_icon: '/placas/iconos/gato-negro.png',
    precio_adicional: 0,
  },
  {
    id: 'icono13',
    nombre: 'Gato Negro 2',
    categoria: 'mascotas',
    codigo_icon: '/placas/iconos/gato-negro (1).png',
    precio_adicional: 0,
  },
  {
    id: 'icono14',
    nombre: 'Gato Negro 3',
    categoria: 'mascotas',
    codigo_icon: '/placas/iconos/gato-negro (2).png',
    precio_adicional: 0,
  },
  {
    id: 'icono15',
    nombre: 'Huella',
    categoria: 'mascotas',
    codigo_icon: '/placas/iconos/huella.png',
    precio_adicional: 0,
  },
  {
    id: 'icono16',
    nombre: 'Huella 2',
    categoria: 'mascotas',
    codigo_icon: '/placas/iconos/huella (1).png',
    precio_adicional: 0,
  },
  {
    id: 'icono17',
    nombre: 'Huella 3',
    categoria: 'mascotas',
    codigo_icon: '/placas/iconos/huella (2).png',
    precio_adicional: 0,
  },
  {
    id: 'icono18',
    nombre: 'Huella de Corazón',
    categoria: 'amor',
    codigo_icon: '/placas/iconos/huella-de-perro-en-un-corazon.png',
    precio_adicional: 0,
  },
  {
    id: 'icono19',
    nombre: 'Hueso',
    categoria: 'mascotas',
    codigo_icon: '/placas/iconos/hueso.png',
    precio_adicional: 0,
  },
  {
    id: 'icono20',
    nombre: 'Hueso 2',
    categoria: 'mascotas',
    codigo_icon: '/placas/iconos/hueso (2).png',
    precio_adicional: 0,
  },
  {
    id: 'icono21',
    nombre: 'Hueso de Pescado',
    categoria: 'mascotas',
    codigo_icon: '/placas/iconos/hueso-de-pescado.png',
    precio_adicional: 0,
  },
  {
    id: 'icono22',
    nombre: 'Juguete para Perros',
    categoria: 'mascotas',
    codigo_icon: '/placas/iconos/juguete-para-perros.png',
    precio_adicional: 0,
  },
  {
    id: 'icono23',
    nombre: 'Luna',
    categoria: 'espacial',
    codigo_icon: '/placas/iconos/luna (2).png',
    precio_adicional: 0,
  },
  {
    id: 'icono24',
    nombre: 'Planeta',
    categoria: 'espacial',
    codigo_icon: '/placas/iconos/planeta (1).png',
    precio_adicional: 0,
  },
  {
    id: 'icono25',
    nombre: 'Planeta 2',
    categoria: 'espacial',
    codigo_icon: '/placas/iconos/planeta (2).png',
    precio_adicional: 0,
  },
  {
    id: 'icono26',
    nombre: 'Planeta 3',
    categoria: 'espacial',
    codigo_icon: '/placas/iconos/planeta (4).png',
    precio_adicional: 0,
  },
  {
    id: 'icono27',
    nombre: 'Planeta 4',
    categoria: 'espacial',
    codigo_icon: '/placas/iconos/planeta (5).png',
    precio_adicional: 0,
  },
  {
    id: 'icono28',
    nombre: 'Refugio de Animales',
    categoria: 'mascotas',
    codigo_icon: '/placas/iconos/refugio-de-animales.png',
    precio_adicional: 0,
  },
  {
    id: 'icono29',
    nombre: 'Viaje Espacial',
    categoria: 'espacial',
    codigo_icon: '/placas/iconos/viaje-espacial.png',
    precio_adicional: 0,
  },
  {
    id: 'icono30',
    nombre: 'Icono Especial 1',
    categoria: 'especial',
    codigo_icon: '/placas/iconos/iconos (1).png',
    precio_adicional: 0,
  },
  {
    id: 'icono31',
    nombre: 'Icono Especial 2',
    categoria: 'especial',
    codigo_icon: '/placas/iconos/iconos (7).png',
    precio_adicional: 0,
  },
  {
    id: 'icono32',
    nombre: 'Icono Especial 3',
    categoria: 'especial',
    codigo_icon: '/placas/iconos/iconos (14).png',
    precio_adicional: 0,
  },
  {
    id: 'icono33',
    nombre: 'Icono Especial 4',
    categoria: 'especial',
    codigo_icon: '/placas/iconos/iconos (18).png',
    precio_adicional: 0,
  },
  {
    id: 'icono34',
    nombre: 'Icono Especial 5',
    categoria: 'especial',
    codigo_icon: '/placas/iconos/iconos (22).png',
    precio_adicional: 0,
  },
  {
    id: 'icono35',
    nombre: 'Icono Especial 6',
    categoria: 'especial',
    codigo_icon: '/placas/iconos/iconos (23).png',
    precio_adicional: 0,
  },
  {
    id: 'icono36',
    nombre: 'Icono Especial 7',
    categoria: 'especial',
    codigo_icon: '/placas/iconos/iconos (24).png',
    precio_adicional: 0,
  },
  {
    id: 'icono37',
    nombre: 'Icono Especial 8',
    categoria: 'especial',
    codigo_icon: '/placas/iconos/iconos (26).png',
    precio_adicional: 0,
  },
];

// Mock data para el sistema de usuarios administradores
export const perfilesUsuario: PerfilUsuario[] = [
  {
    id: 'admin-1',
    email: 'admin@mishuellitas.com',
    nombre_completo: 'Administrador Principal',
    rol: 'super_admin',
    is_active: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
  },
  {
    id: 'admin-2',
    email: 'manager@mishuellitas.com',
    nombre_completo: 'Manager de Tienda',
    rol: 'admin',
    is_active: true,
    created_at: '2024-01-20T14:30:00Z',
    updated_at: '2024-01-20T14:30:00Z',
  },
];

// Mock data para restricciones de colores y formas
export const restriccionesColoresFormas: RestriccionColorForma[] = [
  {
    id: 'rest-1',
    color_id: 'color_turquesa',
    forma_id: 'forma_huellita',
  },
  {
    id: 'rest-2',
    color_id: 'color_turquesa',
    forma_id: 'forma_huesito_grande',
  },
];

// Mock data para personalizaciones de placas
export const personalizacionesPlacas: PersonalizacionPlaca[] = [
  {
    id: 'pers-1',
    nombre_mascota: 'Max',
    forma_id: 'forma_huesito_grande',
    color_id: 'color_azul_rey',
    tipografia_id: 'tipo1',
    icono_id: 'icono11',
    created_at: '2024-01-25T09:15:00Z',
  },
  {
    id: 'pers-2',
    nombre_mascota: 'Luna',
    forma_id: 'forma_corazon',
    color_id: 'color_rosado',
    tipografia_id: 'tipo4',
    icono_id: 'icono18',
    created_at: '2024-01-25T11:30:00Z',
  },
  {
    id: 'pers-3',
    nombre_mascota: 'Rocky',
    forma_id: 'forma_estrella',
    color_id: 'color_negro',
    tipografia_id: 'tipo8',
    icono_id: 'icono19',
    created_at: '2024-01-25T14:45:00Z',
  },
];

// Mock data para órdenes
export const ordenes: Orden[] = [
  {
    id: 'orden-1',
    numero_orden: 'ORD-2024-0001',
    cliente_nombre: 'María García',
    cliente_telefono: '+52 999 123 4567',
    cliente_email: 'maria.garcia@email.com',
    cliente_direccion: 'Calle 45 #123 x 20 y 22, Col. Centro',
    cliente_ciudad: 'Mérida',
    cliente_codigo_postal: '97000',
    subtotal: 275.00,
    impuestos: 0,
    envio: 50.00,
    total: 325.00,
    estado: 'confirmado',
    metodo_contacto: 'whatsapp',
    notas_cliente: 'Favor de llamar antes de entregar',
    notas_admin: 'Cliente prefiere entrega en la tarde',
    created_at: '2024-01-25T08:30:00Z',
    updated_at: '2024-01-25T10:15:00Z',
    contactado_at: '2024-01-25T09:00:00Z',
    confirmado_at: '2024-01-25T10:15:00Z',
  },
  {
    id: 'orden-2',
    numero_orden: 'ORD-2024-0002',
    cliente_nombre: 'Carlos Pérez',
    cliente_telefono: '+52 999 987 6543',
    cliente_email: 'carlos.perez@email.com',
    cliente_direccion: 'Av. Itzáes #456, Col. García Ginerés',
    cliente_ciudad: 'Mérida',
    cliente_codigo_postal: '97070',
    subtotal: 120.00,
    impuestos: 0,
    envio: 0, // Recogerá en tienda
    total: 120.00,
    estado: 'preparando',
    metodo_contacto: 'whatsapp',
    notas_cliente: 'Recogeré en tienda el sábado',
    created_at: '2024-01-25T14:20:00Z',
    updated_at: '2024-01-25T15:45:00Z',
    contactado_at: '2024-01-25T14:30:00Z',
    confirmado_at: '2024-01-25T15:45:00Z',
  },
  {
    id: 'orden-3',
    numero_orden: 'ORD-2024-0003',
    cliente_nombre: 'Ana Rodríguez',
    cliente_telefono: '+52 999 555 7890',
    cliente_direccion: 'Calle 60 #789, Col. Centro Histórico',
    cliente_ciudad: 'Mérida',
    cliente_codigo_postal: '97000',
    subtotal: 45.00,
    impuestos: 0,
    envio: 30.00,
    total: 75.00,
    estado: 'pendiente',
    metodo_contacto: 'whatsapp',
    notas_cliente: 'Es para regalo, favor de envolver bonito',
    created_at: '2024-01-26T11:10:00Z',
    updated_at: '2024-01-26T11:10:00Z',
  },
  {
    id: 'orden-4',
    numero_orden: 'ORD-2024-0004',
    cliente_nombre: 'Luis Hernández',
    cliente_telefono: '+52 999 444 1122',
    cliente_email: 'luis.hernandez@email.com',
    cliente_direccion: 'Calle 23 #345, Col. Alemán',
    cliente_ciudad: 'Mérida',
    cliente_codigo_postal: '97204',
    subtotal: 480.00,
    impuestos: 0,
    envio: 60.00,
    total: 540.00,
    estado: 'enviado',
    metodo_contacto: 'telefono',
    notas_admin: 'Envío con paquetería express',
    created_at: '2024-01-24T16:45:00Z',
    updated_at: '2024-01-25T08:00:00Z',
    contactado_at: '2024-01-24T17:00:00Z',
    confirmado_at: '2024-01-24T18:30:00Z',
    enviado_at: '2024-01-25T08:00:00Z',
  },
];

// Mock data para items de órdenes
export const ordenItems: OrdenItem[] = [
  // Orden 1 - María García
  {
    id: 'item-1',
    orden_id: 'orden-1',
    producto_id: 'p3',
    variante_id: 'v6',
    cantidad: 1,
    precio_unitario: 250.00,
    precio_total: 250.00,
    producto_nombre: 'Sudadera de Tigre',
    producto_descripcion: 'Sudadera cálida y cómoda con diseño de tigre para perros pequeños.',
    variante_talla: 'M',
    created_at: '2024-01-25T08:30:00Z',
  },
  {
    id: 'item-2',
    orden_id: 'orden-1',
    producto_id: 'p7',
    variante_id: 'v13',
    personalizacion_id: 'pers-1',
    cantidad: 1,
    precio_unitario: 25.00,
    precio_total: 25.00,
    producto_nombre: 'Placa Personalizada Básica',
    producto_descripcion: 'Placa personalizada para collar de mascota con grabado del nombre.',
    variante_talla: 'Estándar',
    created_at: '2024-01-25T08:30:00Z',
  },
  
  // Orden 2 - Carlos Pérez
  {
    id: 'item-3',
    orden_id: 'orden-2',
    producto_id: 'p2',
    variante_id: 'v3',
    cantidad: 1,
    precio_unitario: 120.00,
    precio_total: 120.00,
    producto_nombre: 'Alimento para Gatos Esterilizados',
    producto_descripcion: 'Fórmula especial para gatos esterilizados, ayuda a mantener el peso ideal.',
    variante_talla: '5kg',
    created_at: '2024-01-25T14:20:00Z',
  },
  
  // Orden 3 - Ana Rodríguez
  {
    id: 'item-4',
    orden_id: 'orden-3',
    producto_id: 'p5',
    variante_id: 'v11',
    cantidad: 1,
    precio_unitario: 45.00,
    precio_total: 45.00,
    producto_nombre: 'Pelota Mordedora',
    producto_descripcion: 'Pelota resistente para perros, ideal para juegos de buscar y traer.',
    variante_talla: 'Única',
    created_at: '2024-01-26T11:10:00Z',
  },
  
  // Orden 4 - Luis Hernández
  {
    id: 'item-5',
    orden_id: 'orden-4',
    producto_id: 'p3',
    variante_id: 'v7',
    cantidad: 1,
    precio_unitario: 250.00,
    precio_total: 250.00,
    producto_nombre: 'Sudadera de Tigre',
    variante_talla: 'L',
    created_at: '2024-01-24T16:45:00Z',
  },
  {
    id: 'item-6',
    orden_id: 'orden-4',
    producto_id: 'p4',
    variante_id: 'v10',
    cantidad: 1,
    precio_unitario: 230.00,
    precio_total: 230.00,
    producto_nombre: 'Sudadera de Dinosaurio',
    variante_talla: 'L',
    created_at: '2024-01-24T16:45:00Z',
  },
];

// Mock data para historial de órdenes
export const ordenHistorial: OrdenHistorial[] = [
  {
    id: 'hist-1',
    orden_id: 'orden-1',
    estado_anterior: 'pendiente',
    estado_nuevo: 'contactado',
    comentario: 'Cliente contactado vía WhatsApp',
    usuario_admin_id: 'admin-1',
    created_at: '2024-01-25T09:00:00Z',
  },
  {
    id: 'hist-2',
    orden_id: 'orden-1',
    estado_anterior: 'contactado',
    estado_nuevo: 'confirmado',
    comentario: 'Orden confirmada, cliente acepta entrega',
    usuario_admin_id: 'admin-1',
    created_at: '2024-01-25T10:15:00Z',
  },
  {
    id: 'hist-3',
    orden_id: 'orden-2',
    estado_anterior: 'pendiente',
    estado_nuevo: 'contactado',
    comentario: 'Cliente contactado, prefiere recoger en tienda',
    usuario_admin_id: 'admin-2',
    created_at: '2024-01-25T14:30:00Z',
  },
  {
    id: 'hist-4',
    orden_id: 'orden-2',
    estado_anterior: 'contactado',
    estado_nuevo: 'confirmado',
    comentario: 'Confirmado para recoger el sábado',
    usuario_admin_id: 'admin-2',
    created_at: '2024-01-25T15:45:00Z',
  },
  {
    id: 'hist-5',
    orden_id: 'orden-2',
    estado_anterior: 'confirmado',
    estado_nuevo: 'preparando',
    comentario: 'Orden en preparación',
    usuario_admin_id: 'admin-2',
    created_at: '2024-01-25T16:00:00Z',
  },
  {
    id: 'hist-6',
    orden_id: 'orden-4',
    estado_anterior: 'pendiente',
    estado_nuevo: 'contactado',
    comentario: 'Cliente contactado por teléfono',
    usuario_admin_id: 'admin-1',
    created_at: '2024-01-24T17:00:00Z',
  },
  {
    id: 'hist-7',
    orden_id: 'orden-4',
    estado_anterior: 'contactado',
    estado_nuevo: 'confirmado',
    comentario: 'Orden confirmada, acepta envío express',
    usuario_admin_id: 'admin-1',
    created_at: '2024-01-24T18:30:00Z',
  },
  {
    id: 'hist-8',
    orden_id: 'orden-4',
    estado_anterior: 'confirmado',
    estado_nuevo: 'preparando',
    comentario: 'Orden preparada para envío',
    usuario_admin_id: 'admin-2',
    created_at: '2024-01-24T20:00:00Z',
  },
  {
    id: 'hist-9',
    orden_id: 'orden-4',
    estado_anterior: 'preparando',
    estado_nuevo: 'enviado',
    comentario: 'Enviado con paquetería express - Guía: EXP123456789',
    usuario_admin_id: 'admin-2',
    created_at: '2024-01-25T08:00:00Z',
  },
]; 