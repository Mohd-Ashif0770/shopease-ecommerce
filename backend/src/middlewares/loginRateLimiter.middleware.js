import { rateLimit, ipKeyGenerator } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import { createHash } from "node:crypto";
import redisClient from "../config/redis.js";

const redisStore = (prefix) =>
  new RedisStore({
    prefix,
    sendCommand: (...args) => redisClient.sendCommand(args),
  });

// Layer 1: Limit all login requests by IP.
export const loginIpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  store: redisStore("shopease:rl:login-ip:"),
  message: {
    success: false,
    message: "Too many login requests. Please try again later.",
  },
});

// Layer 2: Count failed logins for email + IP.
export const failedLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  keyGenerator: (req) => {
    const email = String(req.body.email ?? "")
      .trim()
      .toLowerCase();

    const ip = ipKeyGenerator(req.ip);

    const key = createHash("sha256")
      .update(`${email}:${ip}`)
      .digest("hex");

    return key;
  },
  store: redisStore("shopease:rl:failed-login:"),
  message: {
    success: false,
    message:
      "Too many login attempts. Try again in 15 minutes.",
  },
});
