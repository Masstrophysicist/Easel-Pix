import express from "express";
import requireUser from "../middleware/requireUser.js";
import { createUser, getUserById, findUserByUsername } from "../db/users.js";

const router = express.Router();

//Endpoint to register user//
router.post("/", async (req, res, next) => {
  try {
    const { username, password, displayname } = req.body;

    if (!username || !password) {
      return res.status(400).send({
        error: "Please submit a username and password",
      });
    }

    //Check if username is already in use by someone else//
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(409).send({
        error: "Username already in use",
      });
    }

    const user = await createUser({
      username,
      password,
      displayname,
    });
    delete user.password; //For security reasons//

    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
});

// router.param("/id", async (req, res, next, id) => {
//   const user = await getUserById(id);
//   if (!user) return res.status(404).send("User not found.");
//   req.user = user;
//   next();
// });

//Get user details i.e. through postman//
router.get("/:id", requireUser, async (req, res, next) => {
  const id = Number(req.params.id);
  if (req.user.id !== id) {
    return res.status(403).send("Unauthorized");
  }
  res.send(req.user);
});

export default router;
