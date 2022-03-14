import * as modelOrder from '../models/order';

interface Error {
  status: number,
  message?: string
}

interface OrderReturn {
  order: {
    userId: number,
    products: number[],
  }
}

interface GetOrderReturn {
  id: number,
  userId: number,
  products: number[],
}

export const verifyBodyOrder = (products: number[]): Error | true => {
  if (!products) return { status: 400, message: 'Products is required' };
  if (typeof products !== 'object') {
    return { status: 422, message: 'Products must be an array of numbers' };
  }
  if (products.length < 1) return { status: 422, message: 'Products can\'t be empty' };

  return true;
};

export const saveOrder = async (products: number[], userId: number)
: Promise<OrderReturn | false > => {
  const result = await modelOrder.saveOrder(products, userId);
  if (!result) return false;
  return result;
};

export const getOrder = async (id: string): Promise<GetOrderReturn | false> => {
  const result = await modelOrder.getOrder(id);
  if (result.length < 1) return false;
  return result[0] as GetOrderReturn;
};

export const getAll = async (): Promise<GetOrderReturn[]> => {
  const result = await modelOrder.getAll();
  return result as GetOrderReturn[];
};