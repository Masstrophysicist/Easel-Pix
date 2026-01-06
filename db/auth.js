import client from "./client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const JWT_SECRET = process.env.JWT || "dev_secret";

try {
  const payload = jwt.verify(token, JWT_SECRET);
  const SQL = `
    SELECT id, username, displayname, biography
    FROM users
    WHERE id = $1
    `;

  const response = await client.query(SQL, [payload.id]);

  if (!response.rows.length) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }

  return response.rows[0];
} catch (error) {
  const error = Error("bad token");
  error.status = 401;
  throw error;
}
