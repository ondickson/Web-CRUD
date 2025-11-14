import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from './env';

export interface JWTPayload { sub: string; email: string; }
export function auth(req: Request, res: Response, next: NextFunction) {
  const h = req.headers.authorization;
  if (!h || !h.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing token' });
  try {
    const token = h.slice(7);
    const payload = jwt.verify(token, ENV.JWT_SECRET) as JWTPayload;
    (req as any).user = payload;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }

  
}

