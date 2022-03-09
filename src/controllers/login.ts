import { Request, Response } from 'express';
import serviceLogin from '../services/login';

export default async function logining(req: Request, res: Response) {
  const { username, password } = req.body;
  const result = await serviceLogin(username, password);
  if (result.status === 401) {
    return res.status(result.status).json({ error: 'Username or password invalid' });
  }

  res.status(result.status).json({ token: result.token });
}
