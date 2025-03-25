import { NextApiRequest } from 'next';

export function getClientIp(req: NextApiRequest): string {
  // Tenta obter o IP do header X-Forwarded-For (usado por proxies)
  const forwardedFor = req.headers['x-forwarded-for'];
  if (forwardedFor) {
    // Pega o primeiro IP da lista (cliente original)
    const ips = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;
    return ips.split(',')[0].trim();
  }

  // Tenta obter o IP do header X-Real-IP
  const realIp = req.headers['x-real-ip'];
  if (realIp) {
    return Array.isArray(realIp) ? realIp[0] : realIp;
  }

  // Se não encontrar nos headers, usa o IP da conexão
  const socket = req.socket;
  if (socket) {
    return socket.remoteAddress || 'IP_DESCONHECIDO';
  }

  return 'IP_DESCONHECIDO';
} 