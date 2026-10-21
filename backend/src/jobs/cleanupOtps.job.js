import cron from "node-cron";
import pool from "../config/db.js";

const RETENTION_HOURS = 24;

let isRunning = false;

export const cleanupExpiredOtps = async () => {
  if (isRunning) {
    console.log(
      JSON.stringify({
        job: "otp-cleanup",
        status: "skipped",
        reason: "Previous cleanup is still running",
        timestamp: new Date().toISOString(),
      }),
    );
    return;
  }

  isRunning = true;
  const startedAt = Date.now();

  try {
    const [result] = await pool.execute(
      `DELETE FROM email_otps
       WHERE expires_at < DATE_SUB(
         UTC_TIMESTAMP(),
         INTERVAL ${RETENTION_HOURS} HOUR
       )
       OR (
         consumed_at IS NOT NULL
         AND consumed_at < DATE_SUB(
           UTC_TIMESTAMP(),
           INTERVAL ${RETENTION_HOURS} HOUR
         )
       )`,
    );

    console.log(
      JSON.stringify({
        job: "otp-cleanup",
        status: "success",
        deletedRecords: result.affectedRows,
        retentionHours: RETENTION_HOURS,
        durationMs: Date.now() - startedAt,
        timestamp: new Date().toISOString(),
      }),
    );
  } catch (error) {
    console.error(
      JSON.stringify({
        job: "otp-cleanup",
        status: "error",
        message: error.message,
        durationMs: Date.now() - startedAt,
        timestamp: new Date().toISOString(),
      }),
    );
  } finally {
    isRunning = false;
  }
};

export const startOtpCleanupJob = () => {
  // Run at minute 0 of every hour.
  const job = cron.schedule(
    "0 * * * *",
    () => {
      void cleanupExpiredOtps();
    },
    {
      name: "shopease-otp-cleanup",
      timezone: "UTC",
    },
  );

  console.log(
    JSON.stringify({
      job: "otp-cleanup",
      status: "scheduled",
      schedule: "0 * * * *",
      timezone: "UTC",
      retentionHours: RETENTION_HOURS,
      timestamp: new Date().toISOString(),
    }),
  );

  return job;
};
