import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { Iuser, Alluser } from '../interfaces/user';

export const getAllUser = async () => {
  const [row] = await connection.execute('SELECT * FROM users');
  return row as Alluser[];
};

export const createUser = async (body: Iuser): Promise<Alluser> => {
  const { username, classe, level, password } = body;
  const [result] = await connection.execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Users (username, classe, level, password) values (?,?,?,?)',
    [username, classe, level, password],
  );
  const { insertId: id } = result;
  return { id, username, classe, level, password };
};