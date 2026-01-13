import express from "express";
import { createUser } from "../db/users.js";

const router = express.Router();

// register user
router.post("/", async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

// get user details
router.get("/:id", async (req, res, next) => {});

export default router;
