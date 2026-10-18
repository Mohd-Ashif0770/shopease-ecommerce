
import redisClient from "../config/redis.js";
import {
  generateRefreshToken,
  hashRefreshToken,
  generateSessionId,
} from "../utils/refreshToken.js";

const SESSION_PREFIX = "shopease:refresh:";
const SESSION_TTL = {
  standard: 24 * 60 * 60, // 1 day, in seconds
  rememberMe: 7 * 24 * 60 * 60, // 7 days, in seconds
};

const getSessionKey = (token) => {
  return `${SESSION_PREFIX}${hashRefreshToken(token)}`;
};

const getTTL = (rememberMe) => {
  return rememberMe
    ? SESSION_TTL.rememberMe
    : SESSION_TTL.standard;
};

export const createRefreshSession = async (userId, rememberMe = false) => {
  const refreshToken = generateRefreshToken();
  const sessionId = generateSessionId();
  const ttl = getTTL(rememberMe);

  const session = {
    userId,
    sessionId,
    rememberMe,
    createdAt: new Date().toISOString(),
  };

  await redisClient.set(
    getSessionKey(refreshToken),
    JSON.stringify(session),
    { EX: ttl },
  );

  return { refreshToken, session };
};

export const getRefreshSession = async (refreshToken) => {
  if (!refreshToken) return null;

  const sessionData = await redisClient.get(
    getSessionKey(refreshToken),
  );

  if (!sessionData) return null;

  return JSON.parse(sessionData);
};

export const rotateRefreshSession = async (oldRefreshToken) => {
  if (!oldRefreshToken) return null;

  const oldKey = getSessionKey(oldRefreshToken);
  const sessionData = await redisClient.get(oldKey);

  if (!sessionData) return null;

  const session = JSON.parse(sessionData);
  const newRefreshToken = generateRefreshToken();
  const newKey = getSessionKey(newRefreshToken);
  const ttl = getTTL(session.rememberMe);

  // Atomically replace the old token so it cannot be reused
  // successfully by two simultaneous refresh requests.
  const result = await redisClient.eval(
    `
      if redis.call("GET", KEYS[1]) == ARGV[1] then
        redis.call("DEL", KEYS[1])
        redis.call("SET", KEYS[2], ARGV[2], "EX", ARGV[3])
        return 1
      end
      return 0
    `,
    {
      keys: [oldKey, newKey],
      arguments: [
        sessionData,
        JSON.stringify(session),
        String(ttl),
      ],
    },
  );

  if (result !== 1) return null;

  return {
    refreshToken: newRefreshToken,
    session,
  };
};

export const revokeRefreshSession = async (refreshToken) => {
  if (!refreshToken) return false;

  const deleted = await redisClient.del(
    getSessionKey(refreshToken),
  );

  return deleted === 1;
};
