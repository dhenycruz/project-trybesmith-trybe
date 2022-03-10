import { Iuser } from '../interfaces/user';
import * as modelUser from '../models/user';
import createToken from '../token/createToken';

interface Error {
  status: number,
  message: string
}

export const authName = (body: Iuser): Error | true => {
  if (!body.username) return { status: 400, message: 'Username is required' };

  if (typeof body.username !== 'string') { 
    return { status: 422, message: 'Username must be a string' };
  }

  if (typeof body.username === 'string' && body.username.length <= 2) { 
    return { status: 422, message: 'Username must be longer than 2 characters' };
  }
  
  return true;
};

export const authClass = (body: Iuser): Error | true => {
  if (!body.classe) return { status: 400, message: 'Classe is required' };

  if (typeof body.classe !== 'string') return { status: 422, message: 'Classe must be a string' };

  if (typeof body.classe === 'string' && body.classe.length <= 2) {
    return { status: 422, message: 'Classe must be longer than 2 characters' };
  }
  return true;
};

export const authLevel = (body: Iuser): Error | true => {
  if (body.level === undefined) return { status: 400, message: 'Level is required' };

  if (typeof body.level !== 'number') {
    return { status: 422, message: 'Level must be a number' };
  }

  if (typeof body.level === 'number' && body.level <= 0) {
    return { status: 422, message: 'Level must be greater than 0' };
  }
  return true;
};

export const authPassword = (body: Iuser): Error | true => {
  if (!body.password) return { status: 400, message: 'Password is required' };

  if (typeof body.password !== 'string') { 
    return { status: 422, message: 'Password must be a string' };
  }

  if (typeof body.password === 'string' && body.password.length < 8) {
    return { status: 422, message: 'Password must be longer than 7 characters' };
  }
  return true;
};

export const createUser = async (body: Iuser) => {
  const result = await modelUser.createUser(body);
  if (!result) return { status: 500 };
  const token = createToken(result);
  return { status: 201, token };
};