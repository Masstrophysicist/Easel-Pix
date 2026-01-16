import express from "express";
import authRouter from "./auth.js";
import usersRouter from "./users.js";
import postsRouter from "./posts.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/posts", postsRouter);
router.use("/users", usersRouter);

export default router;
