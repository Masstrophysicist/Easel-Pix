import express from "express";
import requireUser from "../middleware/requireUser.js";
import { createPost, fetchAllPosts, fetchPostsByUser } from "../db/posts.js";
import { loadImage } from "../utills/loadImage.js";

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
