import client from "./client.js";

//Fetch all posts//
export const fetchAllPosts = async () => {
  const SQL = `
    SELECT *
    FROM posts
    ORDER BY date DESC;
    `;
  const response = await client.query(SQL);
  return response.rows;
};

//Fetch Posts By a User//
export const fetchPostsByUser = async (userId) => {
  const SQL = `
  SELECT *
  FROM posts
  WHERE user_id = $1
  ORDER BY date DESC;
  `;
  const response = await client.query(SQL, [userId]);
  return response.rows;
};

//Fetch a single post//
export const fetchPostById = async (postId, userId) => {
  const SQL = `
    SELECT *
    FROM posts
    WHERE id = $1 AND user_id = $2;
    `;
  const response = await client.query(SQL, [postId, userId]);
  return response.rows[0];
};

//Create post//
export const createPost = async ({ user_id, title, description, image }) => {
  const SQL = `
    INSERT INTO posts (user_id, title, description, image)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `;
  const response = await client.query(SQL, [
    user_id,
    title,
    description,
    image,
  ]);

  return response.rows[0];
};

//Update post//
export const updatePost = async ({ id, title, description, image }) => {
  const SQL = `
    UPDATE posts
    SET title = $1,
        description = $2,
        image = $3
    WHERE id = $4
    RETURNING *;
    `;
  const response = await client.query(SQL, [title, description, image, id]);

  return response.rows[0];
};
