import asyncHandler from "../utils/asyncHandler.ts";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "../middlewares/error.middleware.ts";
import {
  createUser,
  getUserByEmail,
  validatePassword,
} from "../services/user.services.ts";
import { prisma } from "../config/prisma.ts";
import { sendMail } from "../utils/sendEmail.ts";
import { successResponse } from "../utils/successResponse.ts";
import { ENV } from "../config/env.config.ts";
import resetTokens from "../utils/generateResetPasswordToken.ts";
import { generateEmailTemplate } from "../utils/email.template.forgotpassword.ts";

const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new ErrorHandler("all fields are required", 400);
    }

    const existsUser = await getUserByEmail(email);

    if (existsUser) {
      throw new ErrorHandler("user already exists", 400);
    }

    const user = await createUser(name, email, password);

    return successResponse(
      res,
      "User registered successfully",
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      201,
    );
  },
);

const loginuser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ErrorHandler("all fields are required", 400);
    }

    const user = await getUserByEmail(email);

    if (!user) {
      throw new ErrorHandler("invalid credentials", 401);
    }

    const isPassword = await validatePassword(password, user.password);

    if (!isPassword) {
      throw new ErrorHandler("invalid credientials", 401);
    }

    const token = jwt.sign({ id: user.id }, ENV.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return successResponse(res, "LoginSuccessfull", {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  },
);

const whoamI = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    return successResponse(res, "I got you", user, 200);
  },
);

const logout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "strict",
    });

    return successResponse(res, "log out successfully", {}, 200);
  },
);

const forgotPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const findUser = await getUserByEmail(email);

    if (!findUser) {
      throw new ErrorHandler("no user with such email", 400);
    }
    console.log("got the user in forgot password", findUser);

    const { token, hash_token, resetPasswordExpireTime } = resetTokens();

    await prisma.user.update({
      where: { email },
      data: {
        reset_password_token: hash_token,
        reset_password_expire: new Date(resetPasswordExpireTime),
      },
    });

    const resetPasswordUrl = `${ENV.FRONTEND_URL}/password/reset/${token}`;
    const messageTemplates = generateEmailTemplate(resetPasswordUrl);

    console.log("RESET URL:", resetPasswordUrl);
    console.log("TOKEN:", token);

    try {
      await sendMail({
        email: findUser.email,
        subject: "ecommerce password recovery",
        message: messageTemplates,
      });

      return successResponse(
        res,
        `email send to ${findUser.email} successfully`,
        {},
        200,
      );
    } catch (error) {
      await prisma.user.update({
        where: { email },
        data: {
          reset_password_token: null,
          reset_password_expire: null,
        },
      });

      throw new ErrorHandler("Email could not be send", 500);
    }
  },
);

export { registerUser, loginuser, whoamI, logout, forgotPassword };
