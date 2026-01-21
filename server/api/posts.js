import express from "express";
import requireUser from "../middleware/requireUser.js";
import {
  createPost,
  fetchAllPosts,
  fetchPostById,
  fetchPostsByUser,
} from "../db/posts.js";
import { loadImage } from "../utills/loadImage.js";
import { updatePost, deletePost } from "../db/posts.js";

const router = express.Router();

//Showing all posts//
router.get("/", async (req, res, next) => {
  try {
    const posts = await fetchAllPosts();
    res.send(posts);
  } catch (error) {
    next(error);
  }
});

//Shows my posts//
router.get("/me", requireUser, async (req, res, next) => {
  try {
    const posts = await fetchPostsByUser(req.user.id);
    res.send(posts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/image", requireUser, async (req, res, next) => {
  try {
    const image = await loadImage("images/posts/orlandopfp.jpg");
    res.send({ image });
  } catch (error) {
    next(error);
  }
});

//Creating a post (Logged In)//
router.post("/", requireUser, async (req, res, next) => {
  try {
    const post = await createPost({
      user_id: req.user.id,
      title: req.body.title,
      description: req.body.description,
      image: req.body.image || null,
    });

    res.status(201).send(post);
  } catch (error) {
    next(error);
  }
});

export default router;

//get single post by id for public viewing
router.get("/:id", async (req, res, next) => {
  try {
    const post = await fetchPostById(req.params.id);
    if (!post) {
      return res.status(404).send({ error: "Post not found" });
    }
    res.send(post);
  } catch (error) {
    next(error);
  }
});

//owner only: update post
router.put("/:id", requireUser, async (req, res, next) => {
  try {
    const post = await fetchPostById(req.params.id);
    if (!post) {
      return res.status(404).send({ error: "Post not found" });
    }
    if (post.user_id !== req.user.id) {
      return res
        .status(403)
        .send({ error: "You're not allowed to edit this post" });
    }
    const updated = await updatePost({
      id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
    });
    res.send(updated);
  } catch (error) {
    next(error);
  }
});

//owner only: delete post
router.delete("/:id", requireUser, async (req, res, next) => {
  try {
    const post = await fetchPostById(req.params.id);
    if (!post) {
      return res.status(404).send({ error: "Post not found" });
    }
    if (post.user_id !== req.user.id) {
      return res
        .status(403)
        .send({ error: "You're not allowed to delete this post" });
    }
    await deletePost(req.params.id);
    res.send({ message: "Post successfully deleted" });
  } catch (error) {
    next(error);
  }
});
