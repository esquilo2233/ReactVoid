import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type Data = {
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'POST') {
    const { email, subject, message } = req.body;

    // Configurar o transporte do Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_SERVER_USER, // Seu endereço de e-mail do Gmail
        pass: process.env.EMAIL_SERVER_PASSWORD, // Sua senha ou app password do Gmail
      },
    });

    // Configurar o e-mail
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_TO, // Seu endereço de e-mail para onde as mensagens serão enviadas
      subject: `Contato: ${subject}`,
      text: message,
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
