import jwt from 'jsonwebtoken';
import { Alluser } from '../interfaces/user';

const secret = 'meusegredo123';

export const createToken = (user: Alluser): string => {
  const token = jwt.sign({ data: user }, secret, { expiresIn: '7d', algorithm: 'HS256' });
  return token;
};

export const authToken = () => {};
