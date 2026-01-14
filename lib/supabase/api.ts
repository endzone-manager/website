import { createClient } from '@supabase/supabase-js';

/**
 * Create a Supabase client for API routes
 * Uses service_role key if available (bypasses RLS), otherwise falls back to anon key
 * This client doesn't use cookies and is suitable for server-side operations
 */
export function createApiClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  // Prefer service_role key for server-side operations (bypasses RLS)
  // Fall back to publishable key if service_role is not set
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
