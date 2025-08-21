import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generateSlug, generateUniqueSlug } from '@/lib/utils/slug-generator';
import { CategoryCreateInput } from '@/lib/types/database.types';

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
