import * as modelUser from '../models/user';
import createToken from '../token/createToken';

interface Ireturn {
  status: number,
  token?: string
}

export default async function logining(
  userName: string,
  password: string,
): Promise<Ireturn> {
  const resultName = await modelUser.verifyUserName(userName);
  if (!resultName.length) return { status: 401 };
  const resultPassword = await modelUser.verifyPassword(password);
  if (!resultPassword.length) return { status: 401 };

  const token = createToken(resultName[0]);

  return { status: 200, token };
}