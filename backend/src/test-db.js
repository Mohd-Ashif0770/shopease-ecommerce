import pool from "./config/db.js";

try {
  const [rows] = await pool.execute(
    "SELECT DATABASE() AS databaseName, VERSION() AS mysqlVersion"
  );

  console.log("Database connected successfully!");
  console.log(rows[0]);
} catch (error) {
  console.error("Database connection failed:", error.message);
} finally {
  await pool.end();
}