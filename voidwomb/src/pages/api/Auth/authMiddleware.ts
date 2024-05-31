import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export async function authenticate(req: NextApiRequest, res: NextApiResponse, next: Function) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || 'supersecret') as jwt.JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
