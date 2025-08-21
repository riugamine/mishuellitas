import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generateSlug, generateUniqueSlug } from '@/lib/utils/slug-generator';
import { CategoryCreateInput } from '@/lib/types/database.types';
import { deleteCategoryImage } from '@/lib/utils/image-upload';

/**
 * Create Supabase client with service role for server-side operations
 */
function createServiceClient() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

/**
 * GET - Fetch all categories
 */
export async function GET() {
  try {
    const supabase = createServiceClient();

    const { data: categories, error } = await supabase
      .from('categorias')
      .select(`
        *,
        subcategories:categorias!parent_id(*)
      `)
      .is('parent_id', null)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    // Add product count for each category
    if (categories) {
      for (const category of categories) {
        // Try to get product count, but don't fail if productos table doesn't exist
        try {
          const { data: products, error: productError } = await supabase
            .from('productos')
            .select('id')
            .eq('categoria_id', category.id);
          
          if (productError) {
            // If table doesn't exist or other error, set count to 0
            console.warn(`Could not fetch products for category ${category.id}:`, productError);
            category.product_count = 0;
          } else {
            category.product_count = products?.length || 0;
          }
        } catch (error) {
          console.warn(`Error fetching products for category ${category.id}:`, error);
          category.product_count = 0;
        }
      }
    }

    if (error) {
      console.error('Error fetching categories:', error);
      return NextResponse.json(
        { error: 'Error al obtener las categorías' },
        { status: 500 }
      );
    }

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

/**
 * POST - Create a new category
 */
export async function POST(request: NextRequest) {
  try {
    const body: CategoryCreateInput = await request.json();
    const { nombre, descripcion, cover_image_url, parent_id } = body;

    // Validate required fields
    if (!nombre || nombre.trim().length === 0) {
      return NextResponse.json(
        { error: 'El nombre de la categoría es requerido' },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // Get existing slugs to ensure uniqueness
    const { data: existingCategories } = await supabase
      .from('categorias')
      .select('slug');

    const existingSlugs = existingCategories?.map(cat => cat.slug) || [];

    // Generate unique slug
    const baseSlug = generateSlug(nombre);
    const uniqueSlug = generateUniqueSlug(baseSlug, existingSlugs);

    // Validate parent_id if provided
    if (parent_id) {
      const { data: parentCategory, error: parentError } = await supabase
        .from('categorias')
        .select('id')
        .eq('id', parent_id)
        .single();

      if (parentError || !parentCategory) {
        return NextResponse.json(
          { error: 'La categoría padre no existe' },
          { status: 400 }
        );
      }
    }

    // Create the category
    const { data: newCategory, error: insertError } = await supabase
      .from('categorias')
      .insert({
        nombre: nombre.trim(),
        slug: uniqueSlug,
        descripcion: descripcion?.trim() || null,
        cover_image_url: cover_image_url || null,
        parent_id: parent_id || null,
        is_active: true,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error creating category:', insertError);
      return NextResponse.json(
        { error: 'Error al crear la categoría' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Categoría creada exitosamente',
        category: newCategory,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Unexpected error creating category:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Delete a category
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('id');

    if (!categoryId) {
      return NextResponse.json(
        { error: 'ID de categoría requerido' },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // Get the category to delete (including image URL)
    const { data: categoryToDelete, error: fetchError } = await supabase
      .from('categorias')
      .select('id, nombre, cover_image_url')
      .eq('id', categoryId)
      .single();

    if (fetchError || !categoryToDelete) {
      return NextResponse.json(
        { error: 'Categoría no encontrada' },
        { status: 404 }
      );
    }

    // Check if category has subcategories
    const { data: subcategories, error: subcatError } = await supabase
      .from('categorias')
      .select('id, nombre')
      .eq('parent_id', categoryId);

    console.log(`Checking subcategories for category ${categoryId}:`, {
      subcategories,
      subcatError,
      count: subcategories?.length || 0
    });

    if (subcatError) {
      console.error('Error checking subcategories:', subcatError);
      return NextResponse.json(
        { error: 'Error al verificar subcategorías' },
        { status: 500 }
      );
    }

    if (subcategories && subcategories.length > 0) {
      console.log(`Category ${categoryId} has ${subcategories.length} subcategories, blocking deletion`);
      return NextResponse.json(
        { 
          error: 'No se puede eliminar una categoría que tiene subcategorías',
          details: `Esta categoría tiene ${subcategories.length} subcategoría(s). Elimina primero las subcategorías.`
        },
        { status: 400 }
      );
    }

    // Check if category has products
    const { data: products, error: productsError } = await supabase
      .from('productos')
      .select('id, nombre')
      .eq('categoria_id', categoryId);

    console.log(`Checking products for category ${categoryId}:`, {
      products,
      productsError,
      count: products?.length || 0
    });

    if (productsError) {
      console.error('Error checking products:', productsError);
      
      // If the productos table doesn't exist, log warning but don't block deletion
      if (productsError.code === 'PGRST116' || productsError.message?.includes('relation') || productsError.message?.includes('does not exist')) {
        console.warn('Products table does not exist, skipping product validation');
      } else {
        return NextResponse.json(
          { error: 'Error al verificar productos' },
          { status: 500 }
        );
      }
    } else if (products && products.length > 0) {
      console.log(`Category ${categoryId} has ${products.length} products, blocking deletion`);
      return NextResponse.json(
        { 
          error: 'No se puede eliminar una categoría que tiene productos',
          details: `Esta categoría tiene ${products.length} producto(s) asociado(s). Mueve o elimina los productos primero.`
        },
        { status: 400 }
      );
    }

    console.log(`Category ${categoryId} validation passed - no subcategories or products found`);

    // Delete the category
    const { error: deleteError } = await supabase
      .from('categorias')
      .delete()
      .eq('id', categoryId);

    if (deleteError) {
      console.error('Error deleting category:', deleteError);
      return NextResponse.json(
        { error: 'Error al eliminar la categoría' },
        { status: 500 }
      );
    }

    // Delete associated image if exists
    if (categoryToDelete.cover_image_url) {
      try {
        await deleteCategoryImage(categoryToDelete.cover_image_url);
      } catch (imageError) {
        console.warn('Failed to delete category image:', imageError);
        // Don't fail the entire operation if image deletion fails
      }
    }

    return NextResponse.json(
      {
        message: 'Categoría eliminada exitosamente',
        deletedCategory: categoryToDelete,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error deleting category:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
