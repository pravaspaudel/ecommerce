import { v2 as cloudinary } from "cloudinary";
import { ENV } from "./env.config.ts";

cloudinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
  api_key: ENV.CLOUDINARY_CLIENT_API,
  api_secret: ENV.CLOUDINARY_CLIENT_SECRET,
});

export default cloudinary;
