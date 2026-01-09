import { findUserByToken } from "../db/auth.js";

const requireUser = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    if (!auth) {
      const error = Error("authorization required");
      error.status = 401;
      throw error;
    }

    const token = auth.replace("Bearer ", "");

    if (!token) {
      const error = Error("authorization required");
      error.status = 401;
      throw error;
    }

    const user = await findUserByToken(token);

    req.user = user;
    next();
  } catch (error) {
    error.status = error.status || 401;
    next(error);
  }
};
