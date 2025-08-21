import { NextRequest, NextResponse } from 'next/server';
import { validateImageFile } from '@/lib/utils/image-upload';
import { generateSlug } from '@/lib/utils/slug-generator';
import { createServiceClient } from '@/lib/supabase/service';
import { createClient } from '@/lib/supabase/server';

/**
 * POST - Upload category image to Supabase Storage
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const categoryName = formData.get('categoryName') as string;
    const isSubcategory = formData.get('isSubcategory') === 'true';

    // Validate inputs
    if (!file) {
      return NextResponse.json(
        { error: 'No se ha proporcionado ningún archivo' },
        { status: 400 }
      );
    }

    if (!categoryName) {
      return NextResponse.json(
        { error: 'El nombre de la categoría es requerido' },
        { status: 400 }
      );
    }

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // First, verify user is authenticated using session client
    const sessionClient = await createClient();
    const { data: { user }, error: authError } = await sessionClient.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Usuario no autenticado' },
        { status: 401 }
      );
    }

    // Use service client for storage operations (has elevated permissions)
    const serviceClient = createServiceClient();

    // Generate file path
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const categorySlug = generateSlug(categoryName);
    const folderPath = isSubcategory ? 'categories/subcategories' : 'categories/main-categories';
    const fileName = `${categorySlug}-${Date.now()}.${fileExtension}`;
    const filePath = `${folderPath}/${fileName}`;

    // Upload file to Supabase Storage using service client
    const { data: uploadData, error: uploadError } = await serviceClient.storage
      .from('product-assets')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return NextResponse.json(
        { error: 'Error al subir la imagen: ' + uploadError.message },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = serviceClient.storage
      .from('product-assets')
      .getPublicUrl(filePath);

    const imageUrl = urlData.publicUrl;

    return NextResponse.json(
      {
        message: 'Imagen subida exitosamente',
        imageUrl,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error uploading image:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Error interno del servidor';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
