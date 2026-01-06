import client from "./client.js";

// Fetch all posts for a user
export const fetchPosts = async (userId) => {
  const SQL = `
    SELECT *
    FROM posts
    WHERE user_id = $1
    ORDER BY date DESC
    `;
  let response = await client.query(SQL, [userId]);

  // Optional: if the user has no posts, create a default "Welcome Post"
  if (response.rows.length === 0) {
    const CREATEFIRST = `
      INSERT INTO posts(user_id, title, description)
      VALUES ($1, 'Welcome Post', 'This is your first post')
      RETURNING *
      `;
    await client.query(CREATEFIRST, [userId]);

    // Re-fetch after creating default post
    response = await client.query(SQL, [userId]);
  }

  return response.rows;
};

// Fetch a single post by ID for a user
export const fetchPostById = async (postId, userId) => {
  const SQL = `
    SELECT *
    FROM posts
    WHERE id = $1 AND user_id = $2
    `;
  const response = await client.query(SQL, [postId, userId]);
  return response.rows[0];
};

// Create a new post
export const createPost = async ({ user_id, title, description }) => {
  const SQL = `
    INSERT INTO posts(user_id, title, description)
    VALUES ($1, $2, $3)
    RETURNING *
    `;
  const response = await client.query(SQL, [user_id, title, description]);
  return response.rows[0];
};

// Update an existing post
export const updatePost = async ({ id, title, description }) => {
  const SQL = `
    UPDATE posts
    SET title = $1,
        description = $2
    WHERE id = $3
    RETURNING *
    `;
  const response = await client.query(SQL, [title, description, id]);
  return response.rows[0];
};
