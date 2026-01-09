const express = require("express");
const app = express.Router();
const { fetchPosts } = required("../db/post");
const { isLoggedIn } = require("../middleware/auth");
const { updatePost } = requre("../db/posts");

app.get("/", async (req, res, next) => {});

app.patch("/:id", isLoggedIn, async (req, res, next) => {
  res.send(await updatePost({ id: req.params.id, ...req.body }));
});

module.exports = app;
