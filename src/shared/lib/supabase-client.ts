import { createClient } from '@supabase/supabase-js';

const supabaseApiUrl = import.meta.env.VITE_SUPABASE_API_URL ?? '';
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? '';

const SUPABASE_BUCKET_ID =
  import.meta.env.VITE_SUPABASE_SUPABASE_BUCKET_ID ?? '';

const supabaseClient = createClient(supabaseApiUrl, supabasePublishableKey, {
  auth: {
    autoRefreshToken: true,
    detectSessionInUrl: false,
    persistSession: true,
  },
});

export { supabaseClient, SUPABASE_BUCKET_ID };
