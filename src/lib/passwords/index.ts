import { hash, compare } from "bcrypt";

export const hashPassword = async (password: string) => {
  const hashed_password: string = await hash(password, 10);
  return hashed_password;
};

export const verifyPassword = async (
  password: string,
  hashed_password: string
) => {
  const match: boolean = await compare(password, hashed_password);
  return match;
};
