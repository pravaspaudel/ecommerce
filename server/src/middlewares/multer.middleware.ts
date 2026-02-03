import multer from "multer";
import { ErrorHandler } from "./error.middleware.ts";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      return cb(new ErrorHandler("only images are allowed to upload", 401));
    }
    cb(null, true);
  },
});

export { upload };
