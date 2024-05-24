import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type Data = {
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'POST') {
    const { email, subject, message } = req.body;

    if (!process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD || !process.env.EMAIL_FROM) {
      return res.status(500).json({ message: 'Email configuration is missing.' });
    }

    if (!email || !subject || !message) {
      return res.status(400).json({ message: 'Email, subject and message are required.' });
    }

    // Configurar o transporte do Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST as string,
      port: parseInt(process.env.EMAIL_SERVER_PORT as string, 10),
      auth: {
        user: process.env.EMAIL_SERVER_USER as string,
        pass: process.env.EMAIL_SERVER_PASSWORD as string,
      },
    });

    // Configurar o e-mail
    const mailOptions = {
      from: process.env.EMAIL_FROM as string,
      to: process.env.EMAIL_FROM as string,
      subject: `Contato: ${subject}`,
      text: `Email: ${email}\n\nMensagem:\n${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to send message.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
