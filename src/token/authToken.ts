import jwt from 'jsonwebtoken';
import { Alluser } from '../interfaces/user';

const secret = 'meusegredo123';

export const createToken = (user: Alluser): object => {
  const token = jwt.sign({ data: user }, secret, { expiresIn: '7d', algorithm: 'HS256' });
  return { status: 201, token };
};

export const authToken = () => {};
