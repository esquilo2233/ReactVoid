import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const signupSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  name: z.string().min(2, 'O nome deve ter no mínimo 2 caracteres'),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    // Validar dados de entrada
    const validatedData = signupSchema.parse(req.body);

    // Verificar se o email já existe
    const existingUser = await prisma.users.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Criar novo usuário
    const user = await prisma.users.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
        phone: validatedData.phone,
        address: validatedData.address,
        is_staff: false,
        is_active: true,
      },
    });

    // Remover a senha do objeto de resposta
    const { password, ...userWithoutPassword } = user;

    return res.status(201).json({
      message: 'Usuário criado com sucesso',
      user: userWithoutPassword,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Dados inválidos',
        details: error.errors,
      });
    }

    console.error('Erro ao criar usuário:', error);
    return res.status(500).json({
      error: 'Erro ao criar usuário',
      details: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
} 