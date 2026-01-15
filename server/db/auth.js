import client from "./client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../env.js";
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
  console.log("JWT_Secret is", JWT_SECRET);
  const token = jwt.sign({ id: response.rows[0].id }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return { token };
};

export const findUserByToken = async (token) => {
  try {
    const payload = verifyToken(token);

    const SQL = `
      SELECT id, username, displayname, biography, profilePicture, banner
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
