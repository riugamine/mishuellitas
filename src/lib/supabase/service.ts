import { createClient } from '@supabase/supabase-js';

/**
 * Create Supabase client with service role for server-side operations
 * This client has elevated permissions and should only be used in API routes
 * 
 * @returns Supabase client with service role key
 */
export function createServiceClient() {
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
 * Type definition for the service client
 */
export type ServiceClient = ReturnType<typeof createServiceClient>;
