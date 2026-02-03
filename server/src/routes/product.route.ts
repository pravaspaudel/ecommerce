import { Router } from "express";
import {
  createProduct,
  updateProduct,
} from "../controllers/product.controllers.ts";
import { upload } from "../middlewares/multer.middleware.ts";
import isAuthenticated from "../middlewares/auth.middleware.ts";

const router = Router();

// router.get("/products");
router.post(
  "/products",
  isAuthenticated,
  upload.array("images", 5),
  createProduct,
);

router.put(
  "/products/:productId",
  isAuthenticated,
  upload.array("images", 5),
  updateProduct,
);

export default router;
