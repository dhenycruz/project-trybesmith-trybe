import connection from './connection';
import { Iuser } from '../interfaces/user';

const getAllUser = async () => {
  const [row] = await connection.execute('SELECT * FROM users');
  return row as Iuser[];
};

export default {
  getAllUser,
};