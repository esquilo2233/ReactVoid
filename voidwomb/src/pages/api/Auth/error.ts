// Interceptar /api/auth/error e redirecionar para /auth/signin
import { NextApiRequest, NextApiResponse } from 'next';

// Garantir que esta rota não seja processada pelo catch-all
export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Log para debug
  console.log('🚨 /api/auth/error interceptado! Query:', req.query);
  console.log('🚨 /api/auth/error interceptado! Method:', req.method);
  
  const error = (req.query.error as string) || 'CredentialsSignin';
  const redirectUrl = `/auth/signin?error=${encodeURIComponent(error)}`;
  
  console.log('🚨 Redirecionando para:', redirectUrl);
  
  // Redirecionar para a página de login com o parâmetro de erro
  // Usar 307 para manter o método e garantir o redirect
  if (!res.headersSent) {
    res.writeHead(307, {
      Location: redirectUrl,
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    });
    res.end();
  }
}

