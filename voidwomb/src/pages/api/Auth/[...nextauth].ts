// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../utils/prisma';
import { compare } from 'bcryptjs';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      email: string;
      is_staff: boolean;
    };
  }

  interface User {
    id: number;
    email: string;
    password: string;
    is_staff: boolean;
    created_at: Date;
    last_login: Date | null;
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('Authorizing credentials:', credentials);

        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials');
          throw new Error('Email and password required');
        }

        const user = await prisma.users.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          console.log('User not found');
          throw new Error('No user found with the email');
        }

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          console.log('Invalid password');
          throw new Error('Password is incorrect');
        }

        const { password, ...userWithoutPassword } = user;
        console.log('Authorized user:', userWithoutPassword);
        return userWithoutPassword as any;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as number;
        session.user.email = token.email as string;
        session.user.is_staff = token.is_staff as boolean;
      }
      console.log('Session:', session);
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.is_staff = user.is_staff;
      }
      console.log('JWT Token:', token);
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user',
  },
});
