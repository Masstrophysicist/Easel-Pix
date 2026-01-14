import express from "express";
import { createUser, findUserByUsername } from "../db/users.js";

const router = express.Router();

//Register user//
router.post("/", async (req, res, next) => {
  try {
    const { username, password, displayname, biography } = req.body;

    //Validate the fields//
    if (!username || !password) {
      return res.status(400).send({
        error: "username and password required",
      });
    }

    //This is to check if a username already exists//
    const existing = await findUserByUsername(username);
    if (existing) {
      return res.status(409).send({
        error: "username already taken",
      });
    }

    //This is to create the user//
    const user = await createUser({
      username,
      password,
      displayname,
      biography,
    });

    //This is to hide the password//
    delete user.password;

    res.status(201).send(user);
  } catch (err) {
    next(err);
  }
});

export default router;
