import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Producto } from '@/lib/placeholder-data';
import { variantesProductos, imagenesProductos } from '@/lib/placeholder-data';
import { useCartStore } from '@/lib/store/useCartStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'sonner';

interface ProductCardProps {
  producto: Producto;
  imagen?: string;
}

export function ProductCard({ producto, imagen }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem);

  /**
   * Agregar producto al carrito con la primera variante disponible
   */
  const handleAddToCart = () => {
    // Obtener variantes del producto
    const productVariants = variantesProductos.filter(v => v.product_id === producto.id);
    
    // Si no hay variantes, usar el producto base
    if (productVariants.length === 0) {
      const cartItem = {
        id: producto.id,
        name: producto.nombre,
        price: producto.precio,
        quantity: 1,
        size: 'Única',
        image_url: imagen || '/icons/perro.png',
        variant_id: `${producto.id}-default`,
        max_stock: producto.stock,
        slug: producto.slug
      };
      
      addItem(cartItem);
      toast.success(`🐾 ${producto.nombre} agregado al carrito!`);
      return;
    }

    // Obtener la primera variante con stock disponible
    const firstAvailableVariant = productVariants.find(v => v.stock > 0);
    
    if (!firstAvailableVariant) {
      toast.error('🐾 Producto sin stock disponible');
      return;
    }

    // Crear objeto CartItem
    const cartItem = {
      id: producto.id,
      name: producto.nombre,
      price: producto.precio,
      quantity: 1,
      size: firstAvailableVariant.talla,
      image_url: imagen || '/icons/perro.png',
      variant_id: firstAvailableVariant.id,
      max_stock: firstAvailableVariant.stock,
      slug: producto.slug
    };

    addItem(cartItem);
    toast.success(`🐾 ${producto.nombre} (${firstAvailableVariant.talla}) agregado al carrito!`);
  };

  return (
    <Card className="flex flex-col h-full py-0">
      <Link href={`/productos/${producto.slug}`} className="block">
        <img
          src={imagen || '/icons/perro.png'}
          alt={producto.nombre}
          className="w-full h-48 object-contain rounded-t bg-white"
        />
      </Link>
      <div className="flex-1 flex flex-col p-4">
        <h2 className="font-semibold text-lg mb-1 line-clamp-1">{producto.nombre}</h2>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{producto.descripcion}</p>
        <div className="font-bold text-primary mb-2">REF {producto.precio.toFixed(2)}</div>
        <div className="flex gap-2 mt-auto">
          <Button asChild variant="outline">
            <Link href={`/productos/${producto.slug}`}>Ver detalle</Link>
          </Button>
          <Button 
            variant="secondary" 
            size="icon" 
            aria-label="Agregar al carrito"
            onClick={handleAddToCart}
          >
            <FontAwesomeIcon icon={faShoppingCart} className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
} 