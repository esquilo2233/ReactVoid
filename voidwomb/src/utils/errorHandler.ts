// utils/errorHandler.ts
import { NextApiRequest, NextApiResponse } from 'next';
import logger from './logger';

export function errorHandler(err: Error, req: NextApiRequest, res: NextApiResponse) {
  logger.error(err.message, { stack: err.stack });
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
}
