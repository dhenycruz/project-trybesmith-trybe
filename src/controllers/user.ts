import { Request, Response, NextFunction } from 'express';
import * as serviceUser from '../services/user';

export const authName = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const result = serviceUser.authName(body);
  if (result !== true) return res.status(result.status).json({ error: result.message });
  next();
};

export const authClass = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const result = serviceUser.authClass(body);
  if (result !== true) return res.status(result.status).json({ error: result.message });
  next();
};

export const authLevel = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const result = serviceUser.authLevel(body);
  if (result !== true) return res.status(result.status).json({ error: result.message });
  next();
};

export const authPassword = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const result = serviceUser.authPassword(body);
  if (result !== true) return res.status(result.status).json({ error: result.message });
  next();
};

export const createUser = async (req: Request, res: Response) => {
  const { body } = req;
  const result = await serviceUser.createUser(body);
  if (result.status === 500) return res.status(500);
  res.status(result.status).json({ token: result.token });
};