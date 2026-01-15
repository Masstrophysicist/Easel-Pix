import express from "express";
import requireUser from "../middleware/requireUser.js";

const router = express.Router();

// router.param("/id", async (req, res, next, id) => {
//   const user = await getUserById(id);
//   if (!user) return res.status(404).send("User not found.");
//   req.user = user;
//   next();
// });

// get user details
router.get("/:id", requireUser, async (req, res, next) => {
  const id = Number(req.params.id);
  if (req.user.id !== id) {
    return res.status(403).send("Unauthorized");
  }
  res.send(req.user);
});

export default router;
