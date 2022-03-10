import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as modelUser from '../models/user';

const secret = 'meusegredo123';

interface ReturnVerify {
  data: {
    username: string
  }
}

export default async function authToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Token not found' });
  try {
    const decodec = jwt.verify(token, secret) as ReturnVerify;
    const user = modelUser.getUserForUsename(decodec.data.username);
    if (!user) return res.status(401).json({ error: 'User not found' });

    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  next();
}
