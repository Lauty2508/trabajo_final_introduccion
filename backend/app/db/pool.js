import { Pool } from "pg";
export const db = new Pool({
    user: process.env.DB_USER ?? "postgres",
    password: process.env.DB_PASS ?? "123",
    host: process.env.DB_HOST ?? "db",
    port: Number(process.env.DB_PORT ?? 5432),
    database: process.env.DB_NAME ?? "db_intro",
});