// types/next-auth.d.ts
import NextAuth from 'next-auth'

interface CustomRequest extends NextRequest {
  user?: {
    userId: number;
    email: string;
  };
}

declare module 'next/server' {
  interface NextRequest extends CustomRequest {}
}
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }

  interface User {
    id: string
  }
}
