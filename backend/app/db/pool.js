import { Pool } from "pg";
export const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "123",
    port: 5432,
});