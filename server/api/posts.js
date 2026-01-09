import express from "express";
import requireUser from "../middleware/requireUser.js";
import { createPost, fetchPosts } from "../db/posts.js";

const router = express.Router();

// Get all posts //
router.get("/", async (req, res, next) => {
  try {
    const posts = await fetchPosts();
    res.send(posts);
  } catch (error) {
    next(error);
  }
});

// Create Posts //
router.post("/", requireUser, async (req, res, next) => {
  try {
    const post = await createPost({
      user_id: req.user.id,
      title: req.body.title,
      description: req.body.description,
    });

    res.send(post);
  } catch (error) {
    next(error);
  }
});

export default router;
