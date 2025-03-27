import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { createLog } from './lib/logger';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const path = request.nextUrl.pathname;

  // Registrar acesso à página de admin
  if (path.startsWith('/Adm/') && token) {
    await createLog({
      userId: parseInt(token.id as string),
      email: token.email as string,
      action: 'admin_access',
      details: `Acesso à página: ${path}`,
      ipAddress: request.ip || request.headers.get('x-forwarded-for')?.split(',')[0] || 'IP_DESCONHECIDO'
    });
  }

  // Verificar se o usuário está autenticado para acessar a área administrativa
  if (path.startsWith('/Adm/')) {
    if (!token) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', path);
      return NextResponse.redirect(loginUrl);
    }

    if (!token.is_staff) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/Adm/:path*']
}; 