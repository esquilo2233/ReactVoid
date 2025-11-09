import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';
import jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verificar autenticação via JWT
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.NEXTAUTH_SECRET || 'supersecret';
  
  let decoded: any;
  try {
    decoded = jwt.verify(token, secret);
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  // Verificar se o usuário é admin
  if (!decoded.is_staff) {
    return res.status(403).json({ message: 'Acesso negado' });
  }

  // Buscar usuário
  const user = await prisma.users.findUnique({
    where: { id: decoded.id },
  });

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const products = await prisma.product.findMany({
          orderBy: {
            id: 'desc',
          },
        });

        return res.status(200).json(products);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }

    case 'POST':
      try {
        const { name, description, price, sku, color, totalStock, totalSelled, image_urls } = req.body;

        if (!name || !description || !price || !sku || !color || totalStock === undefined || !image_urls) {
          return res.status(400).json({ message: 'Dados incompletos' });
        }

        const product = await prisma.product.create({
          data: {
            userId: user.id,
            name,
            description,
            price: Number(price),
            sku,
            color,
            totalStock,
            totalSelled: totalSelled || 0,
            is_active: true,
          },
        });

        // Adicionando as imagens
        const images = image_urls.map((url: any) => ({
          productId: product.id,
          imageUrl: url,
        }));

        await prisma.productImage.createMany({
          data: images,
        });

        return res.status(201).json(product);
      } catch (error) {
        console.error('Erro ao criar produto:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ message: 'Método não permitido' });
  }
} 