import pg from "pg";
const db = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/easel_pix"
);
export default db;
