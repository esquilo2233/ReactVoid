// src/utils/SupabaseService.tsx
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xvupdpyrhxklhnuouotb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2dXBkcHlyaHhrbGhudW91b3RiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyNDI3NTMsImV4cCI6MjAzMDgxODc1M30.M7vHG3h65drHjW00LmeZ-HbFV-kNuZySIc3W8RKSmds';


// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

interface User {
  id: string;
  email: string;
  password: string;
  is_staff: boolean;
  created_at: string;
  last_login: string | null;
}

export async function getUsers(): Promise<User[]> {
  const { data, error } = await supabase.from('users').select('*');
  if (error) {
    throw error;
  }
  return data as User[];
}

export async function createUser(user: Partial<User>): Promise<User | null> {
  const { data, error } = await supabase.from('users').insert([user]).single();
  if (error) {
    throw error;
  }
  return data as User | null;
}
