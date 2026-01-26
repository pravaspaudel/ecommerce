import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "./error.middleware.ts";
import { ENV } from "../config/env.config.ts";
import { getUserById } from "../services/user.services.ts";
import asyncHandler from "../utils/asyncHandler.ts";

const isAuthenticated = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = (req as any).cookies.token;

    if (!token) {
      throw new ErrorHandler("invalid token relogin", 401);
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    console.log("decoded one is", decoded);

    if (!decoded) {
      throw new ErrorHandler("invalid token relogin", 401);
    }

    const user = await getUserById((decoded as any).id);

    if (!user) {
      throw new ErrorHandler("user does not exists", 401);
    }

    (req as any).user = user;
    next();
  },
);

export default isAuthenticated;
