import express from "express";
import requireUser from "../middleware/requireUser.js";
import { createPost, fetchAllPosts, fetchPostsByUser } from "../db/posts.js";
import { loadImage } from "../utils/loadImage.js";

const router = express.Router();

//PUBLIC FEED — all posts//
router.get("/", async (req, res, next) => {
  try {
    const posts = await fetchAllPosts();
    res.send(posts);
  } catch (error) {
    next(error);
  }
});

//LOGGED-IN USER FEED — my posts//
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

//CREATE POST — logged in//
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
