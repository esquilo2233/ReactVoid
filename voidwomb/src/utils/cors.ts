// utils/cors.ts
import Cors from 'cors';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
  origin: '*', // You can restrict origins here
});

function runMiddleware(req: any, res: any, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default cors;
export { runMiddleware };
