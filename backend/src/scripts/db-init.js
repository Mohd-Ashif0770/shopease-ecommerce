import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

const initTables = async () => {
  let connection;
  try {
    connection = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      multipleStatements: true,
    });

    console.log("Database connected successfully");

    const sqlPath = path.join(process.cwd(), "src/database/schema.sql");
    const sql = fs.readFileSync(sqlPath, "utf8");

    await connection.query(sql);

    console.log("Tables initialized successfully");
  } catch (error) {
    console.error("Failed to initialized tables", error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

initTables();
