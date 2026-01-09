import client from "./client.js";
import bcrypt from "bcrypt";

export const createUser = async ({
  username,
  password,
  displayname = null,
  biography = null,
}) => {
  if (!username?.trim() || !password?.trim()) {
    throw Error("Username and password are required");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const SQL = `
    INSERT INTO users
      (username, displayname, biography, password)
    VALUES
      ($1, $2, $3, $4)
    RETURNING *;
    `;
  const { rows } = await client.query(SQL, [
    username,
    displayname,
    biography,
    hashedPassword,
  ]);

  return rows[0];
};
