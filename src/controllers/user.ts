import { Request, Response, NextFunction } from 'express';
import * as modelUser from '../services/user';

export const authName = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const result = modelUser.authName(body);
  if (result !== true) return res.status(result.status).json({ error: result.message });
  next();
};

export const authClass = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const result = modelUser.authClass(body);
  if (result !== true) return res.status(result.status).json({ error: result.message });
  next();
};

export const authLevel = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const result = modelUser.authLevel(body);
  if (result !== true) return res.status(result.status).json({ error: result.message });
  next();
};

export const authPassword = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const result = modelUser.authPassword(body);
  if (result !== true) return res.status(result.status).json({ error: result.message });
  next();
};

export const getAll = () => {};