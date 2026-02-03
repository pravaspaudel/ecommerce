import { prisma } from "../config/prisma.ts";

const getProductById = async (id: string) => {
  return prisma.product.findFirst({
    where: { id: id },
  });
};

export { getProductById };
