import { ResultSetHeader } from 'mysql2';
import connection from './connection';

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

export const getOrder = async (id: string): Promise<GetOrderReturn[]> => {
  const [row] = await connection.execute(
    `select od.id, od.userId, json_arrayagg(pd.id) as products
    FROM Trybesmith.Orders od INNER JOIN Trybesmith.Products pd 
    ON od.id = pd.orderId
    where od.id = ?
    group by od.id`,
    [id],
  );
  return row as GetOrderReturn[];
};

export const getAll = async (): Promise<GetOrderReturn[]> => {
  const [row] = await connection.execute(
    `select od.id, od.userId, json_arrayagg(pd.id) as products
    FROM Trybesmith.Orders od INNER JOIN Trybesmith.Products pd 
    ON od.id = pd.orderId
    group by od.id`,
  );
  return row as GetOrderReturn[];
};
