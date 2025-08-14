import { createBrowserClient } from '@supabase/ssr'

/**
 * Create Supabase client for browser environment
 * Used in client-side components
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
