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

/**
 * Product type based on Supabase products table
 */
export interface Product {
  id: string;
  nombre: string;
  slug: string;
  descripcion?: string;
  precio: number;
  categoria_id: string;
  tipo: 'normal' | 'placa';
  is_active: boolean;
  main_image_url?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Product image type
 */
export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text?: string;
  is_primary: boolean;
  display_order: number;
  created_at: string;
}

/**
 * Product variant type
 */
export interface ProductVariant {
  id: string;
  product_id: string;
  nombre: string;
  precio_adicional: number;
  stock: number;
  sku?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Product with all related data for display
 */
export interface ProductWithDetails extends Product {
  categoria: Category;
  imagenes: ProductImage[];
  variantes: ProductVariant[];
  stock_total: number;
}

/**
 * Product creation input type
 */
export interface ProductCreateInput {
  nombre: string;
  descripcion?: string;
  precio: number;
  categoria_id: string;
  tipo: 'normal' | 'placa';
  main_image_url?: string;
}

/**
 * Product update input type
 */
export interface ProductUpdateInput {
  nombre?: string;
  descripcion?: string;
  precio?: number;
  categoria_id?: string;
  tipo?: 'normal' | 'placa';
  main_image_url?: string;
  is_active?: boolean;
}

/**
 * Product variant creation input type
 */
export interface ProductVariantCreateInput {
  product_id: string;
  nombre: string;
  precio_adicional: number;
  stock: number;
  sku?: string;
}

/**
 * Product variant update input type
 */
export interface ProductVariantUpdateInput {
  nombre?: string;
  precio_adicional?: number;
  stock?: number;
  sku?: string;
  is_active?: boolean;
}