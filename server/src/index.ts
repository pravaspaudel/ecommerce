import express from "express";
import { ENV } from "./config/env.config.ts";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.middleware.ts";
import authRouter from "./routes/auth.route.ts";

const app = express();

app.use(
  cors({
    origin: [ENV.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);

app.use(errorMiddleware);

export default app;
