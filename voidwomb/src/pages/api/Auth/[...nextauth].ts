// Log para verificar se o arquivo está sendo carregado
console.log('✅ /api/auth/[...nextauth].ts carregado!');

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
          console.log('🔐 NextAuth authorize chamado com email:', credentials?.email);
          
          if (!credentials?.email || !credentials?.password) {
            console.log('❌ Credenciais vazias');
            return null;
          }

          console.log('🔍 Buscando usuário no banco...');
          const user = await prisma.users.findUnique({
            where: {
              email: credentials.email
            }
          });

          if (!user) {
            console.log('❌ Usuário não encontrado:', credentials.email);
            return null;
          }

          console.log('🔑 Verificando senha...');
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordValid) {
            console.log('❌ Senha inválida');
            return null;
          }

          console.log('✅ Login válido! Criando token...');
          
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

          // Registrar log de login (não bloquear se falhar)
          try {
            await createLog({
              userId: user.id,
              email: user.email,
              action: 'login',
              details: 'Login bem-sucedido',
              ipAddress: getClientIp(req as any)
            });
          } catch (logError) {
            console.warn('⚠️ Erro ao criar log (ignorado):', logError);
          }

          const userData = {
            id: user.id.toString(),
            email: user.email,
            name: user.name || undefined,
            is_staff: user.is_staff,
            accessToken
          };

          console.log('✅ Retornando dados do usuário:', { id: userData.id, email: userData.email, is_staff: userData.is_staff });
          return userData;
        } catch (error) {
          console.error('❌ ERRO CRÍTICO na autenticação:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  callbacks: {
    async jwt({ token, user, account }: { token: any; user: any; account: any }) {
      console.log('🔄 JWT Callback chamado', { hasUser: !!user, hasToken: !!token, hasAccount: !!account });
      
      if (user) {
        console.log('👤 Adicionando dados do usuário ao token:', { id: user.id, email: user.email, is_staff: user.is_staff });
        token.id = user.id;
        token.email = user.email;
        token.is_staff = user.is_staff;
        token.accessToken = user.accessToken;
      }
      
      console.log('✅ Token final:', { id: token.id, email: token.email, is_staff: token.is_staff });
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      console.log('📋 Session Callback chamado', { hasSession: !!session, hasToken: !!token });
      console.log('🔑 Token no session callback:', { id: token.id, email: token.email, is_staff: token.is_staff });
      
      if (session.user && token) {
        session.user.id = token.id || token.sub;
        session.user.email = token.email || session.user.email;
        session.user.is_staff = token.is_staff || false;
        session.user.accessToken = token.accessToken;
        
        console.log('✅ Session final:', { 
          id: session.user.id, 
          email: session.user.email, 
          is_staff: session.user.is_staff 
        });
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
          ipAddress: 'IP_DESCONHECIDO'
        });
      }
    }
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    // Não definir error aqui - vamos interceptar na rota /api/auth/error
  },
  debug: false,
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
