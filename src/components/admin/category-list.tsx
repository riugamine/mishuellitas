"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEdit, 
  faTrash, 
  faEye,
  faSearch,
  faTags,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreateCategoryModal } from "@/components/admin/categories/create-category-modal";
import { DeleteCategoryDialog } from "@/components/admin/categories/delete-category-dialog";
import { useCategories } from "@/lib/hooks/useCategories";
import { CategoryWithSubcategories } from "@/lib/types/database.types";

/**
 * Category list component with search and CRUD operations
 */
export function CategoryList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryWithSubcategories | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { data: categories, isLoading, error } = useCategories();

  const filteredCategories = categories?.filter(category =>
    category.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.descripcion && category.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  /**
   * Handle delete category button click
   */
  const handleDeleteClick = (category: CategoryWithSubcategories) => {
    setCategoryToDelete(category);
    setShowDeleteDialog(true);
  };

  /**
   * Close delete dialog
   */
  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
    setCategoryToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Categorías</h2>
          <p className="text-gray-600">Gestiona las categorías de productos</p>
        </div>
        <CreateCategoryModal />
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <FontAwesomeIcon 
              icon={faSearch} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" 
            />
            <input
              type="text"
              placeholder="Buscar categorías..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <FontAwesomeIcon icon={faSpinner} className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Cargando categorías...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-red-600">Error al cargar las categorías</p>
            <p className="text-sm text-gray-500 mt-1">{error.message}</p>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!isLoading && !error && filteredCategories.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FontAwesomeIcon icon={faTags} className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? "No se encontraron categorías" : "No hay categorías"}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm 
                ? "Intenta con otros términos de búsqueda" 
                : "Comienza creando tu primera categoría de productos"
              }
            </p>
            {!searchTerm && <CreateCategoryModal />}
          </CardContent>
        </Card>
      )}

      {/* Categories Grid */}
      {!isLoading && !error && filteredCategories.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
          <Card key={category.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faTags} className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg">{category.nombre}</CardTitle>
                </div>
                <Badge 
                  variant={category.is_active ? "default" : "secondary"}
                  className={category.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                >
                  {category.is_active ? "Activo" : "Inactivo"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {/* Category Image */}
              {category.cover_image_url && (
                <div className="mb-4">
                  <img
                    src={category.cover_image_url}
                    alt={category.nombre}
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>
              )}
              
              <p className="text-gray-600 text-sm mb-4">
                {category.descripcion || "Sin descripción"}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Productos:</span>
                  <span className="font-medium text-gray-900">{category.product_count || 0}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Subcategorías:</span>
                  <span className="font-medium text-gray-900">{category.subcategories?.length || 0}</span>
                </div>

                {category.subcategories && category.subcategories.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {category.subcategories.slice(0, 3).map((sub) => (
                      <Badge key={sub.id} variant="outline" className="text-xs">
                        {sub.nombre}
                      </Badge>
                    ))}
                    {category.subcategories.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{category.subcategories.length - 3} más
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                  Creado: {new Date(category.created_at).toLocaleDateString()}
                </span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                  >
                    <Link href={`/admin/categorias/${category.id}`}>
                      <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                  >
                    <Link href={`/admin/categorias/${category.id}/editar`}>
                      <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteClick(category)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
                  ))}
        </div>
      )}

      {/* Delete Category Dialog */}
      <DeleteCategoryDialog
        category={categoryToDelete}
        open={showDeleteDialog}
        onOpenChange={handleCloseDeleteDialog}
      />
    </div>
  );
} 