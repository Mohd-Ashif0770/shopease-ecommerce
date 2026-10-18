import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import pool from './config/db.js';
import errorhandler from './middlewares/error.middleware.js';
import authRoutes from './routes/auth.routes.js';
import { connectRedis } from "./config/connectRedis.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ShopEase API is running",
  });
});

//routes
app.use("/api/auth", authRoutes)

//error handler
app.use(errorhandler);

const startServer = async () => {
  try {
     await pool.query("SELECT 1");
     console.log("Database connected successfully");
     
     await connectRedis();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MySQL:", error.message);
    process.exit(1);
  }
};

startServer();