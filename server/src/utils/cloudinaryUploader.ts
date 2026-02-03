import cloudinary from "../config/cloudinary.config.ts";
import streamifier from "streamifier";

const uploadToCloudinary = (buffer: Buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "Products" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export { uploadToCloudinary };
