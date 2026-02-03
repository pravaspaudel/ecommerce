import { ENV } from "./config/env.config.ts";
import { prisma } from "./config/prisma.ts";
import app from "./index.ts";
import cloudinary from "./config/cloudinary.config.ts";

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
