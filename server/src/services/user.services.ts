import { prisma } from "../config/prisma.ts";
import bcrypt from "bcrypt";
import { ErrorHandler } from "../middlewares/error.middleware.ts";

const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

const createUser = async (name: string, email: string, password: string) => {
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    throw new ErrorHandler("user already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
};

const validatePassword = async (
  plainPassword: string,
  hashedPassword: string,
) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

export { getUserByEmail, getUserById, createUser, validatePassword };
