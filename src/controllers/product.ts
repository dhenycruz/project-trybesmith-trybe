import { Request, Response, NextFunction } from 'express';
import * as serviceProduct from '../services/product';

export const authName = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  const result = serviceProduct.authName(name);

  if (result !== true) return res.status(result.status).json({ error: result.message });

  next();
};

export const authAmount = (req: Request, res: Response, next: NextFunction) => {
  const { amount } = req.body;
  const result = serviceProduct.authAmount(amount);

  if (result !== true) return res.status(result.status).json({ error: result.message });

  next();
};

export const createProduct = async (req: Request, res: Response) => {
  const result = await serviceProduct.createProduct(req.body);
  if (!result) res.status(500);

  res.status(201).json(result);
};