import express from "express";
import requireUser from ".../middleware/requireUser.js";
import { authenticate } from "../db/auth";

const router = express.Router();
