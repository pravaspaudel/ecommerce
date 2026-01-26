import { ENV } from "./config/env.config.ts";
import { prisma } from "./config/prisma.ts";
import app from "./index.ts";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
  api_key: ENV.CLOUDINARY_CLIENT_API,
  api_secret: ENV.CLOUDINARY_CLIENT_SECRET,
});

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("database connected successfully");

    app.listen(ENV.PORT, () => {
      console.log(`server running on http://localhost:${ENV.PORT}`);
    });
  } catch (error) {
    console.log("error while starting the server:", error);
    process.exit(1);
  }
};

startServer();
