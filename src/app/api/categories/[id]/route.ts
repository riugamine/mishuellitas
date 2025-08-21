import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/service';
import { generateSlug, generateUniqueSlug } from '@/lib/utils/slug-generator';
import { CategoryUpdateInput } from '@/lib/types/database.types';

/**
 * GET - Fetch a single category with all details
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: categoryId } = await params;

    if (!categoryId) {
      return NextResponse.json(
        { error: 'ID de categoría requerido' },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // Get the category with subcategories
    const { data: category, error: categoryError } = await supabase
      .from('categorias')
      .select(`
        *,
        subcategories:categorias!parent_id(*)
      `)
      .eq('id', categoryId)
      .single();

    if (categoryError) {
      console.error('Error fetching category:', categoryError);
      return NextResponse.json(
        { error: 'Categoría no encontrada' },
        { status: 404 }
      );
    }

    if (!category) {
      return NextResponse.json(
        { error: 'Categoría no encontrada' },
        { status: 404 }
      );
    }

    // Get product count for this category
    let productCount = 0;
    try {
      const { data: products, error: productsError } = await supabase
        .from('productos')
        .select('id, nombre, precio, stock, is_active')
        .eq('categoria_id', categoryId);

      if (productsError) {
        console.warn(`Could not fetch products for category ${categoryId}:`, productsError);
      } else {
        productCount = products?.length || 0;
        category.products = products || [];
      }
    } catch (error) {
      console.warn(`Error fetching products for category ${categoryId}:`, error);
      category.products = [];
    }

    // Add product count
    category.product_count = productCount;

    // Add subcategory product counts
    if (category.subcategories && category.subcategories.length > 0) {
      for (const subcategory of category.subcategories) {
        try {
          const { data: subProducts, error: subProductsError } = await supabase
            .from('productos')
            .select('id')
            .eq('categoria_id', subcategory.id);

          if (subProductsError) {
            console.warn(`Could not fetch products for subcategory ${subcategory.id}:`, subProductsError);
            subcategory.product_count = 0;
          } else {
            subcategory.product_count = subProducts?.length || 0;
          }
        } catch (error) {
          console.warn(`Error fetching products for subcategory ${subcategory.id}:`, error);
          subcategory.product_count = 0;
        }
      }
    }

    return NextResponse.json({ category });
  } catch (error) {
    console.error('Unexpected error fetching category:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

/**
 * PUT - Update a category
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: categoryId } = await params;
    const body: CategoryUpdateInput = await request.json();

    if (!categoryId) {
      return NextResponse.json(
        { error: 'ID de categoría requerido' },
        { status: 400 }
      );
    }

    const { nombre, descripcion, cover_image_url, parent_id, is_active } = body;

    // Validate required fields
    if (nombre && nombre.trim().length === 0) {
      return NextResponse.json(
        { error: 'El nombre de la categoría no puede estar vacío' },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // Get the current category to check if it exists
    const { data: currentCategory, error: fetchError } = await supabase
      .from('categorias')
      .select('id, nombre, slug, parent_id')
      .eq('id', categoryId)
      .single();

    if (fetchError || !currentCategory) {
      return NextResponse.json(
        { error: 'Categoría no encontrada' },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {};

    // Update name and regenerate slug if name changed
    if (nombre && nombre !== currentCategory.nombre) {
      updateData.nombre = nombre.trim();
      
      // Get existing slugs to ensure uniqueness
      const { data: existingCategories } = await supabase
        .from('categorias')
        .select('slug')
        .neq('id', categoryId); // Exclude current category

      const existingSlugs = existingCategories?.map(cat => cat.slug) || [];

      // Generate unique slug
      const baseSlug = generateSlug(nombre);
      const uniqueSlug = generateUniqueSlug(baseSlug, existingSlugs);
      updateData.slug = uniqueSlug;
    }

    // Update description
    if (descripcion !== undefined) {
      updateData.descripcion = descripcion?.trim() || null;
    }

    // Update cover image
    if (cover_image_url !== undefined) {
      updateData.cover_image_url = cover_image_url || null;
    }

    // Update active status
    if (is_active !== undefined) {
      updateData.is_active = is_active;
    }

    // Update parent_id
    if (parent_id !== undefined) {
      // Validate parent_id if provided
      if (parent_id && parent_id !== currentCategory.parent_id) {
        // Check if parent category exists
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

        // Prevent circular references (category can't be its own parent or descendant)
        if (parent_id === categoryId) {
          return NextResponse.json(
            { error: 'Una categoría no puede ser padre de sí misma' },
            { status: 400 }
          );
        }

        // TODO: Add more sophisticated circular reference detection if needed
      }

      updateData.parent_id = parent_id || null;
    }

    // Add updated timestamp
    updateData.updated_at = new Date().toISOString();

    // Perform the update
    const { data: updatedCategory, error: updateError } = await supabase
      .from('categorias')
      .update(updateData)
      .eq('id', categoryId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating category:', updateError);
      return NextResponse.json(
        { error: 'Error al actualizar la categoría' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Categoría actualizada exitosamente',
        category: updatedCategory,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error updating category:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
