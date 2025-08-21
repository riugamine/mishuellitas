"use client";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Category, CategoryCreateInput, CategoryUpdateInput, CategoryWithSubcategories, SubcategoryWithParent } from '@/lib/types/database.types';

/**
 * Fetch all categories and subcategories from API
 */
async function fetchCategoriesAndSubcategories(): Promise<{
  categories: CategoryWithSubcategories[];
  subcategories: SubcategoryWithParent[];
}> {
  const response = await fetch('/api/categories');
  
  if (!response.ok) {
    throw new Error('Error al obtener las categorías');
  }
  
  const data = await response.json();
  return {
    categories: data.categories || [],
    subcategories: data.subcategories || []
  };
}

/**
 * Fetch all categories from API (backward compatibility)
 */
async function fetchCategories(): Promise<CategoryWithSubcategories[]> {
  const data = await fetchCategoriesAndSubcategories();
  return data.categories;
}

/**
 * Create a new category
 */
async function createCategory(categoryData: CategoryCreateInput): Promise<Category> {
  const response = await fetch('/api/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error al crear la categoría');
  }

  const data = await response.json();
  return data.category;
}

/**
 * Update a category
 */
async function updateCategory(categoryId: string, categoryData: CategoryUpdateInput): Promise<Category> {
  const response = await fetch(`/api/categories/${categoryId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error al actualizar la categoría');
  }

  const data = await response.json();
  return data.category;
}

/**
 * Delete a category
 */
async function deleteCategory(categoryId: string): Promise<void> {
  const response = await fetch(`/api/categories?id=${categoryId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error al eliminar la categoría');
  }
}

/**
 * Fetch a single category with all details
 */
async function fetchCategoryById(categoryId: string): Promise<CategoryWithSubcategories> {
  const response = await fetch(`/api/categories/${categoryId}`);
  
  if (!response.ok) {
    throw new Error('Error al obtener la categoría');
  }
  
  const data = await response.json();
  return data.category;
}

/**
 * Hook to fetch all categories
 */
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to create a new category
 */
export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: (newCategory) => {
      // Invalidate and refetch categories
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      
      // Show success toast
      toast.success('Categoría creada exitosamente', {
        description: `La categoría "${newCategory.nombre}" ha sido creada.`,
      });
    },
    onError: (error: Error) => {
      // Show error toast
      toast.error('Error al crear la categoría', {
        description: error.message,
      });
    },
  });
}

/**
 * Hook to update a category
 */
export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, categoryData }: { categoryId: string; categoryData: CategoryUpdateInput }) =>
      updateCategory(categoryId, categoryData),
    onSuccess: (updatedCategory) => {
      // Invalidate and refetch categories
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      // Also invalidate the specific category query
      queryClient.invalidateQueries({ queryKey: ['category', updatedCategory.id] });
      
      // Show success toast
      toast.success('Categoría actualizada exitosamente', {
        description: `La categoría "${updatedCategory.nombre}" ha sido actualizada.`,
      });
    },
    onError: (error: Error) => {
      // Show error toast
      toast.error('Error al actualizar la categoría', {
        description: error.message,
      });
    },
  });
}

/**
 * Hook to delete a category
 */
export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      // Invalidate and refetch categories
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      
      // Show success toast
      toast.success('Categoría eliminada exitosamente', {
        description: 'La categoría ha sido eliminada correctamente.',
      });
    },
    onError: (error: Error) => {
      // Show error toast
      toast.error('Error al eliminar la categoría', {
        description: error.message,
      });
    },
  });
}

/**
 * Hook to fetch a single category by ID
 */
export function useCategory(categoryId: string) {
  return useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => fetchCategoryById(categoryId),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to get parent categories (for subcategory creation)
 */
export function useParentCategories() {
  const { data: categories, ...rest } = useCategories();
  
  // Filter only parent categories (those with parent_id === null)
  const parentCategories = categories?.filter(category => !category.parent_id) || [];
  
  return {
    data: parentCategories,
    ...rest,
  };
}

/**
 * Hook to fetch both categories and subcategories
 */
export function useCategoriesAndSubcategories() {
  return useQuery({
    queryKey: ['categories-and-subcategories'],
    queryFn: fetchCategoriesAndSubcategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
