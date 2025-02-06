import knex from "knex";
import { knexConfig } from "./knexfile";
import fs from "fs";
import path from "path";
const db = knex(knexConfig);

const setupDatabase = async () => {
  try {
    // Read the SQL file content
    const sqlPath = path.join(__dirname, "setup.sql");
    const sqlContent = fs.readFileSync(sqlPath, "utf8");

    await db.raw(sqlContent);
    console.log("Database setup completed!");
  } catch (error) {
    console.error("Error setting up the database:", error);
  } finally {
    db.destroy();
  }
};
// setupDatabase();
export default db;
