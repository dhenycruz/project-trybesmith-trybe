import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { Iuser, Alluser } from '../interfaces/user';

export const getAllUser = async () => {
  const [row] = await connection.execute('SELECT * FROM Trybesmith.Users');
  return row as Alluser[];
};

export const getUserForUsename = async (username: string) => {
  const [row] = await connection.execute(
    'SELECT * FROM Trybesmith.Users WHERE username = ?',
    [username],
  );
  return row as Alluser[];
};

export const createUser = async (body: Iuser): Promise<Alluser | false> => {
  const { username, classe, level, password } = body;
  try {
    const [result] = await connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) values (?,?,?,?)',
      [username, classe, level, password],
    );
    const { insertId: id } = result;
    return { id, username, classe, level, password };
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const verifyUserName = async (userName: string): Promise<Alluser[]> => {
  const [row] = await connection.execute(
    'SELECT * FROM Trybesmith.Users WHERE username = ?',
    [userName],
  );
  return row as Alluser[];
};

export const verifyPassword = async (password: string):Promise<Alluser[]> => {
  const [row] = await connection.execute(
    'SELECT * FROM Trybesmith.Users WHERE password = ?',
    [password],
  );
  return row as Alluser[];
};