import type { Request, Response, NextFunction } from "express";
import { Prisma } from "../generated/client.ts";

export class ErrorHandler extends Error {
  public statusCode: number;

  constructor(msg: string, statusCode: number) {
    super(msg);
    this.statusCode = statusCode;
  }
}

const errorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  err.message = err.message || "internal server error";
  err.statusCode = err.statusCode || 500;

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code == "P202") {
      err = new ErrorHandler("duplicate key found", 400);
    }
  }

  if (err.name == "JsonWebTokenError") {
    err = new ErrorHandler("JSON web token is invalid", 400);
  }

  if (err.name == "TokenExpiredError") {
    err = new ErrorHandler("token expired", 400);
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorMiddleware;
