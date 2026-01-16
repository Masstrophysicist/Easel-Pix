import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../env.js";

// const SECRET = process.env.JWT_SECRET;
// console.log("Secret", JWT_SECRET);

export function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
