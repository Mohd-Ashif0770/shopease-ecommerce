import { Worker } from "bullmq";
import {
  deleteProductImageService,
} from "../services/cloudinary.service.js";
import "dotenv/config";

const worker = new Worker("cloudinary-cleanup", async (job) => {

    const { publicIds } = job.data;

    for (const publicId of publicIds) {
      await deleteProductImageService(publicId);
    }

    console.log(
      `Cloudinary cleanup completed for job ${job.id}`
    );
  },
  {
    connection: {
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: Number(process.env.REDIS_PORT || 6379),
      password: process.env.REDIS_PASSWORD,
    },
    concurrency: 2,
  }
);

worker.on("failed", (job, error) => {
  console.error("Cloudinary cleanup attempt failed:", {
    jobId: job?.id,
    attemptsMade: job?.attemptsMade,
    error: error.message,
  });
});

worker.on("error", (error) => {
  console.error("Cloudinary cleanup worker error:", error);
});

console.log("Cloudinary cleanup worker started");