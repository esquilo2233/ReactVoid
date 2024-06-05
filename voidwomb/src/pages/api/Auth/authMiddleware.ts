import { NextApiRequest, NextApiResponse } from 'next';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';

// Defina uma interface que estenda JwtPayload e inclua as propriedades que você espera no token
interface CustomJwtPayload extends JwtPayload {
  id: number;
  email: string;
  is_staff: boolean;
}

// Estenda a interface do NextApiRequest para incluir a propriedade user
declare module 'next' {
  interface NextApiRequest {
    user?: CustomJwtPayload;
  }
}

export async function authenticate(req: NextApiRequest, res: NextApiResponse, next: Function) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || 'supersecret') as CustomJwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
