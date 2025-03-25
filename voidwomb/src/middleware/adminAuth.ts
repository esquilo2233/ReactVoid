import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import prisma from '../utils/prisma'; 

export async function adminAuthMiddleware(request: NextRequest) {
  try {
    const token = await getToken({ req: request });

    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const user = await prisma.users.findUnique({
      where: { email: token.email as string },
    });

    if (!user?.is_staff) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Erro no middleware de autenticação:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: '/admin/:path*',
}; 