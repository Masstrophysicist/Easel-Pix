import pg from "pg";
import DATABASE_URL from "../../env.js";

const db = new pg.Client(DATABASE_URL || process.env.DATABASE_URL);
export default db;
