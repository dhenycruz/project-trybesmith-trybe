import { Request, Response, NextFunction } from 'express';
import * as serviceOrder from '../services/order';

export const verifyBodyOrder = (req: Request, res: Response, next: NextFunction) => {
  const { products } = req.body;
  const result = serviceOrder.verifyBodyOrder(products);
  if (result !== true) return res.status(result.status).json({ error: result.message });
  next();
};

export const saveOrder = async (req: Request, res: Response) => {
  const { products } = req.body;
  const result = await serviceOrder.saveOrder(products, 1);
  if (!result) res.status(500);
  res.status(201).json(result);
};
