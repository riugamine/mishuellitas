import { createServiceClient } from '@/lib/supabase/service';

/**
 * Upload category image to Supabase Storage
 * @param file - The image file to upload
 * @param categorySlug - The category slug for naming
 * @param isSubcategory - Whether this is a subcategory
 * @returns Promise with the public URL of the uploaded image
 */
export async function uploadCategoryImage(
  file: File, 
  categorySlug: string, 
  isSubcategory: boolean = false
): Promise<string> {
  const supabase = createServiceClient();
  
  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Formato de imagen no soportado. Use JPG, PNG o WEBP.');
  }
  
  // Validate file size (5MB max)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    throw new Error('La imagen es muy grande. Tamaño máximo: 5MB.');
  }
  
  // Generate file path
  const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const folderPath = isSubcategory ? 'categories/subcategories' : 'categories/main-categories';
  const fileName = `${categorySlug}.${fileExtension}`;
  const filePath = `${folderPath}/${fileName}`;
  
  try {
    // Upload file to storage
    const { data, error } = await supabase.storage
      .from('category-assets')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true, // Replace existing file with same name
      });
    
    if (error) {
      console.error('Storage upload error:', error);
      throw new Error('Error al subir la imagen. Inténtalo de nuevo.');
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('product-assets')
      .getPublicUrl(filePath);
    
    return urlData.publicUrl;
  } catch (error) {
    console.error('Upload error:', error);
    throw error instanceof Error ? error : new Error('Error desconocido al subir la imagen');
  }
}

/**
 * Delete category image from Supabase Storage
 * @param imageUrl - The public URL of the image to delete
 * @returns Promise<void>
 */
export async function deleteCategoryImage(imageUrl: string): Promise<void> {
  const supabase = createServiceClient();
  
  try {
    // Extract file path from URL
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split('/');
    const bucketIndex = pathParts.findIndex(part => part === 'category-assets');
    
    if (bucketIndex === -1) {
      throw new Error('URL de imagen inválida');
    }
    
    const filePath = pathParts.slice(bucketIndex + 1).join('/');
    
    const { error } = await supabase.storage
      .from('product-assets')
      .remove([filePath]);
    
    if (error) {
      console.error('Storage delete error:', error);
      throw new Error('Error al eliminar la imagen');
    }
  } catch (error) {
    console.error('Delete error:', error);
    throw error instanceof Error ? error : new Error('Error desconocido al eliminar la imagen');
  }
}

/**
 * Validate image file before upload
 * @param file - The file to validate
 * @returns Object with validation result and error message if any
 */
export function validateImageFile(file: File): { isValid: boolean; error?: string } {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Formato no soportado. Use JPG, PNG o WEBP.'
    };
  }
  
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'Archivo muy grande. Máximo 5MB.'
    };
  }
  
  return { isValid: true };
}
