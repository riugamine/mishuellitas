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
};

export type ColorPlaca = {
  id: string;
  nombre: string;
  codigo_hex: string;
  precio_adicional: number;
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
  nombre_mascota: string;
  forma_id: string;
  color_id: string;
  tipografia_id: string;
  icono_id?: string;
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

// Configuración para placas personalizadas
export const formasPlacas: FormaPlaca[] = [
  {
    id: 'forma1',
    nombre: 'Redonda',
    descripcion: 'Placa circular clásica',
    precio_adicional: 0,
  },
  {
    id: 'forma2',
    nombre: 'Rectangular',
    descripcion: 'Placa rectangular tradicional',
    precio_adicional: 0,
  },
  {
    id: 'forma3',
    nombre: 'Hueso',
    descripcion: 'Forma de hueso divertida',
    precio_adicional: 0,
  },
  {
    id: 'forma4',
    nombre: 'Corazón',
    descripcion: 'Forma de corazón adorable',
    precio_adicional: 0,
  },
  {
    id: 'forma5',
    nombre: 'Estrella',
    descripcion: 'Forma de estrella única',
    precio_adicional: 0,
  },
];

export const coloresPlacas: ColorPlaca[] = [
  {
    id: 'color1',
    nombre: 'Plateado',
    codigo_hex: '#C0C0C0',
    precio_adicional: 0,
  },
  {
    id: 'color2',
    nombre: 'Dorado',
    codigo_hex: '#FFD700',
    precio_adicional: 0,
  },
  {
    id: 'color3',
    nombre: 'Negro',
    codigo_hex: '#000000',
    precio_adicional: 0,
  },
  {
    id: 'color4',
    nombre: 'Azul',
    codigo_hex: '#4169E1',
    precio_adicional: 0,
  },
  {
    id: 'color5',
    nombre: 'Rojo',
    codigo_hex: '#DC143C',
    precio_adicional: 0,
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