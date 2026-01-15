import client from "./client.js";
import bcrypt from "bcrypt";
import { createToken, verifyToken } from "../utills/jwt.js";

export const authenticate = async ({ username, password }) => {
  if (!username || !password) {
    const error = Error("username and password required");
    error.status = 400;
    throw error;
  }

  const SQL = `
    SELECT id, password
    FROM users
    WHERE username = $1
    `;
  const response = await client.query(SQL, [username]);

  if (!response.rows.length) {
    const error = Error("incorrect credentials");
    error.status = 401;
    throw error;
  }

  const valid = await bcrypt.compare(password, response.rows[0].password);

  if (!valid) {
    const error = Error("incorrect credentials");
    error.status = 401;
    throw error;
  }

  const token = createToken({ id: response.rows[0].id });

  return { token };
};

export const findUserByToken = async (token) => {
  try {
    const payload = verifyToken(token);

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
  } catch {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};
