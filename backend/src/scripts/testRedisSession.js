
import redisClient from "../config/redis.js";
import {
  createRefreshSession,
  getRefreshSession,
  rotateRefreshSession,
  revokeRefreshSession,
} from "../services/refreshSession.service.js";

const runTest = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }

    // 1. Create a session
    const created = await createRefreshSession(1, true);
    console.log("1. Session created:", Boolean(created.refreshToken));

    // 2. Validate the session
    const found = await getRefreshSession(created.refreshToken);
    console.log("2. Session valid:", found?.userId === 1);

    // 3. Rotate the refresh token
    const rotated = await rotateRefreshSession(created.refreshToken);
    console.log("3. Token rotated:", Boolean(rotated?.refreshToken));

    // 4. Confirm the old token no longer works
    const oldSession = await getRefreshSession(created.refreshToken);
    console.log("4. Old token rejected:", oldSession === null);

    // 5. Confirm the new token works
    const newSession = await getRefreshSession(rotated.refreshToken);
    console.log("5. New token valid:", newSession?.userId === 1);

    // 6. Revoke the new token
    const revoked = await revokeRefreshSession(rotated.refreshToken);
    const afterRevoke = await getRefreshSession(rotated.refreshToken);
    console.log("6. Session revoked:", revoked && afterRevoke === null);

    if (
      !found ||
      !rotated ||
      oldSession !== null ||
      !newSession ||
      !revoked ||
      afterRevoke !== null
    ) {
      throw new Error("One or more refresh-session tests failed");
    }

    console.log("All refresh-session tests passed.");
  } finally {
    if (redisClient.isOpen) {
      await redisClient.quit();
    }
  }
};

runTest().catch((error) => {
  console.error("Test failed:", error.message);
  process.exitCode = 1;
});
