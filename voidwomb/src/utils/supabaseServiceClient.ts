import { createClient } from '@supabase/supabase-js';

const supabaseServiceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SECRET;

if (!supabaseServiceUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase service environment variables');
}

export const supabaseService = createClient(supabaseServiceUrl, supabaseServiceKey);
