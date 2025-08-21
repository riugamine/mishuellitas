/**
 * Storage helper utilities for Supabase file management
 */

import { createClient } from '@supabase/supabase-js';
import { generateSlug } from './slug-generator';

/**
 * Generate storage path for product images
 */
export function generateProductImagePath(
  productName: string, 
  imageType: 'main' | 'gallery',
  fileName: string
): string {
  const productSlug = generateSlug(productName);
  const timestamp = Date.now();
  const fileExtension = fileName.split('.').pop()?.toLowerCase() || 'jpg';
  const uniqueId = `${timestamp}-${Math.random().toString(36).substr(2, 9)}`;
  
  return `products/${productSlug}/${imageType}/${uniqueId}.${fileExtension}`;
}

/**
 * Generate storage path for category images
 */
export function generateCategoryImagePath(
  categoryName: string,
  fileName: string,
  isSubcategory: boolean = false
): string {
  const categorySlug = generateSlug(categoryName);
  const timestamp = Date.now();
  const fileExtension = fileName.split('.').pop()?.toLowerCase() || 'jpg';
  
  const prefix = isSubcategory ? 'subcategories' : 'categories';
  return `${prefix}/${categorySlug}/cover-${timestamp}.${fileExtension}`;
}

/**
 * Upload file to Supabase storage
 */
export async function uploadFileToStorage(
  file: File,
  storagePath: string,
  bucketName: string = 'product-assets'
): Promise<string> {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(storagePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    throw new Error(`Error uploading file: ${error.message}`);
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucketName)
    .getPublicUrl(storagePath);

  return publicUrl;
}

/**
 * Delete file from Supabase storage
 */
export async function deleteFileFromStorage(
  storagePath: string,
  bucketName: string = 'product-assets'
): Promise<void> {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );

  const { error } = await supabase.storage
    .from(bucketName)
    .remove([storagePath]);

  if (error) {
    throw new Error(`Error deleting file: ${error.message}`);
  }
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): { isValid: boolean; error?: string } {
  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    return { isValid: false, error: 'El archivo no puede ser mayor a 5MB' };
  }

  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Solo se permiten archivos JPG, PNG y WEBP' };
  }

  return { isValid: true };
}

/**
 * Get storage path from full URL
 */
export function getStoragePathFromUrl(url: string): string {
  const urlParts = url.split('/');
  const bucketIndex = urlParts.findIndex(part => part === 'product-assets');
  
  if (bucketIndex === -1) {
    throw new Error('Invalid storage URL');
  }
  
  return urlParts.slice(bucketIndex + 1).join('/');
}
