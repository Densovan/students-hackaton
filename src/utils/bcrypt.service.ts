import * as Bcrypt from 'bcryptjs';
export const CreatePassword = async (str: string) => {
  return await Bcrypt.hash(str, 1);
};
export const verifyPassword = async (
  str: string,
  hash: string,
): Promise<boolean> => {
  return await Bcrypt.compare(str, hash);
};

export const hashData = async (str: string) => {
  return await Bcrypt.hash(str, 10);
};
