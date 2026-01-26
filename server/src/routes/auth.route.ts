import { Router } from "express";
import {
  forgotPassword,
  loginuser,
  logout,
  registerUser,
  whoamI,
} from "../controllers/auth.controllers.ts";
import isAuthenticated from "../middlewares/auth.middleware.ts";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginuser);
router.get("/me", isAuthenticated, whoamI);
router.post("/logout", isAuthenticated, logout);
router.post("/password/forgot/", forgotPassword);

export default router;
