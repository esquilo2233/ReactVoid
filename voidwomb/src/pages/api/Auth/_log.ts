// Rota dummy para evitar erros 404 do NextAuth debug
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Retornar 200 vazio para silenciar os erros do NextAuth
  return res.status(200).json({});
}

