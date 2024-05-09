// supabaseService.ts
import { supabase } from '../pages/_app';

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
  return data;
}

export async function createUser(user: Partial<User>): Promise<User | null> {
  const { data, error } = await supabase.from('users').insert([user]);
  if (error) {
    throw error;
  }
  return data ? data[0] : null;
}