import { ResultSetHeader } from 'mysql2';
import connection from './connection';

interface OrderReturn {
  order: {
    userId: number,
    products: number[],
  }
}

export const saveOrder = async (products: number[], userId: number): Promise<OrderReturn> => {
  const [save] = await connection.execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Orders (userId) values (?)',
    [userId],
  );
  const { insertId: id } = save;
  await Promise.all(products.map(async (product) => {
    const updateProduct = await connection.execute(
      'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?',
      [id, product],
    );
    return updateProduct;
  }));

  return { order: { userId, products } };
};

export const getAll = async () => {};
