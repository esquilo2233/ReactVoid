import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import prisma from '../utils/prisma';

// Configuração do transportador de email
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export class NewsletterService {
  // Criar uma nova newsletter
  async createNewsletter(title: string, content: string) {
    return await prisma.newsletter.create({
      data: {
        title,
        content,
        status: 'draft',
      },
    });
  }

  // Enviar uma newsletter
  async sendNewsletter(newsletterId: number) {
    const newsletter = await prisma.newsletter.findUnique({
      where: { id: newsletterId },
      include: {
        subscriptions: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!newsletter) {
      throw new Error('Newsletter não encontrada');
    }

    const activeSubscriptions = newsletter.subscriptions.filter(sub => sub.isActive);

    for (const subscription of activeSubscriptions) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM,
          to: subscription.user.email,
          subject: newsletter.title,
          html: newsletter.content,
        });

        // Atualizar lastSentAt
        await prisma.newsletterSubscription.update({
          where: { id: subscription.id },
          data: { lastSentAt: new Date() },
        });

        // Registrar log
        await prisma.log.create({
          data: {
            userId: subscription.user.id,
            newsletterId: newsletter.id,
            action: 'NEWSLETTER_SENT',
            details: `Newsletter enviada para ${subscription.user.email}`,
          },
        });
      } catch (error) {
        // Registrar erro no log
        await prisma.log.create({
          data: {
            userId: subscription.user.id,
            newsletterId: newsletter.id,
            action: 'NEWSLETTER_ERROR',
            details: `Erro ao enviar newsletter para ${subscription.user.email}: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
          },
        });
      }
    }

    // Atualizar status da newsletter
    await prisma.newsletter.update({
      where: { id: newsletterId },
      data: {
        status: 'sent',
        sentAt: new Date(),
      },
    });
  }

  // Inscrever usuário na newsletter
  async subscribeUser(userId: number) {
    const existingSubscription = await prisma.newsletterSubscription.findUnique({
      where: { userId },
    });

    if (existingSubscription) {
      return await prisma.newsletterSubscription.update({
        where: { userId },
        data: { isActive: true },
      });
    }

    return await prisma.newsletterSubscription.create({
      data: {
        userId,
        isActive: true,
      },
    });
  }

  // Cancelar inscrição do usuário
  async unsubscribeUser(userId: number) {
    return await prisma.newsletterSubscription.update({
      where: { userId },
      data: { isActive: false },
    });
  }

  // Listar todas as newsletters
  async listNewsletters() {
    return await prisma.newsletter.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // Obter uma newsletter específica
  async getNewsletter(id: number) {
    return await prisma.newsletter.findUnique({
      where: { id },
      include: {
        subscriptions: {
          include: {
            user: true,
          },
        },
      },
    });
  }
} 