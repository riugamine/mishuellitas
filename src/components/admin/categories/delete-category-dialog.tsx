"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTrash, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useDeleteCategory } from "@/lib/hooks/useCategories";
import { CategoryWithSubcategories } from "@/lib/types/database.types";

interface DeleteCategoryDialogProps {
  category: CategoryWithSubcategories | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Dialog component for confirming category deletion
 */
export function DeleteCategoryDialog({ 
  category, 
  open, 
  onOpenChange 
}: DeleteCategoryDialogProps) {
  const deleteCategoryMutation = useDeleteCategory();

  /**
   * Handle category deletion
   */
  const handleDelete = async () => {
    if (!category) return;

    try {
      await deleteCategoryMutation.mutateAsync(category.id);
      onOpenChange(false);
    } catch (error) {
      // Error is handled by the mutation hook
      console.error("Error deleting category:", error);
    }
  };

  /**
   * Check if category can be deleted
   */
  const canDelete = category ? 
    (!category.subcategories || category.subcategories.length === 0) && 
    (!category.product_count || category.product_count === 0) 
    : false;

  const hasSubcategories = category?.subcategories && category.subcategories.length > 0;
  const hasProducts = category && category.product_count && category.product_count > 0;

  // Debug logging
  if (category) {
    console.log('Delete dialog validation:', {
      categoryId: category.id,
      categoryName: category.nombre,
      subcategories: category.subcategories,
      subcategoriesLength: category.subcategories?.length || 0,
      productCount: category.product_count,
      hasSubcategories,
      hasProducts,
      canDelete
    });
  }

  if (!category) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FontAwesomeIcon 
              icon={faExclamationTriangle} 
              className="w-5 h-5 text-red-500" 
            />
            <span>Eliminar Categoría</span>
          </DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer. Se eliminará permanentemente la categoría.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Category Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faTrash} className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{category.nombre}</h3>
                <p className="text-sm text-gray-500">
                  {category.descripcion || "Sin descripción"}
                </p>
              </div>
            </div>

            {/* Category Image */}
            {category.cover_image_url && (
              <div className="mt-3">
                <img
                  src={category.cover_image_url}
                  alt={category.nombre}
                  className="w-full h-24 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          {/* Deletion Blockers */}
          {!canDelete && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <FontAwesomeIcon 
                  icon={faExclamationTriangle} 
                  className="w-5 h-5 text-red-500 mt-0.5" 
                />
                <div className="flex-1">
                  <h4 className="font-medium text-red-800 mb-2">
                    No se puede eliminar esta categoría
                  </h4>
                  
                  {hasSubcategories && (
                    <div className="mb-3">
                      <p className="text-sm text-red-700 mb-2">
                        <strong>Subcategorías ({category.subcategories.length}):</strong>
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {category.subcategories.slice(0, 3).map((sub) => (
                          <Badge key={sub.id} variant="outline" className="text-xs border-red-300">
                            {sub.nombre}
                          </Badge>
                        ))}
                        {category.subcategories.length > 3 && (
                          <Badge variant="outline" className="text-xs border-red-300">
                            +{category.subcategories.length - 3} más
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {hasProducts && (
                    <div>
                      <p className="text-sm text-red-700">
                        <strong>Productos asociados:</strong> {category.product_count || 0}
                      </p>
                    </div>
                  )}

                  <p className="text-sm text-red-600 mt-2">
                    {hasSubcategories && hasProducts 
                      ? "Elimina primero las subcategorías y mueve o elimina los productos."
                      : hasSubcategories 
                        ? "Elimina primero las subcategorías."
                        : "Mueve o elimina primero los productos asociados."
                    }
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Deletion Confirmation */}
          {canDelete && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <FontAwesomeIcon 
                  icon={faExclamationTriangle} 
                  className="w-5 h-5 text-yellow-500 mt-0.5" 
                />
                <div>
                  <h4 className="font-medium text-yellow-800 mb-1">
                    ¿Estás seguro?
                  </h4>
                  <p className="text-sm text-yellow-700">
                    Esta acción eliminará permanentemente la categoría "{category.nombre}" 
                    {category.cover_image_url ? " y su imagen asociada" : ""}.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={deleteCategoryMutation.isPending}
          >
            Cancelar
          </Button>
          
          {canDelete && (
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteCategoryMutation.isPending}
              className="min-w-[120px]"
            >
              {deleteCategoryMutation.isPending ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 mr-2 animate-spin" />
                  Eliminando...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faTrash} className="w-4 h-4 mr-2" />
                  Eliminar
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
