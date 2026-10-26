import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import pool from "./config/db.js";
import { connectRedis } from "./config/connectRedis.js";
const { startOtpCleanupJob } = await import("./jobs/cleanupOtps.job.js");

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to MySQL first.
    await pool.query("SELECT 1");
    console.log("Database connected successfully");

    // Connect to Redis before loading rate-limit middleware.
    await connectRedis();

    // delete the expired and used otps
    startOtpCleanupJob();

    // Import the app dependencies only after Redis is ready.
    const [{ default: errorhandler }, { default: authRoutes }, { default: categoryRoutes },] =
      await Promise.all([
        import("./middlewares/error.middleware.js"),
        import("./routes/auth.routes.js"),
        import("./routes/category.routes.js")
      ]);

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use(
      cors({
        origin: "http://localhost:5173",
        credentials: true,
      }),
    );

    // Health check route
    app.get("/api/health", (req, res) => {
      res.status(200).json({
        success: true,
        message: "ShopEase API is running",
      });
    });

    // Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/categories", categoryRoutes);

    // Error handler
    app.use(errorhandler);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
