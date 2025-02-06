// Import dotenv to load environment variables from the .env file
require("dotenv").config();

export const knexConfig = {
  client: "pg", // PostgreSQL client
  connection: {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: 5432, // Default PostgreSQL port
    ssl: { rejectUnauthorized: false }, // Accept any SSL certificate
  },
};
