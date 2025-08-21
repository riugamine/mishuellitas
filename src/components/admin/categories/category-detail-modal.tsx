"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faSpinner, 
  faTimes, 
  faTags, 
  faCalendar,
  faImage,
  faBoxes,
  faLayerGroup,
  faEdit,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { useCategory } from "@/lib/hooks/useCategories";
import { CategoryWithSubcategories } from "@/lib/types/database.types";

interface CategoryDetailModalProps {
  categoryId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: (category: CategoryWithSubcategories) => void;
  onDelete?: (category: CategoryWithSubcategories) => void;
}

/**
 * Modal component for viewing category details
 */
export function CategoryDetailModal({ 
  categoryId, 
  open, 
  onOpenChange,
  onEdit,
  onDelete
}: CategoryDetailModalProps) {
  const { data: category, isLoading, error } = useCategory(categoryId || '');

  /**
   * Format date for display
   */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  /**
   * Handle edit button click
   */
  const handleEdit = () => {
    if (category && onEdit) {
      onEdit(category);
    }
  };

  /**
   * Handle delete button click
   */
  const handleDelete = () => {
    if (category && onDelete) {
      onDelete(category);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faTags} className="w-5 h-5 text-blue-600" />
            <span>Detalles de Categoría</span>
          </DialogTitle>
        </DialogHeader>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <FontAwesomeIcon icon={faSpinner} className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Cargando categoría...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faTimes} className="w-5 h-5 text-red-500" />
              <div>
                <h4 className="font-medium text-red-800">Error al cargar la categoría</h4>
                <p className="text-sm text-red-600">{error.message}</p>
              </div>
            </div>
          </div>
        )}

        {/* Category Details */}
        {category && (
          <div className="space-y-6">
            {/* Header with Image and Basic Info */}
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Category Image */}
              <div className="flex-shrink-0">
                {category.cover_image_url ? (
                  <img
                    src={category.cover_image_url}
                    alt={category.nombre}
                    className="w-full sm:w-32 h-32 object-cover rounded-lg border"
                  />
                ) : (
                  <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg border flex items-center justify-center">
                    <FontAwesomeIcon icon={faImage} className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1 space-y-3">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{category.nombre}</h2>
                  <p className="text-sm text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded inline-block mt-1">
                    {category.slug}
                  </p>
                </div>

                {category.descripcion && (
                  <p className="text-gray-600">{category.descripcion}</p>
                )}

                {/* Status Badge */}
                <div>
                  <Badge 
                    variant={category.is_active ? "default" : "secondary"}
                    className={category.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                  >
                    {category.is_active ? "Activa" : "Inactiva"}
                  </Badge>
                </div>
              </div>
            </div>

            <Separator />

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Products Count */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <FontAwesomeIcon icon={faBoxes} className="w-4 h-4 text-green-600" />
                    <span>Productos</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {category.product_count || 0}
                  </div>
                  <p className="text-sm text-gray-500">
                    {category.product_count === 1 ? 'Producto asociado' : 'Productos asociados'}
                  </p>
                </CardContent>
              </Card>

              {/* Subcategories Count */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <FontAwesomeIcon icon={faLayerGroup} className="w-4 h-4 text-purple-600" />
                    <span>Subcategorías</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {category.subcategories?.length || 0}
                  </div>
                  <p className="text-sm text-gray-500">
                    {category.subcategories?.length === 1 ? 'Subcategoría' : 'Subcategorías'}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Subcategories List */}
            {category.subcategories && category.subcategories.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <FontAwesomeIcon icon={faLayerGroup} className="w-4 h-4" />
                    <span>Subcategorías ({category.subcategories.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {category.subcategories.map((subcategory) => (
                      <div
                        key={subcategory.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium text-gray-900">{subcategory.nombre}</h4>
                          <p className="text-sm text-gray-500">{subcategory.slug}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {subcategory.product_count || 0} productos
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Products List Preview */}
            {category.products && category.products.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <FontAwesomeIcon icon={faBoxes} className="w-4 h-4" />
                    <span>Productos ({category.products.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {category.products.slice(0, 5).map((product: any) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <div>
                          <h5 className="text-sm font-medium text-gray-900">{product.nombre}</h5>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span>${product.precio}</span>
                            <span>•</span>
                            <span>Stock: {product.stock}</span>
                          </div>
                        </div>
                        <Badge 
                          variant={product.is_active ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {product.is_active ? "Activo" : "Inactivo"}
                        </Badge>
                      </div>
                    ))}
                    {category.products.length > 5 && (
                      <p className="text-sm text-gray-500 text-center py-2">
                        Y {category.products.length - 5} productos más...
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Timestamps */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <FontAwesomeIcon icon={faCalendar} className="w-4 h-4" />
                  <span>Información de Fechas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Creado:</span>
                    <p className="text-gray-600 mt-1">{formatDate(category.created_at)}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Actualizado:</span>
                    <p className="text-gray-600 mt-1">{formatDate(category.updated_at)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cerrar
              </Button>
              
              {onEdit && (
                <Button variant="outline" onClick={handleEdit}>
                  <FontAwesomeIcon icon={faEdit} className="w-4 h-4 mr-2" />
                  Editar
                </Button>
              )}
              
              {onDelete && (
                <Button variant="destructive" onClick={handleDelete}>
                  <FontAwesomeIcon icon={faTrash} className="w-4 h-4 mr-2" />
                  Eliminar
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
