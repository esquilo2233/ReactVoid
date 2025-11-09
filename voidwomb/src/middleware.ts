import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Permitir acesso à página de login
  if (path === '/admin/login' || path === '/auth/signin') {
    return NextResponse.next();
  }

  // Verificar se o usuário está autenticado para acessar a área administrativa
  if (path.startsWith('/Adm/') || path.startsWith('/admin/')) {
    // Verificar token no cookie
    const cookieToken = request.cookies.get('auth_token')?.value;

    if (!cookieToken) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('callbackUrl', path);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Verificar token JWT
      const secret = process.env.NEXTAUTH_SECRET || 'supersecret';
      const decoded = jwt.verify(cookieToken, secret) as { id?: number; email?: string; is_staff?: boolean };

      if (!decoded.is_staff) {
        return NextResponse.redirect(new URL('/', request.url));
      }

      // Token válido e é staff - permitir acesso
      return NextResponse.next();
    } catch (error) {
      // Token inválido - redirecionar para login
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/Adm/:path*', '/admin/:path*']
}; 