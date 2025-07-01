'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { productos, categorias, imagenesProductos, variantesProductos } from '@/lib/placeholder-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { ProductCard } from '@/components/product/product-card';

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
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProductData();
  }, [params]);
  
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
    if (!selectedVariant && variantes.length > 0) {
      toast.error('🐾 Por favor selecciona una variante');
      return;
    }
    
    const variant = variantes.find(v => v.id === selectedVariant);
    if (variant && quantity > variant.stock) {
      toast.error('🐾 No hay suficiente stock disponible');
      return;
    }
    
    toast.success(`🐾 ¡${product?.nombre || 'Producto'} agregado al carrito!`);
    // Here you would typically add to cart state management
  };
  
  // Handle buy now - redirect to cart page
  const handleBuyNow = () => {
    if (!selectedVariant && variantes.length > 0) {
      toast.error('🐾 Por favor selecciona una variante');
      return;
    }
    
    const variant = variantes.find(v => v.id === selectedVariant);
    if (variant && quantity > variant.stock) {
      toast.error('🐾 No hay suficiente stock disponible');
      return;
    }
    
    toast.success('🐾 ¡Redirigiendo al carrito!');
    // Add to cart first, then redirect
    // Here you would typically add to cart state management
    router.push('/carrito');
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
            <div className="flex gap-2 justify-center">
              {imagenes.slice(0, 6).map((imagen, index) => (
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
          <h1 className="text-3xl font-bold text-gray-900">{product.nombre}</h1>
          
          {/* Product Description debajo del título */}
          <p className="text-gray-600 leading-relaxed mb-2">{product.descripcion}</p>
          
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">REF {product.precio.toFixed(2)}</span>
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
            <TabsTrigger value="detalles">Detalles</TabsTrigger>
            <TabsTrigger value="especificaciones">Especificaciones</TabsTrigger>
          </TabsList>
          
          <TabsContent value="detalles" className="mt-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Detalles del Producto</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Categoría:</span>
                    <p className="text-gray-600">{categoria?.nombre}</p>
                  </div>
                  <div>
                    <span className="font-medium">Precio:</span>
                    <p className="text-gray-600">REF {product.precio.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="font-medium">Stock:</span>
                    <p className="text-gray-600">{currentStock} unidades</p>
                  </div>
                  <div>
                    <span className="font-medium">Estado:</span>
                    <p className="text-gray-600">{product.is_active ? 'Activo' : 'Inactivo'}</p>
                  </div>
                </div>
                <div>
                  <span className="font-medium">Descripción completa:</span>
                  <p className="text-gray-600 mt-2">{product.descripcion}</p>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="especificaciones" className="mt-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Especificaciones</h3>
              <div className="space-y-4">
                {hasVariants && (
                  <div>
                    <span className="font-medium">Variantes disponibles:</span>
                    <div className="mt-2 space-y-2">
                      {variantes.map((variante) => (
                        <div key={variante.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>{variante.talla}</span>
                          <span className="text-sm text-gray-600">Stock: {variante.stock}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <span className="font-medium">Información adicional:</span>
                  <p className="text-gray-600 mt-2">
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