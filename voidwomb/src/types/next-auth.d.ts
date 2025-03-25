import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      is_staff: boolean;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    is_staff: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    is_staff: boolean;
  }
} 