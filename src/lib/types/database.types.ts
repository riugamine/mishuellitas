/**
 * Database types for Supabase tables
 */

/**
 * Category type based on Supabase categories table
 */
export interface Category {
  id: string;
  nombre: string;
  slug: string;
  descripcion?: string;
  cover_image_url?: string;
  parent_id?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Category creation input type
 */
export interface CategoryCreateInput {
  nombre: string;
  descripcion?: string;
  cover_image_url?: string;
  parent_id?: string | null;
}

/**
 * Category update input type
 */
export interface CategoryUpdateInput {
  nombre?: string;
  descripcion?: string;
  cover_image_url?: string;
  parent_id?: string | null;
  is_active?: boolean;
}

/**
 * Category with subcategories for display
 */
export interface CategoryWithSubcategories extends Category {
  subcategories: Category[];
  product_count: number;
}
