"use client";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Category, CategoryCreateInput, CategoryWithSubcategories } from '@/lib/types/database.types';

/**
 * Fetch all categories from API
 */
async function fetchCategories(): Promise<CategoryWithSubcategories[]> {
  const response = await fetch('/api/categories');
  
  if (!response.ok) {
    throw new Error('Error al obtener las categorías');
  }
  
  const data = await response.json();
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
