import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Producto } from '@/lib/placeholder-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

interface ProductCardProps {
  producto: Producto;
  imagen?: string;
}

export function ProductCard({ producto, imagen }: ProductCardProps) {
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
          <Button variant="secondary" size="icon" aria-label="Agregar al carrito">
            <FontAwesomeIcon icon={faShoppingCart} className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
} 