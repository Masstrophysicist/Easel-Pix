import express from "express";
import requireUser from "../middleware/requireUser.js";
import { authenticate } from "../db/auth.js";
import { createUser } from "../db/users.js";

const router = express.Router();

//Login Portion//
router.post("/login", async (req, res, next) => {
  try {
    const result = await authenticate(req.body);
    console.log("Login");
    res.send(result);
  } catch (error) {
    next(error);
  }
});

//This is for the specific user//
router.get("/me", requireUser, (req, res) => {
  console.log("testing me", req.user);
  res.send(req.user);
});

// register user
router.post("/register", async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

export default router;
