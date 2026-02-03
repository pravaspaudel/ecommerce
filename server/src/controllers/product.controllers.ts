import type { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma.ts";
import asyncHandler from "../utils/asyncHandler.ts";
import { ErrorHandler } from "../middlewares/error.middleware.ts";
import { uploadToCloudinary } from "../utils/cloudinaryUploader.ts";
import { successResponse } from "../utils/successResponse.ts";
import { getProductById } from "../services/product.service.ts";

const createProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, price, category, stock } = req.body;
    const created_by = (req as any).user.id;

    if (!name || !description || !price || !category || !stock) {
      throw new ErrorHandler("All fields are required", 400);
    }

    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      throw new ErrorHandler("Please upload product images", 400);
    }

    const uploadedImages: any[] = [];

    for (const file of files) {
      const result: any = await uploadToCloudinary(file.buffer);

      uploadedImages.push({
        url: result.secure_url,
        public_id: result.public_id,
      });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        category,
        stock: Number(stock),
        images: uploadedImages,
        created_by,
      },
    });

    return successResponse(res, "product addded successfully", product, 201);
  },
);

const getAllProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await prisma.product.findMany();

    return successResponse(res, "got all the products", products, 200);
  },
);

const updateProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId as string;

    if (!productId) {
      throw new ErrorHandler("product Id not valid ", 400);
    }

    const { id } = (req as any).user;
    const product = await getProductById(productId);

    if (!product) {
      throw new ErrorHandler("no such product exists", 400);
    }

    const usertoUpdate = (req as any).user;
  },
);

export { createProduct, getAllProducts, updateProduct };
