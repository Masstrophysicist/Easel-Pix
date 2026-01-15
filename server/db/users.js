import client from "./client.js";
import bcrypt from "bcrypt";

export const createUser = async ({
  username,
  password,
  displayname = null,
  biography = null,
  profilePicture = "",
  banner = "",
}) => {
  if (!username?.trim() || !password?.trim()) {
    throw Error("Username and password are required");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const SQL = `
    INSERT INTO users
      (username, displayname, biography, password, profilePicture, banner)
    VALUES
      ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `;
  const { rows } = await client.query(SQL, [
    username,
    displayname,
    biography,
    hashedPassword,
    profilePicture,
    banner,
  ]);

  return rows[0];
};

export const getUserById = async (id) => {
  const sql = `
  SELECT *
  FROM users
  WHERE id = $1
  `;
  const {
    rows: [user],
  } = await client.query(sql, [id]);
  return user;
};
