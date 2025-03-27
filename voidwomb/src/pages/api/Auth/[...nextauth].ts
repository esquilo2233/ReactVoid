import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '../../../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createLog } from '../../../lib/logger';
import { getClientIp } from '../../../lib/getClientIp';

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
    is_staff: boolean;
    accessToken?: string;
  }
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Por favor, preencha todos os campos');
          }

          const user = await prisma.users.findUnique({
            where: {
              email: credentials.email
            }
          });

          if (!user) {
            throw new Error('Email ou senha incorretos');
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordValid) {
            throw new Error('Email ou senha incorretos');
          }

          // Criar o token JWT
          const accessToken = jwt.sign(
            { 
              id: user.id,
              email: user.email,
              is_staff: user.is_staff 
            },
            process.env.NEXTAUTH_SECRET || 'seu_jwt_secret_aqui',
            { expiresIn: '30d' }
          );

          // Registrar log de login
          await createLog({
            userId: user.id,
            email: user.email,
            action: 'login',
            details: 'Login bem-sucedido',
            ipAddress: getClientIp(req as any)
          });

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name || undefined,
            is_staff: user.is_staff,
            accessToken
          };
        } catch (error) {
          console.error('Erro na autenticação:', error);
          throw error;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.is_staff = user.is_staff;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.is_staff = token.is_staff;
        session.user.accessToken = token.accessToken;
      }
      return session;
    }
  },
  events: {
    async signOut({ token }) {
      if (token) {
        await createLog({
          userId: parseInt(token.id),
          email: token.email,
          action: 'logout',
          details: 'Logout realizado',
          ipAddress: 'IP_DESCONHECIDO' // Não temos acesso ao req no evento signOut
        });
      }
    }
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);