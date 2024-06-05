// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, is_staff: user.is_staff },
      process.env.NEXTAUTH_SECRET || 'supersecret',
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during login', details: (error as Error).message });
  }
}
