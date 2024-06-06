// src/actions/userActions.ts
import { supabase } from '../utils/supabaseClient';
import bcrypt from 'bcryptjs';

export const signInUser = async (email: string, password: string) => {
    console.log('Signing in user with email:', email);
  
    const { data, error } = await supabase
      .from('users')
      .select('id, email, password')
      .eq('email', email)
      .single();
  
    if (error || !data) {
      console.error('Error signing in user:', error);
      throw new Error('User not found');
    }
  
    const isPasswordValid = await bcrypt.compare(password, data.password);
  
    if (!isPasswordValid) {
      console.error('Invalid password for user:', email);
      throw new Error('Invalid password');
    }
  
    // Atualizar o campo last_login
    const { error: updateError } = await supabase
      .from('users')
      .update({ last_login: new Date() })
      .eq('id', data.id);
  
    if (updateError) {
      console.error('Error updating last login:', updateError);
      throw new Error('Failed to update last login');
    }
  
    console.log('User signed in successfully:', data);
    return data;
  };
