import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../utils/prisma';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      is_staff: boolean;
      accessToken?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    is_staff: boolean;
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    is_staff: boolean;
    accessToken?: string;
  }
}

const allowedOrigins = ['https://voidwomb.com', 'https://dev.voidwomb.com', 'https://qa.voidwomb.com'];

const checkOrigin = (req: NextApiRequest): boolean => {
  const origin = req.headers.origin;
  const referer = req.headers.referer;
  return allowedOrigins.some((allowedOrigin) => referer?.startsWith(allowedOrigin) || origin === allowedOrigin);
};

const authHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!checkOrigin(req)) {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }

  return NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'text' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email and password required');
          }

          const user = await prisma.users.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            throw new Error('No user found with the email');
          }

          const isValid = await compare(credentials.password, user.password);
          if (!isValid) {
            throw new Error('Password is incorrect');
          }

          // Gerar um token de exemplo aqui. Idealmente, você deve gerar um token real.
          const accessToken = jwt.sign(
            { id: user.id, email: user.email, is_staff: user.is_staff },
            process.env.NEXTAUTH_SECRET || 'supersecret',
            { expiresIn: '1h' }
          );

          console.log("Generated accessToken: ", accessToken);

          // Retorne o user com a propriedade accessToken
          return { id: user.id.toString(), email: user.email, is_staff: user.is_staff, accessToken };
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
          session.user.id = token.id;
          session.user.email = token.email;
          session.user.is_staff = token.is_staff;
          session.user.accessToken = token.accessToken; // Inclua accessToken aqui
          console.log("Session accessToken: ", session.user.accessToken);
        }
        return session;
      },
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.email = user.email;
          token.is_staff = user.is_staff;
          token.accessToken = user.accessToken; // Inclua accessToken aqui
          console.log("JWT token: ", token);
        }
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
};

export default authHandler;
