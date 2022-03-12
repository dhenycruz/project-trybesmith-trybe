import * as modelProduct from '../models/product';

import { Iproduct } from '../interfaces/product';

interface Error {
  status: number,
  message?: string
}

export const authName = (name: string): Error | true => {
  if (!name) return { status: 400, message: 'Name is required' };
  if (typeof name !== 'string') return { status: 422, message: 'Name must be a string' };
  if (typeof name === 'string' && name.length <= 2) {
    return { status: 422, message: 'Name must be longer than 2 characters' };
  }
  return true;
};

export const authAmount = (amount: string): Error | true => {
  if (!amount) return { status: 400, message: 'Amount is required' };
  if (typeof amount !== 'string') return { status: 422, message: 'Amount must be a string' };
  if (typeof amount === 'string' && amount.length <= 3) {
    return { status: 422, message: 'Amount must be longer than 2 characters' };
  }
  return true;
};

export const createProduct = async (bodyProduct: Iproduct) => {
  const result = await modelProduct.createProduct(bodyProduct);
  if (!result) return false;

  return result;
};