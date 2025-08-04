'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  productos, 
  categorias, 
  imagenesProductos, 
  variantesProductos,
  formasPlacas,
  coloresPlacas,
  tipografiasPlacas,
  iconosPlacas,
  type PersonalizacionPlaca
} from '@/lib/placeholder-data';
import { useCartStore } from '@/lib/store/useCartStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { ProductCard } from '@/components/product/product-card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faHeart, faStar, faDog, faCat, faHome } from '@fortawesome/free-solid-svg-icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Types for the component
interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Utility functions
const getProductBySlug = (slug: string) => productos.find(p => p.slug === slug);
const getCategoriaById = (categoriaId: string) => categorias.find(c => c.id === categoriaId);
const getImagenesByProductId = (productId: string) => imagenesProductos.filter(img => img.product_id === productId);
const getVariantesByProductId = (productId: string) => variantesProductos.filter(v => v.product_id === productId);
const getImagenPrincipal = (productId: string) =>
  imagenesProductos.find((img) => img.product_id === productId && img.is_primary)?.image_url;

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<any>(null);
  const [categoria, setCategoria] = useState<any>(null);
  const [imagenes, setImagenes] = useState<any[]>([]);
  const [variantes, setVariantes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMainImage, setSelectedMainImage] = useState<string | null>(null);
  const router = useRouter();

  // Estados para personalización de placas
  const [placaPersonalization, setPlacaPersonalization] = useState<PersonalizacionPlaca>({
    nombre_mascota: '',
    forma_id: '',
    color_id: '',
    tipografia_id: '',
    icono_id: 'none',
  });
  const [placaPreview, setPlacaPreview] = useState({
    precioTotal: 0,
    resumen: '',
  });
  
  // Store del carrito
  const addItem = useCartStore(state => state.addItem);

  // Funciones auxiliares para placas
  const getIconComponent = (iconCode: string) => {
    // Ahora iconCode es la ruta de la imagen
    return iconCode;
  };

  const calculatePlacaPrice = () => {
    // Ahora todas las opciones son estándar, solo devolvemos el precio base
    return product?.precio || 0;
  };

  // Obtener forma seleccionada y sus restricciones
  const selectedForma = React.useMemo(() => {
    return formasPlacas.find(f => f.id === placaPersonalization.forma_id);
  }, [placaPersonalization.forma_id]);

  // Filtrar colores disponibles según la forma seleccionada
  const coloresDisponibles = React.useMemo(() => {
    if (!selectedForma) return coloresPlacas;
    return coloresPlacas.filter(color => {
      // Si el color tiene restricciones, verificar si la forma actual está en ellas
      if (color.restricciones && color.restricciones.includes(selectedForma.id)) {
        return false;
      }
      return true;
    });
  }, [selectedForma]);

  const updatePlacaPersonalization = (field: keyof PersonalizacionPlaca, value: string) => {
    setPlacaPersonalization(prev => {
      const newState = {
        ...prev,
        [field]: value
      };
      
      // Si se cambió la forma, verificar si el color actual está disponible
      if (field === 'forma_id') {
        const newForma = formasPlacas.find(f => f.id === value);
        const colorActual = coloresPlacas.find(c => c.id === prev.color_id);
        
        // Si el color actual tiene restricciones para la nueva forma, resetear color
        if (colorActual?.restricciones && colorActual.restricciones.includes(value)) {
          newState.color_id = coloresPlacas.find(c => !c.restricciones?.includes(value))?.id || '';
        }
        
        // Si el nombre excede el límite de la nueva forma, truncarlo
        if (newForma && prev.nombre_mascota.length > newForma.max_characters) {
          newState.nombre_mascota = prev.nombre_mascota.slice(0, newForma.max_characters);
        }
      }
      
      return newState;
    });
  };
  
  // Resolve async params and set product data
  React.useEffect(() => {
    const loadProductData = async () => {
      try {
        const resolvedParams = await params;
        const productData = getProductBySlug(resolvedParams.slug);
        
        if (productData) {
          setProduct(productData);
          setCategoria(getCategoriaById(productData.categoria_id));
          setImagenes(getImagenesByProductId(productData.id));
          setVariantes(getVariantesByProductId(productData.id));
          
          // Si es una placa, inicializar valores por defecto
          if (productData.tipo === 'placa') {
            setPlacaPersonalization(prev => ({
              ...prev,
              forma_id: formasPlacas[0]?.id || '',
              color_id: coloresPlacas[0]?.id || '',
              tipografia_id: tipografiasPlacas[0]?.id || '',
              icono_id: 'none',
            }));
          }
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProductData();
  }, [params]);

  // Actualizar precio cuando cambie la personalización
  React.useEffect(() => {
    if (product && product.tipo === 'placa') {
      const precioTotal = calculatePlacaPrice();
      setPlacaPreview({
        precioTotal,
        resumen: `${placaPersonalization.nombre_mascota || 'Tu mascota'}`,
      });
    }
  }, [placaPersonalization, product]);
  
  // Handle variant selection
  const handleVariantChange = (value: string) => {
    setSelectedVariant(value);
    setQuantity(1); // Reset quantity when variant changes
  };
  
  // Handle quantity changes
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (!product) return;

    // Validaciones para placas personalizadas
    if (product.tipo === 'placa') {
      if (!placaPersonalization.nombre_mascota.trim()) {
        toast.error('🐾 Por favor ingresa el nombre de tu mascota');
        return;
      }
      if (!placaPersonalization.forma_id || !placaPersonalization.color_id || !placaPersonalization.tipografia_id) {
        toast.error('🐾 Por favor completa todas las opciones de personalización');
        return;
      }
      
      // Validar longitud del nombre según la forma
      const forma = formasPlacas.find(f => f.id === placaPersonalization.forma_id);
      if (forma && placaPersonalization.nombre_mascota.length > forma.max_characters) {
        toast.error(`🐾 El nombre no puede tener más de ${forma.max_characters} caracteres para la forma ${forma.nombre}`);
        return;
      }
      
      // Validar que el color esté disponible para la forma
      const color = coloresPlacas.find(c => c.id === placaPersonalization.color_id);
      if (color?.restricciones && color.restricciones.includes(placaPersonalization.forma_id)) {
        toast.error(`🐾 El color ${color.nombre} no está disponible para la forma ${forma?.nombre}`);
        return;
      }
    }
    
    // Si hay variantes pero no se seleccionó una
    if (variantes.length > 0 && !selectedVariant) {
      toast.error('🐾 Por favor selecciona una variante');
      return;
    }
    
    let cartItem;
    const finalPrice = product.tipo === 'placa' ? calculatePlacaPrice() : product.precio;
    
    if (variantes.length > 0) {
      // Producto con variantes
      const variant = variantes.find(v => v.id === selectedVariant);
      if (!variant) {
        toast.error('🐾 Variante no encontrada');
        return;
      }
      
      if (quantity > variant.stock) {
        toast.error('🐾 No hay suficiente stock disponible');
        return;
      }
      
      cartItem = {
        id: product.id,
        name: product.nombre,
        price: finalPrice,
        quantity: quantity,
        size: variant.talla,
        image_url: primaryImage || '/icons/perro.png',
        variant_id: variant.id,
        max_stock: variant.stock,
        slug: product.slug,
        tipo_producto: product.tipo || 'normal',
        personalizacion: product.tipo === 'placa' ? {
          ...placaPersonalization,
          precio_adicional: 0,
        } : undefined,
      };
    } else {
      // Producto sin variantes
      if (quantity > product.stock) {
        toast.error('🐾 No hay suficiente stock disponible');
        return;
      }
      
      cartItem = {
        id: product.id,
        name: product.nombre,
        price: finalPrice,
        quantity: quantity,
        size: 'Única',
        image_url: primaryImage || '/icons/perro.png',
        variant_id: `${product.id}-default`,
        max_stock: product.stock,
        slug: product.slug,
        tipo_producto: product.tipo || 'normal',
        personalizacion: product.tipo === 'placa' ? {
          ...placaPersonalization,
          precio_adicional: 0,
        } : undefined,
      };
    }
    
    addItem(cartItem);
    toast.success(`🐾 ${product.nombre} agregado al carrito!`);
  };
  
  // Handle buy now - add to cart and redirect
  const handleBuyNow = () => {
    if (!product) return;

    // Validaciones para placas personalizadas
    if (product.tipo === 'placa') {
      if (!placaPersonalization.nombre_mascota.trim()) {
        toast.error('🐾 Por favor ingresa el nombre de tu mascota');
        return;
      }
      if (!placaPersonalization.forma_id || !placaPersonalization.color_id || !placaPersonalization.tipografia_id) {
        toast.error('🐾 Por favor completa todas las opciones de personalización');
        return;
      }
      
      // Validar longitud del nombre según la forma
      const forma = formasPlacas.find(f => f.id === placaPersonalization.forma_id);
      if (forma && placaPersonalization.nombre_mascota.length > forma.max_characters) {
        toast.error(`🐾 El nombre no puede tener más de ${forma.max_characters} caracteres para la forma ${forma.nombre}`);
        return;
      }
      
      // Validar que el color esté disponible para la forma
      const color = coloresPlacas.find(c => c.id === placaPersonalization.color_id);
      if (color?.restricciones && color.restricciones.includes(placaPersonalization.forma_id)) {
        toast.error(`🐾 El color ${color.nombre} no está disponible para la forma ${forma?.nombre}`);
        return;
      }
    }
    
    // Si hay variantes pero no se seleccionó una
    if (variantes.length > 0 && !selectedVariant) {
      toast.error('🐾 Por favor selecciona una variante');
      return;
    }
    
    let cartItem;
    const finalPrice = product.tipo === 'placa' ? calculatePlacaPrice() : product.precio;
    
    if (variantes.length > 0) {
      // Producto con variantes
      const variant = variantes.find(v => v.id === selectedVariant);
      if (!variant) {
        toast.error('🐾 Variante no encontrada');
        return;
      }
      
      if (quantity > variant.stock) {
        toast.error('🐾 No hay suficiente stock disponible');
        return;
      }
      
      cartItem = {
        id: product.id,
        name: product.nombre,
        price: finalPrice,
        quantity: quantity,
        size: variant.talla,
        image_url: primaryImage || '/icons/perro.png',
        variant_id: variant.id,
        max_stock: variant.stock,
        slug: product.slug,
        tipo_producto: product.tipo || 'normal',
        personalizacion: product.tipo === 'placa' ? {
          ...placaPersonalization,
          precio_adicional: 0,
        } : undefined,
      };
    } else {
      // Producto sin variantes
      if (quantity > product.stock) {
        toast.error('🐾 No hay suficiente stock disponible');
        return;
      }
      
      cartItem = {
        id: product.id,
        name: product.nombre,
        price: finalPrice,
        quantity: quantity,
        size: 'Única',
        image_url: primaryImage || '/icons/perro.png',
        variant_id: `${product.id}-default`,
        max_stock: product.stock,
        slug: product.slug,
        tipo_producto: product.tipo || 'normal',
        personalizacion: product.tipo === 'placa' ? {
          ...placaPersonalization,
          precio_adicional: 0,
        } : undefined,
      };
    }
    
    addItem(cartItem);
    toast.success('🐾 Producto agregado al carrito! Redirigiendo...');
    
    // Redirigir al carrito después de un breve delay
    setTimeout(() => {
      router.push('/carrito');
    }, 1000);
  };
  
  // Calcula currentStock solo cuando los datos estén listos
  const currentStock = React.useMemo(() => {
    if (!product) return 0;
    const selectedVariantData = variantes.find(v => v.id === selectedVariant);
    return selectedVariantData?.stock ?? product.stock;
  }, [product, variantes, selectedVariant]);

  // Muestra la advertencia solo cuando el producto está cargado
  React.useEffect(() => {
    if (product && currentStock <= 5 && currentStock > 0) {
      toast.warning(`🐾 ¡Solo quedan ${currentStock} unidades de ${product.nombre}!`);
    }
  }, [product, currentStock]);
  
  const primaryImage = React.useMemo(() => {
    if (selectedMainImage) return selectedMainImage;
    return imagenes.find(img => img.is_primary)?.image_url || imagenes[0]?.image_url;
  }, [imagenes, selectedMainImage]);
  
  // Show loading state while params are being resolved
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando producto...</p>
        </div>
      </div>
    );
  }
  
  // If product not found
  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <p className="text-gray-600 mb-6">El producto que buscas no existe o ha sido removido.</p>
          <Button asChild>
            <Link href="/productos">Volver a Productos</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const hasVariants = variantes.length > 0;
  
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
              <Link href="/productos">Productos</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {categoria && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/productos?categoria=${categoria.slug}`}>{categoria.nombre}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          <BreadcrumbItem>
            <BreadcrumbPage>{product.nombre}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        {/* Product Images */}
        <div className="space-y-4">
          <Card className="p-4">
            <div className="aspect-square relative overflow-hidden rounded-lg">
              {primaryImage ? (
                <img
                  src={primaryImage}
                  alt={product.nombre}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Sin imagen</span>
                </div>
              )}
            </div>
          </Card>
          {/* Miniaturas de imágenes */}
          {imagenes.length > 1 && (
            <ScrollArea className="w-full max-w-xs md:max-w-sm lg:max-w-md overflow-x-auto">
              <div className="flex gap-2 justify-center min-w-fit py-1">
                {imagenes.map((imagen, index) => (
                  <button
                    key={imagen.id}
                    type="button"
                    className={`border rounded overflow-hidden w-16 h-16 p-0.5 transition-all ${primaryImage === imagen.image_url ? 'ring-2 ring-primary' : 'hover:ring-2 hover:ring-primary'}`}
                    onClick={() => setSelectedMainImage(imagen.image_url)}
                    tabIndex={0}
                  >
                    <img
                      src={imagen.image_url}
                      alt={`${product.nombre} miniatura ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          )}
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          {/* Category Badge */}
          {categoria && (
            <Badge variant="secondary" className="text-sm">
              {categoria.nombre}
            </Badge>
          )}
          
          {/* Product Title */}
          <h1 className="text-3xl font-bold text-primary dark:text-primary-foreground">{product.nombre}</h1>
          {/* Product Description debajo del título (máx 100 caracteres) */}
          <p className="text-secondary dark:text-secondary-foreground leading-relaxed mb-2">
            {product.descripcion.length > 100 ? product.descripcion.slice(0, 100) + '…' : product.descripcion}
          </p>
          
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">
              REF {(product.tipo === 'placa' ? placaPreview.precioTotal : product.precio).toFixed(2)}
            </span>
            {product.tipo === 'placa' && placaPreview.precioTotal > product.precio && (
              <span className="text-lg text-gray-500 line-through">
                REF {product.precio.toFixed(2)}
              </span>
            )}
            {currentStock <= 5 && currentStock > 0 && (
              <Badge variant="destructive" className="text-xs">
                Solo {currentStock} disponibles
              </Badge>
            )}
          </div>
          
          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {currentStock > 0 ? (
              <Badge variant="default" className="bg-green-100 text-green-800">
                En stock
              </Badge>
            ) : (
              <Badge variant="destructive">Sin stock</Badge>
            )}
            <span className="text-sm text-gray-600">
              {currentStock} unidades disponibles
            </span>
          </div>
          
          <Separator />
          
          {/* Variants Selection */}
          {hasVariants && (
            <div className="space-y-3">
              <label className="text-sm font-medium">Seleccionar variante:</label>
              <Select value={selectedVariant} onValueChange={handleVariantChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Elige una opción" />
                </SelectTrigger>
                <SelectContent>
                  {variantes.map((variante) => (
                    <SelectItem key={variante.id} value={variante.id}>
                      {variante.talla} - Stock: {variante.stock}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Personalización de Placas */}
          {product.tipo === 'placa' && (
            <Card className="p-6  border-2 border-blue-200">
              <h3 className="text-xl font-semibold mb-4 text-center text-blue-800">
                🏷️ Personaliza tu Placa
              </h3>
              
              <div className="space-y-6">
                {/* Nombre de la mascota */}
                <div className="space-y-2">
                  <Label htmlFor="nombreMascota" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nombre de tu mascota *
                  </Label>
                  <Input
                    id="nombreMascota"
                    type="text"
                    value={placaPersonalization.nombre_mascota}
                    onChange={(e) => {
                      const maxLength = selectedForma?.max_characters || 20;
                      if (e.target.value.length <= maxLength) {
                        updatePlacaPersonalization('nombre_mascota', e.target.value);
                      }
                    }}
                    placeholder="Ej: Max, Luna, Rocky..."
                    maxLength={selectedForma?.max_characters || 20}
                    className="text-center font-bold"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Máximo {selectedForma?.max_characters || 20} caracteres
                    {selectedForma && ` (${selectedForma.nombre})`}
                  </p>
                </div>

                {/* Forma de la placa */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Forma de la placa:</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {formasPlacas.map((forma) => (
                      <button
                        key={forma.id}
                        type="button"
                        onClick={() => updatePlacaPersonalization('forma_id', forma.id)}
                        className={`p-3 border rounded-lg text-center transition-all ${
                          placaPersonalization.forma_id === forma.id
                            ? 'border-blue-500 bg-blue-100 text-blue-800'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="font-medium dark:text-gray-200">{forma.nombre}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{forma.descripcion}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color de la placa */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Color de la placa:</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {coloresDisponibles.map((color) => (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => updatePlacaPersonalization('color_id', color.id)}
                        className={`p-3 border rounded-lg text-center transition-all ${
                          placaPersonalization.color_id === color.id
                            ? 'border-blue-500 bg-blue-100'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: color.codigo_hex }}
                          />
                          <span className="font-medium">{color.nombre}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  {selectedForma && coloresPlacas.length > coloresDisponibles.length && (
                    <p className="text-xs text-orange-600 dark:text-orange-400 text-center">
                      * Algunos colores no están disponibles para la forma {selectedForma.nombre}
                    </p>
                  )}
                </div>

                {/* Tipografía */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tipografía:</Label>
                  <Select 
                    value={placaPersonalization.tipografia_id} 
                    onValueChange={(value) => updatePlacaPersonalization('tipografia_id', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona una tipografía" />
                    </SelectTrigger>
                    <SelectContent className="max-h-80 w-full">
                      {tipografiasPlacas.map((tipografia) => (
                        <SelectItem 
                          key={tipografia.id} 
                          value={tipografia.id}
                          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800"
                        >
                          <div className="flex items-center justify-between w-full min-w-0 gap-4 py-2">
                            {/* Nombre de la tipografía */}
                            <div className="flex-shrink-0">
                              <div 
                                className="font-medium text-sm text-gray-900 dark:text-gray-100"
                                style={{ fontFamily: tipografia.font_family }}
                              >
                                {tipografia.nombre}
                              </div>
                            </div>
                            
                            {/* Separador visual */}
                            <div className="flex-grow border-t border-dotted border-gray-300 dark:border-gray-600 mx-2"></div>
                            
                            {/* Vista previa con el nombre de la mascota */}
                            <div className="flex-shrink-0 max-w-[120px]">
                              <div 
                                className="text-sm font-bold text-gray-700 dark:text-gray-300 truncate text-right"
                                style={{ 
                                  fontFamily: tipografia.font_family,
                                  fontSize: '16px'
                                }}
                                title={placaPersonalization.nombre_mascota || 'Vista previa'}
                              >
                                {placaPersonalization.nombre_mascota || 'Vista previa'}
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    💡 La vista previa muestra cómo se verá "{placaPersonalization.nombre_mascota || 'el nombre'}" en cada tipografía
                  </div>
                </div>

                {/* Icono opcional */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Icono (opcional):</Label>
                  <Select 
                    value={placaPersonalization.icono_id} 
                    onValueChange={(value) => updatePlacaPersonalization('icono_id', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona un icono" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      <SelectItem value="none">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 flex items-center justify-center border rounded">
                            <span className="text-xs">--</span>
                          </div>
                          <span>Sin icono</span>
                        </div>
                      </SelectItem>
                      {iconosPlacas.map((icono) => (
                        <SelectItem key={icono.id} value={icono.id}>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 flex items-center justify-center">
                              <img 
                                src={icono.codigo_icon} 
                                alt={icono.nombre}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <span>{icono.nombre}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Vista previa */}
                <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                  <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center">🏷️ Vista previa de tu placa</h4>
                  <div className="flex items-center justify-center">
                    <div 
                      className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border-2 shadow-lg"
                      style={{ 
                        backgroundColor: coloresPlacas.find(c => c.id === placaPersonalization.color_id)?.codigo_hex || '#C0C0C0',
                        color: placaPersonalization.color_id === 'color_negro' ? 'white' : 'black',
                        fontFamily: tipografiasPlacas.find(t => t.id === placaPersonalization.tipografia_id)?.font_family || 'sans-serif',
                        fontSize: '18px'
                      }}
                    >
                      {placaPersonalization.icono_id && placaPersonalization.icono_id !== 'none' && (
                        <div className="w-6 h-6 flex items-center justify-center">
                          <img 
                            src={iconosPlacas.find(i => i.id === placaPersonalization.icono_id)?.codigo_icon || '/placas/iconos/huella.png'} 
                            alt="Icono seleccionado"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <span className="font-bold">
                        {placaPersonalization.nombre_mascota || 'Tu Mascota'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 text-center space-y-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Forma: <span className="font-medium text-gray-800 dark:text-gray-200">{formasPlacas.find(f => f.id === placaPersonalization.forma_id)?.nombre || 'Círculo'}</span>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Color: <span className="font-medium text-gray-800 dark:text-gray-200">{coloresPlacas.find(c => c.id === placaPersonalization.color_id)?.nombre || 'Azul Rey'}</span>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Tipografía: <span className="font-medium text-gray-800 dark:text-gray-200">{tipografiasPlacas.find(t => t.id === placaPersonalization.tipografia_id)?.nombre || 'Archivo Black'}</span>
                    </p>
                    {placaPersonalization.icono_id && placaPersonalization.icono_id !== 'none' && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Icono: <span className="font-medium text-gray-800 dark:text-gray-200">{iconosPlacas.find(i => i.id === placaPersonalization.icono_id)?.nombre}</span>
                      </p>
                    )}
                    <p className="text-base font-bold text-primary dark:text-primary-foreground mt-2">
                      Precio total: REF {placaPreview.precioTotal.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}
          
          {/* Quantity */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Cantidad:</label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= currentStock}
              >
                +
              </Button>
            </div>
          </div>
          
          <Separator />
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleAddToCart}
              disabled={currentStock === 0}
              className="w-full"
              size="lg"
            >
              Agregar al Carrito
            </Button>
            <Button 
              onClick={handleBuyNow}
              disabled={currentStock === 0}
              variant="outline"
              className="w-full"
              size="lg"
            >
              Comprar Ahora
            </Button>
          </div>
          
          {/* Product Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Descripción</h3>
            <p className="text-gray-600 leading-relaxed">{product.descripcion}</p>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="detalles" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="detalles" className="text-primary dark:text-primary-foreground">Detalles</TabsTrigger>
            <TabsTrigger value="especificaciones" className="text-primary dark:text-primary-foreground">Especificaciones</TabsTrigger>
          </TabsList>
          
          <TabsContent value="detalles" className="mt-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-primary dark:text-primary-foreground">Detalles del Producto</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-primary dark:text-primary-foreground">Categoría:</span>
                    <p className="text-secondary dark:text-secondary-foreground">{categoria?.nombre}</p>
                  </div>
                  <div>
                    <span className="font-medium text-primary dark:text-primary-foreground">Precio:</span>
                    <p className="text-secondary dark:text-secondary-foreground">REF {product.precio.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="font-medium text-primary dark:text-primary-foreground">Stock:</span>
                    <p className="text-secondary dark:text-secondary-foreground">{currentStock} unidades</p>
                  </div>
                  <div>
                    <span className="font-medium text-primary dark:text-primary-foreground">Estado:</span>
                    <p className="text-secondary dark:text-secondary-foreground">{product.is_active ? 'Activo' : 'Inactivo'}</p>
                  </div>
                </div>
                <div>
                  <span className="font-medium text-primary dark:text-primary-foreground">Descripción completa:</span>
                  <p className="text-secondary dark:text-secondary-foreground mt-2">{product.descripcion}</p>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="especificaciones" className="mt-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-primary dark:text-primary-foreground">Especificaciones</h3>
              <div className="space-y-4">
                {hasVariants && (
                  <div>
                    <span className="font-medium text-primary dark:text-primary-foreground">Variantes disponibles:</span>
                    <div className="mt-2 space-y-2">
                      {variantes.map((variante) => (
                        <div key={variante.id} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <span className="text-primary dark:text-primary-foreground">{variante.talla}</span>
                          <span className="text-sm text-secondary dark:text-secondary-foreground">Stock: {variante.stock}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <span className="font-medium text-primary dark:text-primary-foreground">Información adicional:</span>
                  <p className="text-secondary dark:text-secondary-foreground mt-2">
                    Este producto está diseñado para brindar la mejor calidad y satisfacción a tu mascota.
                    Todos nuestros productos pasan por rigurosos controles de calidad antes de llegar a ti.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Productos Relacionados</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productos
            .filter(p => p.categoria_id === product.categoria_id && p.id !== product.id)
            .slice(0, 4)
            .map((relatedProduct) => (
              <ProductCard 
                key={relatedProduct.id} 
                producto={relatedProduct} 
                imagen={getImagenPrincipal(relatedProduct.id)} 
              />
            ))}
        </div>
      </div>
    </div>
  );
} 