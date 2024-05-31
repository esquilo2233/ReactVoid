import NextAuth from 'next-auth';

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
      id: string;
      email: string;
      is_staff: boolean;
      name?: string | null;
      image?: string | null;
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
