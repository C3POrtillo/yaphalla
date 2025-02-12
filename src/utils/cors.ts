import type { NextApiRequest, NextApiResponse } from 'next';

const allowedOrigins = ['http://localhost:3000'];

const isOriginAllowed = (origin: string): boolean => {
  if (allowedOrigins.includes(origin)) {
    return true;
  }

  const regex = /^https?:\/\/.*\.c3portillos-projects\.vercel\.app$/;

  return regex.test(origin);
};

type Handler = (req: NextApiRequest, res: NextApiResponse) => void;
export const corsMiddleware = (handler: Handler) => async (req: NextApiRequest, res: NextApiResponse) => {
  const origin = req.headers.origin as string;

  if (isOriginAllowed(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();

    return;
  }

  return handler(req, res);
};
