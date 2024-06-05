import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { JWT as DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      is_staff: boolean;
      accessToken?: string; // Inclua accessToken aqui
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id: string;
    is_staff: boolean;
    accessToken?: string; // Inclua accessToken aqui
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    email: string;
    is_staff: boolean;
    accessToken?: string; // Inclua accessToken aqui
  }
}
