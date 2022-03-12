import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { IAllproduct, Iproduct } from '../interfaces/product';

export const getAll = async (): Promise<IAllproduct[] | false> => {
  try {
    const [result] = await connection.execute('SELECT * FROM Trybesmith.Products');
    return result as IAllproduct[];
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const createProduct = async (bodyProduct: Iproduct) => {
  const { name, amount } = bodyProduct;
  try {
    const [result] = await connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount, orderId) Values (?,?,?)',
      [name, amount, null],
    );
    const { insertId: id } = result;
    return { item: { id, name, amount } };
  } catch (e) {
    console.log(e);
    return false;
  }
};
