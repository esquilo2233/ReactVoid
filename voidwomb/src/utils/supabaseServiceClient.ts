import { createClient } from '@supabase/supabase-js';

const supabaseServiceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseService = createClient(supabaseServiceUrl, supabaseServiceKey);
