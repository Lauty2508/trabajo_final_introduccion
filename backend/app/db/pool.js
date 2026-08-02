import { Pool } from "pg";
export const db = new Pool({
    user: process.env.DB_USER ?? "postgres",
    host: process.env.DB_HOST ?? "localhost",
    database: process.env.DB_NAME ?? "postgres",
    password: process.env.DB_PASS ?? "123",
    port: process.env.DB_PORT ?? 5432,
});