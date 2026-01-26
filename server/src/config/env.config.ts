import dotenv from "dotenv";

dotenv.config({ quiet: true });

function getEnv(key: string) {
  const val = process.env[key];

  if (!val) {
    throw new Error(`${key} is not present in .env`);
  }

  return val;
}

function getNumberEnv(key: string) {
  const val = Number(getEnv(key));

  if (Number.isNaN(val)) {
    throw new Error(`${key} is not a number in .env file`);
  }
  return val;
}

export const ENV = {
  PORT: getNumberEnv("PORT"),
  FRONTEND_URL: getEnv("FRONTEND_URL"),
  CLOUDINARY_CLIENT_API: getEnv("CLOUDINARY_CLIENT_API"),
  CLOUDINARY_CLIENT_SECRET: getEnv("CLOUDINARY_CLIENT_SECRET"),
  CLOUDINARY_CLOUD_NAME: getEnv("CLOUDINARY_CLOUD_NAME"),
  JWT_SECRET: getEnv("JWT_SECRET"),
  SMTP_HOST: getEnv("SMTP_HOST"),
  SMTP_SERVICE: getEnv("SMTP_SERVICE"),
  SMTP_PORT: getNumberEnv("SMTP_PORT"),
  SMTP_EMAIL: getEnv("SMTP_EMAIL"),
  SMTP_PASSWORD: getEnv("SMTP_PASSWORD"),
};
