import { Request, Response, NextFunction } from 'express';
import * as serviceOrder from '../services/order';

interface IReqUser extends Request {
  userId?: number,
}

export const verifyBodyOrder = (req: Request, res: Response, next: NextFunction) => {
  const { products } = req.body;
  const result = serviceOrder.verifyBodyOrder(products);
  if (result !== true) return res.status(result.status).json({ error: result.message });
  next();
};

export const saveOrder = async (req: IReqUser, res: Response) => {
  const { products } = req.body;
  const id: number = req.userId as number;
  const result = await serviceOrder.saveOrder(products, id);
  if (!result) res.status(500);
  res.status(201).json(result);
};

export const getOrder = async (req: IReqUser, res: Response) => {
  const { id } = req.params;
  const result = await serviceOrder.getOrder(id);
  if (!result) return res.status(404).json({ error: 'Order not found' });
  res.status(200).json(result);
};