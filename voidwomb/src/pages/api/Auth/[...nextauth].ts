import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../utils/prisma';
import { compare } from 'bcryptjs';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      is_staff: boolean;
    };
  }

  interface User {
    id: string;
    email: string;
    is_staff: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    is_staff: boolean;
  }
}

const allowedOrigins = ['https://voidwomb.com', 'https://dev.voidwomb.com', 'https://qa.voidwomb.com'];

const checkOrigin = (req: NextApiRequest): boolean => {
  const origin = req.headers.origin;
  const referer = req.headers.referer;
  const allowed = allowedOrigins.some((allowedOrigin) => referer?.startsWith(allowedOrigin) || origin === allowedOrigin);
  console.log('Origin:', origin);
  console.log('Referer:', referer);
  console.log('Allowed Origins:', allowedOrigins);
  console.log('Is Allowed:', allowed);
  return allowed;
};

const authHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!checkOrigin(req)) {
    console.log('Forbidden Request:', req.headers);
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

          return { id: user.id.toString(), email: user.email, is_staff: user.is_staff } as any;
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
        }
        return session;
      },
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.email = user.email;
          token.is_staff = user.is_staff;
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
