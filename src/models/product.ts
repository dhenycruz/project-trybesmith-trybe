import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { IcreateItem } from '../interfaces/product';

export const getAll = async () => {};

export const createProduct = async (name: string, amount: string): Promise<IcreateItem | false> => {
  try {
    const [result] = await connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [name, amount],
    );
    const { insertId: id } = result;
  
    return { item: { id, name, amount } };
  } catch (e) {
    console.error(e);
    return false;
  }
};
