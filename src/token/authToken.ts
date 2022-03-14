import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as modelUser from '../models/user';

const secret = 'meusegredo123';

interface ReturnVerify {
  data: {
    id: number,
    username: string
  }
}

interface IReqUser extends Request {
  userId?: number,
}

export default async function authToken(req: IReqUser, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Token not found' });
  try {
    const decodec = jwt.verify(token, secret) as ReturnVerify;
    const user = modelUser.verifyUserName(decodec.data.username);
    if (!user) return res.status(401).json({ error: 'User not found' });
    req.userId = decodec.data.id;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
