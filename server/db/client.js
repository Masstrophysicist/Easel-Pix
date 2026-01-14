import pg from "pg";
import DATABASE_URL from "../../env.js";
const db = new pg.Client(process.env.DATABASE_URL || DATABASE_URL);
export default db;
