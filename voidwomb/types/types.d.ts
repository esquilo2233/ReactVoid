// types.d.ts
import { JWT } from 'next-auth/jwt';

declare module 'next' {
  interface NextApiRequest {
    user?: JWT;
  }
}
