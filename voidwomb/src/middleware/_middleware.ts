// src/pages/api/_middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const allowedOrigins = ['https://voidwomb.com', 'https://dev.voidwomb.com', 'https://qa.voidwomb.com'];

interface CustomRequest extends NextRequest {
  user?: {
    userId: number;
    email: string;
  };
}

export function middleware(req: NextRequest) {
  const origin = req.headers.get('origin');
  if (origin && !allowedOrigins.includes(origin)) {
    return new Response('Forbidden', { status: 403 });
  }

  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return new Response('Unauthorized', { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return new Response('JWT_SECRET não definido', { status: 500 });
  }

  try {
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload & { userId: number; email: string };
    (req as CustomRequest).user = { userId: decoded.userId, email: decoded.email }; // Definindo a propriedade user
    return NextResponse.next();
  } catch (error) {
    return new Response('Invalid token', { status: 401 });
  }
}
