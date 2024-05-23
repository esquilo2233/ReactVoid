// pages/api/_middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const allowedOrigins = ['https://voidwomb.com'];

export function middleware(req: NextRequest) {
  const origin = req.headers.get('origin');
  if (origin && !allowedOrigins.includes(origin)) {
    return new Response('Forbidden', { status: 403 });
  }
  return NextResponse.next();
}
