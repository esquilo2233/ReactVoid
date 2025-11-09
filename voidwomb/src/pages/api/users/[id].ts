import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verificar autenticação
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.NEXTAUTH_SECRET || 'supersecret';
  
  let decoded: any;
  try {
    decoded = jwt.verify(token, secret);
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const userId = parseInt(req.query.id as string);

  if (req.method === 'GET') {
    try {
      // Verificar se o usuário está buscando seus próprios dados ou é admin
      if (decoded.id !== userId && !decoded.is_staff) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      const user = await prisma.users.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          address: true,
          is_staff: false,
          password: false,
        }
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'PUT') {
    try {
      // Verificar se o usuário está atualizando seus próprios dados ou é admin
      if (decoded.id !== userId && !decoded.is_staff) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      const { name, email, phone, address, currentPassword, newPassword } = req.body;

      // Buscar usuário atual
      const currentUser = await prisma.users.findUnique({
        where: { id: userId }
      });

      if (!currentUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Se for alterar senha, verificar senha atual
      if (newPassword) {
        if (!currentPassword) {
          return res.status(400).json({ error: 'Senha atual é obrigatória para alterar a senha' });
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, currentUser.password);
        if (!isPasswordValid) {
          return res.status(401).json({ error: 'Senha atual incorreta' });
        }
      }

      // Preparar dados para atualização
      const updateData: any = {
        name: name || currentUser.name,
        email: email || currentUser.email,
        phone: phone !== undefined ? phone : currentUser.phone,
        address: address !== undefined ? address : currentUser.address,
      };

      // Se for alterar senha, hash da nova senha
      if (newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        updateData.password = hashedPassword;
      }

      // Atualizar usuário
      const updatedUser = await prisma.users.update({
        where: { id: userId },
        data: updateData,
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          address: true,
          is_staff: false,
          password: false,
        }
      });

      res.json(updatedUser);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

