// src/actions/userActions.ts
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';

export const signInUser = async (email: string, password: string) => {
    console.log('Signing in user with email:', email);
  
    const user = await prisma.users.findUnique({
      where: { email },
      select: { id: true, email: true, password: true }
    });
  
    if (!user) {
      console.error('Error signing in user: User not found');
      throw new Error('User not found');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      console.error('Invalid password for user:', email);
      throw new Error('Invalid password');
    }
  
    // Atualizar o campo last_login
    await prisma.users.update({
      where: { id: user.id },
      data: { last_login: new Date() }
    });
  
    console.log('User signed in successfully:', user);
    return user;
  };
