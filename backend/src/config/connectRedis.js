
import redisClient from "./redis.js";

export const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }

    const response = await redisClient.ping();

    if (response !== "PONG") {
      throw new Error("Redis health check failed");
    }

    console.log("Redis connection successful");
  } catch (error) {
    console.error("Redis connection failed:", error.message);
    throw error;
  }
};
