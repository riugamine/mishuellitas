"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSpinner, faUpload, faTimes } from "@fortawesome/free-solid-svg-icons";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useUpdateCategory, useParentCategories } from "@/lib/hooks/useCategories";
import { CategoryWithSubcategories, CategoryUpdateInput } from "@/lib/types/database.types";
import { validateImageFile } from "@/lib/utils/image-upload";
import { toast } from "sonner";

/**
 * Form validation schema
 */
const editCategorySchema = z.object({
  nombre: z
    .string()
    .min(1, "El nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  descripcion: z
    .string()
    .max(500, "La descripción no puede exceder 500 caracteres")
    .optional(),
  parent_id: z
    .string()
    .optional()
    .nullable(),
  cover_image_url: z
    .string()
    .url("Debe ser una URL válida")
    .optional()
    .or(z.literal("")),
  is_active: z
    .boolean()
    .optional(),
});

type EditCategoryFormData = z.infer<typeof editCategorySchema>;

interface EditCategoryModalProps {
  category: CategoryWithSubcategories | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Modal component for editing categories
 */
export function EditCategoryModal({ 
  category, 
  open, 
  onOpenChange 
}: EditCategoryModalProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const updateCategoryMutation = useUpdateCategory();
  const { data: parentCategories, isLoading: isLoadingParents } = useParentCategories();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<EditCategoryFormData>({
    resolver: zodResolver(editCategorySchema),
  });

  const watchParentId = watch("parent_id");
  const watchIsActive = watch("is_active");

  /**
   * Initialize form with category data when category changes
   */
  useEffect(() => {
    if (category && open) {
      reset({
        nombre: category.nombre,
        descripcion: category.descripcion || "",
        parent_id: category.parent_id || "none",
        cover_image_url: category.cover_image_url || "",
        is_active: category.is_active,
      });
      setImagePreview(category.cover_image_url || "");
      setImageFile(null);
    }
  }, [category, open, reset]);

  /**
   * Upload image to server
   */
  const uploadImage = async (file: File, categoryName: string, isSubcategory: boolean): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('categoryName', categoryName);
    formData.append('isSubcategory', isSubcategory.toString());

    const response = await fetch('/api/categories/upload-image', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al subir la imagen');
    }

    const data = await response.json();
    return data.imageUrl;
  };

  /**
   * Handle form submission
   */
  const onSubmit = async (data: EditCategoryFormData) => {
    if (!category) return;

    try {
      let imageUrl = data.cover_image_url;

      // Upload image if file is selected
      if (imageFile) {
        imageUrl = await uploadImage(
          imageFile, 
          data.nombre, 
          !!(data.parent_id && data.parent_id !== "none")
        );
      }

      const updateData: CategoryUpdateInput = {
        nombre: data.nombre,
        descripcion: data.descripcion || undefined,
        parent_id: data.parent_id === "none" || !data.parent_id ? null : data.parent_id,
        cover_image_url: imageUrl || undefined,
        is_active: data.is_active,
      };

      await updateCategoryMutation.mutateAsync({
        categoryId: category.id,
        categoryData: updateData,
      });
      
      // Reset form and close modal
      handleClose();
    } catch (error) {
      // Error is handled by the mutation hook
      console.error("Error updating category:", error);
    }
  };

  /**
   * Handle image file selection
   */
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file before setting
      const validation = validateImageFile(file);
      if (!validation.isValid) {
        toast.error('Archivo inválido', {
          description: validation.error,
        });
        return;
      }

      setImageFile(file);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      
      // Clear any existing URL
      setValue("cover_image_url", "");
    }
  };

  /**
   * Remove selected image
   */
  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    setValue("cover_image_url", "");
    
    // Reset file input
    const fileInput = document.getElementById("edit-category-image") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  /**
   * Handle modal close
   */
  const handleClose = () => {
    reset();
    setImageFile(null);
    setImagePreview("");
    onOpenChange(false);
  };

  if (!category) return null;

  // Filter out the current category from parent options to prevent circular references
  const availableParentCategories = parentCategories?.filter(parent => parent.id !== category.id) || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faEdit} className="w-5 h-5 text-blue-600" />
            <span>Editar Categoría</span>
          </DialogTitle>
          <DialogDescription>
            Modifica la información de la categoría "{category.nombre}".
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Category Name */}
          <div className="space-y-2">
            <Label htmlFor="nombre">
              Nombre de la Categoría <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nombre"
              {...register("nombre")}
              placeholder="Ej: Alimentos, Juguetes, Accesorios"
              className={errors.nombre ? "border-red-500" : ""}
            />
            {errors.nombre && (
              <p className="text-sm text-red-500">{errors.nombre.message}</p>
            )}
          </div>

          {/* Parent Category */}
          <div className="space-y-2">
            <Label htmlFor="parent_id">Categoría Padre (Opcional)</Label>
            <Select
              value={watchParentId || "none"}
              onValueChange={(value) => setValue("parent_id", value === "none" ? "" : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar categoría padre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Sin categoría padre</SelectItem>
                {isLoadingParents ? (
                  <SelectItem value="" disabled>
                    Cargando categorías...
                  </SelectItem>
                ) : (
                  availableParentCategories.map((parentCategory) => (
                    <SelectItem key={parentCategory.id} value={parentCategory.id}>
                      {parentCategory.nombre}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500">
              Si seleccionas una categoría padre, esta será una subcategoría.
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción (Opcional)</Label>
            <Textarea
              id="descripcion"
              {...register("descripcion")}
              placeholder="Describe brevemente esta categoría..."
              rows={3}
              className={errors.descripcion ? "border-red-500" : ""}
            />
            {errors.descripcion && (
              <p className="text-sm text-red-500">{errors.descripcion.message}</p>
            )}
          </div>

          {/* Active Status */}
          <div className="space-y-2">
            <Label htmlFor="is_active">Estado</Label>
            <Select
              value={watchIsActive ? "true" : "false"}
              onValueChange={(value) => setValue("is_active", value === "true")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Activa</SelectItem>
                <SelectItem value="false">Inactiva</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="edit-category-image">Imagen de Portada (Opcional)</Label>
            
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-md border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={removeImage}
                >
                  <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <FontAwesomeIcon icon={faUpload} className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Haz clic para seleccionar una imagen
                </p>
                <input
                  id="edit-category-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("edit-category-image")?.click()}
                >
                  Seleccionar Imagen
                </Button>
              </div>
            )}
            
            <p className="text-sm text-gray-500">
              Formatos soportados: JPG, PNG, WEBP. Tamaño máximo: 5MB.
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={updateCategoryMutation.isPending}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={updateCategoryMutation.isPending}
              className="min-w-[120px]"
            >
              {updateCategoryMutation.isPending ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 mr-2 animate-spin" />
                  Actualizando...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faEdit} className="w-4 h-4 mr-2" />
                  Actualizar
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
