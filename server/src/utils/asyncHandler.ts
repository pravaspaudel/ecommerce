import type { Request, Response, NextFunction } from "express";

type Func = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const asyncHandler =
  (fn: Func) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default asyncHandler;
